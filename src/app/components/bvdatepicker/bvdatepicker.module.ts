import { NgModule } from '@angular/core';
import {
  IgxDatePickerModule,
  IgxIconModule,
  IgxSuffixModule,
  IgxInputGroupModule,
  IgxSnackbarModule,
  IgxTimePickerModule
} from 'igniteui-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BvdatepickerComponent } from './bvdatepicker.component';

@NgModule({
  declarations: [BvdatepickerComponent],
  imports: [CommonModule,
    FormsModule,
    IgxDatePickerModule,
    IgxTimePickerModule,
    IgxIconModule,
    IgxSuffixModule,
    IgxInputGroupModule,
    IgxSnackbarModule],
  providers: [],
  exports: [BvdatepickerComponent]
})
export class BvDatePickerModule { }
