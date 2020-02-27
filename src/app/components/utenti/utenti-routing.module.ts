import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtentiComponent } from './utenti.component';

const routes: Routes = [
  { path: '', component: UtentiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtentiRoutingModule { }
