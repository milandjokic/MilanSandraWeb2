using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class UserRepository : Repository<ApplicationUser, int>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public IQueryable<ApplicationUser> getNotActiveUsers()
        {
           return ((ApplicationDbContext)context).Users.Where(u => u.Activated == RequestType.InProcess);
        }
    }
}