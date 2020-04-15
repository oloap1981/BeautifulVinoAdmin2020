import { Azienda } from '../../../entita/azienda/azienda';
import { Badge } from '../../../entita/badge/badge';
import { Vino } from '../../../entita/vino/vino';
import { Utente } from '../../../entita/utente/utente';

export class RichiestaConnectGenerica {

  public functionName: string;

  public badges: Array<Badge>;
  public idUtente: string;
  public idEvento: string;
  public idVino: string;
  public dataEvento: number;
  public dataPrenotazioneEvento: number;
  public statoEvento: string;
  public statoVino: string;
  public statoUtente: string;
  public viniAzienda: Array<Vino>;
  public utenti: Array<Utente>;
  public idAzienda: string;
  public aziendeViniDaAssociare: Array<Azienda>;
  public numeroPartecipanti: number;
  public statoPreferitoEvento: number;
  public statoAcquistatoEvento: number;
}
