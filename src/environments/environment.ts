// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseAppUrlGet: 'https://h8o3gup5lj.execute-api.eu-central-1.amazonaws.com',
  baseAppUrlPut: 'https://4aqjw0dwx0.execute-api.eu-central-1.amazonaws.com',
  baseAppUrlNotifica: 'https://d4rszjint3.execute-api.eu-central-1.amazonaws.com',
  tokenHeaderKey: 'Authorization',
  pathSeparator: '/',
  getServiceName: 'GET_SICURA',
  putServiceName: 'BeautifulVinoPut',
  notificationServiceName: 'BeautifulVinoNotification',
  KEY_AUTH_TOKEN: 'beautifulvino_authtoken',
  KEY_USER: 'beautifulvino_user',
  KEY_AZIENDA_ID: 'beautifulvino_azienda_id',
  KEY_AZIENDA_NOME: 'beautifulvino_azienda_nome',
  KEY_AZIENDA_LOGO: 'beautifulvino_azienda_logo',
  KEY_AZIENDA_SPLASHSCREEN: 'beautifulvino_azienda_splashscreen',
  KEY_AZIENDA_PAYPAL_CODE: 'beautifulvino_azienda_paypal_code',
  getAziendeFunctionName: 'getAziendeGen',
  getAziendaFunctionName: 'getAziendaGen',
  getProfiloAziendaFunctionName: 'getProfiloAziendaGen',
  getBadgeFunctionName: 'getBadgeGen',
  getBadgesFunctionName: 'getBadgesGen',
  getEventiFunctionName: 'getEventiGen',
  getEventiUtenteFunctionName: 'getEventiUtenteGen',
  getEventoFunctionName: 'getEventoGen',
  getFeedFunctionName: 'getFeedGen',
  getProvincieFunctionName: 'getProvinceGen',
  getTokenFunctionName: 'getTokenGen',
  getUtentiFunctionName: 'getUtentiGen',
  getUtenteFunctionName: 'getUtenteGen',
  getViniFunctionName: 'getViniGen',
  getVinoFunctionName: 'getVinoGen',
  getViniEventoFunctionName: 'getViniEventoGen',
  getPresenzeUtenteFunctionName: 'getPresenzeUtenteGen',
  getViniAziendaFunctionName: 'getViniAziendaGen',
  putImmaginiFunctionName: 'putImageGen',
  putProvinciaFunctionName: 'putProvinciaGen',
  putAziendaFunctionName: 'putAziendaGen',
  putEventoFunctionName: 'putEventoGen',
  putFeedFunctionName: 'putFeedGen',
  putUtenteFunctionName: 'putUtenteGen',
  putVinoFunctionName: 'putVinoGen',
  putUserProfileImageFunctionName: 'putUserProfileImageGen',
  putUserProfileImageWithUserFunctionName: 'putUserProfileImageWithUserGen',
  putPuntiEsperienzaFunctionName: 'putPuntiEsperienza',
  putBadgeFunctionName: 'putBadgeGen',
  ESITO_OK_CODICE: 100,
  ESITO_WARN_CODICE: 101,
  ESITO_KO_CODICE_ERRORE_SALVATAGGIO: 200,
  ESITO_KO_CODICE_ERRORE_CANCELLAZIONE: 201,
  ESITO_KO_CODICE_ERRORE_PROCEDURA_LAMBDA: 300,
  ESITO_KO_CODICE_ERRORE_INPUT_NULL: 400,
  ESITO_KO_CODICE_ERRORE_GET: 500,
  UserPoolId: '',
  ClientId: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error',  // Included with Angular CLI.
