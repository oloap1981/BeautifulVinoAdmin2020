import { Component, OnInit } from '@angular/core';
import {
  BVAuthorizationService,
  AlertService,
  BVCommonService,
  RichiesteService,
  Utente,
  ConstantsService,
  ProfiloAzienda
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
    private themeChanger: ThemeChangerService,
    private constantsService: ConstantsService) { }

  ngOnInit() {
    this.appSessionService.set(this.appSessionService.NAVIGATION_PAGE_KEY, environment.NAVIGATION_PAGENAME_LOGIN);
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
          this.authService.signOut(this.username);
          return;
        } else {
          this.commonService.get(this.richiesteService.getRichiestaGetUtente(idUtenteDb)).subscribe(r => {
            if (r.esito.codice === environment.ESITO_OK_CODICE) {
              const utente = r.utente as Utente;
              this.appSessionService.set(environment.KEY_DB_USER, JSON.stringify(utente));
              /*
                qui si controlla che l'utente possa accedere all'applicativo Admin.
                --- Se l'utente è di tipo UG (utente generico) oppure UA (utente azienda) non lo faccio entrare ---
              */
              if (utente.ruoloUtente === undefined ||
                (utente.ruoloUtente === '' || utente.ruoloUtente === 'UG' || utente.ruoloUtente === 'UA')) {
                // l'utente loggato non ha ruolo per entrare nell'admin
                this.alertService.presentErrorAlert(utente.nomeUtente + ' non ha i diritti per entrare nella console di amministrazione');
                this.authService.signOut(this.username);
                return;
              } else {
                if ((utente.idProfiloAziendaUtente === undefined || utente.idProfiloAziendaUtente === '')
                  && utente.ruoloUtente === this.constantsService.RUOLO_AZIENDA_ADMIN) {
                  this.alertService.presentErrorAlert(this.username
                    + ' ha ruolo amministrativo aziendale ma non ha associato un profilo azienda');
                  this.authService.signOut(this.username);
                } else {
                  if (utente.idProfiloAziendaUtente !== undefined && utente.idProfiloAziendaUtente !== '') {
                    this.commonService.get(this.richiesteService.getRichiestaGetProfiloAzienda(utente.idProfiloAziendaUtente))
                      .subscribe(s => {
                        if (s.esito.codice === environment.ESITO_OK_CODICE) {
                          /*
                            qui si va a controllare l'utente con le seguenti possibilità
                            1. l'utente è un SA (super admin)
                              -> non c'è bisogno di caricare il profilo azienda, si carica il tema di default di bvino
                                e metto key azienda generiche in sessione
                            2. l'utente è un AA (admin azienda)
                              -> carico allora il profilo azienda e metto tutto quanto in sessione per le chiamate al server
                          */

                          if (utente.ruoloUtente === this.constantsService.RUOLO_SUPER_ADMIN) {
                            this.initAziendaDefault();
                          } else {
                            if (s.profiloAzienda) {
                              this.initAzienda(s.profiloAzienda);
                            } else {
                              // l'utente ha ruolo admin azienda ma non è stato trovato il profilo azienda sul DB. -> logout
                            }
                          }

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
                }
              }
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

  private initAziendaDefault(): void {

    this.appSessionService.set(environment.KEY_AZIENDA_ID, this.constantsService.KEY_AZIENDA_ID_DEFAULT);
    this.appSessionService.set(environment.KEY_AZIENDA_NOME, this.constantsService.KEY_AZIENDA_NOME_DEFAULT);
    this.appSessionService.set(environment.KEY_AZIENDA_LOGO, this.constantsService.KEY_AZIENDA_LOGO_DEFAULT);
    this.appSessionService.set(environment.KEY_AZIENDA_SPLASHSCREEN, this.constantsService.KEY_AZIENDA_SPLASHSCREEN_DEFAULT);
    this.appSessionService.set(environment.KEY_AZIENDA_PAYPAL_CODE, this.constantsService.KEY_AZIENDA_PAYPALCODE_DEFAULT);
  }

  private initAzienda(profiloAzienda: ProfiloAzienda): void {

    // questo serve per cambiare il tema legato al profilo aziendale
    // this.themeChanger.loadStyle(profiloAzienda.idAzienda + '.css');

    this.appSessionService.set(environment.KEY_AZIENDA_ID, profiloAzienda.idAzienda);
    this.appSessionService.set(environment.KEY_AZIENDA_NOME, profiloAzienda.nomeAzienda);
    this.appSessionService.set(environment.KEY_AZIENDA_LOGO, profiloAzienda.logo);
    this.appSessionService.set(environment.KEY_AZIENDA_SPLASHSCREEN, profiloAzienda.splaqshScreen);
    this.appSessionService.set(environment.KEY_AZIENDA_PAYPAL_CODE, profiloAzienda.paypalCode);
  }
}
