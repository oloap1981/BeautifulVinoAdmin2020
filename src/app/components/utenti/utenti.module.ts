import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { UtentiComponent } from './utenti.component';
import { UtentiRoutingModule } from './utenti-routing.module';
import { FileuploadModule } from '../bvfileupload/fileupload/fileupload.module';
import { EditorModule } from 'primeng/editor';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    FileuploadModule,
    UtentiRoutingModule,
    DataTablesModule
  ],
  declarations: [UtentiComponent]
})
export class UtentiModule { }
