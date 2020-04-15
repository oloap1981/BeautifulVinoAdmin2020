import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { SessionService, RichiesteService, AlertService, Utente, BVCommonService, ConstantsService } from 'bvino-lib';
import { AppSessionService } from 'src/app/services/appSession.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { ThemeChangerService } from 'src/app/services/themeChanger/themechanger.service';
import { environment } from 'src/environments/environmentkeys';
import { PageManagerService } from 'src/app/services/pagemanager/pagemanager.service';

declare var $;
@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public items = [];

  dataTable: any;
  public tableData: Array<Utente>;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject<void>();

  private isTableInitialized = false;

  public utenteSelezionato: Utente;
  public testoHtml = false;

  constructor(public sessionService: SessionService,
    public router: Router,
    public commonService: BVCommonService,
    public richiesteService: RichiesteService,
    public alertService: AlertService,
    public appSessionService: AppSessionService,
    public logoutComm: LogoutCommunicationService,
    public ngZone: NgZone,
    private themeChanger: ThemeChangerService,
    public pageManagerService: PageManagerService,
    public constantsService: ConstantsService) {
    super(sessionService, router, richiesteService, alertService, appSessionService, pageManagerService);
    this.pagename = environment.NAVIGATION_PAGENAME_UTENTI;
    this.utenteSelezionato = new Utente();
    this.utenteSelezionato.idUtente = '';
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      order: [[1, 'asc']]
    };

    this.appSessionService.set(this.appSessionService.NAVIGATION_PAGE_KEY, environment.NAVIGATION_PAGENAME_UTENTI);
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
      this.caricaUtenti();

      // this.themeChanger.loadStyle('1539014718497.css');
    }

  }

  private caricaUtenti() {
    this.checkAuthenticated();
    if (this.utenteAutenticato.ruoloUtente === undefined || this.utenteAutenticato.ruoloUtente === '') {
      this.alertService.presentAlert('utente loggato non ha il ruolo configurato.');
      this.goToPage('login');
    } else {
      if (this.utenteAutenticato.ruoloUtente === this.constantsService.RUOLO_AZIENDA_ADMIN) {
        this.caricaListaUtentiAzienda();
      } else if (this.utenteAutenticato.ruoloUtente === this.constantsService.RUOLO_SUPER_ADMIN) {
        this.caricaListaUtenti();
      } else {
        this.alertService.presentAlert('utente loggato non ha il ruolo autorizzato per questa pagina.');
        this.goToPage('login');
      }
    }
  }

  private normalizeList(lista: Array<Utente>): Array<Utente> {
    const toReturn = new Array<Utente>();

    for (const utente of lista) {
      utente.usernameUtente = (utente.usernameUtente ? utente.usernameUtente : '');
      utente.emailUtente = (utente.emailUtente ? utente.emailUtente : '');
      utente.cittaUtente = (utente.cittaUtente ? utente.cittaUtente : '');

      toReturn.push(utente);
    }

    return toReturn;
  }

  public selectUtente(data: Utente): void {
    this.utenteSelezionato = data;
  }

  public salvaUtente(): void {
    this.commonService.put(this.richiesteService.getRichiestaPutUtente(this.utenteSelezionato)).subscribe(r => {
      if (r.idUtente) {
        this.alertService.presentAlert('salvato correttamente utente con id: ' + r.idUtente);
        this.caricaUtenti();
      } else {
        this.manageErrorPut('Utente');
      }
    }, err => {

    });
  }

  public fileUploadedImmagine(event: any) {
    console.log('vini-component, file caricato: ' + event);
    this.utenteSelezionato.urlFotoUtente = event;
  }

  private caricaListaUtenti(): void {
    this.commonService.get(this.richiesteService.getRichiestaGetUtenti())
      .subscribe(r => {
        // this.utentiService.getUtenti(this.richiesteService.getRichiestaGetUtenti()).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.tableData = this.normalizeList(r.utenti);
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

  private caricaListaUtentiAzienda(): void {
    this.commonService.get(this.richiesteService.getRichiestaGetUtentiAzienda(this.appSessionService.get(environment.KEY_AZIENDA_ID)))
      .subscribe(r => {
        // this.utentiService.getUtenti(this.richiesteService.getRichiestaGetUtenti()).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.tableData = this.normalizeList(r.utenti);
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

}
