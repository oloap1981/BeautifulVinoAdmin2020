import { IdToken } from './idtoken';
import { AccessToken } from './accesstoken';
import { RefreshToken } from './refreshtoken';

export class AwsToken {
    public idToken: IdToken;
    public accessToken: AccessToken;
    public refreshToken: RefreshToken;
    public clockDrift: number;
}