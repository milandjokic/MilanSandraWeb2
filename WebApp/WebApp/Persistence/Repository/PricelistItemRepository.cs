using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PricelistItemRepository : Repository<PricelistItem, int>, IPricelistItemRepository
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

        public Tuple<Pricelist, List<double>> getPrices()
        {
            Pricelist pricelist = (Pricelist)((ApplicationDbContext)this.context).Pricelists.Where(p => p.Active == true).FirstOrDefault();
            List<double> prices = new List<double>(((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == pricelist.Id).Select(p => p.Price).ToList());
            Tuple<Pricelist, List<double>> tuple = new Tuple<Pricelist, List<double>>(pricelist, prices);
            return tuple;
        }

        public bool editPricelist(int id, long pricelistVersion, double timeTicket, double dayTicket, double monthTicket, double yearTicket)
        {
            if (((ApplicationDbContext)this.context).Pricelists.Where(p => p.Id == id).First().Version == pricelistVersion)
            {

                foreach (var v in ((ApplicationDbContext)this.context).Items)
                {
                    if (v.TicketType == TicketType.TimeTicket)
                    {
                        ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == id && pi.IdItem == v.Id).FirstOrDefault().Price = timeTicket;
                    }
                    else if (v.TicketType == TicketType.DayTicket)
                    {
                        ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == id && pi.IdItem == v.Id).FirstOrDefault().Price = dayTicket;
                    }
                    else if (v.TicketType == TicketType.MonthTicket)
                    {
                        ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == id && pi.IdItem == v.Id).FirstOrDefault().Price = monthTicket;
                    }
                    else if (v.TicketType == TicketType.YearTicket)
                    {
                        ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.IdPricelist == id && pi.IdItem == v.Id).FirstOrDefault().Price = yearTicket;
                    }
                }
                ((ApplicationDbContext)this.context).Pricelists.Where(p => p.Id == id).First().Version = ((ApplicationDbContext)this.context).Pricelists.Where(p => p.Id == id).First().Version + 1;
                return true;
            }
            else
            {
                return false;
            }
        }

        public void addPricelist(DateTime to, double timeTicket, double dayTicket, double monthTicket, double yearTicket)
        {
            ((ApplicationDbContext)this.context).Pricelists.Where(p => p.Active == true).FirstOrDefault().Active = false;
            ((ApplicationDbContext)this.context).Pricelists.Add(new Pricelist() { Active = true, Start = DateTime.Now, End=to});
        }

        public void addPricelistItem(double timeTicket, double dayTicket, double monthTicket, double yearTicket)
        {
            int pricelistId = ((ApplicationDbContext)this.context).Pricelists.Where(p => p.Active == true).Select(i => i.Id).First();

            ((ApplicationDbContext)this.context).PricelistItems.Add(new PricelistItem()
            {
                IdPricelist = pricelistId,
                IdItem = ((ApplicationDbContext)this.context).Items.Where(i => i.TicketType == TicketType.TimeTicket).Select(s => s.Id).First(),
                Price = timeTicket,
            });


            ((ApplicationDbContext)this.context).PricelistItems.Add(new PricelistItem()
            {
                IdPricelist = pricelistId,
                IdItem = ((ApplicationDbContext)this.context).Items.Where(i => i.TicketType == TicketType.DayTicket).Select(s => s.Id).First(),
                Price = dayTicket,
            });

            ((ApplicationDbContext)this.context).PricelistItems.Add(new PricelistItem()
            {
                IdPricelist = pricelistId,
                IdItem = ((ApplicationDbContext)this.context).Items.Where(i => i.TicketType == TicketType.MonthTicket).Select(s => s.Id).First(),
                Price = monthTicket,
            });

            ((ApplicationDbContext)this.context).PricelistItems.Add(new PricelistItem()
            {
                IdPricelist = pricelistId,
                IdItem = ((ApplicationDbContext)this.context).Items.Where(i => i.TicketType == TicketType.YearTicket).Select(s => s.Id).First(),
                Price = yearTicket,
            });
        }
    }
}