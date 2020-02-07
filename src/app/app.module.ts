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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UtentiComponent,
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
