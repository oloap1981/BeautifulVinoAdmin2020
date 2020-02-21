import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { SessionService, UtentiService, RichiesteService, ConstantsService, AlertService, Utente } from 'bvino-lib';

declare var $;
@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent extends BaseComponent implements OnInit {

  public items = [];

  dataTable: any;
  dtOptions: any;
  public tableData = [];

  @ViewChild('dataTable', { static: true }) table;

  public utenteSelezionato: Utente;

  constructor(public sessionService: SessionService,
    public router: Router,
    public utentiService: UtentiService,
    public richiesteService: RichiesteService,
    public constantsService: ConstantsService,
    public alertService: AlertService) {
    super(sessionService, router, richiesteService, constantsService, alertService);
    this.utenteSelezionato = new Utente();
    this.utenteSelezionato.idUtente = '';
  }

  ngOnInit() {
    this.utentiService.getUtenti(this.richiesteService.getRichiestaGetUtenti()).subscribe(r => {
      if (r.esito.codice === this.constants.ESITO_OK_CODICE) {
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
    }, err => { }, () => {
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions);
    });
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

}
