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
import { BvtimepickerComponent } from './bvtimepicker.component';

@NgModule({
  declarations: [BvtimepickerComponent],
  imports: [CommonModule,
    FormsModule,
    IgxDatePickerModule,
    IgxTimePickerModule,
    IgxIconModule,
    IgxSuffixModule,
    IgxInputGroupModule,
    IgxSnackbarModule],
  providers: [],
  exports: [BvtimepickerComponent]
})
export class BvTimePickerModule { }
