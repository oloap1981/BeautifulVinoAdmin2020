import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambioPasswordComponent } from './cambio-password.component';

const routes: Routes = [
  { path: '', component: CambioPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CambioPasswordRoutingModule { }
