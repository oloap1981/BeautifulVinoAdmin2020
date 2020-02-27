import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventiComponent } from './eventi.component';

const routes: Routes = [
  { path: '', component: EventiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventiRoutingModule { }
