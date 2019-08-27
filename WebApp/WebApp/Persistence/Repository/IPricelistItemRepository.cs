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
        void editPricelist(int id, double timeTicket, double dayTicket, double monthTicket, double yearTicket);
    }
}
