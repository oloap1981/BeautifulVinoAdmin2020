import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService, RichiesteService, AlertService, Azienda, BVCommonService, Utente } from 'bvino-lib';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { AppSessionService } from 'src/app/services/appSession.service';
import { environment } from 'src/environments/environmentnokeys';
import { PageManagerService } from 'src/app/services/pagemanager/pagemanager.service';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeChangerService } from 'src/app/services/themeChanger/themechanger.service';

declare var $;
@Component({
  selector: 'app-azienda-gestione',
  templateUrl: './azienda-gestione.component.html',
  styleUrls: ['./azienda-gestione.component.scss']
})
export class AziendaGestioneComponent extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public aziendaSelezionata: Azienda;

  public isImageSaved: boolean;
  public cardImageBase64: string;
  public imageError: string;

  public infoHtml = false;

  @ViewChild('dataTable', { static: true }) table;

  constructor(
    public commonService: BVCommonService,
    public sessionService: SessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public alertService: AlertService,
    public ngZone: NgZone,
    public appSessionService: AppSessionService,
    public pageManagerService: PageManagerService,
    public logoutComm: LogoutCommunicationService,
    public themeChanger: ThemeChangerService
  ) {

    super(sessionService, router, richiesteService, alertService, appSessionService, pageManagerService);
    this.aziendaSelezionata = new Azienda();
    this.isImageSaved = false;
    this.cardImageBase64 = '';
    this.imageError = '';
    this.pagename = environment.NAVIGATION_PAGENAME_AZIENDE;
  }

  ngOnInit() {
    this.appSessionService.set(this.appSessionService.NAVIGATION_PAGE_KEY, environment.NAVIGATION_PAGENAME_AZIENDE);
    this.logoutComm.logoutObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      this.ngZone.run(() => this.router.navigate(['login'])).then();
    });

    const utenteInSessione = this.appSessionService.get(environment.KEY_DB_USER);
    if (utenteInSessione === undefined || utenteInSessione === '') {
      console.log('utente non trovato in sessione, necessario nuovo login');
      this.goToPage('login');
    } else {
      this.utenteAutenticato = JSON.parse(utenteInSessione) as Utente;

      this.checkAuthenticated();
      if (this.utenteAutenticato.ruoloUtente === undefined || this.utenteAutenticato.ruoloUtente === '') {
        this.alertService.presentAlert('utente loggato non ha il ruolo configurato.');
        this.goToPage('login');
      } else {
        this.caricaAzienda();
      }
    }
  }

  private caricaAzienda() {
    this.commonService.get(this.richiesteService.getRichiestaGetAzienda(
      this.appSessionService.get(environment.KEY_AZIENDA_ID))).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.aziendaSelezionata = r.azienda;
        } else {
          this.manageError(r);
        }
      }, err => { }
      );
  }

  public salvaAzienda(): void {
    this.commonService.put(this.richiesteService.getRichiestaPutAzienda(this.aziendaSelezionata)).subscribe(r => {
      if (r.idVino) {
        this.alertService.presentAlert('modifiche azienda salvate correttamente');
        this.caricaAzienda();
      } else {
        this.manageErrorPut('Azienda');
      }
    }, err => {
      this.manageHttpError(err);
    });
  }

  public fileUploadedImmagine(event: any) {
    console.log('azienda-gestione-component, file caricato: ' + event);
    this.aziendaSelezionata.urlImmagineAzienda = event;
  }

  public fileUploadedLogo(event: any) {
    console.log('azienda-gestione-component, file caricato: ' + event);
    this.aziendaSelezionata.urlLogoAzienda = event;
  }

}
