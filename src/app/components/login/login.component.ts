import { Component, OnInit } from '@angular/core';
import { BVAuthorizationService, SessionService } from 'bvino-lib';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { AppSessionService } from 'src/app/services/appSession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(
    private authService: BVAuthorizationService,
    private appSessionService: AppSessionService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
  }

  public login() {
    this.authService.signin(this.username, this.password).subscribe(

      (response: CognitoUserSession) => {
        const accessToken = response.getAccessToken();
        const idToken = response.getIdToken();

        this.appSessionService.set(this.sessionService.KEY_AUTH_TOKEN, accessToken.getJwtToken());
        this.appSessionService.set(this.sessionService.KEY_USER, JSON.stringify(response));

        this.router.navigate(['/home']);
      },
      (err) => {
        console.log('ERRORE DI AUTENTICAZIONE: ' + err);
      });
  }
}
