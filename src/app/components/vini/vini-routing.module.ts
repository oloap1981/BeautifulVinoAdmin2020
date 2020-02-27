import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViniComponent } from './vini.component';

const routes: Routes = [
  { path: '', component: ViniComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViniRoutingModule { }
