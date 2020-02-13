import { Injectable } from '@angular/core';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';
import { ConstantsService } from './constants.service';
import { RichiestaPutGenerica } from '../../models/comunicazioni/richieste/put/richiestaputgenerica';

@Injectable()
export class RichiesteService {
  constructor(private constants: ConstantsService) {

  }

  public getRichiestaGetUtenti() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getUtentiFunctionName;

    return richiesta;
  }

  public getRichiestaGetAziende() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getAziendeFunctionName;

    return richiesta;
  }

  public getRichiestaGetBadges() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getBadgesFunctionName;

    return richiesta;
  }

  public getRichiestaGetEventi() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getEventiFunctionName;

    return richiesta;
  }

  public getRichiestaGetFeed() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getFeedFunctionName;

    return richiesta;
  }

  public getRichiestaGetVini() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getViniFunctionName;

    return richiesta;
  }

  public getRichiestaPutImmagine(file: any, filename: string, tipoEntita: string) {
    const richiesta = new RichiestaPutGenerica();

    richiesta.base64Image = file;
    richiesta.filename = filename;
    richiesta.tipoEntita = tipoEntita;

    richiesta.functionName = this.constants.putImmaginiFunctionName;

    return richiesta;
  }

}
