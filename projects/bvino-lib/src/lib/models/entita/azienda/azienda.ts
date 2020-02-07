import { EventoAzienda } from './eventoazienda';
import { VinoAzienda } from './vinoazienda';
import { Evento } from '../evento/evento';
import { Vino } from '../vino/vino';

export class Azienda {
  public idAzienda: string;
  public zonaAzienda: string;
  public nomeAzienda: string;
  public infoAzienda: string;
  public descrizioneAzienda: string;
  public cittaAzienda: string;
  public regioneAzienda: string;
  public indirizzoAzienda: string;
  public latitudineAzienda: number;
  public longitudineAzienda: number;
  public urlLogoAzienda: string;
  public urlImmagineAzienda: string;
  public sitoAzienda: string;
  public emailAzienda: string;
  public emailSecondariaAzienda: string;
  public telefonoAzienda: string;
  public eventiAzienda: Array<Evento>;
  public viniAzienda: Array<Vino>;
  public eventiAziendaInt: Array<EventoAzienda>;
  public viniAziendaInt: Array<VinoAzienda>;
  public numEventiAzienda: number;
  public numViniAzienda: number;
  public active: boolean;
}
