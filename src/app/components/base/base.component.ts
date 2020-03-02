import { Subject, TimeoutError } from 'rxjs';
import { SessionService, Utente, RichiesteService, ConstantsService, RispostaGetGenerica, AlertService } from 'bvino-lib';
import { Router } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { AppSessionService } from 'src/app/services/appSession.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-base',
  templateUrl: 'base.component.html',
  styleUrls: ['base.component.scss'],
})
export class BaseComponent implements OnInit {

  // private wsTokenSubject: Subject<boolean> = new Subject<boolean>();
  // public wsTokenObservable = this.wsTokenSubject.asObservable();

  public utenti: Array<Utente>;

  public firstColor = '#e51d70'; /* default BV #e51d70 */
  public secondColor = '#f9da2c'; /* Default BV #f9da2c */

  constructor(
    public sessionService: SessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public constants: ConstantsService,
    public alertService: AlertService,
    public appSessionService: AppSessionService,
    public sanitizer: DomSanitizer) {

    this.utenti = new Array<Utente>();

    this.firstColor = this.appSessionService.get(this.constants.KEY_AZIENDA_COLORE_PRIMARIO);
    this.secondColor = this.appSessionService.get(this.constants.KEY_AZIENDA_COLORE_SECONDARIO);
  }

  ngOnInit(): void {

  }

  // @HostBinding('attr.style')
  // public get valueAsStyle(): any {
  //   return this.sanitizer.bypassSecurityTrustStyle(`--first-color: ${this.firstColor}; --second-color: ${this.secondColor};`);
  // }

  public checkAuthenticated(): void {
    const tokenValue = this.appSessionService.get(this.constants.KEY_AUTH_TOKEN);
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

  // public logError(code: number, text: string): void {
  //     const errorMessage = new ErrorMessage();
  //     errorMessage.msg_testo = text;
  //     errorMessage.msg_code = code;
  //     errorMessage.msg_method = "";
  //     errorMessage.msg_techdata = "";
  //     errorMessage.msg_tipo = "";
  //     const message = this.logErroriService.generateErrorMessage(errorMessage);
  //     this.logErroriService.postErrore(message);
  // }

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

  // public manageHttpError(error: any) {
  //     console.log("Si è verificato un errore di comunicazione:");
  //     console.log(error);
  //     if (error instanceof TimeoutError) {
  //         this.alertService.presentErrorAlert("Timeout scaduto");
  //     } else {
  //         this.alertService.presentErrorAlert(error.message);
  //     }
  // }
}
