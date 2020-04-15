import { NgModule } from '@angular/core';
import { BVAuthorizationService } from './services/auth/BVAuthorizationService';
import { SessionService } from './services/common/session.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AlertService } from './services/common/alert.service';
import { BVHttpService } from './services/common/bvhttp.service';
import { HttpClientModule } from '@angular/common/http';
import { RichiesteService } from './services/common/richieste.service';
import { ConstantsService } from './services/common/constants.service';

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
    AlertService,
    BVHttpService,
    RichiesteService,
    ConstantsService
  ],
  exports: []
})
export class BvinoLibModule {
  static forRoot(environment: any) {
    return {
      ngModule: BvinoLibModule,
      providers: [
        {
          provide: 'env', // you can also use InjectionToken
          useValue: environment
        }
      ],
    };
  }
}
