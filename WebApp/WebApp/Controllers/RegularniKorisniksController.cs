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
    public class RegularniKorisniksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/RegularniKorisniks
        public IQueryable<RegularniKorisnik> GetRegularniKorisnik()
        {
            return db.RegularniKorisnik;
        }

        // GET: api/RegularniKorisniks/5
        [ResponseType(typeof(RegularniKorisnik))]
        public IHttpActionResult GetRegularniKorisnik(int id)
        {
            RegularniKorisnik regularniKorisnik = db.RegularniKorisnik.Find(id);
            if (regularniKorisnik == null)
            {
                return NotFound();
            }

            return Ok(regularniKorisnik);
        }

        // PUT: api/RegularniKorisniks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRegularniKorisnik(int id, RegularniKorisnik regularniKorisnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != regularniKorisnik.Id)
            {
                return BadRequest();
            }

            db.Entry(regularniKorisnik).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegularniKorisnikExists(id))
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

        // POST: api/RegularniKorisniks
        [ResponseType(typeof(RegularniKorisnik))]
        public IHttpActionResult PostRegularniKorisnik(RegularniKorisnik regularniKorisnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RegularniKorisnik.Add(regularniKorisnik);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = regularniKorisnik.Id }, regularniKorisnik);
        }

        // DELETE: api/RegularniKorisniks/5
        [ResponseType(typeof(RegularniKorisnik))]
        public IHttpActionResult DeleteRegularniKorisnik(int id)
        {
            RegularniKorisnik regularniKorisnik = db.RegularniKorisnik.Find(id);
            if (regularniKorisnik == null)
            {
                return NotFound();
            }

            db.RegularniKorisnik.Remove(regularniKorisnik);
            db.SaveChanges();

            return Ok(regularniKorisnik);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RegularniKorisnikExists(int id)
        {
            return db.RegularniKorisnik.Count(e => e.Id == id) > 0;
        }
    }
}