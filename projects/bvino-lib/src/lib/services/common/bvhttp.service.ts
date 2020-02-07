import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

import { Observable } from 'rxjs';


import { ConstantsService } from './constants.service';
import { RispostaGetGenerica } from '../../models/comunicazioni/richieste/get/rispostagetgenerica';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';


@Injectable()
export class BVHttpService {

  private httpClientLogin: HttpClient;

  constructor(
    private http: HttpClient,
    private constantsService: ConstantsService,
    private backEnd: HttpBackend) {
    this.httpClientLogin = new HttpClient(this.backEnd);
  }

  public post(path: string, request: RichiestaGetGenerica): Observable<RispostaGetGenerica> {
    return this.http.post<RispostaGetGenerica>(
      this.constantsService.baseAppUrl
      + this.constantsService.pathSeparator
      + path, request);
  }

  // public getNoToken(path: string): Observable<RispostaGetGenerica> {
  //   console.log('HttpService get ' + path);
  //   return this.httpClientLogin.get<RispostaGetGenerica>(this.constants.baseAppUrl + '/' + path);
  // }

  // public post(path: string, body: any): Observable<Http.HttpResponse> {
  //   return this.http.post<Http.HttpResponse>(this.constants.baseAppUrl + '/' + path, body);
  // }

  // public postNoToken(path: string, body: any): Observable<Http.HttpResponse> {
  //   console.log('HttpService post ' + path);
  //   return this.httpClientLogin.post<Http.HttpResponse>(this.constants.baseAppUrl + '/' + path, body);
  // }

}
