using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public enum UserType
    {
        RegularUser = 0,
        Student = 1,
        Pensioner = 2
    }

    public enum TicketType
    {
        TimeTicket = 0,
        DayTicket = 1,
        MonthTicket = 2,
        YearTicket = 3
    }
}