import { Component, HostBinding, Inject, AfterViewChecked } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppSessionService } from './services/appSession.service';
import { LogoutCommunicationService } from './services/logoutCommunication/logoutcommunication.service';
import { Location, DOCUMENT } from '@angular/common';
import { PageManagerService } from './services/pagemanager/pagemanager.service';
import { environment } from 'src/environments/environmentkeys';
import { Utente } from 'bvino-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {

  title = 'BeautifulVinoAdmin2020';

  private showUtentiVar = false;
  private showAziendeVar = false;
  private showAziendaGestioneVar = false;
  private showViniVar = false;
  private showEventiVar = false;
  private showFeedVar = false;
  private showBadgeVar = false;
  private showNotificheVar = false;

  private isLoginPageVar = false;

  public user: Utente;

  constructor(
    private sanitizer: DomSanitizer,
    public router: Router,
    public appSessionService: AppSessionService,
    private logoutComm: LogoutCommunicationService,
    private location: Location,
    public pageManagerService: PageManagerService,
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
    return this.isLoginPageVar;
  }

  public getEnvironmentValue(key: string): string {
    return environment[key];
  }

  public getUtenteImageUrl(): string {
    const utente = this.getUtente();
    if (utente.urlFotoUtente === '') {
      return '../assets/images/anonimo.png';
    } else {
      return utente.urlFotoUtente;
    }
  }

  public getUtente(): Utente {
    const utenteString = this.appSessionService.get(environment.KEY_DB_USER);
    if (utenteString === undefined || utenteString === '') {
      return new Utente();
    }
    const utente = JSON.parse(utenteString) as Utente;
    return utente;
  }

  public getRuoloUtente() {

    const utente = this.getUtente();
    const ruoloUtente = utente.ruoloUtente;
    if (ruoloUtente === undefined || ruoloUtente === '') {
      return '';
    }
    return ruoloUtente;
  }

  ngAfterViewChecked() {
    this.showUtentiVar = this.pageManagerService.isPageAuthorized(
      this.getEnvironmentValue('NAVIGATION_PAGENAME_UTENTI'), this.getRuoloUtente());
    this.showAziendeVar = this.pageManagerService.isPageAuthorized(
      this.getEnvironmentValue('NAVIGATION_PAGENAME_AZIENDE'), this.getRuoloUtente());
    this.showAziendaGestioneVar = this.pageManagerService.isPageAuthorized(
      this.getEnvironmentValue('NAVIGATION_PAGENAME_GESTIONE_AZIENDA'), this.getRuoloUtente());
    this.showViniVar = this.pageManagerService.isPageAuthorized(
      this.getEnvironmentValue('NAVIGATION_PAGENAME_VINI'), this.getRuoloUtente());
    this.showFeedVar = this.pageManagerService.isPageAuthorized(
      this.getEnvironmentValue('NAVIGATION_PAGENAME_FEED'), this.getRuoloUtente());
    this.showBadgeVar = this.pageManagerService.isPageAuthorized(
      this.getEnvironmentValue('NAVIGATION_PAGENAME_BADGE'), this.getRuoloUtente());
    this.showEventiVar = this.pageManagerService.isPageAuthorized(
      this.getEnvironmentValue('NAVIGATION_PAGENAME_EVENTI'), this.getRuoloUtente());
    this.showNotificheVar = this.pageManagerService.isPageAuthorized(
      this.getEnvironmentValue('NAVIGATION_PAGENAME_NOTIFICHE'), this.getRuoloUtente());
    this.isLoginPageVar = (this.location.path() === '/login'
      || this.appSessionService.get(this.appSessionService.NAVIGATION_PAGE_KEY) === 'login');
  }

  public showUtenti() {
    return this.showUtentiVar;
  }

  public showAziende() {
    return this.showAziendeVar;
  }

  public showVini() {
    return this.showViniVar;
  }

  public showEventi() {
    return this.showEventiVar;
  }

  public showFeed() {
    return this.showFeedVar;
  }

  public showBadge() {
    return this.showBadgeVar;
  }

  public showNotifiche() {
    return this.showNotificheVar;
  }

  public showAziendaGestione() {
    return this.showAziendaGestioneVar;
  }


  public goToPage(pageName: string): void {
    this.router.navigate([pageName]);
  }

}
