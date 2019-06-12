import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Categoria } from '../models/categoria.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { REST_API } from '../../restAPI';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  // private jsontoCategories(json: any[]): Categoria[] {
  //    const ctgs: Categoria[] = [];
  //    json.forEach( element => ctgs.push(element as Categoria));
  //    return ctgs;
  // }


  getAll(): Observable<Categoria[]> {
    return this.http.get<any[]>(`${REST_API}/categorias`)
      .pipe(
        map(resp => resp.map(element => element as Categoria))
      );
  }

  getById(id: number): Observable<Categoria> {
    return this.http.get(`${REST_API}/categorias/${id}`)
      .pipe(
        map(resp => resp as Categoria)
      );
  }

  post(categoria: Categoria): Observable<Categoria> {
    return this.http.post(`${REST_API}/categorias`, categoria)
      .pipe(
        map(resp => resp as Categoria)
      );
  }

  update(categoria: Categoria): Observable<Categoria> {
    return this.http.put(`${REST_API}/categorias/${categoria.id}`, categoria)
      .pipe(
        map(() => categoria)
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${REST_API}/categorias/${id}`);
  }

}
