using System;
using System.Collections.Generic;

namespace MicroService.Data.Model
{
    public partial class Roomdetails
    {
        public string RoomId { get; set; }
        public string EmpId { get; set; }
        public string NumberChoosenStatus { get; set; }
        public string NumberChoosen { get; set; }
        public string HostStatus { get; set; }

        public virtual Empdetails Emp { get; set; }
        public virtual Room Room { get; set; }
    }
}
