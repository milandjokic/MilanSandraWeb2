using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IPricelistItemRepository : IRepository<PricelistItem, int>
    {
        double GetPrice(TicketType ticketType, UserType userType);
        Tuple<Pricelist, List<double>> getPrices();
        bool editPricelist(int id, long pricelistVersion, double timeTicket, double dayTicket, double monthTicket, double yearTicket);
        void addPricelist(DateTime to, double timeTicket, double dayTicket, double monthTicket, double yearTicket);
        void addPricelistItem(double timeTicket, double dayTicket, double monthTicket, double yearTicket);
    }
}
