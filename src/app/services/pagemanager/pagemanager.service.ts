import { environment } from 'src/environments/environmentkeys';

export class PageManagerService {

  private rolesPagesMap = new Map<string, string[]>();

  constructor() {

    const pagineAdminAzienda = [];
    pagineAdminAzienda.push(environment.NAVIGATION_PAGENAME_EVENTI);
    pagineAdminAzienda.push(environment.NAVIGATION_PAGENAME_UTENTI);
    pagineAdminAzienda.push(environment.NAVIGATION_PAGENAME_GESTIONE_AZIENDA);
    pagineAdminAzienda.push(environment.NAVIGATION_PAGENAME_FEED);
    pagineAdminAzienda.push(environment.NAVIGATION_PAGENAME_VINI);
    pagineAdminAzienda.push(environment.NAVIGATION_PAGENAME_NOTIFICHE);

    this.rolesPagesMap.set('AA', pagineAdminAzienda);

    const pagineSuperAdmin = [];
    pagineSuperAdmin.push(environment.NAVIGATION_PAGENAME_EVENTI);
    pagineSuperAdmin.push(environment.NAVIGATION_PAGENAME_AZIENDE);
    pagineSuperAdmin.push(environment.NAVIGATION_PAGENAME_FEED);
    pagineSuperAdmin.push(environment.NAVIGATION_PAGENAME_VINI);
    pagineSuperAdmin.push(environment.NAVIGATION_PAGENAME_BADGE);
    pagineSuperAdmin.push(environment.NAVIGATION_PAGENAME_UTENTI);
    pagineSuperAdmin.push(environment.NAVIGATION_PAGENAME_NOTIFICHE);

    this.rolesPagesMap.set('SA', pagineSuperAdmin);

  }

  public isPageAuthorized(page: string, ruoloUtente: string): boolean {
    const elencoPagine = this.rolesPagesMap.get(ruoloUtente);
    if (elencoPagine === undefined || elencoPagine.length === 0) {
      return false;
    }
    return elencoPagine.indexOf(page) !== -1;
  }
}
