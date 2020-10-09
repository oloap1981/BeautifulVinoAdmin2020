import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import {
  SessionService,
  RichiesteService,
  AlertService,
  Evento,
  EventoUtente,
  Provincia,
  ProvinciaEvento,
  Vino,
  VinoEvento,
  BVCommonService,
  Azienda,
  ConstantsService,
  Utente,
  Badge
} from 'bvino-lib';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { AppSessionService } from 'src/app/services/appSession.service';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environmentkeys';
import { PageManagerService } from 'src/app/services/pagemanager/pagemanager.service';

declare var $;
@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.scss']
})
export class EventiComponent extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  dataTable: any;
  public tableData: Array<Evento>;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject<void>();

  private isTableInitialized = false;

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

  public listaAziende: Array<Azienda>;

  public temaHtml = false;
  public testoHtml = false;

  public nuovo = false;

  public dataRicorrenteTemporanea = Date.now();
  public dataTemporanea = Date.now();

  public currentDate = (new Date()).getTime();

  public idAzienda: string;
  public nomeAzienda: string;

  public aziendaOspitanteFissa = true;

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
    this.pagename = environment.NAVIGATION_PAGENAME_EVENTI;

    // INIZIALIZZAZIONE DELL'EVENTO VUOTO
    this.eventoSelezionato = new Evento();
    this.eventoSelezionato.idEvento = '';

    const badge = new Badge();
    this.eventoSelezionato.badgeEvento = badge;

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

    this.listaAziende = new Array<Azienda>();

  }

  ngOnInit() {
    this.appSessionService.set(this.appSessionService.NAVIGATION_PAGE_KEY, environment.NAVIGATION_PAGENAME_EVENTI);

    this.idAzienda = this.appSessionService.get(environment.KEY_AZIENDA_ID);
    this.nomeAzienda = this.appSessionService.get(environment.KEY_AZIENDA_NOME);

    this.logoutComm.logoutObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      this.ngZone.run(() => this.router.navigate(['login'])).then();
    });

    if (this.idAzienda === this.constantsService.KEY_AZIENDA_ID_DEFAULT) {
      this.aziendaOspitanteFissa = false;
      this.caricaAziende();
    } else {
      const aziendaOspitante = new Azienda();
      aziendaOspitante.idAzienda = this.idAzienda;
      this.eventoSelezionato.aziendaOspitanteEvento = aziendaOspitante;
    }

    const utenteInSessione = this.appSessionService.get(environment.KEY_DB_USER);
    if (utenteInSessione === undefined || utenteInSessione === '') {
      console.log('utente non trovato in sessione, necessario nuovo login');
      this.goToPage('login');
    } else {
      this.utenteAutenticato = JSON.parse(utenteInSessione) as Utente;
      this.checkAuthenticated();
      this.caricaEventi();
      this.caricaProvince();
      this.caricaVini();
    }
  }

  public selectEvento(data: any): void {
    console.log('Evento cliccato: ' + data.titoloEvento);
    this.eventoSelezionato = data;
    this.dataTemporanea = this.eventoSelezionato.dataEvento;
    if (this.eventoSelezionato.dateRicorrenti === undefined) {
      this.eventoSelezionato.dateRicorrenti = [];
    }
    this.provinciaSelezionata = this.eventoSelezionato.provinciaEvento;
    if (!this.eventoSelezionato.badgeEvento) {
      this.eventoSelezionato.badgeEvento = new Badge();
    }
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
    const dataScelta = new Date(event as number);
    const dataAttuale = new Date(this.dataTemporanea);
    dataAttuale.setDate(dataScelta.getDate());
    dataAttuale.setMonth(dataScelta.getMonth());
    dataAttuale.setFullYear(dataScelta.getFullYear());
    this.dataTemporanea = dataAttuale.getTime();
  }

  public aggiornaOraEvento(event: any): void {
    const dataScelta = new Date(event as number);
    const dataAttuale = new Date(this.dataTemporanea);
    dataAttuale.setHours(dataScelta.getHours());
    dataAttuale.setMinutes(dataScelta.getMinutes());
    this.dataTemporanea = dataAttuale.getTime();
  }

  public aggiornaDataTemporaneaRicorrente(event) {
    const dataScelta = new Date(event as number);
    const dataTemporanea = new Date(this.dataRicorrenteTemporanea);
    dataTemporanea.setDate(dataScelta.getDate());
    dataTemporanea.setMonth(dataScelta.getMonth());
    dataTemporanea.setFullYear(dataScelta.getFullYear());
    this.dataRicorrenteTemporanea = dataTemporanea.getTime();
  }

  public aggiornaOraTemporaneaRicorrente(event: any): void {
    const dataScelta = new Date(event as number);
    const dataTemporanea = new Date(this.dataRicorrenteTemporanea);
    dataTemporanea.setHours(dataScelta.getHours());
    dataTemporanea.setMinutes(dataScelta.getMinutes());
    this.dataRicorrenteTemporanea = dataTemporanea.getTime();
  }

  public aggiungiDataRicorrente() {
    this.eventoSelezionato.dateRicorrenti.push(this.dataRicorrenteTemporanea);
  }

  public rimuovDataRicorrente(event: any) {
    const index = this.eventoSelezionato.dateRicorrenti.indexOf(event);
    if (index > -1) {
      this.eventoSelezionato.dateRicorrenti.splice(index, 1);
    }
  }

  private caricaEventi() {
    this.checkAuthenticated();
    if (this.utenteAutenticato.ruoloUtente === undefined || this.utenteAutenticato.ruoloUtente === '') {
      this.alertService.presentAlert('utente loggato non ha il ruolo configurato.');
      this.goToPage('login');
    } else {
      if (this.utenteAutenticato.ruoloUtente === this.constantsService.RUOLO_AZIENDA_ADMIN) {
        this.caricaListaEventiAzienda();
      } else if (this.utenteAutenticato.ruoloUtente === this.constantsService.RUOLO_SUPER_ADMIN) {
        this.caricaListaEventi();
      } else {
        this.alertService.presentAlert('utente loggato non ha il ruolo autorizzato per questa pagina.');
        this.goToPage('login');
      }
    }
  }

  public caricaListaEventiAzienda() {

    this.commonService.get(this.richiesteService.getRichiestaGetEventiAzienda(this.appSessionService.get(environment.KEY_AZIENDA_ID)))
      .subscribe(r => {
        // this.eventiService.getEventi(this.richiesteService.getRichiestaGetEventi()).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.tableData = this.normalizeList(r.eventi);
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

  public caricaListaEventi() {
    const richiesta = this.richiesteService.getRichiestaGetEventi();
    this.commonService.get(richiesta)
      .subscribe(r => {
        // this.eventiService.getEventi(this.richiesteService.getRichiestaGetEventi()).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.tableData = this.normalizeList(r.eventi);
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

  public caricaProvince() {

    this.commonService.get(this.richiesteService.getRichiestaGetProvincie()).subscribe(r => {
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
    const ruoloUtente = this.getRuoloUtente();
    if (ruoloUtente === this.RUOLO_ADMIN_AZIENDA) {
      const idAzienda = this.appSessionService.get(environment.KEY_AZIENDA_ID);
      this.commonService.get(this.richiesteService.getRichiestaGetViniAzienda(idAzienda)).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.listaVini = r.vini;
        } else {
          this.manageError(r);
        }
      }, err => {
        this.presentErrorAlert(err.statusText);
      });
    } else {
      this.commonService.get(this.richiesteService.getRichiestaGetVini()).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
          this.listaVini = r.vini;
        } else {
          this.manageError(r);
        }
      }, err => {
        this.presentErrorAlert(err.statusText);
      });
    }
  }

  public caricaAziende() {
    this.commonService.get(this.richiesteService.getRichiestaGetAziende()).subscribe(r => {
      if (r.esito.codice === environment.ESITO_OK_CODICE) {
        this.listaAziende = r.aziende;
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

  public selezionaAzienda(val: any) {
    if (val.selectedOptions[0].value === '0' || val.selectedOptions[0].value === '') {
      this.alertService.presentAlert('Scegliere un valore dal menu a tendina delle aziende');
    } else {
      console.log('Azienda Selezionata: ' + val.selectedOptions[0].value);
      const id = val.selectedOptions[0].value;
      const azienda = this.getAziendaFromList(id);

      this.eventoSelezionato.aziendaOspitanteEvento = azienda;
    }
  }

  private getAziendaFromList(id: string): Azienda {
    for (const azienda of this.listaAziende) {
      if (azienda.idAzienda === id) {
        return azienda;
      }
    }
    return new Azienda();
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

  public fileUploadedLogoBadge(event: any) {
    console.log('azienda-gestione-component, file caricato: ' + event);
    this.eventoSelezionato.badgeEvento.urlLogoBadge = event;
  }

  public nuovoEvento(): void {
    if (confirm('Creando un nuovo evento le informazioni non salvate di quello attuale saranno perse. Procedere?')) {
      this.eventoSelezionato = new Evento();
      const provincia = new Provincia();
      provincia.idProvincia = 'X';
      this.eventoSelezionato.provinciaEventoInt = provincia;
      if (this.idAzienda === this.constantsService.KEY_AZIENDA_ID_DEFAULT) {
        const aziendaOspitante = new Azienda();
        aziendaOspitante.idAzienda = '0';
        this.eventoSelezionato.aziendaOspitanteEvento = aziendaOspitante;
        this.caricaAziende();
      } else {
        const aziendaOspitante = new Azienda();
        aziendaOspitante.idAzienda = this.idAzienda;
        this.eventoSelezionato.aziendaOspitanteEvento = aziendaOspitante;
      }
    }
  }

  public salvaEvento(): void {
    this.nuovo = false;
    console.log(JSON.stringify(this.eventoSelezionato));
    this.eventoSelezionato.oldDate = this.eventoSelezionato.dataEvento;
    this.eventoSelezionato.dataEvento = this.dataTemporanea;
    this.commonService.put(this.richiesteService.getRichiestaPutEvento(this.eventoSelezionato)).subscribe(r => {
      if (r.esito.codice === environment.ESITO_OK_CODICE) {
        this.alertService.presentAlert('Salvataggio corretto');
        this.caricaEventi();
      } else {
        this.manageErrorPut(r.esito.message);
      }
    }, err => {
      this.presentErrorAlert(err.statusText);
    });
  }

  public duplicaEvento(): void {
    if (confirm('Sicuri di voler duplicare questo evento?')) {
      this.eventoSelezionato.idEvento = '';
      this.nuovo = true;
    }
  }

  public eliminaEvento(): void {
    if (confirm('Sicuri di voler eliminare questo evento?')) {
      this.nuovo = false;
    }
  }

  // public getPostiDisponibiliPerData(data: number): string {
  //   if (this.eventoSelezionato === undefined || this.eventoSelezionato.dateRicorrenti.indexOf(data) === -1) {
  //     // data non presente
  //     return '-';
  //   } else {
  //     for (let eventoUtente: EventoUtente of someArray) {
  //       console.log(entry); // 1, "string", false
  //     }
  //   }
  // }

}
