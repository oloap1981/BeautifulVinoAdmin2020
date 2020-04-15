import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditorModule } from 'primeng/editor';

import { FileuploadModule } from '../bvfileupload/fileupload/fileupload.module';
import { AziendaGestioneComponent } from './azienda-gestione.component';
import { BvDatePickerModule } from '../bvdatepicker/bvdatepicker.module';
import { AziendeRoutingModule } from './azienda-gestione-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    BvDatePickerModule,
    FileuploadModule,
    AziendeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AziendaGestioneComponent
  ]
})
export class AziendaGestioneModule { }
