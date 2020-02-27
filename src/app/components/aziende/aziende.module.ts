import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditorModule } from 'primeng/editor';

import { FileuploadModule } from '../bvfileupload/fileupload/fileupload.module';
import { AziendeComponent } from './aziende.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    FileuploadModule
  ],
  declarations: [
    AziendeComponent
  ]
})
export class AziendeModule { }
