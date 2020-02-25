import { Injectable } from '@angular/core';
import { BVHttpService } from '../common/bvhttp.service';
import { RispostaGetGenerica } from '../../models/comunicazioni/richieste/get/rispostagetgenerica';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';
import { Observable } from 'rxjs';
import { ConstantsService } from '../common/constants.service';
import { RichiestaPutGenerica } from '../../models/comunicazioni/richieste/put/richiestaputgenerica';
import { Provincia } from '../../models/entita/provincia/provincia';
import { RispostaPutGenerica } from '../../models/comunicazioni/richieste/put/rispostaputgenerica';

@Injectable()
export class EventiService {

  constructor(
    private httpService: BVHttpService,
    private constantsService: ConstantsService
  ) { }

  /**
     * Chiamata per ottenere l'elenco degli utenti completo.
     *
     */
  public getEventi(request: RichiestaGetGenerica): Observable<RispostaGetGenerica> {
    request.functionName = this.constantsService.getEventiFunctionName;
    return this.httpService.post(this.constantsService.getServiceName, request);
  }

  public getProvincie(request: RichiestaGetGenerica): Observable<RispostaGetGenerica> {
    request.functionName = this.constantsService.getProvincieFunctionName;
    return this.httpService.post(this.constantsService.getServiceName, request);
  }

  public putProvincia(request: RichiestaPutGenerica): Observable<RispostaPutGenerica> {
    return this.httpService.postPut(this.constantsService.putServiceName, request);
  }
}
