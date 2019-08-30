using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TicketRepository : Repository<Ticket, string>, ITicketRepository
    {
        public TicketRepository(DbContext context) : base(context)
        {
        }

        public int GetPricelistsItem(TicketType ticketType)
        {
            int pricelistId = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).Select(c => c.Id).First();
            int itemId = ((ApplicationDbContext)this.context).Items.Where(s => s.TicketType == ticketType).Select(s => s.Id).First();
            return ((ApplicationDbContext)this.context).PricelistItems.Where(p => p.IdPricelist == pricelistId && p.IdItem == itemId).Select(s => s.Id).First();
        }

        public string GetIdByEmail(string email)
        {
            return ((ApplicationDbContext)this.context).Users.Where(u => u.Email == email).Select(u => u.Id).First();
        }

        public bool CheckTicket(int id)
        {
            Ticket ticket = ((ApplicationDbContext)this.context).Tickets.Where(t => t.Id == id).First();
            PricelistItem pricelistItem = ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.Id == ticket.IdPricelistItem).First();
            TicketType ticketType = ((ApplicationDbContext)this.context).Items.Where(i => i.Id == pricelistItem.IdItem).Select(s => s.TicketType).First();

            //DateTime dateTime = new DateTime();
            long ticks = DateTime.Now.Ticks;
           

            if (ticketType == TicketType.TimeTicket)
            {
                if ((ticks - ticket.Date.Ticks) < 36000000000)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }
            else if (ticketType == TicketType.DayTicket)
            {
                if (ticket.Date.Year == DateTime.Now.Year && ticket.Date.Month == DateTime.Now.Month && ticket.Date.Day == DateTime.Now.Day)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }
            else if (ticketType == TicketType.MonthTicket)
            {
                if (ticket.Date.Year == DateTime.Now.Year && ticket.Date.Month == DateTime.Now.Month)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }
            else if (ticketType == TicketType.YearTicket)
            {
                if (ticket.Date.Year == DateTime.Now.Year)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }

            return false;

        }
    }
}