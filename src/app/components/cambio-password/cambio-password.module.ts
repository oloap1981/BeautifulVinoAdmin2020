import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { CambioPasswordComponent } from './cambio-password.component';
import { CambioPasswordRoutingModule } from './cambio-password-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    CambioPasswordRoutingModule
  ],
  declarations: [CambioPasswordComponent]
})
export class CambioPasswordModule { }
