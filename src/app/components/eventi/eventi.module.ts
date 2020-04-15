import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditorModule } from 'primeng/editor';
import { EventiComponent } from './eventi.component';
import { BvDatePickerModule } from '../bvdatepicker/bvdatepicker.module';
import { FileuploadModule } from '../bvfileupload/fileupload/fileupload.module';
import { EventiRoutingModule } from './eventi-routing.module';
import { BvTimePickerModule } from '../bvtimepicker/bvtimepicker.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    BvDatePickerModule,
    BvTimePickerModule,
    FileuploadModule,
    EventiRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  declarations: [
    EventiComponent
  ]
})
export class EventiModule { }
