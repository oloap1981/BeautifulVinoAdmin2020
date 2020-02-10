import { Injectable } from '@angular/core';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';
import { ConstantsService } from './constants.service';

@Injectable()
export class RichiesteService {
  constructor(private constants: ConstantsService) {

  }

  public getRichiestaGetUtenti() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getUtentiFunctionName;

    return richiesta;
  }

}
