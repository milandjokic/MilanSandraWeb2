using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Koeficijent
    {
        public int Id { get; set; }
        public TipKorisnika TipKorisnika { get; set; }
        public double Koef { get; set; }
    }
}