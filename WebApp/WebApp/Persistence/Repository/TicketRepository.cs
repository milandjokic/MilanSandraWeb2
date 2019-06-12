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
    }
}