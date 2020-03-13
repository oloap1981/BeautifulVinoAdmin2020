import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import {
  SessionService,
  RichiesteService,
  AlertService,
  Evento,
  Provincia,
  ProvinciaEvento,
  Vino,
  VinoEvento,
  BVCommonService
} from 'bvino-lib';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { AppSessionService } from 'src/app/services/appSession.service';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environmentnokeys';

declare var $;
@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.scss']
})
export class EventiComponent extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  dataTable: any;
  dtOptions: any;
  public tableData = [];

  public eventoSelezionato: Evento;

  public isImageSaved: boolean;
  public cardImageBase64: string;
  public imageError: string;

  public listaProvincie: Array<Provincia>;
  public mostraEditorProvincie = false;
  public provinciaSelezionata: Provincia;
  public provinciaAdd: Provincia;

  public listaVini: Array<Vino>;
  public vinoAdd: Vino;

  public temaHtml = false;
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
    public ngZone: NgZone) {

    super(sessionService, router, richiesteService, alertService, appSessionService);

    // INIZIALIZZAZIONE DELL'EVENTO VUOTO
    this.eventoSelezionato = new Evento();
    this.eventoSelezionato.idEvento = '';

    const provinciaEvento = new ProvinciaEvento();
    provinciaEvento.idProvincia = '';
    provinciaEvento.nomeProvincia = '';
    provinciaEvento.siglaProvincia = '';
    this.eventoSelezionato.provinciaEventoInt = provinciaEvento;

    this.listaVini = new Array<Vino>();
    this.vinoAdd = new Vino();

    this.isImageSaved = false;
    this.cardImageBase64 = '';
    this.imageError = '';
    this.provinciaSelezionata = new Provincia();
    this.provinciaAdd = new Provincia();
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
    this.commonService.get(this.richiesteService.getRichiestaGetEventiAzienda(this.appSessionService.get(environment.KEY_AZIENDA_ID)))
      .subscribe(r => {
        // this.eventiService.getEventi(this.richiesteService.getRichiestaGetEventi()).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
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
    this.caricaProvince();
    this.caricaVini();
  }

  public selectEvento(data: any): void {
    console.log('Evento cliccato: ' + data.titoloEvento);
    this.eventoSelezionato = data;
    this.provinciaSelezionata = this.eventoSelezionato.provinciaEvento;
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

  public aggiornaDataEvento(event: any): void {
    this.eventoSelezionato.dataEvento = event;
    console.log(JSON.stringify(this.eventoSelezionato));
  }

  public caricaProvince() {

    this.commonService.get(this.richiesteService.getRichiestaGetProvincie()).subscribe(r => {
      // this.eventiService.getProvincie(this.richiesteService.getRichiestaGetProvincie()).subscribe(r => {
      if (r.esito.codice === environment.ESITO_OK_CODICE) {
        this.listaProvincie = r.province;
      } else {
        this.manageError(r);
      }
    }, err => {
      this.presentErrorAlert(err.statusText);
    });
  }

  public caricaVini() {
    this.commonService.get(this.richiesteService.getRichiestaGetViniAzienda('1539014718497')).subscribe(r => {
      // this.vinoService.getViniAzienda(this.richiesteService.getRichiestaGetViniAzienda('1539014718497')).subscribe(r => {
      if (r.esito.codice === environment.ESITO_OK_CODICE) {
        this.listaVini = r.vini;
      } else {
        this.manageError(r);
      }
    }, err => {
      this.presentErrorAlert(err.statusText);
    });
  }

  public selezionaProvincia(val: any) {
    if (val.selectedOptions[0].value === '0' || val.selectedOptions[0].value === '') {
      this.alertService.presentAlert('Scegliere un valore dal menu a tendina delle provincie');
    } else {
      console.log('Provincia Selezionata: ' + val.selectedOptions[0].value);
      const split = val.selectedOptions[0].text.split(' ');
      const sigla = split[0];
      const nome = split[1].slice(1, -1);
      const id = val.selectedOptions[0].value;
      const provinciaEvento = new ProvinciaEvento();
      provinciaEvento.idProvincia = id;
      provinciaEvento.nomeProvincia = nome;
      provinciaEvento.siglaProvincia = sigla;
      this.eventoSelezionato.provinciaEvento = provinciaEvento;
    }
  }

  public aggiungiProvincia() {
    const provincia: Provincia = new Provincia();
    provincia.nomeProvincia = this.provinciaAdd.nomeProvincia;
    provincia.siglaProvincia = this.provinciaAdd.siglaProvincia;
    this.commonService.put(this.richiesteService.getRichiestaPutProvincia(provincia)).subscribe(r => {
      // this.eventiService.putProvincia(this.richiesteService.getRichiestaPutProvincia(provincia), provincia).subscribe(r => {
      if (r.idProvincia && r.idProvincia === '') {
        this.alertService.presentErrorAlert('Si è verificato un problema nel salvataggio della provincia');
      } else {
        this.alertService.presentAlert('Provincia salvata correttamente');
        this.caricaProvince();
        this.provinciaAdd.nomeProvincia = '';
        this.provinciaAdd.siglaProvincia = '';
      }
    }, err => {
      this.presentErrorAlert(err.statusText);
    });
  }

  public aggiungiVinoALista() {
    const vinoEvento = new VinoEvento();
    vinoEvento.annoVino = this.vinoAdd.annoVino;
    vinoEvento.nomeVino = this.vinoAdd.nomeVino;
    // vinoEvento.nomeAziendaVino = this.vinoAdd.aziendaVinoInt.nomeAzienda;
    vinoEvento.idVino = this.vinoAdd.idVino;
    this.aggiungiVinoAEventoSelezionato(vinoEvento);
  }

  private aggiungiVinoAEventoSelezionato(vinoEvento: VinoEvento) {
    let trovato = false;
    for (const vino of this.eventoSelezionato.viniEventoInt) {
      if (vino.idVino === vinoEvento.idVino) {
        trovato = true;
        break;
      }
    }
    if (!trovato) {
      this.eventoSelezionato.viniEventoInt.push(vinoEvento);
    }
  }

  public togliVinoDaLista(vinoEvento: VinoEvento) {
    const index = this.eventoSelezionato.viniEventoInt.indexOf(vinoEvento, 0);
    if (index > -1) {
      this.eventoSelezionato.viniEventoInt.splice(index, 1);
    }
  }

  public selezionaVino(val: any) {
    if (val.selectedOptions[0].value === '0' || val.selectedOptions[0].value === '') {
      this.alertService.presentAlert('Scegliere un valore dal menu a tendina dei vini');
    } else {
      console.log('Vino Selezionata: ' + val.selectedOptions[0].value);
      const id = val.selectedOptions[0].value;
      const vino = this.getVinoFromList(id);

      this.vinoAdd.idVino = vino.idVino;
      this.vinoAdd.annoVino = vino.annoVino;
      this.vinoAdd.nomeVino = vino.nomeVino;

    }
  }

  private getVinoFromList(id: string): Vino {
    for (const vino of this.listaVini) {
      if (vino.idVino === id) {
        return vino;
      }
    }
    return new Vino();
  }

  public fileUploadedLogo(event: any) {
    console.log('vini-component, file caricato: ' + event);
    this.eventoSelezionato.urlFotoEvento = event;
  }

  public nuovoEvento(): void {
    if (confirm('Creando un nuovo evento le informazioni non salvate di quello attuale saranno perse. Procedere?')) {
      this.eventoSelezionato = new Evento();
    }
  }

  public salvaEvento(): void {
    this.nuovo = false;
  }

  public duplicaEvento(): void {
    if (confirm('Sicuri di voler duplicare questo evento?')) {
      this.eventoSelezionato.idEvento = '';
      this.nuovo = false;
    }
  }

  public eliminaEvento(): void {
    if (confirm('Sicuri di voler eliminare questo evento?')) {
      this.nuovo = false;
    }
  }

}
