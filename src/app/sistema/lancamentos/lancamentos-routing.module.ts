import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { LancamentoListaComponent } from './lancamento-lista/lancamento-lista.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';

const routes: Routes = [
  {
    path: '', component: LancamentoComponent,
    data: {
      title: 'Lançamentos'
    },
    children: [
      {
        path: '', redirectTo: 'listagem', pathMatch: 'full'
      },
      {
        path: 'listagem', component: LancamentoListaComponent,
        data: {
          title: 'Listagem'
        },
      },
      {
        path: 'new', component: LancamentoFormComponent,
        data: {
          title: 'Novo Lançamento'
        }
      },
      {
        path: 'edit/:id', component: LancamentoFormComponent,
        data: {
          title: 'Edição de Lançamento'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
