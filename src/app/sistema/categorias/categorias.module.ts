import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BlockUIModule} from 'primeng/blockui';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [CategoriaListaComponent, CategoriaFormComponent, CategoriaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriasRoutingModule,
    BlockUIModule,
    PanelModule
  ]
})
export class CategoriasModule { }
