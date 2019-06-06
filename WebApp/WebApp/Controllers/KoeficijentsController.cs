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
    public class KoeficijentsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Koeficijents
        public IQueryable<Koeficijent> GetKoeficijent()
        {
            return db.Koeficijent;
        }

        // GET: api/Koeficijents/5
        [ResponseType(typeof(Koeficijent))]
        public IHttpActionResult GetKoeficijent(int id)
        {
            Koeficijent koeficijent = db.Koeficijent.Find(id);
            if (koeficijent == null)
            {
                return NotFound();
            }

            return Ok(koeficijent);
        }

        // PUT: api/Koeficijents/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKoeficijent(int id, Koeficijent koeficijent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != koeficijent.Id)
            {
                return BadRequest();
            }

            db.Entry(koeficijent).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KoeficijentExists(id))
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

        // POST: api/Koeficijents
        [ResponseType(typeof(Koeficijent))]
        public IHttpActionResult PostKoeficijent(Koeficijent koeficijent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Koeficijent.Add(koeficijent);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = koeficijent.Id }, koeficijent);
        }

        // DELETE: api/Koeficijents/5
        [ResponseType(typeof(Koeficijent))]
        public IHttpActionResult DeleteKoeficijent(int id)
        {
            Koeficijent koeficijent = db.Koeficijent.Find(id);
            if (koeficijent == null)
            {
                return NotFound();
            }

            db.Koeficijent.Remove(koeficijent);
            db.SaveChanges();

            return Ok(koeficijent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KoeficijentExists(int id)
        {
            return db.Koeficijent.Count(e => e.Id == id) > 0;
        }
    }
}