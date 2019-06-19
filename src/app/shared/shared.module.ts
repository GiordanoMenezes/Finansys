import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BlockUIModule } from 'primeng/blockui';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BlockUIModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BlockUIModule
  ]
})
export class SharedModule { }
