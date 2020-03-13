import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RispostaGetGenerica } from '../../models/comunicazioni/richieste/get/rispostagetgenerica';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';
import { RispostaPutGenerica } from '../../models/comunicazioni/richieste/put/rispostaputgenerica';
import { RichiestaPutGenerica } from '../../models/comunicazioni/richieste/put/richiestaputgenerica';
import { RichiestaNotificaGenerica } from '../../models/comunicazioni/richieste/notifica/richiestanotificagenerica';
import { RispostaNotificaGenerica } from '../../models/comunicazioni/richieste/notifica/rispostanotificagenerica';
import { RichiestaConnectGenerica } from '../../models/comunicazioni/richieste/connect/richiestaconnectgenerica';
import { RispostaConnectGenerica } from '../../models/comunicazioni/richieste/connect/rispostaconnectgenerica';


@Injectable()
export class BVHttpService {

  constructor(
    private http: HttpClient,
    private backEnd: HttpBackend,
    @Inject('env') private env: any) {
  }

  public post(path: string, request: RichiestaGetGenerica): Observable<RispostaGetGenerica> {
    return this.http.post<RispostaGetGenerica>(
      this.env.baseAppUrlGet
      + this.env.pathSeparator
      + path, request);
  }

  public postPut(path: string, request: RichiestaPutGenerica): Observable<RispostaPutGenerica> {
    return this.http.post<RispostaPutGenerica>(
      this.env.baseAppUrlPut
      + this.env.pathSeparator
      + path, request);
  }

  public postNotifica(path: string, request: RichiestaNotificaGenerica): Observable<RispostaNotificaGenerica> {
    return this.http.post<RispostaNotificaGenerica>(
      this.env.baseAppUrlNotifica
      + this.env.pathSeparator
      + path, request);
  }

  public postConnect(path: string, request: RichiestaConnectGenerica): Observable<RispostaConnectGenerica> {
    return this.http.post<RispostaConnectGenerica>(
      this.env.baseAppUrlConnect
      + this.env.pathSeparator
      + path, request);
  }

}
