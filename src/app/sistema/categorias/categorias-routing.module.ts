import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: CategoriaComponent,
    data: {
      title: 'Categorias'
    },
    children: [
      {
        path: '', redirectTo: 'listagem', pathMatch: 'full'
      },
      {
        path: 'listagem', component: CategoriaListaComponent,
        data: {
          title: 'Listagem'
        },
      },
      {
        path: 'new', component: CategoriaFormComponent,
        data: {
          title: 'Nova Categoria'
        }
      },
      {
        path: 'edit/:id', component: CategoriaFormComponent,
        data: {
          title: 'Edição de Categoria'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
