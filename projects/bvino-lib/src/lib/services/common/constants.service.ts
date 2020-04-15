import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  public RUOLO_SUPER_ADMIN = 'SA';
  public RUOLO_AZIENDA_ADMIN = 'AA';
  public RUOLO_UTENTE_GENERICO = 'UG';
  public RUOLO_UTENTE_AZIENDA = 'UA';

  public KEY_AZIENDA_ID_DEFAULT = '000';
  public KEY_AZIENDA_NOME_DEFAULT = 'Beautiful Vino';
  public KEY_AZIENDA_LOGO_DEFAULT = '';
  public KEY_AZIENDA_SPLASHSCREEN_DEFAULT = '';
  public KEY_AZIENDA_PAYPALCODE_DEFAULT = '';

}
