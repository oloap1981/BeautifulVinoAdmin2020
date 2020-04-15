import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AziendaGestioneComponent } from './azienda-gestione.component';

const routes: Routes = [
  { path: '', component: AziendaGestioneComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AziendeRoutingModule { }
