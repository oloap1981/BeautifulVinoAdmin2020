import { Component, OnInit, NgZone } from '@angular/core';
import { BVCommonService, RichiesteService } from 'bvino-lib';
import { AppSessionService } from 'src/app/services/appSession.service';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LogoutCommunicationService } from 'src/app/services/logoutCommunication/logoutcommunication.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environmentnokeys';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public user: CognitoUserSession;

  constructor(private appSessionService: AppSessionService,
    public router: Router,
    private commonService: BVCommonService,
    private richiesteService: RichiesteService,
    public logoutComm: LogoutCommunicationService,
    public ngZone: NgZone
  ) { }

  ngOnInit() {
    this.logoutComm.logoutObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      this.ngZone.run(() => this.router.navigate(['login'])).then();
    });

    this.user = JSON.parse(this.appSessionService.get(environment.KEY_USER)) as CognitoUserSession;
    this.getUtentiList();
  }

  private getUtentiList(): void {
    this.commonService.get(this.richiesteService.getRichiestaGetUtenti()).subscribe(risposta => {
      if (risposta.esito.codice === 100) {
        const lista = risposta.utenti;
        console.log('numero utenti trovati ' + lista.length);
      } else {
        console.log('problema durante l operazione ' + risposta.esito.message);
      }
    });
  }

}
