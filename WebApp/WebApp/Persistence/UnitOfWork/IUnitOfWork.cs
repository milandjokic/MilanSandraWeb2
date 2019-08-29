﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IPricelistItemRepository PricelistItemRepository { get; }
        ITicketRepository TicketRepository { get; }
        ITimetableRepository TimetableRepository { get; }
        IStationRepository StationRepository { get; }
        ILineRepository LineRepository { get; }
        IUserRepository UserRepository { get; }

        int Complete();


    }
}
