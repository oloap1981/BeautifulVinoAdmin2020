import { OnInit, Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { SessionService } from '../common/session.service';
import { CodeDeliveryDetailsType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

const poolData = {
  UserPoolId: 'eu-central-1_KzlMv3BwL',
  ClientId: '25i6sfibl4qqqk2g8vgsmtsth7'
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

  public signup(username: string, password: string, name: string): Observable<CodeDeliveryDetailsType> {

    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: username
    };

    const dataPersonalName = {
      Name: 'name',
      Value: name
    };

    const dataPersonalNickname = {
      Name: 'nickname',
      Value: name
    };

    const emailAttribute = new CognitoUserAttribute(dataEmail);
    const nameAttribute = new CognitoUserAttribute(dataPersonalName);
    const nicknameAttribute = new CognitoUserAttribute(dataPersonalNickname);

    attributeList.push(emailAttribute);
    attributeList.push(nameAttribute);
    attributeList.push(nicknameAttribute);

    return Observable.create(observer => {
      return userPool.signUp(username, password, attributeList, null, function (err, result) {
        if (err) {
          observer.error(err);
          console.log(err);
        } else {
          observer.next(result);
          observer.complete();
        }
      });
    });
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

  public signOut(username: string): void {
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.signOut();
  }

  public forgotPassword(username: string): Observable<CodeDeliveryDetailsType> {

    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      cognitoUser.forgotPassword({
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
