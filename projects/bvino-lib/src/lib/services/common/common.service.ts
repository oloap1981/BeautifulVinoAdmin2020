import { RichiestaPutGenerica } from '../../models/comunicazioni/richieste/put/richiestaputgenerica';
import { Observable } from 'rxjs';
import { RispostaPutGenerica } from '../../models/comunicazioni/richieste/put/rispostaputgenerica';
import { ConstantsService } from './constants.service';
import { BVHttpService } from './bvhttp.service';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';
import { RispostaGetGenerica } from '../../models/comunicazioni/richieste/get/rispostagetgenerica';
import { Injectable } from '@angular/core';

@Injectable()
export class BVCommonService {

  constructor(
    private constantsService: ConstantsService,
    private httpService: BVHttpService
  ) { }

  public put(request: RichiestaPutGenerica): Observable<RispostaPutGenerica> {
    return this.httpService.postPut(this.constantsService.putServiceName, request);
  }

  public get(request: RichiestaGetGenerica): Observable<RispostaGetGenerica> {
    return this.httpService.post(this.constantsService.getServiceName, request);
  }
}
