import { Azienda } from '../azienda/azienda';
import { Evento } from '../evento/evento';
import { Utente } from '../utente/utente';
import { AziendaVino } from './aziendavino';
import { EventoVino } from './eventovino';
import { UtenteVino } from './utentevino';

export class Vino {
  public idVino: string;
  public nomeVino: string;
  public annoVino: number;
  public inBreveVino: string;
  public descrizioneVino: string;
  public infoVino: string;
  public uvaggioVino: string;
  public regioneVino: string;
  public profumoVino: string;
  public urlLogoVino: string;
  public urlImmagineVino: string;
  public statoVino: string;
  public prezzoVino: number;
  public acquistabileVino: number;
  public aziendaVino: Azienda;
  public eventiVino: Array<Evento>;
  public utentiVino: Array<Utente>;
  public aziendaVinoInt: AziendaVino;
  public eventiVinoInt: Array<EventoVino>;
  public utentiVinoInt: Array<UtenteVino>;
}
