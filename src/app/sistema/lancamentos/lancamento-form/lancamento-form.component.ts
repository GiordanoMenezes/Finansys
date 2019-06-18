import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { LancamentoService } from '../../services/lancamento.service';
import { Lancamento } from '../../models/lancamento.model';



@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})


export class LancamentoFormComponent implements OnInit {

  private loading = false;

  private lancto: Lancamento;
  private isActionNew: boolean; /* true se for Inserindo e false se for editando */
  private pageTitle: string;
  private submittingform = false;

  private  optionsTipos = Lancamento.types;
  private optionsCategoria: Array<Categoria>;

  private ptBrasil = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  private formLancamento = this.fb.group(
    {
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      descricao: [null],
      tipo: ['DESP', [Validators.required]],
      valor: [null, [Validators.required, Validators.min(0)]],
      data: [null, [Validators.required]],
      pago: [true, [Validators.required]],
      categoria: this.fb.group({
        id: [null, [Validators.required]],
        name: [null]
      }),
    }
  );

  constructor(private fb: FormBuilder, private actroute: ActivatedRoute, private router: Router,
    private lancService: LancamentoService, private catService: CategoriaService,
    private toastr: ToastrService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.loading = true;
    this.isActionNew = this.actroute.snapshot.url[0].path === 'new';
    this.setPageTitle();
    this.catService.getAll().subscribe(
      (resp) => this.optionsCategoria = resp,
      (error) => this.errorHandler.handle('Sistema não pôde carregar categorias do Servidor.'));

    this.getLancamento();
  }

  mudaCategoria(evt: any) {
    const cid = evt.target.value;
    this.catService.getById(cid).subscribe(
      (resp) => {
        this.formLancamento.get('categoria').get('name').setValue(resp.name);
      },
      (error) => this.errorHandler.handle('Erro ao Carregar Categoria')
    );

  }

  private setPageTitle() {
    this.pageTitle = this.isActionNew ? 'Novo Lançamento' : 'Edição de Lançamento';
  }

  private getLancamento() {
    if (!this.isActionNew) {
      // this.loading = true;
      this.actroute.paramMap.pipe(
        switchMap(params => {
          return this.lancService.getById(+params.get('id'));
        })
      ).subscribe(
        (resp) => {
          this.lancto = resp;
          this.setPageTitle();
          this.formLancamento.patchValue(resp); /* bind loaded data to formCategoria */
        },
        erro => {
          this.errorHandler.handle(erro);
        });
    }
    this.loading = false;
  }

  private submitForm() {
    this.submittingform = true;
    this.loading = true;
    if (this.isActionNew) {
      this.novoLancamento();
    } else {
      this.editaLancamento();
    }
  }

  private novoLancamento() {
    const lanc = Object.assign(new Categoria(), this.formLancamento.value);
    this.lancService.post(lanc).subscribe(
      resp => {
        this.actionsforSucess(resp);
      },
      (erro) => {
        this.actionsforError(erro);
      }
    );
  }


  private editaLancamento() {
    const lanc = Object.assign(new Lancamento(), this.formLancamento.value);
    this.lancService.update(lanc).subscribe(
      resp => {
        this.actionsforSucess(resp);
      },
      (erro) => {
        this.actionsforError(erro);
      }
    );
  }

  private actionsforSucess(lanc: Lancamento) {
    if (this.isActionNew) {
      this.router.navigate(['lancamentos', 'edit', lanc.id]);
    } else {
      this.submittingform = false;
    }
    this.loading = false;
    this.toastr.success('Lançamento salvo com sucesso!');
  }

  private actionsforError(erro: any) {
    this.errorHandler.handle(erro);
    this.submittingform = false;
    this.loading = false;
  }


}
