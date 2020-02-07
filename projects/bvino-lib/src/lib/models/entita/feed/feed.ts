import { Vino } from '../vino/vino';
import { Evento } from '../evento/evento';
import { VinoFeed } from './vinofeed';
import { EventoFeed } from './eventofeed';
import { AziendaFeed } from './aziendafeed';

export class Feed {
  public idFeed: string;
  public idEntitaFeed: string;
  public tipoFeed: number;
  public dataFeed: number;
  public urlImmagineFeed: string;
  public urlVideoFeed: string;
  public titoloFeed: string;
  public testoLabelFeed: string;
  public idEntitaHeaderFeed: string;
  public dataEntitaHeaderFeed: number;
  public tipoEntitaHeaderFeed: string;
  public urlImmagineHeaderFeed: string;
  public headerFeed: string;
  public sottoHeaderFeed: string;
  public testoFeed: string;
  public visualizzaButtonFeed: string;
  public vinoFeed: Vino;
  public vinoFeedInt: VinoFeed;
  public eventoFeed: Evento;
  public eventoFeedInt: EventoFeed;
  public aziendaFeedInt: AziendaFeed;

}
