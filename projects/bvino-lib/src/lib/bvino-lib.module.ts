import { NgModule } from '@angular/core';
import { BVAuthorizationService } from './services/auth/BVAuthorizationService';
import { SessionService } from './services/common/session.service';
import { UtentiService } from './services/utenti/utenti.service';
import { ConstantsService } from './services/common/constants.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AlertService } from './services/common/alert.service';
import { BVHttpService } from './services/common/bvhttp.service';
import { HttpClientModule } from '@angular/common/http';
import { RichiesteService } from './services/common/richieste.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    BVAuthorizationService,
    SessionService,
    UtentiService,
    ConstantsService,
    AlertService,
    BVHttpService,
    RichiesteService
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
