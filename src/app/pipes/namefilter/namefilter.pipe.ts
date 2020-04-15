import { Pipe, PipeTransform } from '@angular/core';
import { Utente } from 'bvino-lib';
@Pipe({
  name: 'clientfilter'
})
export class ClientFilterPipe implements PipeTransform {

  transform(items: Utente[], name: string, fiscalcode: string): any[] {
    // if (!items) {
    //     return [];
    // }

    // searchText = searchText.toLowerCase();
    // return items.filter(it => {
    //     return it.cognome.toLowerCase().includes(name) || it.nome.toLowerCase().includes(name);
    // });

    if (items && items.length) {
      return items.filter(it => {
        return (it.emailUtente.toLowerCase().includes(name) || it.usernameUtente.toLowerCase().includes(name));
      });
    }
  }
}


/* if (items && items.length) {
            return items.filter(it => {
                return name
                    && (it.cognome.toLowerCase().includes(name) || it.nome.toLowerCase().includes(name))
                    && fiscalcode
                    && it.codice_fiscale.toLowerCase().includes(fiscalcode));
        });
    } */
