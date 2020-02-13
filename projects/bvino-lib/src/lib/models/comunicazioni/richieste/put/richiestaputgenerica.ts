import { Provincia } from '../../../entita/provincia/provincia';
import { Azienda } from '../../../entita/azienda/azienda';
import { Badge } from '../../../entita/badge/badge';
import { Evento } from '../../../entita/evento/evento';
import { Feed } from '../../../entita/feed/feed';
import { Utente } from '../../../entita/utente/utente';
import { Vino } from '../../../entita/vino/vino';

export class RichiestaPutGenerica {
  public provincia: Provincia;
  public azienda: Azienda;
  public badge: Badge;
  public evento: Evento;
  public feed: Feed;
  public utente: Utente;
  public vino: Vino;
  public base64Image: string;
  public tipoEntita: string;
  public filename: string;
  public idUtente: string;
  public functionName: string;
}
