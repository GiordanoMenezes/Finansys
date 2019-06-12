import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  private APICliente = 'https://5a5a9e00bc6e340012a03796.mockapi.io';


  getAll(): Observable<Cliente[]> {
    return this.http.get<any[]>(`${this.APICliente}/clients`)
      .pipe(
        map(resp => resp.map(element => element as Cliente))
      );
  }
}
