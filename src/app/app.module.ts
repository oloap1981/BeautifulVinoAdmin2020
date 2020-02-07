import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BvinoLibModule, SessionService, BVAuthorizationService, ConstantsService, UtentiService } from 'bvino-lib';

import { FormsModule } from '@angular/forms';
import { AppSessionService } from './services/appSession.service';
import { CookieService } from 'ngx-cookie-service';
import { UtentiComponent } from './components/utenti/utenti.component';
import { AziendeComponent } from './components/aziende/aziende.component';
import { ViniComponent } from './components/vini/vini.component';
import { EventiComponent } from './components/eventi/eventi.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UtentiComponent,
    AziendeComponent,
    ViniComponent,
    EventiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BvinoLibModule.forRoot(),
    FormsModule
  ],
  providers: [
    SessionService,
    ConstantsService,
    UtentiService,
    BVAuthorizationService,
    CookieService,
    AppSessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
