import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { SessionService, RichiesteService, AlertService, Utente, BVCommonService } from 'bvino-lib';
import { AppSessionService } from 'src/app/services/appSession.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { ThemeChangerService } from 'src/app/services/themeChanger/themechanger.service';
import { environment } from 'src/environments/environmentnokeys';

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
  dtOptions: any;
  public tableData = [];

  @ViewChild('dataTable', { static: true }) table;

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
    private themeChanger: ThemeChangerService) {
    super(sessionService, router, richiesteService, alertService, appSessionService);
    this.utenteSelezionato = new Utente();
    this.utenteSelezionato.idUtente = '';
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
    this.caricaListaUtenti();

    this.themeChanger.loadStyle('1539014718497.css');
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

  private selectUtente(data: any): void {
    console.log('utente cliccato' + data.usernameUtente);
    this.utenteSelezionato = data;
  }

  public salvaUtente(): void {
    this.commonService.put(this.richiesteService.getRichiestaPutUtente(this.utenteSelezionato)).subscribe(r => {
      if (r.idUtente) {
        this.alertService.presentAlert('salvato correttamente utente con id: ' + r.idUtente);
        this.caricaListaUtenti();
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
    this.commonService.get(this.richiesteService.getRichiestaGetUtentiAzienda(this.appSessionService.get(environment.KEY_AZIENDA_ID)))
      .subscribe(r => {
        // this.utentiService.getUtenti(this.richiesteService.getRichiestaGetUtenti()).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.tableData = this.normalizeList(r.utenti);
          this.dtOptions = {
            data: this.tableData,
            columns: [
              { title: 'Nome', data: 'usernameUtente' },
              { title: 'Email', data: 'emailUtente' },
              { title: 'Citta', data: 'cittaUtente' }
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
                self.selectUtente(data);
              });
              return row;
            }
          };
        } else {
          this.manageError(r);
        }
      }, err => {
        this.manageHttpError(err);
      }, () => {
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
      });
  }

}
