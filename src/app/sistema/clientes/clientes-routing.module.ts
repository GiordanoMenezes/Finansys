import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

const routes: Routes = [
  {
    path: '', component: ClienteComponent,
    data: {
      title: 'Clientes'
    },
    children: [
      {
        path: '', redirectTo: 'listagem', pathMatch: 'full'
      },
      {
        path: 'listagem', component: ClienteListaComponent,
        data: {
          title: 'Listagem'
        },
      },
      {
        path: 'new', component: ClienteFormComponent,
        data: {
          title: 'Novo Cliente'
        }
      },
      {
        path: 'edit/:id', component: ClienteFormComponent,
        data: {
          title: 'Edição de Cliente'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
