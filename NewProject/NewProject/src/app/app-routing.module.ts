import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CenovnikComponent } from './components/cenovnik/cenovnik.component';
import { KarteComponent } from './components/karte/karte.component';
import { ProfilComponent } from './components/profil/profil.component';
import { StanicaComponent } from './components/stanica/stanica.component';
import { RasporedComponent} from './components/raspored/raspored.component';
import { LinijeComponent} from './components/linije/linije.component';
import { CenovnikAdminComponent } from './components/cenovnik-admin/cenovnik-admin/cenovnik-admin.component';
import { RedvoznjeAdminComponent } from './components/redvoznje-admin/redvoznje-admin/redvoznje-admin.component';
import { ValidacijaKorisnikaComponent } from './components/validacija-korisnika/validacija-korisnika.component';
import { ValidacijaKarataComponent } from './components/validacija-karata/validacija-karata.component';
import { MrezeLinijaComponent } from './components/mreze-linija/mreze-linija.component';

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
  {
    path: 'stanica',
    component: StanicaComponent
  },
  {
    path: 'raspored',
    component: RasporedComponent
  },
  {
    path: 'linije',
    component: LinijeComponent
  },
  {
    path: 'cenovnik-admin',
    component: CenovnikAdminComponent
  },
  {
    path: 'redvoznje-admin',
    component: RedvoznjeAdminComponent
  },
  {
    path : 'validacija-korisnika',
    component: ValidacijaKorisnikaComponent
  },
  {
    path : 'validacija-karata' ,
    component: ValidacijaKarataComponent
  },
  {
    path: 'mreza-linija',
    component: MrezeLinijaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
