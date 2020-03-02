import { Injectable, Inject } from '@angular/core';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';
import { RichiestaPutGenerica } from '../../models/comunicazioni/richieste/put/richiestaputgenerica';
import { Utente } from '../../models/entita/utente/utente';
import { Evento } from '../../models/entita/evento/evento';
import { Feed } from '../../models/entita/feed/feed';
import { Vino } from '../../models/entita/vino/vino';
import { Provincia } from '../../models/entita/provincia/provincia';
import { RichiestaNotificaGenerica } from '../../models/comunicazioni/richieste/notifica/richiestanotificagenerica';

@Injectable()
export class RichiesteService {
  constructor(@Inject('env') private env: any) {

  }

  // -------- GET --------

  public getRichiestaGetUtenti() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.env.getUtentiFunctionName;

    return richiesta;
  }

  public getRichiestaGetUtente(idUtente: string) {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.env.getUtenteFunctionName;
    richiesta.idUtente = idUtente;

    return richiesta;
  }

  public getRichiestaGetAziende() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.env.getAziendeFunctionName;

    return richiesta;
  }

  public getRichiestaGetBadges() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.env.getBadgesFunctionName;

    return richiesta;
  }

  public getRichiestaGetEventi() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.env.getEventiFunctionName;

    richiesta.idUtente = '';
    richiesta.elencoCompleto = 'S';

    return richiesta;
  }

  public getRichiestaGetProvincie() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.env.getProvincieFunctionName;

    return richiesta;
  }

  public getRichiestaGetFeed() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.env.getFeedFunctionName;

    return richiesta;
  }

  public getRichiestaGetVini() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.env.getViniFunctionName;

    return richiesta;
  }

  public getRichiestaGetViniAzienda(idAzienda: string) {
    const richiesta = new RichiestaGetGenerica();
    richiesta.idAzienda = idAzienda;
    richiesta.functionName = this.env.getViniAziendaFunctionName;

    return richiesta;
  }

  public getRichiestaGetProfiloAzienda(idProfiloAzienda: string) {
    const richiesta = new RichiestaGetGenerica();
    richiesta.idProfiloAzienda = idProfiloAzienda;
    richiesta.functionName = this.env.getProfiloAziendaFunctionName;

    return richiesta;
  }

  // -------- PUT --------

  public getRichiestaPutImmagine(file: any, filename: string, tipoEntita: string) {
    const richiesta = new RichiestaPutGenerica();

    richiesta.base64Image = file;
    richiesta.filename = filename;
    richiesta.tipoEntita = tipoEntita;

    richiesta.functionName = this.env.putImmaginiFunctionName;

    return richiesta;
  }

  public getRichiestaPutProvincia(provincia: Provincia) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.env.putProvinciaFunctionName;
    richiesta.provincia = provincia;
    return richiesta;
  }

  public getRichiestaPutUtente(utente: Utente) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.env.putUtenteFunctionName;
    richiesta.utente = utente;
    return richiesta;
  }

  public getRichiestaPutEvento(evento: Evento) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.env.putEventoFunctionName;
    richiesta.evento = evento;
    return richiesta;
  }

  public getRichiestaPutFeed(feed: Feed) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.env.putFeedFunctionName;
    richiesta.feed = feed;
    return richiesta;
  }


  public getRichiestaPutVino(vino: Vino) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.env.putVinoFunctionName;
    richiesta.vino = vino;
    return richiesta;
  }

  // -------- NOTIFICATION --------
  public getRichiestaNotifica(messaggio: string) {
    const richiesta = new RichiestaNotificaGenerica();
    richiesta.messaggio = messaggio;
    return richiesta;
  }
}
