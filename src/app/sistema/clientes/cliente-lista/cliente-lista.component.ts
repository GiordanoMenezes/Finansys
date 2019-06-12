import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente.model';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  datasource: Cliente[];

  clientes: Cliente[];

  totalRecords: number;

  loading: boolean;

  constructor(private clienteService: ClientesService, private confirmaService: ConfirmationService,
    private errorHandler: ErrorHandlerService) { }

  // private clientes: Cliente[];

  ngOnInit() {
    this.clienteService.getAll()
      .subscribe(val => {
        this.datasource = val;
     //   this.clientes = this.datasource.slice(0, 10)
        this.totalRecords = this.datasource.length;
      },
        (erro) => this.errorHandler.handle(erro));
    this.loading = true;
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
        if (this.datasource) {
            this.clientes = this.datasource.slice(event.first, (event.first + event.rows));
            this.loading = false;
        }
    }, 2000);
}

}
