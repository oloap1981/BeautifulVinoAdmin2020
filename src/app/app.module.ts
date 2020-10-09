import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BvinoLibModule,
  SessionService,
  BVAuthorizationService,
  AlertService,
  BVHttpService,
  RichiesteService,
  BVCommonService,
  ConstantsService
} from 'bvino-lib';

import { FormsModule } from '@angular/forms';
import { AppSessionService } from './services/appSession.service';
import { CookieService } from 'ngx-cookie-service';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { PipesModule } from './pipes/pipes.module';
import { DataTablesModule } from 'angular-datatables';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IgxDatePickerModule, IgxIconModule, IgxSuffixModule, IgxInputGroupModule, IgxSnackbarModule } from 'igniteui-angular';
import { BVHttpInterceptor } from './interceptors/http.inteceptor';

import { UtentiModule } from './components/utenti/utenti.module';
import { LoginModule } from './components/login/login.module';
import { NotificheModule } from './components/notifiche/notifiche.module';
import { EventiModule } from './components/eventi/eventi.module';
import { FeedModule } from './components/feed/feed.module';
import { ViniModule } from './components/vini/vini.module';
import { BaseComponent } from './components/base/base.component';
import { LogoutCommunicationService } from './services/logoutCommunication/logoutcommunication.service';
import { ThemeChangerService } from './services/themeChanger/themechanger.service';


import { environment } from 'src/environments/environmentnokeys';
import { PageManagerService } from './services/pagemanager/pagemanager.service';
import { AziendeModule } from './components/aziende/aziende.module';
import { AziendaGestioneModule } from './components/azienda-gestione/azienda-gestione.module';
import { BvtimepickerComponent } from './components/bvtimepicker/bvtimepicker.component';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BadgeModule } from './components/badge/badge.module';
import { CambioPasswordComponent } from './components/cambio-password/cambio-password.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    JwPaginationComponent,
    CambioPasswordComponent
  ],
  imports: [
    LoginModule,
    UtentiModule,
    NotificheModule,
    EventiModule,
    FeedModule,
    ViniModule,
    BadgeModule,
    AziendeModule,
    AziendaGestioneModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BvinoLibModule.forRoot(environment),
    FormsModule,
    PipesModule,
    DataTablesModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    IgxDatePickerModule, IgxIconModule, IgxSuffixModule, IgxInputGroupModule, IgxSnackbarModule
  ],
  providers: [
    ConstantsService,
    SessionService,
    BVAuthorizationService,
    CookieService,
    AppSessionService,
    AlertService,
    BVHttpService,
    RichiesteService,
    BVCommonService,
    LogoutCommunicationService,
    PageManagerService,
    ThemeChangerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BVHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
