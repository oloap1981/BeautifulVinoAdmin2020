import { Component, OnInit, NgZone } from '@angular/core';
import { AppSessionService } from 'src/app/services/appSession.service';
import { environment } from 'src/environments/environmentnokeys';
import { Badge, RichiesteService, BVCommonService, SessionService, AlertService, Utente } from 'bvino-lib';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { PageManagerService } from 'src/app/services/pagemanager/pagemanager.service';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { ThemeChangerService } from 'src/app/services/themeChanger/themechanger.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  dataTable: any;
  public tableData: Array<Badge>;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject<void>();

  private isTableInitialized = false;

  public badgeSelezionato = new Badge();
  public nuovo = false;

  constructor(
    public commonService: BVCommonService,
    public sessionService: SessionService,
    public router: Router,
    public richiesteService: RichiesteService,
    public alertService: AlertService,
    public ngZone: NgZone,
    public appSessionService: AppSessionService,
    public pageManagerService: PageManagerService,
    public logoutComm: LogoutCommunicationService,
    public themeChanger: ThemeChangerService) {

      super(sessionService, router, richiesteService, alertService, appSessionService, pageManagerService);
    }

  ngOnInit() {
    this.appSessionService.set(this.appSessionService.NAVIGATION_PAGE_KEY, environment.NAVIGATION_PAGENAME_BADGE);
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

      this.checkAuthenticated();
      if (this.utenteAutenticato.ruoloUtente === undefined || this.utenteAutenticato.ruoloUtente === '') {
        this.alertService.presentAlert('utente loggato non ha il ruolo configurato.');
        this.goToPage('login');
      } else {
        this.caricaBadges();
      }
    }
  }

  public nuovoBadge(): void {
    if (confirm('Creando un nuovo badge le informazioni non salvate di quello attuale saranno perse. Procedere?')) {
      this.badgeSelezionato = new Badge();
      this.nuovo = true;
    }
  }

  private caricaBadges() {
    const richiesta = this.richiesteService.getRichiestaGetBadges();
    this.commonService.get(richiesta).subscribe(r => {
      if (r.esito.codice === environment.ESITO_OK_CODICE) {
        this.tableData = r.badges;
        if (!this.isTableInitialized) {
          this.dtTrigger.next();
          this.isTableInitialized = true;
        }
      } else {
        this.manageError(r);
      }
    });
  }

  public salvaBadge(): void {
    this.commonService.put(this.richiesteService.getRichiestaPutBadge(this.badgeSelezionato)).subscribe(r => {
      if (r.idAzienda) {
        this.alertService.presentAlert('modifiche azienda salvate correttamente');
        this.caricaBadges();
      } else {
        this.manageErrorPut('Azienda');
      }
    }, err => {
      this.manageHttpError(err);
    });
    this.nuovo = false;
  }

  public duplicaBadge(): void {
    if (confirm('Sicuri di voler duplicare questo badge?')) {
      this.badgeSelezionato.idBadge = '';
      this.nuovo = true;
    }
  }

  public isBadgeSelezionato(): boolean {
    return !(this.badgeSelezionato.idBadge === undefined || this.badgeSelezionato.idBadge === '');
  }

  public selectBadge(data: any): void {
    console.log('Badge cliccato: ' + data.nomeBadge);
    this.badgeSelezionato = data;
  }

  public fileUploadedImmagine(event: any) {
    console.log('azienda-gestione-component, file caricato: ' + event);
    this.badgeSelezionato.urlLogoBadge = event;
  }

}
