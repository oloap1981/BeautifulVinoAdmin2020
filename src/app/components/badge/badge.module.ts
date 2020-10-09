import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditorModule } from 'primeng/editor';

import { FileuploadModule } from '../bvfileupload/fileupload/fileupload.module';
import { BadgeComponent } from './badge.component';
import { DataTablesModule } from 'angular-datatables';
import { BadgeRoutingModule } from './badge-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    FileuploadModule,
    BadgeRoutingModule,
    DataTablesModule
  ],
  declarations: [
    BadgeComponent
  ]
})
export class BadgeModule { }
