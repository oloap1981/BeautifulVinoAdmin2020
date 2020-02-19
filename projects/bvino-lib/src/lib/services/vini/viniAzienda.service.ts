import { Injectable } from '@angular/core';
import { BVHttpService } from '../common/bvhttp.service';
import { RispostaGetGenerica } from '../../models/comunicazioni/richieste/get/rispostagetgenerica';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';
import { Observable } from 'rxjs';
import { ConstantsService } from '../common/constants.service';

@Injectable()
export class ViniAziendaService {

  constructor(
    private httpService: BVHttpService,
    private constantsService: ConstantsService
  ) { }

  /**
     * Chiamata per ottenere l'elenco degli utenti completo.
     *
     */
  public getViniAzienda(request: RichiestaGetGenerica): Observable<RispostaGetGenerica> {
    request.functionName = this.constantsService.getViniAziendaFunctionName;
    return this.httpService.post(this.constantsService.getServiceName, request);
  }
}
