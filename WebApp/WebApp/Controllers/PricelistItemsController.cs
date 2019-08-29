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
            return UnitOfWork.PricelistItemRepository.GetAll().AsQueryable();
        }

        [Route("GetActivePricelists")]
        //[ResponseType(typeof(Tuple<Pricelist, List<double>>))]
        public IHttpActionResult GetActivePricelists()
        {
            List<object> ret = new List<object>();
            ret.Add(UnitOfWork.PricelistItemRepository.getPrices().Item1);
            ret.Add(UnitOfWork.PricelistItemRepository.getPrices().Item2);
            return Ok(ret);
        }
        // GET: api/PricelistItems/5
        [ResponseType(typeof(PricelistItem))]
        public IHttpActionResult GetPricelistItem(int id)
        {
            PricelistItem pricelistItem = UnitOfWork.PricelistItemRepository.Get(id);
            //PricelistItem pricelistItem = db.PricelistItems.Find(id);
            if (pricelistItem == null)
            {
                return NotFound();
            }

            return Ok(pricelistItem);
        }

        [Route("EditPricelist")]
        [ResponseType(typeof(Pricelist))]
        public IHttpActionResult EditPricelist(int id, double timeTicket, double dayTicket, double monthTicket, double yearTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.PricelistItemRepository.editPricelist(id, timeTicket, dayTicket, monthTicket, yearTicket);
            UnitOfWork.PricelistItemRepository.SaveChanges();

            return Ok(id);
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

            //db.Entry(pricelistItem).State = EntityState.Modified;
            UnitOfWork.PricelistItemRepository.Entry(pricelistItem, EntityState.Modified);
            try
            {
                UnitOfWork.PricelistItemRepository.SaveChanges();
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
        [Route("AddPricelist")]
        public IHttpActionResult AddPricelist(DateTime to, double timeTicket, double dayTicket, double monthTicket, double yearTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.PricelistItemRepository.addPricelist(to, timeTicket, dayTicket, monthTicket, yearTicket);
            UnitOfWork.PricelistItemRepository.SaveChanges();
            UnitOfWork.PricelistItemRepository.addPricelistItem(timeTicket, dayTicket, monthTicket, yearTicket);
            UnitOfWork.PricelistItemRepository.SaveChanges();

            return Ok(0);
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

            UnitOfWork.PricelistItemRepository.Remove(pricelistItem);
            UnitOfWork.PricelistItemRepository.SaveChanges();

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
                UnitOfWork.PricelistItemRepository.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PricelistItemExists(int id)
        {
            return db.PricelistItems.Count(e => e.Id == id) > 0;
        }
    }
}