using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PricelistItemRepository : Repository<PricelistItem, string>, IPricelistItemRepository
    {
        public PricelistItemRepository(DbContext context) : base(context)
        {
        }

        public double GetPrice(TicketType ticketType, UserType userType)
        {
            int pricelistId = ((ApplicationDbContext)this.context).Pricelists.Where(p => p.Active == true).Select(p => p.Id).First();
            int itemId = ((ApplicationDbContext)this.context).Items.Where(i => i.TicketType == ticketType).Select(i => i.Id).First();
            double price = ((ApplicationDbContext)this.context).PricelistItems.Where(p => p.IdPricelist == pricelistId && p.IdItem == itemId).Select(p => p.Price).First();
            double coef = ((ApplicationDbContext)this.context).Coefficients.Where(c => c.UserType == userType).Select(c => c.Coef).First();
            return Math.Round(price * coef, 2);
        }
    }
}