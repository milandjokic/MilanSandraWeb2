using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IStationRepository : IRepository<Station, int>
    {
        bool EditStation(Station station, long stationVersion, int id);
        List<string> FindLines(int idStation);
        void DeleteStationsLines(int id);
    }
}
