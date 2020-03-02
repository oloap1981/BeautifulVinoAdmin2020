import { Component, OnInit, NgZone } from '@angular/core';
import { SessionService, RichiesteService, AlertService, Utente, BVCommonService } from 'bvino-lib';
import { Router } from '@angular/router';
import { AppSessionService } from 'src/app/services/appSession.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent extends BaseComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();
  private testoNotifica = '';

  constructor(
    public sessionService: SessionService,
    public router: Router,
    public commonService: BVCommonService,
    public richiesteService: RichiesteService,
    public alertService: AlertService,
    public appSessionService: AppSessionService,
    public logoutComm: LogoutCommunicationService,
    public ngZone: NgZone) {
    super(sessionService, router, richiesteService, alertService, appSessionService);
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
  }

  public inviaNotifica() {
    this.commonService.putNotifica(this.richiesteService.getRichiestaNotifica(this.testoNotifica)).subscribe(r => {
      this.alertService.presentAlert('Notifica inviata correttamente');
    }, err => {
      this.manageHttpError(err);
    });
  }

}


// $scope.testo1 = $scope.testo.replace(/\"/g, '\\\\\\\"');

// console.log($scope.testo1);
// let mess =
//   `{
// 				"default": "`+ $scope.testo1 + `",
// 				"GCM": "{ \\"notification\\": { \\"text\\": \\"`+ $scope.testo1 + `\\",\\"sound\\":\\"default\\" } }",
// 				"APNS": "{\\"aps\\":{\\"alert\\": \\"`+ $scope.testo1 + `\\", \\"badge\\" :1,\\"sound\\" : \\"default\\"} }",
// 				"APNS_SANDBOX":"{\\"aps\\":{\\"alert\\": \\"`+ $scope.testo1 + `\\", \\"badge\\" :1,\\"sound\\" : \\"default\\"} }"
// 			}`

// sendNotification.response(mess).then(function (result) {
//   console.log(result);
//   alert("notifica inviata con successo");
// }).catch(function (e) {
//   $scope.codiceEsito = 'ERRORE' + e;
//   console.log('Error');
//   alert("errore invio notifica");
// });
// console.log(mess);
