import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import {
  SessionService,
  RichiesteService,
  ConstantsService,
  AlertService,
  Feed,
  BVCommonService
} from 'bvino-lib';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { AppSessionService } from 'src/app/services/appSession.service';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';

declare var $;
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  dataTable: any;
  dtOptions: any;
  public tableData = [];

  public feedSelezionato: Feed;

  public testoHtml = false;

  public nuovo = false;

  @ViewChild('dataTable', { static: true }) table;

  constructor(
    public commonService: BVCommonService,
    public sessionService: SessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public constantsService: ConstantsService,
    public alertService: AlertService,
    public appSessionService: AppSessionService,
    public sanitizer: DomSanitizer,
    public logoutComm: LogoutCommunicationService,
    public ngZone: NgZone) {

    super(sessionService, router, richiesteService, constantsService, alertService, appSessionService, sanitizer);
    this.feedSelezionato = new Feed();
    this.feedSelezionato.idFeed = '';
  }

  ngOnInit() {
    this.logoutComm.logoutObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      this.ngZone.run(() => this.router.navigate(['login'])).then();
    });

    this.checkAuthenticated();
    const self = this;
    this.commonService.get(this.richiesteService.getRichiestaGetFeed()).subscribe(r => {
      // this.feedService.getFeeds(this.richiesteService.getRichiestaGetFeed()).subscribe(r => {
      if (r.esito.codice === this.constants.ESITO_OK_CODICE) {
        this.tableData = this.normalizeList(r.feed);
        this.dtOptions = {
          data: this.tableData,
          columns: [
            {
              title: 'Data', data: 'idFeed', render: function (data: any, type: any, full: any) {
                return self.getStringDate(data);
              }
            },
            // { title: 'Azienda', data: 'aziendaVinoInt.nomeAzienda' },
            { title: 'Titolo', data: 'titoloFeed' }
          ],
          pagingType: 'full_numbers',
          pageLength: 15,
          processing: true,
          rowCallback: (row: Node, data: any[] | Object, index: number) => {
            const self = this;
            // Unbind first in order to avoid any duplicate handler
            // (see https://github.com/l-lin/angular-datatables/issues/87)
            $('td', row).unbind('click');
            $('td', row).bind('click', () => {
              self.selectFeed(data);
            });
            return row;
          }
        };
      } else {
        this.manageError(r);
      }
    }, err => {
      this.presentErrorAlert(err.statusText);
    }, () => {
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions);
    });
  }

  private selectFeed(data: any): void {
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
