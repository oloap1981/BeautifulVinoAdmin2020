import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import {
  SessionService,
  RichiesteService,
  AlertService,
  Vino,
  BVCommonService,
  Azienda
} from 'bvino-lib';

import { Router } from '@angular/router';

import * as _ from 'lodash';
import { AppSessionService } from 'src/app/services/appSession.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { ThemeChangerService } from 'src/app/services/themeChanger/themechanger.service';
import { environment } from 'src/environments/environmentnokeys';

declare var $;
@Component({
  selector: 'app-vini',
  templateUrl: './vini.component.html',
  styleUrls: ['./vini.component.scss']
})
export class ViniComponent extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  dataTable: any;
  dtOptions: any;
  public tableData = [];

  public vinoSelezionato: Vino;

  public isImageSaved: boolean;
  public cardImageBase64: string;
  public imageError: string;

  public descrizioneHtml = false;

  public azienda = new Azienda();

  public nuovo = false;

  @ViewChild('dataTable', { static: true }) table;

  constructor(
    public commonService: BVCommonService,
    public sessionService: SessionService,
    public appSessionService: AppSessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public alertService: AlertService,
    public logoutComm: LogoutCommunicationService,
    public ngZone: NgZone,
    private themeChanger: ThemeChangerService) {

    super(sessionService, router, richiesteService, alertService, appSessionService);
    this.vinoSelezionato = new Vino();
    this.vinoSelezionato.idVino = '';
    this.isImageSaved = false;
    this.cardImageBase64 = '';
    this.imageError = '';

    this.azienda = new Azienda();
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
    // necessario controllo se si è loggati, altrimenti goto login

    this.azienda.idAzienda = this.appSessionService.get(environment.KEY_AZIENDA_ID);
    this.azienda.nomeAzienda = this.appSessionService.get(environment.KEY_AZIENDA_NOME);

    this.caricaListaVini();
    this.themeChanger.loadStyle('test.css');
  }

  private caricaListaVini(): void {
    this.commonService.get(this.richiesteService.getRichiestaGetViniAzienda(this.appSessionService.get(environment.KEY_AZIENDA_ID)))
      .subscribe(r => {
        // this.vinoService.getViniAzienda(this.richiesteService.getRichiestaGetViniAzienda('1539014718497')).subscribe(r => {
        if (r.esito.codice === environment.ESITO_OK_CODICE) {
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
        this.manageHttpError(err);
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
      this.nuovo = true;
    }
  }

  public salvaVino(): void {
    this.vinoSelezionato.aziendaVino = this.azienda;
    this.commonService.put(this.richiesteService.getRichiestaPutVino(this.vinoSelezionato)).subscribe(r => {
      if (r.idVino) {
        this.alertService.presentAlert('salvato correttamente il vino con id: ' + r.idVino);
        this.caricaListaVini();
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

}
