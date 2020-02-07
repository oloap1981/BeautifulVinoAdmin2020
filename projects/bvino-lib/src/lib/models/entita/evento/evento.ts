import { Azienda } from '../azienda/azienda';
import { BadgeEvento } from './badgeevento';
import { ProvinciaEvento } from './provinciaevento';
import { AziendaEvento } from './aziendaevento';
import { UtenteEvento } from './utenteevento';
import { VinoEvento } from './vinoevento';
import { Vino } from '../vino/vino';
import { Badge } from '../badge/badge';
import { Provincia } from '../provincia/provincia';
import { Utente } from '../utente/utente';

export class Evento {
  public idEvento: string;
  public dataEvento: number;
  public dataEventoa: string;
  public cittaEvento: string;
  public titoloEvento: string;
  public temaEvento: string;
  public prezzoEvento: number;
  public urlFotoEvento: string;
  public statoEvento: string;
  public testoEvento: string;
  public latitudineEvento: number;
  public longitudineEvento: number;
  public indirizzoEvento: string;
  public telefonoEvento: string;
  public emailEvento: string;
  public numMaxPartecipantiEvento: number;
  public numPostiDisponibiliEvento: number;
  public badgeEvento: Badge;
  public provinciaEvento: Provincia;
  public aziendaOspitanteEvento: Azienda;
  public iscrittiEvento: Array<Utente>;
  public viniEvento: Array<Vino>;
  public badgeEventoInt: BadgeEvento;
  public provinciaEventoInt: ProvinciaEvento;
  public aziendaOspitanteEventoInt: AziendaEvento;
  public aziendaFornitriceEventoInt: AziendaEvento;
  public iscrittiEventoInt: Array<UtenteEvento>;
  public viniEventoInt: Array<VinoEvento>;
  public aziendeViniEvento: Array<Azienda>;
}
