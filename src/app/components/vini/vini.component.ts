import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import {
  SessionService,
  RichiesteService,
  AlertService,
  Vino,
  BVCommonService,
  Azienda,
  Utente,
  ConstantsService
} from 'bvino-lib';

import { Router } from '@angular/router';

import * as _ from 'lodash';
import { AppSessionService } from 'src/app/services/appSession.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { ThemeChangerService } from 'src/app/services/themeChanger/themechanger.service';
import { environment } from 'src/environments/environmentkeys';
import { PageManagerService } from 'src/app/services/pagemanager/pagemanager.service';

declare var $;
@Component({
  selector: 'app-vini',
  templateUrl: './vini.component.html',
  styleUrls: ['./vini.component.scss']
})
export class ViniComponent extends BaseComponent implements OnDestroy, OnInit {

  private unsubscribe$ = new Subject<void>();

  dataTable: any;
  public tableData: Array<Vino>;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject<void>();

  private isTableInitialized = false;

  public vinoSelezionato: Vino;

  public isImageSaved: boolean;
  public cardImageBase64: string;
  public imageError: string;

  public descrizioneHtml = false;

  public azienda = new Azienda();

  public nuovo = false;

  constructor(
    public commonService: BVCommonService,
    public sessionService: SessionService,
    public appSessionService: AppSessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public alertService: AlertService,
    public logoutComm: LogoutCommunicationService,
    public ngZone: NgZone,
    private themeChanger: ThemeChangerService,
    public pageManagerService: PageManagerService,
    public constantsService: ConstantsService) {

    super(sessionService, router, richiesteService, alertService, appSessionService, pageManagerService);
    this.pagename = environment.NAVIGATION_PAGENAME_VINI;
    this.vinoSelezionato = new Vino();
    this.vinoSelezionato.idVino = '';
    this.isImageSaved = false;
    this.cardImageBase64 = '';
    this.imageError = '';

    this.azienda = new Azienda();
    this.tableData = Array<Vino>();
  }

  ngOnInit() {

    const idAzienda = this.appSessionService.get(environment.KEY_AZIENDA_ID);
    this.azienda.idAzienda = idAzienda;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      order: [[0, 'asc']]
    };

    this.appSessionService.set(this.appSessionService.NAVIGATION_PAGE_KEY, environment.NAVIGATION_PAGENAME_VINI);
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
      this.caricaVini();
      // this.themeChanger.loadStyle('1539014718497.css');
    }
  }

  private caricaVini() {

    this.checkAuthenticated();
    if (this.utenteAutenticato.ruoloUtente === undefined || this.utenteAutenticato.ruoloUtente === '') {
      this.alertService.presentAlert('utente loggato non ha il ruolo configurato.');
      this.goToPage('login');
    } else {
      if (this.utenteAutenticato.ruoloUtente === this.constantsService.RUOLO_AZIENDA_ADMIN) {
        this.caricaListaViniAzienda();
      } else if (this.utenteAutenticato.ruoloUtente === this.constantsService.RUOLO_SUPER_ADMIN) {
        this.caricaListaVini();
      } else {
        this.alertService.presentAlert('utente loggato non ha il ruolo autorizzato per questa pagina.');
        this.goToPage('login');
      }
    }
  }

  private caricaListaVini(): void {
    this.commonService.get(this.richiesteService.getRichiestaGetVini())
      .subscribe(r => {
        // this.vinoService.getViniAzienda(this.richiesteService.getRichiestaGetViniAzienda('1539014718497')).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.tableData = this.normalizeList(r.vini);
          if (!this.isTableInitialized) {
            this.dtTrigger.next();
            this.isTableInitialized = true;
          }
        } else {
          this.manageError(r);
        }
      }, err => {
        this.manageHttpError(err);
      });
  }

  private caricaListaViniAzienda(): void {
    this.commonService.get(this.richiesteService.getRichiestaGetViniAzienda(this.appSessionService.get(environment.KEY_AZIENDA_ID)))
      .subscribe(r => {
        // this.vinoService.getViniAzienda(this.richiesteService.getRichiestaGetViniAzienda('1539014718497')).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.tableData = this.normalizeList(r.vini);
          // this.dtTrigger.next();
          if (!this.isTableInitialized) {
            this.dtTrigger.next();
            this.isTableInitialized = true;
          }
        } else {
          this.manageError(r);
        }
      }, err => {
        this.manageHttpError(err);
      });
  }

  /**, () => {

        if(!this.isTableInitialized)  {
          this.dataTable = $(this.table.nativeElement);
          this.dataTable.DataTable(this.dtOptions);
          this.isTableInitialized = true;
        } else {
          this.dtTrigger.next();
        }

      } */

  public selectVino(data: any): void {
    console.log('Vino cliccato: ' + data.nomeVino);
    this.vinoSelezionato = data;
  }

  private normalizeList(lista: Array<Vino>): Array<Vino> {
    const toReturn = new Array<Vino>();

    for (const vino of lista) {
      vino.nomeVino = (vino.nomeVino ? vino.nomeVino : '');
      vino.annoVino = (vino.annoVino ? vino.annoVino : 0);

      toReturn.push(vino);
    }

    return toReturn;
  }

  public fileUploadedImmagine(event: any) {
    console.log('vini-component, file caricato: ' + event);
    this.vinoSelezionato.urlImmagineVino = event;
  }

  public fileUploadedLogo(event: any) {
    console.log('vini-component, file caricato: ' + event);
    this.vinoSelezionato.urlLogoVino = event;
  }

  public nuovoVino(): void {
    if (confirm('Creando un nuovo vino le informazioni non salvate di quello attuale saranno perse. Procedere?')) {
      this.vinoSelezionato = new Vino();
      this.nuovo = true;
    }
  }

  public salvaVino(): void {
    this.vinoSelezionato.aziendaVino = this.azienda;
    this.commonService.put(this.richiesteService.getRichiestaPutVino(this.vinoSelezionato)).subscribe(r => {
      if (r.idVino) {
        this.alertService.presentAlert('salvato correttamente il vino con id: ' + r.idVino);
        this.caricaVini();
      } else {
        this.manageErrorPut('Vino');
      }
    }, err => {
      this.manageHttpError(err);
    });
    this.nuovo = false;
  }

  public duplicaVino(): void {
    if (confirm('Sicuri di voler duplicare questo vino?')) {
      this.vinoSelezionato.idVino = '';
      this.nuovo = true;
    }
  }

  // public eliminaVino(): void {
  //   if (confirm('Sicuri di voler eliminare questo vino?')) {
  //     this.nuovo = false;
  //   }
  // }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.unsubscribe$.unsubscribe();
  }

}
