import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import {
  SessionService,
  RichiesteService,
  AlertService,
  Feed,
  BVCommonService,
  ConstantsService,
  Utente
} from 'bvino-lib';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { AppSessionService } from 'src/app/services/appSession.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { environment } from 'src/environments/environmentkeys';
import { PageManagerService } from 'src/app/services/pagemanager/pagemanager.service';

declare var $;
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  dataTable: any;
  public tableData: Array<Feed>;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject<void>();

  private isTableInitialized = false;

  public feedSelezionato: Feed;

  public testoHtml = false;

  public nuovo = false;

  @ViewChild('dataTable', { static: true }) table;

  constructor(
    public commonService: BVCommonService,
    public sessionService: SessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public alertService: AlertService,
    public appSessionService: AppSessionService,
    public logoutComm: LogoutCommunicationService,
    public ngZone: NgZone,
    public pageManagerService: PageManagerService,
    public constantsService: ConstantsService) {

    super(sessionService, router, richiesteService, alertService, appSessionService, pageManagerService);
    this.pagename = environment.NAVIGATION_PAGENAME_FEED;
    this.feedSelezionato = new Feed();
    this.feedSelezionato.idFeed = '';
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      order: [[1, 'asc']]
    };

    this.appSessionService.set(this.appSessionService.NAVIGATION_PAGE_KEY, environment.NAVIGATION_PAGENAME_FEED);
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
      this.caricaFeed();

      // this.themeChanger.loadStyle('1539014718497.css');
    }
  }

  private caricaFeed() {
    this.checkAuthenticated();
    if (this.utenteAutenticato.ruoloUtente === undefined || this.utenteAutenticato.ruoloUtente === '') {
      this.alertService.presentAlert('utente loggato non ha il ruolo configurato.');
      this.goToPage('login');
    } else {
      if (this.utenteAutenticato.ruoloUtente === this.constantsService.RUOLO_AZIENDA_ADMIN) {
        this.caricaListaFeedAzienda();
      } else if (this.utenteAutenticato.ruoloUtente === this.constantsService.RUOLO_SUPER_ADMIN) {
        this.caricaListaFeed();
      } else {
        this.alertService.presentAlert('utente loggato non ha il ruolo autorizzato per questa pagina.');
        this.goToPage('login');
      }
    }
  }

  private caricaListaFeed() {
    this.commonService.get(this.richiesteService.getRichiestaGetFeed())
      .subscribe(r => {
        // this.feedService.getFeeds(this.richiesteService.getRichiestaGetFeed()).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.tableData = this.normalizeList(r.feed);
          if (!this.isTableInitialized) {
            this.dtTrigger.next();
            this.isTableInitialized = true;
          }
        } else {
          this.manageError(r);
        }
      }, err => {
        this.presentErrorAlert(err.statusText);
      });
  }

  private caricaListaFeedAzienda() {
    this.commonService.get(this.richiesteService.getRichiestaGetFeedAzienda(this.appSessionService.get(environment.KEY_AZIENDA_ID)))
      .subscribe(r => {
        // this.feedService.getFeeds(this.richiesteService.getRichiestaGetFeed()).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.tableData = this.normalizeList(r.feed);
          if (!this.isTableInitialized) {
            this.dtTrigger.next();
            this.isTableInitialized = true;
          }
        } else {
          this.manageError(r);
        }
      }, err => {
        this.presentErrorAlert(err.statusText);
      });
  }

  public selectFeed(data: any): void {
    console.log('Feed cliccato: ' + data.titoloFeed);
    this.feedSelezionato = data;
  }

  private normalizeList(lista: Array<Feed>): Array<Feed> {
    const toReturn = new Array<Feed>();

    for (const feed of lista) {
      feed.titoloFeed = (feed.titoloFeed ? feed.titoloFeed : '');

      toReturn.push(feed);
    }

    return toReturn;
  }

  public getStringDate(value: string): string {
    const date = new Date(+value);
    return this.leftpad(date.getDate(), 2)
      + '/' + this.leftpad(date.getMonth() + 1, 2)
      + '/' + date.getFullYear();
  }

  private leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }

  public fileUploadedImmagineFeed(event: any) {
    this.feedSelezionato.urlImmagineFeed = event;
  }

  public fileUploadedImmagineHeaderFeed(event: any) {
    this.feedSelezionato.urlImmagineHeaderFeed = event;
  }

  public nuovoFeed(): void {
    if (confirm('Creando un nuovo feed le informazioni non salvate di quello attuale saranno perse. Procedere?')) {
      this.feedSelezionato = new Feed();
    }
  }

  public salvaFeed(): void {
    this.commonService.put(this.richiesteService.getRichiestaPutFeed(this.feedSelezionato)).subscribe(r => {
      if (r.idFeed) {
        this.alertService.presentAlert('salvato correttamente feed con id: ' + r.idFeed);
        this.caricaFeed();
      } else {
        this.manageErrorPut('Feed');
      }
    }, err => {

    });
    this.nuovo = false;
  }

  public duplicaFeed(): void {
    if (confirm('Sicuri di voler duplicare questo feed?')) {
      this.feedSelezionato.idFeed = '';
      this.nuovo = false;
    }
  }

  public eliminaFeed(): void {
    if (confirm('Sicuri di voler eliminare questo feed?')) {
      this.nuovo = false;
    }
  }

}
