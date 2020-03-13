import { NgModule } from '@angular/core';
import { ClientFilterPipe } from './namefilter.pipe';
import { BVDatePipe } from './date.pipe';

@NgModule({
  imports: [],
  declarations: [ClientFilterPipe, BVDatePipe],
  exports: [ClientFilterPipe],
})

export class PipesModule {

  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
