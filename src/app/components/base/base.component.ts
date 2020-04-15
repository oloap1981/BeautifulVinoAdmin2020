import { TimeoutError } from 'rxjs';
import { SessionService, Utente, RichiesteService, RispostaGetGenerica, AlertService } from 'bvino-lib';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppSessionService } from 'src/app/services/appSession.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environmentnokeys';
import { PageManagerService } from 'src/app/services/pagemanager/pagemanager.service';

@Component({
  selector: 'app-base',
  templateUrl: 'base.component.html',
  styleUrls: ['base.component.scss'],
})
export class BaseComponent implements OnInit {

  public utenti: Array<Utente>;

  public pagename: string;

  public utenteAutenticato: Utente;

  constructor(
    public sessionService: SessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public alertService: AlertService,
    public appSessionService: AppSessionService,
    public pageManagerService: PageManagerService) {

    this.utenti = new Array<Utente>();
    this.utenteAutenticato = new Utente();
  }

  ngOnInit(): void {

  }

  public checkAuthenticated(): void {
    const tokenValue = this.appSessionService.get(environment.KEY_AUTH_TOKEN);
    const authenticated = (tokenValue && tokenValue !== '');
    if (!authenticated) {
      this.goToPage('login');
    }
  }

  public goToPage(pageName: string): void {
    this.router.navigate([pageName]);
  }

  public goToPageParams(pageName: string, params: any): void {
    this.router.navigate([pageName], params);
  }

  public presentAlert(message: string): void {
    this.alertService.presentAlert(message);
  }

  public presentErrorAlert(message: string): void {
    this.alertService.presentErrorAlert(message);
  }
  public manageError(response: RispostaGetGenerica) {
    this.alertService.presentErrorAlert(response.esito.message);
  }

  public manageErrorPut(tipo: string) {
    this.alertService.presentErrorAlert('Problemi durante il salvataggio dell entità di tipo ' + tipo);
  }

  public manageHttpError(error: any) {
    if (error instanceof TimeoutError) {
      this.alertService.presentErrorAlert('Timeout scaduto');
    } else {
      this.alertService.presentErrorAlert('Si è verificato un errore nella richiesta: ' + error.statusText);
    }
  }

}
