import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { ViniComponent } from './vini.component';
import { EditorModule } from 'primeng/editor';

import { FileuploadModule } from '../bvfileupload/fileupload/fileupload.module';
import { ViniRoutingModule } from './vini-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    FileuploadModule,
    ViniRoutingModule,
    DataTablesModule,
    AutocompleteLibModule
  ],
  declarations: [
    ViniComponent
  ]
})
export class ViniModule { }
