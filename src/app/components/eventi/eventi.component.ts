import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService, UtentiService, RichiesteService, ConstantsService, AlertService, EventiService, Evento } from 'bvino-lib';
import { Router } from '@angular/router';

import * as _ from 'lodash';

declare var $;
@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.scss']
})
export class EventiComponent extends BaseComponent implements OnInit {

  dataTable: any;
  dtOptions: any;
  public tableData = [];

  public eventoSelezionato: Evento;

  public isImageSaved: boolean;
  public cardImageBase64: string;
  public imageError: string;

  @ViewChild('dataTable', { static: true }) table;

  constructor(
    public eventiService: EventiService,
    public sessionService: SessionService,
    public router: Router,
    public utentiService: UtentiService,
    public richiesteService: RichiesteService,
    public constantsService: ConstantsService,
    public alertService: AlertService) {

    super(sessionService, router, richiesteService, constantsService, alertService);
    this.eventoSelezionato = new Evento();
    this.isImageSaved = false;
    this.cardImageBase64 = '';
    this.imageError = '';
  }

  ngOnInit() {
    this.eventiService.getEventi(this.richiesteService.getRichiestaGetEventi()).subscribe(r => {
      if (r.esito.codice === this.constants.ESITO_OK_CODICE) {
        this.tableData = this.normalizeList(r.eventi);
        this.dtOptions = {
          data: this.tableData,
          columns: [
            { title: 'Nome', data: 'titoloEvento' },
            // { title: 'Azienda', data: 'aziendaVinoInt.nomeAzienda' },
            { title: 'Citta', data: 'cittaEvento' }
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
              self.selectEvento(data);
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


  private selectEvento(data: any): void {
    console.log('Evento cliccato: ' + data.titoloEvento);
    this.eventoSelezionato = data;
  }

  private normalizeList(lista: Array<Evento>): Array<Evento> {
    const toReturn = new Array<Evento>();

    for (const evento of lista) {
      evento.titoloEvento = (evento.titoloEvento ? evento.titoloEvento : '');
      evento.cittaEvento = (evento.cittaEvento ? evento.cittaEvento : '');

      toReturn.push(evento);
    }

    return toReturn;
  }

}
