import { NgModule } from '@angular/core';
import { BVAuthorizationService } from './services/auth/BVAuthorizationService';
import { SessionService } from './services/common/session.service';
import { UtentiService } from './services/utenti/utenti.service';
import { ConstantsService } from './services/common/constants.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    BVAuthorizationService,
    SessionService,
    UtentiService,
    ConstantsService
  ],
  exports: []
})
export class BvinoLibModule {
  static forRoot() {
    return {
      ngModule: BvinoLibModule,
      providers: [],
    };
  }
}
