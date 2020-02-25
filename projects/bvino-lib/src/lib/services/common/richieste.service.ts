import { Injectable } from '@angular/core';
import { RichiestaGetGenerica } from '../../models/comunicazioni/richieste/get/richiestagetgenerica';
import { ConstantsService } from './constants.service';
import { RichiestaPutGenerica } from '../../models/comunicazioni/richieste/put/richiestaputgenerica';
import { Utente } from '../../models/entita/utente/utente';
import { Evento } from '../../models/entita/evento/evento';
import { Feed } from '../../models/entita/feed/feed';
import { Vino } from '../../models/entita/vino/vino';
import { Provincia } from '../../models/entita/provincia/provincia';

@Injectable()
export class RichiesteService {
  constructor(private constants: ConstantsService) {

  }

  // -------- GET --------

  public getRichiestaGetUtenti() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getUtentiFunctionName;

    return richiesta;
  }

  public getRichiestaGetAziende() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getAziendeFunctionName;

    return richiesta;
  }

  public getRichiestaGetBadges() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getBadgesFunctionName;

    return richiesta;
  }

  public getRichiestaGetEventi() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getEventiFunctionName;

    richiesta.idUtente = '';
    richiesta.elencoCompleto = 'S';

    return richiesta;
  }

  public getRichiestaGetProvincie() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getProvincieFunctionName;

    return richiesta;
  }

  public getRichiestaGetFeed() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getFeedFunctionName;

    return richiesta;
  }

  public getRichiestaGetVini() {
    const richiesta = new RichiestaGetGenerica();
    richiesta.functionName = this.constants.getViniFunctionName;

    return richiesta;
  }

  public getRichiestaGetViniAzienda(idAzienda: string) {
    const richiesta = new RichiestaGetGenerica();
    richiesta.idAzienda = idAzienda;
    richiesta.functionName = this.constants.getViniFunctionName;

    return richiesta;
  }

  // -------- PUT --------

  public getRichiestaPutImmagine(file: any, filename: string, tipoEntita: string) {
    const richiesta = new RichiestaPutGenerica();

    richiesta.base64Image = file;
    richiesta.filename = filename;
    richiesta.tipoEntita = tipoEntita;

    richiesta.functionName = this.constants.putImmaginiFunctionName;

    return richiesta;
  }

  public getRichiestaPutProvincia(provincia: Provincia) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.constants.putProvinciaFunctionName;
    richiesta.provincia = provincia;
    return richiesta;
  }

  public getRichiestaPutUtente(utente: Utente) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.constants.putUtenteFunctionName;
    richiesta.utente = utente;
    return richiesta;
  }

  public getRichiestaPutEvento(evento: Evento) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.constants.putEventoFunctionName;
    richiesta.evento = evento;
    return richiesta;
  }

  public getRichiestaPutFeed(feed: Feed) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.constants.putFeedFunctionName;
    richiesta.feed = feed;
    return richiesta;
  }


  public getRichiestaPutVino(vino: Vino) {
    const richiesta = new RichiestaPutGenerica();
    richiesta.functionName = this.constants.putVinoFunctionName;
    richiesta.vino = vino;
    return richiesta;
  }
}
