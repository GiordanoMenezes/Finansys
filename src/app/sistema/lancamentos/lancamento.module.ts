import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentoListaComponent } from './lancamento-lista/lancamento-lista.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LancamentosRoutingModule } from './lancamentos-routing.module';


import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
// import {IMaskModule} from 'angular-imask';

@NgModule({
  declarations: [LancamentoListaComponent, LancamentoFormComponent, LancamentoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LancamentosRoutingModule,
    BlockUIModule,
    PanelModule,
    CalendarModule,
    CurrencyMaskModule
  ]
})
export class LancamentoModule { }
