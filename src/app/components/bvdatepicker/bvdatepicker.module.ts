import { NgModule } from '@angular/core';
import { IgxDatePickerModule, IgxIconModule, IgxSuffixModule, IgxInputGroupModule, IgxSnackbarModule } from 'igniteui-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BvdatepickerComponent } from './bvdatepicker.component';

@NgModule({
  declarations: [BvdatepickerComponent],
  imports: [CommonModule, FormsModule, IgxDatePickerModule, IgxIconModule, IgxSuffixModule, IgxInputGroupModule, IgxSnackbarModule],
  providers: [],
  exports: [BvdatepickerComponent]
})
export class BvDatePickerModule { }
