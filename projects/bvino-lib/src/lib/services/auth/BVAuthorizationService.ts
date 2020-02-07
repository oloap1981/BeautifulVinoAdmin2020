import { OnInit, Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { SessionService } from '../common/session.service';

const poolData = {
  UserPoolId: 'eu-central-1_KzlMv3BwL',
  ClientId: '7oghv1vbub9th7j7d5bgvdr0ha'
};

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class BVAuthorizationService implements OnInit {

  cognitoUser: any;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(sessionService: SessionService) {

  }

  public signin(username: string, password: string): Observable<CognitoUserSession> {
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          console.log(err);
          observer.error(err);
        }
      });
    });
  }

  public isLoggedIn() {
    return userPool.getCurrentUser() !== null;
  }

  public getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

}
