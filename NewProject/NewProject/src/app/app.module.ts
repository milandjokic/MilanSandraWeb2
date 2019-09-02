import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Output } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './components/map/map.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RegisterComponent } from './components/register/register.component';
import { CenovnikComponent } from './components/cenovnik/cenovnik.component';
import { KarteComponent } from './components/karte/karte.component';
import { ProfilComponent } from './components/profil/profil.component';
import { StanicaComponent } from './components/stanica/stanica.component';
import { RasporedComponent } from './components/raspored/raspored.component';
import { LinijeComponent } from './components/linije/linije.component';
import { CenovnikAdminComponent } from './components/cenovnik-admin/cenovnik-admin/cenovnik-admin.component';
import { RedvoznjeAdminComponent } from './components/redvoznje-admin/redvoznje-admin/redvoznje-admin.component';
import { ValidacijaKorisnikaComponent } from './components/validacija-korisnika/validacija-korisnika.component';
import { ValidacijaKarataComponent } from './components/validacija-karata/validacija-karata.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { MrezeLinijaComponent } from './components/mreze-linija/mreze-linija.component';
import { TrenutnaLokacijaComponent } from './components/trenutna-lokacija/trenutna-lokacija.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    CenovnikComponent,
    KarteComponent,
    ProfilComponent,
    StanicaComponent,
    MapComponent,
    RasporedComponent,
    LinijeComponent,
    CenovnikAdminComponent,
    RedvoznjeAdminComponent,
    ValidacijaKorisnikaComponent,
    ValidacijaKarataComponent,
    MrezeLinijaComponent,
    TrenutnaLokacijaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
  

})
export class AppModule { }
