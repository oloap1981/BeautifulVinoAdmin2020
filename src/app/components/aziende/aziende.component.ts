import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService, RichiesteService, ConstantsService, AlertService, Azienda, BVCommonService } from 'bvino-lib';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { IgxColumnMovingService } from 'igniteui-angular';

declare var $;
@Component({
  selector: 'app-aziende',
  templateUrl: './aziende.component.html',
  styleUrls: ['./aziende.component.scss']
})
export class AziendeComponent extends BaseComponent implements OnInit {

  dataTable: any;
  dtOptions: any;
  public tableData = [];

  public aziendaSelezionata: Azienda;

  public isImageSaved: boolean;
  public cardImageBase64: string;
  public imageError: string;

  @ViewChild('dataTable', { static: true }) table;

  constructor(
    public commonService: BVCommonService,
    public sessionService: SessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public constantsService: ConstantsService,
    public alertService: AlertService) {

    super(sessionService, router, richiesteService, constantsService, alertService);
    this.aziendaSelezionata = new Azienda();
    this.isImageSaved = false;
    this.cardImageBase64 = '';
    this.imageError = '';
  }

  ngOnInit() {
    this.commonService.get(this.richiesteService.getRichiestaGetAziende()).subscribe(r => {
      if (r.esito.codice === this.constants.ESITO_OK_CODICE) {
        this.tableData = this.normalizeList(r.aziende);
        this.dtOptions = {
          data: this.tableData,
          columns: [
            { title: 'Nome', data: 'nomeAzienda' },
            { title: 'Citta Azienda', data: 'cittaAzienda' }
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
              self.selectAzienda(data);
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

  private normalizeList(lista: Array<Azienda>): Array<Azienda> {
    const toReturn = new Array<Azienda>();

    for (const azienda of lista) {
      azienda.nomeAzienda = (azienda.nomeAzienda ? azienda.nomeAzienda : '');
      azienda.cittaAzienda = (azienda.cittaAzienda ? azienda.cittaAzienda : '');
      azienda.urlImmagineAzienda = (azienda.urlImmagineAzienda ? azienda.urlImmagineAzienda : '');
      azienda.urlLogoAzienda = (azienda.urlLogoAzienda ? azienda.urlLogoAzienda : '');

      toReturn.push(azienda);
    }

    return toReturn;
  }

  public isAziendaSelezionata(): boolean {
    return !(this.aziendaSelezionata.idAzienda === undefined || this.aziendaSelezionata.idAzienda === '');
  }

  private selectAzienda(data: any): void {
    console.log('Azienda cliccata: ' + data.nomeAzienda);
    this.aziendaSelezionata = data;
  }

  public fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  public removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

}
