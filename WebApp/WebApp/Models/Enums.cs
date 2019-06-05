using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public enum VrstaKarte
    {
        VremenskaKarta = 0,
        DnevnaKarta = 1,
        MesecnaKarta = 2,
        GodisnjaKarta = 3,
    }

    public enum TipKorisnika
    {
        Djak = 0,
        Penzioner = 1,
        RegularniKorisnik = 2,
    }
}