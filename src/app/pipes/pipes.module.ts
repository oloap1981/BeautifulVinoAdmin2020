import { NgModule } from '@angular/core';
import { ClientFilterPipe } from './namefilter/namefilter.pipe';
import { BVDatePipe } from './date/date.pipe';
import { BVDateTimePipe } from './datetime/datetime.pipe';

@NgModule({
  imports: [],
  declarations: [ClientFilterPipe, BVDatePipe, BVDateTimePipe],
  exports: [ClientFilterPipe, BVDatePipe, BVDateTimePipe],
})

export class PipesModule {

  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
