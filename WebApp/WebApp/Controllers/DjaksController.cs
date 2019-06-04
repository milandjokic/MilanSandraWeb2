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
    public class DjaksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Djaks
        public IQueryable<Djak> GetDjak()
        {
            return db.Djak;
        }

        // GET: api/Djaks/5
        [ResponseType(typeof(Djak))]
        public IHttpActionResult GetDjak(int id)
        {
            Djak djak = db.Djak.Find(id);
            if (djak == null)
            {
                return NotFound();
            }

            return Ok(djak);
        }

        // PUT: api/Djaks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDjak(int id, Djak djak)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != djak.Id)
            {
                return BadRequest();
            }

            db.Entry(djak).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DjakExists(id))
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

        // POST: api/Djaks
        [ResponseType(typeof(Djak))]
        public IHttpActionResult PostDjak(Djak djak)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Djak.Add(djak);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = djak.Id }, djak);
        }

        // DELETE: api/Djaks/5
        [ResponseType(typeof(Djak))]
        public IHttpActionResult DeleteDjak(int id)
        {
            Djak djak = db.Djak.Find(id);
            if (djak == null)
            {
                return NotFound();
            }

            db.Djak.Remove(djak);
            db.SaveChanges();

            return Ok(djak);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DjakExists(int id)
        {
            return db.Djak.Count(e => e.Id == id) > 0;
        }
    }
}