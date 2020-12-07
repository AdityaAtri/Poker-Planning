using System;
using System.Collections.Generic;

namespace MicroService.Data.Model
{
    public partial class Empdetails
    {
        public Empdetails()
        {
            Room = new HashSet<Room>();
            Roomdetails = new HashSet<Roomdetails>();
        }

        public string EmpOracleId { get; set; }
        public string EmpName { get; set; }

        public virtual ICollection<Room> Room { get; set; }
        public virtual ICollection<Roomdetails> Roomdetails { get; set; }
    }
}
