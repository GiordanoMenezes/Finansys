import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { ErrorHandlerService } from '../../services/error-handler.service';


@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css']
})
export class CategoriaListaComponent implements OnInit {

  constructor(private categService: CategoriaService, private confirmaService: ConfirmationService,
    private errorHandler: ErrorHandlerService, private toastr: ToastrService, private chRef: ChangeDetectorRef) {
  }

  private blockedDocument = false;

  private categorias: Categoria[];

  private dataTable: any;

  // Bloco caso queiramos trabalhar com o pype async, com o subscript do Observable(lista de categorias) sendo 
  // feito no template.
  // Vejo uma desvantagem p ex, no caso do delete, em que apos a chamada http delete, temos que fazer nova consulta ao getAll,
  // para atualizar a lista na view.

  // private subjectCateg: Subject<Categoria[]> = new Subject<Categoria[]>();
  // private categorias: Observable<Categoria[]> = this.subjectCateg.asObservable()
  //   .pipe(
  //     startWith(null),
  //     concatMap(() => {
  //       return this.listarRegistros();
  //     })
  //   );
  // private loadingError = new Subject<boolean>();



  ngOnInit() {
    this.blockedDocument = true;
    this.categService.getAll()
      .subscribe(val => {
        this.categorias = val;

        // You'll have to wait that changeDetection occurs and projects data into 
        // the HTML template, you can ask Angular to that for you ;-)
        this.chRef.detectChanges();

        // jQuery DataTables :
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this.blockedDocument = false;
      },
        (erro) => this.errorHandler.handle(erro));
  }

  confirmaExclusao(categ: Categoria) {
    this.confirmaService.confirm({
      message: `Confirma Exclusão da Categoria selecionada? <br/>
      <span class="recuoleft">Categoria: <strong>${categ.name}</strong></span>`,
      accept: () => {
        this.excluir(categ);
      }
    });
  }

  excluir(categ: Categoria) {
    this.blockedDocument = true;
    this.categService.delete(categ.id).
      subscribe(() => {
        this.categorias = this.categorias.filter(val => val !== categ);
        this.blockedDocument = false;
        this.toastr.success('Categoria excluída com sucesso!');
        //     this.subjectCateg.next();      
      },
        (erro) => {
          this.errorHandler.handle(erro);
          this.blockedDocument = false;
        });
  }
}
