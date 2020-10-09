import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'utenti', pathMatch: 'prefix' },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'aziende', loadChildren: () => import('./components/aziende/aziende.module').then(m => m.AziendeModule) },
  {
    path: 'azienda-gestione', loadChildren: () => import('./components/azienda-gestione/azienda-gestione.module')
      .then(m => m.AziendaGestioneModule)
  },
  { path: 'utenti', loadChildren: () => import('./components/utenti/utenti.module').then(m => m.UtentiModule) },
  { path: 'vini', loadChildren: () => import('./components/vini/vini.module').then(m => m.ViniModule) },
  { path: 'eventi', loadChildren: () => import('./components/eventi/eventi.module').then(m => m.EventiModule) },
  { path: 'feed', loadChildren: () => import('./components/feed/feed.module').then(m => m.FeedModule) },
  { path: 'notifiche', loadChildren: () => import('./components/notifiche/notifiche.module').then(m => m.NotificheModule) },
  { path: 'badge', loadChildren: () => import('./components/badge/badge.module').then(m => m.BadgeModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
