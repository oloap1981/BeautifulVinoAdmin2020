import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditorModule } from 'primeng/editor';
import { NotificheComponent } from './notifiche.component';
import { NotificheRoutingModule } from './notifiche-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    EditorModule,
    NotificheRoutingModule
  ],
  declarations: [NotificheComponent]
})
export class NotificheModule { }
