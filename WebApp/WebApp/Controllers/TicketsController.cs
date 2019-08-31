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

        [Route("GetTicket")]
        [ResponseType(typeof(IHttpActionResult))]
        public IHttpActionResult GetTicket(int id)
        {
            if (UnitOfWork.TicketRepository.CheckTicket(id))
            {
                UnitOfWork.TicketRepository.SaveChanges();
                return Ok(200);
            }
            else
            {
                UnitOfWork.TicketRepository.SaveChanges();
                return Ok(204);
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

            if (p[2] == null)
            {
                EmailHelper.SendEmail(p[3], "Kupovina karte", "Uspesno ste kupili kartu sa ID: " + ticket.Id);
            }

            return Ok(ticket.Id);
        }

        [HttpPost]
        [Route("BuyTicket")]
        public IHttpActionResult BuyTicket(bool isLoggedIn, string email, string id, string payer_email, string payer_id, double price, TicketType choosenTicketType, UserType userProfileType/*string email, int id, string payer_email, int payer_id, double price, string selectedTicketType, UserType userProfileType*/)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string UserId = null;
            if (isLoggedIn)
            {
                UserId = UnitOfWork.TicketRepository.GetIdByEmail(email);
            }

            int IdPricelistItem = UnitOfWork.TicketRepository.GetPricelistsItem(choosenTicketType);


            Ticket ticket = new Ticket()
            {
                Valid = true,
                Date = DateTime.Now,
                Price = price,
                IdPricelistItem = IdPricelistItem,
            };
            if (UserId != null)
            {
                ticket.IdApplicationUser = UserId;
            }
            else
            {
                ticket.IdApplicationUser = null;
            }
            UnitOfWork.TicketRepository.Add(ticket);
            UnitOfWork.TicketRepository.SaveChanges();

            UnitOfWork.TicketRepository.AddPayPal(id, payer_id, payer_email, ticket.Id);
            UnitOfWork.TicketRepository.SaveChanges();

            if (!isLoggedIn)
            {
                EmailHelper.SendEmail(email, "Buying Ticket", "You have successfully bought a ticket via PayPal with ID: " + ticket.Id);
            }

          

            return Ok(200);
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
