import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaComponent } from './categoria/categoria.component';

import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [CategoriaListaComponent, CategoriaFormComponent, CategoriaComponent],
  imports: [
    SharedModule,
    CategoriasRoutingModule,
    PanelModule
  ]
})
export class CategoriasModule { }
