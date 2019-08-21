﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using static WebApp.Models.DayType;
using static WebApp.Models.LineType;

namespace WebApp.Persistence.Repository
{
    public interface ITimetableRepository : IRepository<Timetable, int>
    {
        List<Line> getTimetableLineItems(WebApp.Models.LineType lineType);
        List<Timetable> getTimetableItem(DayType dayType, LineType lineType, string lineName);
    }
}
