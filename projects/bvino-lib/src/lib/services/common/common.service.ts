import { RichiestaPutGenerica } from '../../models/comunicazioni/richieste/put/richiestaputgenerica';
import { Observable } from 'rxjs';
import { RispostaPutGenerica } from '../../models/comunicazioni/richieste/put/rispostaputgenerica';
import { BVHttpService } from './bvhttp.service';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';
import { RispostaGetGenerica } from '../../models/comunicazioni/richieste/get/rispostagetgenerica';
import { Injectable, Inject } from '@angular/core';
import { RichiestaNotificaGenerica } from '../../models/comunicazioni/richieste/notifica/richiestanotificagenerica';
import { RispostaNotificaGenerica } from '../../models/comunicazioni/richieste/notifica/rispostanotificagenerica';

@Injectable()
export class BVCommonService {

  constructor(
    private httpService: BVHttpService,
    @Inject('env') private env: any
  ) { }

  public putNotifica(request: RichiestaNotificaGenerica): Observable<RispostaNotificaGenerica> {
    return this.httpService.postNotifica(this.env.notificationServiceName, request);
  }

  public put(request: RichiestaPutGenerica): Observable<RispostaPutGenerica> {
    return this.httpService.postPut(this.env.putServiceName, request);
  }

  public get(request: RichiestaGetGenerica): Observable<RispostaGetGenerica> {
    return this.httpService.post(this.env.getServiceName, request);
  }
}
