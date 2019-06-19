import { NgModule } from '@angular/core';
import { LancamentoListaComponent } from './lancamento-lista/lancamento-lista.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { LancamentosRoutingModule } from './lancamentos-routing.module';


import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from 'primeng/components/common/shared';
// import {IMaskModule} from 'angular-imask';

@NgModule({
  declarations: [LancamentoListaComponent, LancamentoFormComponent, LancamentoComponent],
  imports: [
    SharedModule,
    LancamentosRoutingModule,
    PanelModule,
    CalendarModule,
    CurrencyMaskModule
  ]
})
export class LancamentoModule { }
