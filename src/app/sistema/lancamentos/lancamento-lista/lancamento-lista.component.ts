import { LancamentoService } from './../../services/lancamento.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Lancamento } from '../../models/lancamento.model';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { ErrorHandlerService } from '../../services/error-handler.service';


@Component({
  selector: 'app-lancamento-lista',
  templateUrl: './lancamento-lista.component.html',
  styleUrls: ['./lancamento-lista.component.css']
})
export class LancamentoListaComponent implements OnInit {

  constructor(private lancService: LancamentoService, private confirmaService: ConfirmationService,
    private errorHandler: ErrorHandlerService, private toastr: ToastrService, private chRef: ChangeDetectorRef) {
  }

  private blockedDocument = false;

  private lancamentos: Lancamento[];

  private dataTable: any;

  // Bloco caso queiramos trabalhar com o pype async, com o subscript do Observable(lista de lancamentos) sendo 
  // feito no template.
  // Vejo uma desvantagem p ex, no caso do delete, em que apos a chamada http delete, temos que fazer nova consulta ao getAll,
  // para atualizar a lista na view.

  // private subjectCateg: Subject<Lancamento[]> = new Subject<Lancamento[]>();
  // private lancamentos: Observable<Lancamento[]> = this.subjectCateg.asObservable()
  //   .pipe(
  //     startWith(null),
  //     concatMap(() => {
  //       return this.listarRegistros();
  //     })
  //   );
  // private loadingError = new Subject<boolean>();



  ngOnInit() {
    this.blockedDocument = true;
    this.lancService.getAll()
      .subscribe(val => {
        this.lancamentos = val;

        // You'll have to wait that changeDetection occurs and projects data into 
        // the HTML template, you can ask Angular to that for you ;-)
        this.chRef.detectChanges();

        // jQuery DataTables :
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this.blockedDocument = false;
      },
        (erro) => {
          this.errorHandler.handle(erro);
          this.blockedDocument = false;
        });
  }

  confirmaExclusao(lanc: Lancamento) {
    this.confirmaService.confirm({
      message: `Confirma Exclusão do Lançamento selecionada? <br/>
      <span class="recuoleft">Lançamento: <strong>${lanc.nome}</strong></span>`,
      accept: () => {
        this.excluir(lanc);
      }
    });
  }

  excluir(lanc: Lancamento) {
    this.blockedDocument = true;
    this.lancService.delete(lanc.id).
      subscribe(() => {
        this.lancamentos = this.lancamentos.filter(val => val !== lanc);
        this.blockedDocument = false;
        this.toastr.success('Lançamento excluído com sucesso!');
        //     this.subjectCateg.next();      
      },
        (erro) => {
          this.errorHandler.handle(erro);
          this.blockedDocument = false;
        });
  }
}
