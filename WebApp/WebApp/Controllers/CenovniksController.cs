using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;

namespace WebApp.Controllers
{
    public class CenovniksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Cenovniks
        public IQueryable<Cenovnik> GetCenovnik()
        {
            return db.Cenovnik;
        }

        // GET: api/Cenovniks/5
        [ResponseType(typeof(Cenovnik))]
        public IHttpActionResult GetCenovnik(int id)
        {
            Cenovnik cenovnik = db.Cenovnik.Find(id);
            if (cenovnik == null)
            {
                return NotFound();
            }

            return Ok(cenovnik);
        }

        // PUT: api/Cenovniks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCenovnik(int id, Cenovnik cenovnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cenovnik.Id)
            {
                return BadRequest();
            }

            db.Entry(cenovnik).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CenovnikExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Cenovniks
        [ResponseType(typeof(Cenovnik))]
        public IHttpActionResult PostCenovnik(Cenovnik cenovnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cenovnik.Add(cenovnik);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cenovnik.Id }, cenovnik);
        }

        // DELETE: api/Cenovniks/5
        [ResponseType(typeof(Cenovnik))]
        public IHttpActionResult DeleteCenovnik(int id)
        {
            Cenovnik cenovnik = db.Cenovnik.Find(id);
            if (cenovnik == null)
            {
                return NotFound();
            }

            db.Cenovnik.Remove(cenovnik);
            db.SaveChanges();

            return Ok(cenovnik);
        }

        // GET: api/Cenovniks
        [ResponseType(typeof(double))]
        public IHttpActionResult GetCenaKarte(VrstaKarte vrstaKarte, TipKorisnika tipKorisnika)
        {
            int idCenovnik = db.Cenovnik.Where(c => c.Aktivan == true).Select(c => c.Id).First();
            int idStavka = db.Stavka.Where(s => s.VrstaKarte == vrstaKarte).Select(s => s.Id).First();

            double cena = db.CenovnikStavka.Where(cs => cs.IdCenovnik == idCenovnik && cs.IdStavka == idStavka).Select(cs => cs.Cena).First();

            double koef = db.Koeficijent.Where(k => k.TipKorisnika == tipKorisnika).Select(k => k.Koef).First();

            return Ok(Math.Round(cena * koef));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CenovnikExists(int id)
        {
            return db.Cenovnik.Count(e => e.Id == id) > 0;
        }
    }
}