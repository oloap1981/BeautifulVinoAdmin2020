import { NgModule } from '@angular/core';
import { ClientFilterPipe } from './namefilter.pipe';

@NgModule({
  imports: [],
  declarations: [ClientFilterPipe],
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
