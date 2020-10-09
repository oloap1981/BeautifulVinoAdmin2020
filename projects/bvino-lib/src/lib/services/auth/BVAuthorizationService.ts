import { OnInit, Injectable, Inject } from '@angular/core';
import { AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { SessionService } from '../common/session.service';
import { CodeDeliveryDetailsType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import * as CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';



@Injectable()
export class BVAuthorizationService implements OnInit {

  cognitoUser: any;

  private poolData = {
    UserPoolId: this.env.UserPoolId,
    ClientId: this.env.ClientId
  };

  private userPool = new CognitoUserPool(this.poolData);

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(sessionService: SessionService,
    @Inject('env') private env: any) {

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
      return this.userPool.signUp(username, password, attributeList, null, function (err, result) {
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

  public signin(username: string, password: string): Observable<any> {
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: username,
      Pool: this.userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');

    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          console.log(err);
          observer.error(err);
        },
        newPasswordRequired: function(resp) {
          resp.challenge = 'NEW_PASSWORD_REQUIRED';
          observer.next(resp);
          observer.complete();
        }
      });
    });
  }

  public signOut(username: string): void {
    const userData = {
      Username: username,
      Pool: this.userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.signOut();
  }

  public forgotPassword(username: string): Observable<CodeDeliveryDetailsType> {

    const userData = {
      Username: username,
      Pool: this.userPool
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

  public changePassword(username: string, oldpassword: string, password: string): Observable<CodeDeliveryDetailsType> {

    const userData = {
      Username: username,
      Pool: this.userPool
    };
    // const currentUser = this.userPool.getCurrentUser();
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.getSession(result => {
      const session = result;
      console.log('session: ' + JSON.stringify(session));
    });

    const serviceProvider = new CognitoIdentityServiceProvider({ region: 'eu-central-1' });

    return Observable.create(observer => {
      cognitoUser.changePassword(oldpassword, password, (error, result) => {
        if (result) {
          console.log('result change password: ' + JSON.stringify(result));
          observer.next(result);
          observer.complete();
        }
        if (error) {
          console.log('error change password: ' + JSON.stringify(error));
          observer.error(error);
        }
      });
    });
  }

  public isLoggedIn() {
    return this.userPool.getCurrentUser() !== null;
  }

  public getAuthenticatedUser() {
    return this.userPool.getCurrentUser();
  }

}
