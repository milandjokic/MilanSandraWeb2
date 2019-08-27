using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface ILineRepository : IRepository<Line, int>
    {
        void EditLine(string lineName, LineType lineType, int id, List<int> stations);
        void AddStationsToLine(List<int> stations, int lineId);
        void DeleteStations(int id);
        IQueryable<int> FindLineStations(int lineId);
    }
}
