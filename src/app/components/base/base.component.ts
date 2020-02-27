import { Subject } from 'rxjs';
import { SessionService, Utente, RichiesteService, ConstantsService, RispostaGetGenerica, AlertService } from 'bvino-lib';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppSessionService } from 'src/app/services/appSession.service';

@Component({
  selector: 'app-base',
  templateUrl: 'base.component.html',
  styleUrls: ['base.component.scss'],
})
export class BaseComponent implements OnInit {

  // private wsTokenSubject: Subject<boolean> = new Subject<boolean>();
  // public wsTokenObservable = this.wsTokenSubject.asObservable();

  public utenti: Array<Utente>;

  constructor(
    public sessionService: SessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public constants: ConstantsService,
    public alertService: AlertService,
    public appSessionService: AppSessionService) {
    this.utenti = new Array<Utente>();
  }

  ngOnInit(): void {

  }

  public checkAuthenticated(): void {
    const tokenValue = this.appSessionService.get(this.sessionService.KEY_AUTH_TOKEN);
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
