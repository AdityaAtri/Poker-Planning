using System;
using System.Collections.Generic;

namespace MicroService.Data.Model
{
    public partial class Room
    {
        public Room()
        {
            Roomdetails = new HashSet<Roomdetails>();
        }

        public string RoomId { get; set; }
        public string StoryId { get; set; }
        public string Story { get; set; }
        public string HostId { get; set; }

        public virtual Empdetails Host { get; set; }
        public virtual ICollection<Roomdetails> Roomdetails { get; set; }
    }
}
