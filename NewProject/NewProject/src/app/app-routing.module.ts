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
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AdminGuard  } from './components/guards/admin-guard.guard';
import { ControllerGuard } from './components/guards/controller.guard';
import { UserGuard } from './components/guards/user.guard';
import { NotRegisteredGuard } from './components/guards/not-registered.guard';
import { ProfilGuard } from './components/guards/profil.guard';
import { TrenutnaLokacijaComponent } from './components/trenutna-lokacija/trenutna-lokacija.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [NotRegisteredGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate : [NotRegisteredGuard]
  },
  {
    path: 'cenovnik',
    component: CenovnikComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'karte',
    component: KarteComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate : [ProfilGuard]
  },
  {
    path: 'stanica',
    component: StanicaComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'raspored',
    component: RasporedComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'linije',
    component: LinijeComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'cenovnik-admin',
    component: CenovnikAdminComponent,
    canActivate : [AdminGuard]
  },
  {
    path: 'redvoznje-admin',
    component: RedvoznjeAdminComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'validacija-korisnika',
    component: ValidacijaKorisnikaComponent,
    canActivate: [ControllerGuard]
  },
  {
    path : 'validacija-karata' ,
    component: ValidacijaKarataComponent,
    canActivate: [ControllerGuard]
  },
  {
    path: 'mreza-linija',
    component: MrezeLinijaComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'trenutna-lokacija',
    component: TrenutnaLokacijaComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
