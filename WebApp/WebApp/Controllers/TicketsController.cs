using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
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
    [RoutePrefix("api/Tickets")]
    public class TicketsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        private readonly IUnitOfWork UnitOfWork;
        private ApplicationUserManager _userManager;
        public TicketsController(ApplicationUserManager userManager, IUnitOfWork uw)
        {
            UserManager = userManager;
            UnitOfWork = uw;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [Route("Add")]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(string[] p)
        {
            var temp = Enum.Parse(typeof(TicketType), p[1]);
            int IdPricelistItem = UnitOfWork.TicketRepository.GetPricelistsItem((TicketType)temp);

            Ticket ticket = new Ticket()
            {
                Valid = true,
                Date = DateTime.Now,
                Price = double.Parse(p[0]),
                IdPricelistItem = IdPricelistItem,
                IdApplicationUser = null,
            };

            if (p[2] != null)
            {
                ticket.IdApplicationUser = UnitOfWork.TicketRepository.GetIdByEmail(p[2]);
            }

            UnitOfWork.TicketRepository.Add(ticket);
            UnitOfWork.Complete();
            return Ok(ticket.Id);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TicketExists(int id)
        {
            return db.Tickets.Count(e => e.Id == id) > 0;
        }
    }
}
