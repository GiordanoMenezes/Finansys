import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

export class NotAuthenticatedError { }

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastr: ToastrService) { }

  public handle(error: any) {
    let msg: string, sum: string;
    console.log(error);
    if (typeof error === 'string') {
      sum = error;
      msg = '';
    } else if (error instanceof NotAuthenticatedError) {
      sum = 'Sessão Expirada';
      msg = 'Faça novamente o Login no sistema!';
    } else if (error instanceof HttpErrorResponse && error.status >= 400 && error.status <= 499) {
      sum = 'Operação Não Efetuada';
      msg = error.error ? error.error[0] ? error.error[0].mensagemUsuario : error.error.mensagemUsuario ?
       error.error.mensagemUsuario : 'Erro de comunicação com o servidor!' : 'Erro de comunicação com o servidor!';
      if (error.status === 403) {
        sum = 'Acesso não Permitido';
        msg = 'Usuário não tem permissão para essa ação';
      }
      if (error.status === 401 && error.error.error_description.startsWith('Invalid refresh token')) {
        sum = 'Sessão Expirada';
        msg = 'Faça novamente o Login no sistema!';
      }
    } else {
      sum = 'Operação Não Efetuada';
      msg = 'Erro de comunicação com o Servidor.';
    }
    this.toastr.error(
      msg,
      sum
    );
  }
}
