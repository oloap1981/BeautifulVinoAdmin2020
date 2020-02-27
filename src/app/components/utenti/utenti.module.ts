import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { UtentiComponent } from './utenti.component';
import { UtentiRoutingModule } from './utenti-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    UtentiRoutingModule
  ],
  declarations: [UtentiComponent]
})
export class UtentiModule { }
