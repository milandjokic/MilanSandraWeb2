using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Hubs
{
    [HubName("trenutnaLokacija")]
    public class CurrentLocation : Hub
    {
        public void BusLocation(List<Station> stations)
        {
            foreach(var s in stations)
            {
                double[] response = { s.XCoordinate, s.YCoordinate };
                Clients.All.getBusLocation(response);
                Thread.Sleep(2000);
            }
        }
    }
}