import { Azienda } from '../../../entita/azienda/azienda';
import { Evento } from '../../../entita/evento/evento';
import { Vino } from '../../../entita/vino/vino';
import { Badge } from '../../../entita/badge/badge';
import { Feed } from '../../../entita/feed/feed';
import { Provincia } from '../../../entita/provincia/provincia';
import { Token } from '../../../entita/token/token';
import { Utente } from '../../../entita/utente/utente';
import { Esito } from '../../../entita/esito/esito';

export class RispostaGetGenerica {
  public stato: string;
  public azienda: Azienda;
  public eventiAzienda: Array<Evento>;
  public viniAzienda: Array<Vino>;
  public aziende: Array<Azienda>;
  public badge: Badge;
  public numTotEventi: number;
  public eventi: Array<Evento>;
  public evento: Evento;
  public numTotFeed: number;
  public feed: Array<Feed>;
  public province: Array<Provincia>;
  public newToken: Token;
  public utente: Utente;
  public utenti: Array<Utente>;
  public vini: Array<Vino>;
  public badges: Array<Badge>;
  public vino: Vino;
  public token: Token;
  public utentePresente: number;
  public esito: Esito;
}
