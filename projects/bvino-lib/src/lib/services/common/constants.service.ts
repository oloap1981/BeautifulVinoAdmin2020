import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  public readonly baseAppUrl: string = 'https://kwjrgd8ur7.execute-api.eu-central-1.amazonaws.com/GetAuth';
  public readonly tokenHeaderKey: string = 'Authorization';
  public readonly pathSeparator: string = '/';

  public readonly getServiceName: string = 'GetAuth';

  // nomi funzioni
  public readonly getUtentiFunctionName: string = 'getUtentiGen';

}
