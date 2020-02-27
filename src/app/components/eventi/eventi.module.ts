import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditorModule } from 'primeng/editor';
import { EventiComponent } from './eventi.component';
import { BvDatePickerModule } from '../bvdatepicker/bvdatepicker.module';
import { FileuploadModule } from '../bvfileupload/fileupload/fileupload.module';
import { EventiRoutingModule } from './eventi-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    BvDatePickerModule,
    FileuploadModule,
    EventiRoutingModule
  ],
  declarations: [
    EventiComponent
  ]
})
export class EventiModule { }
