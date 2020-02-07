import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { AziendeComponent } from './components/aziende/aziende.component';
import { ViniComponent } from './components/vini/vini.component';
import { EventiComponent } from './components/eventi/eventi.component';

const routes: Routes = [
    { path: '', redirectTo: 'utenti', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'utenti', component: UtentiComponent },
    { path: 'aziende', component: AziendeComponent },
    { path: 'vini', component: ViniComponent },
    { path: 'eventi', component: EventiComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
