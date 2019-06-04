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
    public class PenzionersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Penzioners
        public IQueryable<Penzioner> GetPenzioner()
        {
            return db.Penzioner;
        }

        // GET: api/Penzioners/5
        [ResponseType(typeof(Penzioner))]
        public IHttpActionResult GetPenzioner(int id)
        {
            Penzioner penzioner = db.Penzioner.Find(id);
            if (penzioner == null)
            {
                return NotFound();
            }

            return Ok(penzioner);
        }

        // PUT: api/Penzioners/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPenzioner(int id, Penzioner penzioner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != penzioner.Id)
            {
                return BadRequest();
            }

            db.Entry(penzioner).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PenzionerExists(id))
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

        // POST: api/Penzioners
        [ResponseType(typeof(Penzioner))]
        public IHttpActionResult PostPenzioner(Penzioner penzioner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Penzioner.Add(penzioner);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = penzioner.Id }, penzioner);
        }

        // DELETE: api/Penzioners/5
        [ResponseType(typeof(Penzioner))]
        public IHttpActionResult DeletePenzioner(int id)
        {
            Penzioner penzioner = db.Penzioner.Find(id);
            if (penzioner == null)
            {
                return NotFound();
            }

            db.Penzioner.Remove(penzioner);
            db.SaveChanges();

            return Ok(penzioner);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PenzionerExists(int id)
        {
            return db.Penzioner.Count(e => e.Id == id) > 0;
        }
    }
}