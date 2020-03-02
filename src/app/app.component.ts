import { Component, HostBinding, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppSessionService } from './services/appSession.service';
import { LogoutCommunicationService } from './services/logoutCommunication/logoutcommunication.service';
import { Location, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'BeautifulVinoAdmin2020';

  constructor(
    private sanitizer: DomSanitizer,
    private appSessionService: AppSessionService,
    private logoutComm: LogoutCommunicationService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.initializeApp();
  }

  initializeApp() {
  }

  public logout() {
    this.presentAlertLogout();
  }

  public async presentAlertLogout() {

    if (confirm('Sicuro di voler uscire?')) {
      this.appSessionService.clearAll();
      this.logoutComm.comunicateLogout();
    }
  }

  public isLoginPage(): boolean {
    return this.location.path() === '/login';
  }

}
