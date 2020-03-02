import { Component, HostBinding, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppSessionService } from './services/appSession.service';
import { ConstantsService, AlertService } from 'bvino-lib';
import { LogoutCommunicationService } from './services/logoutCommunication/logoutcommunication.service';
import { Location, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'BeautifulVinoAdmin2020';

  firstColor = '#e51d70'; /* default BV #e51d70 */
  secondColor = '#f9da2c'; /* Default BV #f9da2c */


  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--first-color: ${this.firstColor}; --second-color: ${this.secondColor};`);
  }


  constructor(
    private sanitizer: DomSanitizer,
    private appSessionService: AppSessionService,
    private constants: ConstantsService,
    private logoutComm: LogoutCommunicationService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.firstColor = this.appSessionService.get(this.constants.KEY_AZIENDA_COLORE_PRIMARIO);
    this.secondColor = this.appSessionService.get(this.constants.KEY_AZIENDA_COLORE_SECONDARIO);
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
