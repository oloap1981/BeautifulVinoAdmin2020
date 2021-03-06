import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditorModule } from 'primeng/editor';

import { FileuploadModule } from '../bvfileupload/fileupload/fileupload.module';
import { AziendeComponent } from './aziende.component';
import { BvDatePickerModule } from '../bvdatepicker/bvdatepicker.module';
import { AziendeRoutingModule } from './aziende-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    BvDatePickerModule,
    FileuploadModule,
    AziendeRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  declarations: [
    AziendeComponent
  ]
})
export class AziendeModule { }
