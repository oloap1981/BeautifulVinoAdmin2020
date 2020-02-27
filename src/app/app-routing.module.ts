import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'utenti', pathMatch: 'prefix' },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'utenti', loadChildren: () => import('./components/utenti/utenti.module').then(m => m.UtentiModule) },
  { path: 'vini', loadChildren: () => import('./components/vini/vini.module').then(m => m.ViniModule) },
  { path: 'eventi', loadChildren: () => import('./components/eventi/eventi.module').then(m => m.EventiModule) },
  { path: 'feed', loadChildren: () => import('./components/feed/feed.module').then(m => m.FeedModule) },
  { path: 'notifiche', loadChildren: () => import('./components/notifiche/notifiche.module').then(m => m.NotificheModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
