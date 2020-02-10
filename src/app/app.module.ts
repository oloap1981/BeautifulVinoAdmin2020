import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
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
  RichiesteService
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BvinoLibModule.forRoot(),
    FormsModule,
    PipesModule,
    DataTablesModule
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
    RichiesteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
