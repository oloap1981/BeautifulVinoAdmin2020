import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditorModule } from 'primeng/editor';
import { FeedComponent } from './feed.component';
import { FileuploadModule } from '../bvfileupload/fileupload/fileupload.module';
import { FeedRoutingModule } from './feed-routing.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    FileuploadModule,
    FeedRoutingModule,
    DataTablesModule
  ],
  declarations: [FeedComponent]
})
export class FeedModule { }
