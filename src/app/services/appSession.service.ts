import { Injectable } from '@angular/core';
import { SessionService } from 'bvino-lib';
import { CookieService } from 'ngx-cookie-service';

/**
 *Wrapper per la sessione in libreria che aggiunge la gestione dei cookies
 *
 * @export
 * @class AppSessionService
 */
@Injectable()
export class AppSessionService {

  constructor(
    private sessionService: SessionService,
    private cookieService: CookieService) { }

  /**
   * controlla sia nella sessione che nei cookies. La precedenza va alla sessione per velocizzare le operazioni
   *
   *
   */
  public get(key: string): string {
    const objectInSession = this.sessionService.get(key);
    if (objectInSession === undefined || objectInSession === null) {
      // non c'è l'oggetto in sessione. Controllo se è nei cookies
      const objectInCookiesEncoded = this.cookieService.get(key); // usiamo le stesse chiavi
      if (objectInCookiesEncoded === undefined || objectInCookiesEncoded === null || objectInCookiesEncoded === '') {
        // non ho trovato niente ne' in sessione, ne' tra i cookies
        return '';
      } else {
        return window.btoa(objectInCookiesEncoded);
      }
    } else {
      this.cookieService.set(key, window.atob(objectInSession));
      return objectInSession;
    }
  }

  public set(key: string, value: string): void {
    this.sessionService.set(key, value);
    const encodedValue = window.atob(value);
    this.cookieService.set(key, encodedValue, null, '/');
  }

  // cancellazione e svuotamento da fare
  public deleteKey(key: string): void {
    this.sessionService.deleteKey(key);
    this.cookieService.delete(key);
  }

  public clearAll(): void {
    this.sessionService.clearSession();
    this.cookieService.deleteAll('/');
  }
}