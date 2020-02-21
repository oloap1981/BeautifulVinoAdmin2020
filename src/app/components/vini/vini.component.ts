import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService, UtentiService, RichiesteService, ConstantsService, AlertService, Vino, ViniAziendaService } from 'bvino-lib';
import { Router } from '@angular/router';

import * as _ from 'lodash';

declare var $;
@Component({
  selector: 'app-vini',
  templateUrl: './vini.component.html',
  styleUrls: ['./vini.component.scss']
})
export class ViniComponent extends BaseComponent implements OnInit {

  dataTable: any;
  dtOptions: any;
  public tableData = [];

  public vinoSelezionato: Vino;

  public isImageSaved: boolean;
  public cardImageBase64: string;
  public imageError: string;

  public descrizioneHtml = false;

  @ViewChild('dataTable', { static: true }) table;

  constructor(
    public vinoService: ViniAziendaService,
    public sessionService: SessionService,
    public router: Router,
    public utentiService: UtentiService,
    public richiesteService: RichiesteService,
    public constantsService: ConstantsService,
    public alertService: AlertService) {

    super(sessionService, router, richiesteService, constantsService, alertService);
    this.vinoSelezionato = new Vino();
    this.vinoSelezionato.idVino = '';
    this.isImageSaved = false;
    this.cardImageBase64 = '';
    this.imageError = '';
  }

  ngOnInit() {
    // l'id dell'azienda deve essere recuperato dalla sessione se l'utente loggato è un
    this.vinoService.getViniAzienda(this.richiesteService.getRichiestaGetViniAzienda('1539014718497')).subscribe(r => {
      if (r.esito.codice === this.constants.ESITO_OK_CODICE) {
        this.tableData = this.normalizeList(r.vini);
        this.dtOptions = {
          data: this.tableData,
          columns: [
            { title: 'Nome', data: 'nomeVino' },
            // { title: 'Azienda', data: 'aziendaVinoInt.nomeAzienda' },
            { title: 'Anno', data: 'annoVino' }
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
              self.selectVino(data);
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

  private selectVino(data: any): void {
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
    }
  }
}
