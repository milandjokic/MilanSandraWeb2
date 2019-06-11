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
    [RoutePrefix("api/PricelistItems")]
    public class PricelistItemsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork UnitOfWork;
        private ApplicationUserManager _userManager;

        public PricelistItemsController(ApplicationUserManager userManager, IUnitOfWork uw)
        {
            _userManager = userManager;
            UnitOfWork = uw;
        }

        // GET: api/PricelistItems
        public IQueryable<PricelistItem> GetPricelistItems()
        {
            return db.PricelistItems;
        }

        // GET: api/PricelistItems/5
        [ResponseType(typeof(PricelistItem))]
        public IHttpActionResult GetPricelistItem(int id)
        {
            PricelistItem pricelistItem = db.PricelistItems.Find(id);
            if (pricelistItem == null)
            {
                return NotFound();
            }

            return Ok(pricelistItem);
        }

        // PUT: api/PricelistItems/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPricelistItem(int id, PricelistItem pricelistItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pricelistItem.Id)
            {
                return BadRequest();
            }

            db.Entry(pricelistItem).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PricelistItemExists(id))
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

        // POST: api/PricelistItems
        [ResponseType(typeof(PricelistItem))]
        public IHttpActionResult PostPricelistItem(PricelistItem pricelistItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PricelistItems.Add(pricelistItem);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = pricelistItem.Id }, pricelistItem);
        }

        // DELETE: api/PricelistItems/5
        [ResponseType(typeof(PricelistItem))]
        public IHttpActionResult DeletePricelistItem(int id)
        {
            PricelistItem pricelistItem = db.PricelistItems.Find(id);
            if (pricelistItem == null)
            {
                return NotFound();
            }

            db.PricelistItems.Remove(pricelistItem);
            db.SaveChanges();

            return Ok(pricelistItem);
        }

        [Route("GetPrice")]
        [ResponseType(typeof(double))]
        public IHttpActionResult GetPrice(TicketType ticketType, UserType userType)
        {
            return Ok(UnitOfWork.PricelistItemRepository.GetPrice(ticketType, userType));

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PricelistItemExists(int id)
        {
            return db.PricelistItems.Count(e => e.Id == id) > 0;
        }
    }
}