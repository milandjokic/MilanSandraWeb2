using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;
using static WebApp.Models.DayType;
using static WebApp.Models.LineType;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Timetables")]
    public class TimetablesController : ApiController
    {
        
        private ApplicationDbContext db = new ApplicationDbContext();

        private readonly IUnitOfWork UnitOfWork;
        private ApplicationUserManager _userManager;


        public TimetablesController(ApplicationUserManager userManager, IUnitOfWork uw)
        {

            UserManager = userManager;
            UnitOfWork = uw;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }


        // GET: api/Timetables
        public IQueryable<Timetable> GetTimetables(DayType dayType, LineType lineType, string lineName)
        {
            return UnitOfWork.TimetableRepository.getTimetableItem(dayType, lineType, lineName).AsQueryable();
        }

        // GET: api/Timetables/Lines
        [Route("Lines")]
        public IQueryable<Line> GetTimetableLineItems(string lineType)
        {
            var lineTypeVar = Enum.Parse(typeof(LineType), lineType);
            /*  LineType tempLineType;
              if (lineType == "City")
                  tempLineType = LineType.City;
              else
                  tempLineType = LineType.Suburban;*/
            return UnitOfWork.TimetableRepository.getTimetableLineItems((LineType)lineTypeVar).AsQueryable();
        }

        // GET: api/Timetables/5
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult GetTimetable(int id)
        {
            Timetable timetable = db.Timetables.Find(id);
            if (timetable == null)
            {
                return NotFound();
            }

            return Ok(timetable);
        }

        [Route("AddDeparture")]
        public IHttpActionResult AddDeparture(int idLine, DayType dayType, string departures)
        {
            //Timetable timetable = db.Timetables.Find(id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string[] dataDepartures = departures.Split(';');
            UnitOfWork.TimetableRepository.addDepartures(idLine, dayType, dataDepartures);
            UnitOfWork.TimetableRepository.SaveChanges();
            return Ok(0);
        }

        [Route("EditDeparture")]
        public IHttpActionResult EditDeparture(int departureId, long scheduleVersion, string selectedDeparture)
        {
            Timetable timetable = UnitOfWork.TimetableRepository.Get(departureId);
            if (timetable == null)
            {
                return Ok(203);
            }
            //Timetable timetable = db.Timetables.Find(id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (UnitOfWork.TimetableRepository.editDeparture(departureId, scheduleVersion, selectedDeparture))
            {
                UnitOfWork.TimetableRepository.SaveChanges();
                return Ok(200);
            }
            else
            {
                return Ok(204);
            }

        }

        // PUT: api/Timetables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTimetable(int id, Timetable timetable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != timetable.Id)
            {
                return BadRequest();
            }

            db.Entry(timetable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimetableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Timetables
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult PostTimetable(Timetable timetable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Timetables.Add(timetable);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = timetable.Id }, timetable);
        }

        // DELETE: api/Timetables/5
        [Route("Delete")]
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult DeleteTimetable(int departureId)
        {
            Timetable timetable = UnitOfWork.TimetableRepository.Get(departureId);
            if (timetable == null)
            {
                return Ok(204);
            }

            UnitOfWork.TimetableRepository.Remove(timetable);
            UnitOfWork.TimetableRepository.SaveChanges();
        

            return Ok(200);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TimetableExists(int id)
        {
            return db.Timetables.Count(e => e.Id == id) > 0;
        }
    }
}