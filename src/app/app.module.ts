import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { EditorModule } from 'primeng/editor';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {
  BvinoLibModule,
  SessionService,
  BVAuthorizationService,
  ConstantsService,
  UtentiService,
  AlertService,
  BVHttpService,
  RichiesteService,
  AziendeService,
  ViniService,
  FeedsService,
  EventiService,
  BadgesService,
  ViniAziendaService
} from 'bvino-lib';

import { FormsModule } from '@angular/forms';
import { AppSessionService } from './services/appSession.service';
import { CookieService } from 'ngx-cookie-service';
import { UtentiComponent } from './components/utenti/utenti.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { PipesModule } from './pipes/pipes.module';
import { DataTablesModule } from 'angular-datatables';
import { AziendeComponent } from './components/aziende/aziende.component';
import { ViniComponent } from './components/vini/vini.component';
import { EventiComponent } from './components/eventi/eventi.component';
import { FeedComponent } from './components/feed/feed.component';
import { BadgeComponent } from './components/badge/badge.component';
import { NotificheComponent } from './components/notifiche/notifiche.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BvdatepickerComponent } from './components/bvdatepicker/bvdatepicker.component';
import { IgxDatePickerModule, IgxIconModule, IgxSuffixModule, IgxInputGroupModule, IgxSnackbarModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UtentiComponent,
    JwPaginationComponent,
    AziendeComponent,
    ViniComponent,
    EventiComponent,
    FeedComponent,
    BadgeComponent,
    NotificheComponent,
    ProfiloComponent,
    FileuploadComponent,
    BvdatepickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BvinoLibModule.forRoot(),
    FormsModule,
    PipesModule,
    DataTablesModule,
    BrowserAnimationsModule,
    EditorModule,
    IgxDatePickerModule, IgxIconModule, IgxSuffixModule, IgxInputGroupModule, IgxSnackbarModule
  ],
  providers: [
    SessionService,
    ConstantsService,
    UtentiService,
    BVAuthorizationService,
    CookieService,
    AppSessionService,
    AlertService,
    BVHttpService,
    RichiesteService,
    AziendeService,
    ViniService,
    ViniAziendaService,
    EventiService,
    FeedsService,
    BadgesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
