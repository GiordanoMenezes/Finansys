import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Lancamento } from '../models/lancamento.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { REST_API } from '../../restAPI';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private http: HttpClient) { }

  // private jsontoCategories(json: any[]): Lancamento[] {
  //    const ctgs: Lancamento[] = [];
  //    json.forEach( element => ctgs.push(element as Lancamento));
  //    return ctgs;
  // }


  getAll(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(`${REST_API}/lancamentos`)
    .pipe(
      map( resp => resp.map(elem => Object.assign(new Lancamento(), elem)))
    );
  }

  getById(id: number): Observable<Lancamento> {
    return this.http.get(`${REST_API}/lancamentos/${id}`)
      .pipe(
        map(resp => Object.assign(new Lancamento(), resp))
      );
  }

  post(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post(`${REST_API}/lancamentos`, lancamento)
      .pipe(
        map(resp => Object.assign(new Lancamento(), resp))
      );
  }

  update(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.put(`${REST_API}/lancamentos/${lancamento.id}`, lancamento)
      .pipe(
        map(() => lancamento)
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${REST_API}/lancamentos/${id}`);
  }

}