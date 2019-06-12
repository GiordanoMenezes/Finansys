import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from '../../services/error-handler.service';



@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})


export class CategoriaFormComponent implements OnInit {

  private formCategoria: FormGroup;
  private loading = false;

  private categoria: Categoria;
  private isActionNew: boolean; /* true se for Inserindo e false se for editando */
  private pageTitle: string;
  private submittingform = false;

  constructor(private fb: FormBuilder, private actroute: ActivatedRoute, private router: Router,
    private catService: CategoriaService, private toastr: ToastrService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.loading = true;
    this.isActionNew = this.actroute.snapshot.url[0].path === 'new';
    this.setPageTitle();

    this.formCategoria = this.fb.group(
      {
        id: [null],
        name: [null, [Validators.required, Validators.minLength(3)]],
        description: [null]
      }
    );
    this.getCategoria();
  }

  private setPageTitle() {
    this.pageTitle = this.isActionNew ? 'Nova Categoria' : 'Edição de Categoria';
  }

  private getCategoria() {
    if (!this.isActionNew) {
     // this.loading = true;
      this.actroute.paramMap.pipe(
        switchMap(params => {
          return this.catService.getById(+params.get('id'));
        })
      ).subscribe(
        (resp) => {
          this.categoria = resp;
          this.setPageTitle();
          this.formCategoria.patchValue(resp); /* bind loaded data to formCategoria */
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
      this.novaCategoria();
    } else {
      this.editaCategoria();
    }
  }

  private novaCategoria() {
    const cat = Object.assign(new Categoria(), this.formCategoria.value);
    this.catService.post(cat).subscribe(
      resp => {
        this.actionsforSucess(resp);
      },
      (erro) => {
        this.actionsforError(erro);
      }
    );
  }


  private editaCategoria() {
    const cat = Object.assign(new Categoria(), this.formCategoria.value);
    this.catService.update(cat).subscribe(
      resp => {
        this.loading = false;
        this.actionsforSucess(resp);
      },
      (erro) => {
        this.loading = false;
        this.actionsforError(erro);
      }
    );
  }

  private actionsforSucess(cat: Categoria) {
    if (this.isActionNew) {
      this.router.navigate(['categorias', 'edit', cat.id]);
    } else {
      this.submittingform = false;
    }
    this.loading = false;
    this.toastr.success('Categoria salva com sucesso!');
  }

  private actionsforError(erro: any) {
    this.errorHandler.handle(erro);
    this.submittingform = false;
    this.loading = false;
  }


}
