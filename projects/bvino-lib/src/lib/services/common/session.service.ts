import { Injectable } from '@angular/core';

/**
 * servizio di sessione contenente una mappa che consente di scambiare informazioni nella sessione
 * questo servizio si occupa anche di gestire la persistenza delle informazioni a livello di cookies
 *
 */
@Injectable()
export class SessionService {

  /*
    la mappa è fatta per contenere solo stringhe. In caso di oggetti e JSON usare
    JSON.parse (da stringa a oggetto)
    JSON.stringfy (da oggetto a stringa)
  */
  private sessionMap: Map<string, string>;

  constructor() {
    this.sessionMap = new Map<string, string>();
  }

  public set(key: string, value: string): void {
    this.sessionMap.set(key, value);
  }

  public get(key: string): string {
    return this.sessionMap.get(key);
  }

  public clearSession(): void {
    this.sessionMap.clear();
  }

  public deleteKey(key: string): void {
    this.sessionMap.delete(key);
  }

}
