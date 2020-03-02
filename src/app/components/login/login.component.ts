import { Component, OnInit } from '@angular/core';
import {
  BVAuthorizationService,
  AlertService,
  BVCommonService,
  RichiesteService,
  Utente
} from 'bvino-lib';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { AppSessionService } from 'src/app/services/appSession.service';
import { Router } from '@angular/router';
import { ThemeChangerService } from 'src/app/services/themeChanger/themechanger.service';
import { environment } from 'src/environments/environmentnokeys';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  firstColor = '#f9da2c';
  secondColor = '#e51d70';

  public username: string;
  public password: string;

  constructor(
    private authService: BVAuthorizationService,
    private appSessionService: AppSessionService,
    private alertService: AlertService,
    private commonService: BVCommonService,
    private richiesteService: RichiesteService,
    private router: Router,
    private themeChanger: ThemeChangerService) { }

  ngOnInit() {
  }

  public login() {
    this.authService.signin(this.username, this.password).subscribe(

      (response: CognitoUserSession) => {
        const accessToken = response.getAccessToken();
        const idToken = response.getIdToken();
        const idUtenteDb = idToken.payload['cognito:username'];

        // per l'interceptor per le richieste da adesso in avanti
        this.appSessionService.set(environment.KEY_AUTH_TOKEN, idToken.getJwtToken());
        this.appSessionService.set(environment.KEY_USER, JSON.stringify(response));

        if (idUtenteDb === undefined || idUtenteDb === '') {
          this.alertService.presentErrorAlert('Utente loggato ma manca il corrispondente sul DB. Non posso procedere');
          this.router.navigate(['/login']);
        } else {
          this.commonService.get(this.richiesteService.getRichiestaGetUtente(idUtenteDb)).subscribe(r => {
            if (r.esito.codice === environment.ESITO_OK_CODICE) {
              const utente = r.utente as Utente;
              if (utente.idProfiloAziendaUtente !== undefined && utente.idProfiloAziendaUtente !== '') {
                this.commonService.get(this.richiesteService.getRichiestaGetProfiloAzienda(utente.idProfiloAziendaUtente)).subscribe(s => {
                  if (s.esito.codice === environment.ESITO_OK_CODICE) {
                    const profiloAzienda = s.profiloAzienda;

                    this.themeChanger.loadStyle(profiloAzienda.idAzienda + '.css');

                    this.appSessionService.set(environment.KEY_AZIENDA_ID, profiloAzienda.idAzienda);
                    this.appSessionService.set(environment.KEY_AZIENDA_NOME, profiloAzienda.nomeAzienda);
                    this.appSessionService.set(environment.KEY_AZIENDA_LOGO, profiloAzienda.logo);
                    this.appSessionService.set(environment.KEY_AZIENDA_SPLASHSCREEN, profiloAzienda.splaqshScreen);
                    this.appSessionService.set(environment.KEY_AZIENDA_PAYPAL_CODE, profiloAzienda.paypalCode);

                    this.router.navigate(['/utenti']);

                  } else {
                    this.alertService.presentErrorAlert(s.esito.message);
                  }
                }, err2 => {
                  this.alertService.presentErrorAlert(err2.statusText);
                });
              } else {
                // profilo generico
              }

              // ora devo recuperare il profiloAzienda

            } else {
              this.alertService.presentErrorAlert(r.esito.message);
            }
          }, err => {
            this.alertService.presentErrorAlert(err.statusText);
          });
        }
      },
      (err) => {
        console.log('ERRORE DI AUTENTICAZIONE: ' + err);
      });
  }
}
