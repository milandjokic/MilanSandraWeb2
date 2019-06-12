import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CenovnikComponent } from './components/cenovnik/cenovnik.component';
import { KarteComponent } from './components/karte/karte.component';
import { ProfilComponent } from './components/profil/profil.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cenovnik',
    component: CenovnikComponent
  },
  {
    path: 'karte',
    component: KarteComponent
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
