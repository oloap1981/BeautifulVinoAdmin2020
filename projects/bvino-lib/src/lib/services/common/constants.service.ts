import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  // public readonly baseAppUrlGet: string = 'https://gmnh1plxq7.execute-api.eu-central-1.amazonaws.com';// senza autenticazione
  public readonly baseAppUrlGet: string = 'https://h8o3gup5lj.execute-api.eu-central-1.amazonaws.com'; // con authenticazione
  public readonly baseAppUrlPut: string = 'https://4aqjw0dwx0.execute-api.eu-central-1.amazonaws.com';
  public readonly baseAppUrlNotifica: string = '';

  public readonly tokenHeaderKey: string = 'Authorization';
  public readonly pathSeparator: string = '/';

  // public readonly getServiceName: string = 'BeautifulVinoGet'; // senza authenticazione
  public readonly getServiceName: string = 'GET_SICURA'; // con authenticazione
  public readonly putServiceName: string = 'BeautifulVinoPut';
  public readonly notificationServiceName: string = 'BeautifulVinoNotification';


  sendNotification: 'https://d4rszjint3.execute-api.eu-central-1.amazonaws.com/BeautifulVinoNotification'

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
  public readonly getProvincieFunctionName: string = 'getProvinceGen';
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
  public readonly putProvinciaFunctionName: string = 'putProvinciaGen';
  public readonly putAziendaFunctionName: string = 'putAziendaGen';
  public readonly putEventoFunctionName: string = 'putEventoGen';
  public readonly putFeedFunctionName: string = 'putFeedGen';
  public readonly putUtenteFunctionName: string = 'putUtenteGen';
  public readonly putVinoFunctionName: string = 'putVinoGen';
  public readonly putUserProfileImageFunctionName: string = 'putUserProfileImageGen';
  public readonly putUserProfileImageWithUserFunctionName: string = 'putUserProfileImageWithUserGen';
  public readonly putPuntiEsperienzaFunctionName: string = 'putPuntiEsperienza';

  // codici esito
  public readonly ESITO_OK_CODICE: number = 100;
  public readonly ESITO_WARN_CODICE: number = 101;
  public readonly ESITO_KO_CODICE_ERRORE_SALVATAGGIO: number = 200;
  public readonly ESITO_KO_CODICE_ERRORE_CANCELLAZIONE: number = 201;
  public readonly ESITO_KO_CODICE_ERRORE_PROCEDURA_LAMBDA: number = 300;
  public readonly ESITO_KO_CODICE_ERRORE_INPUT_NULL: number = 400;
  public readonly ESITO_KO_CODICE_ERRORE_GET: number = 500;

  // chiavi sessione
  public KEY_AUTH_TOKEN = 'beautifulvino_authtoken';
  public KEY_USER = 'beautifulvino_user';
  public KEY_AZIENDA_ID = 'beautifulvino_azienda_id';
  public KEY_AZIENDA_NOME = 'beautifulvino_azienda_nome';
  public KEY_AZIENDA_COLORE_PRIMARIO = 'beautifulvino_azienda_colore_primario';
  public KEY_AZIENDA_COLORE_SECONDARIO = 'beautifulvino_azienda_colore_secondario';
  public KEY_AZIENDA_LOGO = 'beautifulvino_azienda_logo';
  public KEY_AZIENDA_SPLASHSCREEN = 'beautifulvino_azienda_splashscreen';
  public KEY_AZIENDA_PAYPAL_CODE = 'beautifulvino_azienda_paypal_code';

}
