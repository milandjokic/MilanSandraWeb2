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
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class CenovniksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        public IUnitOfWork UnitOfWork { get; set; }

        public CenovniksController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        // GET: api/Cenovniks
        public IQueryable<Cenovnik> GetCenovnik()
        {
            return UnitOfWork.CenovnikRepository.GetAll().AsQueryable();
        }

        // GET: api/Cenovniks/5
        [ResponseType(typeof(Cenovnik))]
        public IHttpActionResult GetCenovnik(int id)
        {
            Cenovnik cenovnik = UnitOfWork.CenovnikRepository.Get(id);
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

            //db.Entry(cenovnik).State = EntityState.Modified;
            UnitOfWork.CenovnikRepository.Entry(cenovnik, EntityState.Modified);

            try
            {
                UnitOfWork.CenovnikRepository.SaveChanges();
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

            UnitOfWork.CenovnikRepository.Add(cenovnik);
            UnitOfWork.CenovnikRepository.SaveChanges();
           // db.Cenovnik.Add(cenovnik);
            //db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cenovnik.Id }, cenovnik);
        }

        // DELETE: api/Cenovniks/5
        [ResponseType(typeof(Cenovnik))]
        public IHttpActionResult DeleteCenovnik(int id)
        {
            Cenovnik cenovnik = UnitOfWork.CenovnikRepository.Get(id);
            if (cenovnik == null)
            {
                return NotFound();
            }

            UnitOfWork.CenovnikRepository.Remove(cenovnik);
            UnitOfWork.CenovnikRepository.SaveChanges();

            return Ok(cenovnik);
        }

        // GET: api/Cenovniks
        [ResponseType(typeof(double))]
        public IHttpActionResult GetCenaKarte(VrstaKarte vrstaKarte, TipKorisnika tipKorisnika)
        {

            return Ok(UnitOfWork.CenovnikRepository.CenaKarte(tipKorisnika, vrstaKarte));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.CenovnikRepository.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CenovnikExists(int id)
        {
            return UnitOfWork.CenovnikRepository.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}