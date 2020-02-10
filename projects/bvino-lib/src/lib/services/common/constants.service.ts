import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  public readonly baseAppUrl: string = 'https://gmnh1plxq7.execute-api.eu-central-1.amazonaws.com';
  public readonly tokenHeaderKey: string = 'Authorization';
  public readonly pathSeparator: string = '/';

  public readonly getServiceName: string = 'BeautifulVinoGet';

  // nomi funzioni
  public readonly getUtentiFunctionName: string = 'getUtentiGen';

  // codici esito
  public readonly ESITO_OK_CODICE: number = 100;
  public readonly ESITO_WARN_CODICE: number = 101;
  public readonly ESITO_KO_CODICE_ERRORE_SALVATAGGIO: number = 200;
  public readonly ESITO_KO_CODICE_ERRORE_CANCELLAZIONE: number = 201;
  public readonly ESITO_KO_CODICE_ERRORE_PROCEDURA_LAMBDA: number = 300;
  public readonly ESITO_KO_CODICE_ERRORE_INPUT_NULL: number = 400;
  public readonly ESITO_KO_CODICE_ERRORE_GET: number = 500;

}
