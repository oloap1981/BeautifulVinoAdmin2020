import { Component, OnInit } from '@angular/core';
import { SessionService, RichiestaGetGenerica, UtentiService } from 'bvino-lib';
import { AppSessionService } from 'src/app/services/appSession.service';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: CognitoUserSession;

  constructor(private appSessionService: AppSessionService,
    private sessionService: SessionService,
    private utentiService: UtentiService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this.appSessionService.get(this.sessionService.KEY_USER)) as CognitoUserSession;
    this.getUtentiList();
  }

  private getUtentiList(): void {
    const richiesta = new RichiestaGetGenerica();
    this.utentiService.getUtenti(richiesta).subscribe(risposta => {
      if (risposta.esito.codice === 100) {
        const lista = risposta.utenti;
        console.log('numero utenti trovati ' + lista.length);
      } else {
        console.log('problema durante l operazione ' + risposta.esito.message);
      }
    });
  }

}
