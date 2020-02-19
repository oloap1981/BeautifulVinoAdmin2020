import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  public readonly baseAppUrl: string = 'https://gmnh1plxq7.execute-api.eu-central-1.amazonaws.com';
  public readonly tokenHeaderKey: string = 'Authorization';
  public readonly pathSeparator: string = '/';

  public readonly getServiceName: string = 'BeautifulVinoGet';

  // nomi funzioni GET
  public readonly getAziendeFunctionName: string = 'getAziendeGen';
  public readonly getAziendaFunctionName: string = 'getAziendaGen';
  public readonly getProfiloAziendaFunctionName: string = 'getProfiloAziendaGen';
  public readonly getBadgeFunctionName: string = 'getBadgeGen';
  public readonly getBadgesFunctionName: string = 'getBadgesGen';
  public readonly getEventiFunctionName: string = 'getEventiGen';
  public readonly getEventiUtenteFunctionName: string = 'getEventiUtenteGen';
  public readonly getEventoFunctionName: string = 'getEventoGen';
  public readonly getFeedFunctionName: string = 'getFeedGen';
  public readonly getProvinceFunctionName: string = 'getProvinceGen';
  public readonly getTokenFunctionName: string = 'getTokenGen';
  public readonly getUtentiFunctionName: string = 'getUtentiGen';
  public readonly getUtenteFunctionName: string = 'getUtenteGen';
  public readonly getViniFunctionName: string = 'getViniGen';
  public readonly getVinoFunctionName: string = 'getVinoGen';
  public readonly getViniEventoFunctionName: string = 'getViniEventoGen';
  public readonly getPresenzeUtenteFunctionName: string = 'getPresenzeUtenteGen';
  public readonly getViniAziendaFunctionName: string = 'getViniAziendaGen';

  // nomi funzioni PUT
  public readonly putImmaginiFunctionName: string = 'putImageGen';

  // codici esito
  public readonly ESITO_OK_CODICE: number = 100;
  public readonly ESITO_WARN_CODICE: number = 101;
  public readonly ESITO_KO_CODICE_ERRORE_SALVATAGGIO: number = 200;
  public readonly ESITO_KO_CODICE_ERRORE_CANCELLAZIONE: number = 201;
  public readonly ESITO_KO_CODICE_ERRORE_PROCEDURA_LAMBDA: number = 300;
  public readonly ESITO_KO_CODICE_ERRORE_INPUT_NULL: number = 400;
  public readonly ESITO_KO_CODICE_ERRORE_GET: number = 500;

}
