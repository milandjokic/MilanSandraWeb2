using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface ITicketRepository : IRepository<Ticket, string>
    {
        int GetPricelistsItem(TicketType ticketType);
        string GetIdByEmail(string email);
        bool CheckTicket(int id);
    }
}
