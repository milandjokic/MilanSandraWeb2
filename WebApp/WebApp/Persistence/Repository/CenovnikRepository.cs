using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class CenovnikRepository : Repository<Cenovnik, int>, ICenovnikRepository
    {
        public CenovnikRepository(DbContext context) : base(context)
        {

        }

        public double CenaKarte(TipKorisnika tipKorisnika, VrstaKarte vrstaKarte)
        {
            int idCenovnik = ((ApplicationDbContext)this.context).Cenovnik.Where(c => c.Aktivan == true).Select(c => c.Id).First();
            int idStavka = ((ApplicationDbContext)this.context).Stavka.Where(s => s.VrstaKarte == vrstaKarte).Select(s => s.Id).First();

            double cena = ((ApplicationDbContext)this.context).CenovnikStavka.Where(cs => cs.IdCenovnik == idCenovnik && cs.IdStavka == idStavka).Select(cs => cs.Cena).First();
            double koef = ((ApplicationDbContext)this.context).Koeficijent.Where(k => k.TipKorisnika == tipKorisnika).Select(k => k.Koef).First();

            return Math.Round(cena * koef, 2);
        }
    }
}