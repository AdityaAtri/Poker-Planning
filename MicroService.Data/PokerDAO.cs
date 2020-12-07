using System;
using MicroService.Data.Model;
using MicroService.Data;
using System.Linq;
using System.Collections.Generic;


namespace MicroService.Data
{
    public class PokerDAO
    {
        public void insertIntoCreateRoom(Room room)
        {
            try
            {
                pokerplanningContext context = new pokerplanningContext();
                bool roomIdResult = context.Room.Any(x => x.RoomId == room.RoomId);
                bool hostIdResult = context.Empdetails.Any(x => x.EmpOracleId == room.HostId);
                if (roomIdResult == true || hostIdResult == false)
                {
                    throw new Exception("Room is created already or HostId is not registered !!");
                }
                context.Room.Add(room);
                context.SaveChanges();

                // entering the host id to roomDetails

                var roomId = room.RoomId;
                var empOracleId = room.HostId;

                Roomdetails row = new Roomdetails();
                row.RoomId = roomId;
                row.EmpId = empOracleId;
                row.NumberChoosenStatus = "no";
                row.HostStatus = "yes";
                context.Roomdetails.Add(row);
                context.SaveChanges();
            }
            catch (System.Exception e)
            {
                throw new Exception(e.Message);
            }
        }


        public void insertIntoRoomDetails(Roomdetails roomdetails)
        {

            try
            {
                pokerplanningContext context = new pokerplanningContext();
                bool roomIdResult = context.Room.Any(x => x.RoomId == roomdetails.RoomId);
                bool hostIdResult = context.Empdetails.Any(x => x.EmpOracleId == roomdetails.EmpId);
                bool alreadyInRoom = context.Roomdetails.Any(x => x.RoomId == roomdetails.RoomId && x.EmpId == roomdetails.EmpId);
                roomdetails.HostStatus = "no";
                if (roomIdResult == false || hostIdResult == false)
                {
                    throw new Exception("Room is not created or HostId is not registered !!");
                }
                else if (alreadyInRoom)
                {
                    throw new Exception("You are already in Room !!");
                }
                context.Roomdetails.Add(roomdetails);
                context.SaveChanges();
            }
            catch (System.Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public void insertIntoEmpDetails(Empdetails empdetails)
        {
            try
            {
                pokerplanningContext context = new pokerplanningContext();
                bool empIdResult = context.Empdetails.Any(x => x.EmpOracleId == empdetails.EmpOracleId);

                if (empIdResult == true)
                {
                    throw new Exception("Employee is already registered");
                }
                context.Empdetails.Add(empdetails);
                context.SaveChanges();
            }
            catch (System.Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public string getHostNameValid(string hostId)
        {
            try
            {
                pokerplanningContext context = new pokerplanningContext();
                var hostprofile = context.Empdetails.First(x => x.EmpOracleId == hostId);
                return hostprofile.EmpName;
            }
            catch (System.Exception)
            {

                throw new Exception("Host Id not found");
            }
        }

        public List<RoomDetailWithName> getRoomParticipants(string roomId)
        {
            IEnumerable<Roomdetails> result = null;

            var context = new pokerplanningContext();
            PokerDAO pokerDAO = new PokerDAO();
            result = (from obj in context.Roomdetails where obj.RoomId == roomId select obj);
            result.ToList();
            context.SaveChanges();
            List<RoomDetailWithName> data = new List<RoomDetailWithName>();
            foreach (var item in result)
            {
                RoomDetailWithName row = new RoomDetailWithName() { RoomId = item.RoomId, EmpId = item.EmpId, EmpName = pokerDAO.getHostNameValid(item.EmpId), NumberChoosenStatus = item.NumberChoosenStatus, NumberChoosen = item.NumberChoosen, HostStatus = item.HostStatus };
                data.Add(row);
            }
            return data;
        }

        public IEnumerable<Room> getRoomDetails(string roomId)
        {
            var context = new pokerplanningContext();
            IEnumerable<Room> result = null;
            result = (from obj in context.Room where obj.RoomId == roomId select obj);
            result.ToList();
            return result;
        }

        public string getHostName(string roomId)
        {
            try
            {
                pokerplanningContext context = new pokerplanningContext();
                var hostprofile = context.Room.First(x => x.RoomId == roomId);
                var hostId = hostprofile.HostId;
                var hostname = context.Empdetails.First(x => x.EmpOracleId == hostId);
                return hostname.EmpName;
            }
            catch (System.Exception)
            {

                throw new Exception("Host Id not found");
            }
        }

        public void storyPointEstimation(string NumberChoosen, string roomId, string empId)
        {
            try
            {
                pokerplanningContext context = new pokerplanningContext();
                var participant = context.Roomdetails.First(x => x.RoomId == roomId && x.EmpId == empId);
                participant.NumberChoosenStatus = "yes";
                participant.NumberChoosen = NumberChoosen;
                context.SaveChanges();
            }
            catch (System.Exception)
            {

                throw new Exception("Story point not Updated");
            }

        }

        public void deleteRoom(string roomId)
        {
            try
            {
                pokerplanningContext context = new pokerplanningContext();
                var deleteRowRoomDetails = context.Roomdetails.Where(x => x.RoomId == roomId);
                if (deleteRowRoomDetails != null) context.RemoveRange(deleteRowRoomDetails);
                context.SaveChanges();
                var deleteRowRoom = context.Room.Where(x => x.RoomId == roomId);
                if (deleteRowRoom != null) context.RemoveRange(deleteRowRoom);
                context.SaveChanges();
            }
            catch (System.Exception)
            {

                throw new Exception("Room Not Deleted");
            }
        }
        public void leaveRoom(string roomId, string empId)
        {
            try
            {
                pokerplanningContext context = new pokerplanningContext();
                var deleteRowRoomDetails = context.Roomdetails.Where(x => x.RoomId == roomId && x.EmpId == empId);
                if (deleteRowRoomDetails != null) context.RemoveRange(deleteRowRoomDetails);
                context.SaveChanges();
            }
            catch (System.Exception)
            {

                throw new Exception("Room Not Left");
            }
        }
        public void updateStory(string storyId, string story, string roomId, string hostId)
        {
            try
            {
                pokerplanningContext context = new pokerplanningContext();
                var deleteRowRoomDetails = context.Roomdetails.Where(x => x.RoomId == roomId);
                foreach (var item in deleteRowRoomDetails)
                {
                    item.NumberChoosen = null;
                    item.NumberChoosenStatus = "no";
                }
                context.SaveChanges();
                var storyDetails = context.Room.First(x => x.RoomId == roomId);
                storyDetails.Story = story;
                storyDetails.StoryId = storyId;
                context.SaveChanges();
            }
            catch (System.Exception)
            {

                throw new Exception("Story Not Updated");
            }
        }

        public IEnumerable<Room> getStory(string roomId)
        {
            IEnumerable<Room> result = null;
            pokerplanningContext context = new pokerplanningContext();
            result = (from obj in context.Room where obj.RoomId == roomId select obj);
            result.ToList();
            context.SaveChanges();
            return result;
        }
    }
}
