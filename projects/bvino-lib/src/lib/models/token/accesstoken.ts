import { AccessTokenPayload } from './accesstokenpayload';

export class AccessToken {
    public jwtToken: string;
    public payload: AccessTokenPayload;
}