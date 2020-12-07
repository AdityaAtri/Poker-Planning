using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using MicroService.Data;
using MicroService.Data.Model;
using System;
using Microsoft.AspNetCore.Cors;

namespace PokerMicroService.MicroService.Web.Controllers
{
    [ApiController]
    [EnableCors("MyAllowSpecificOrigins")]
    [Route("planningpoker/[controller]")]
    public class CreateRoomController : ControllerBase
    {
        PokerDAO pokerDAO = new PokerDAO();

        [HttpPost("")]
        public IActionResult Post([FromBody] Room room)
        {
            try
            {
                pokerDAO.insertIntoCreateRoom(room);
                return Ok(new { message = "Room Create with Room Id : " + room.RoomId + " and Host Id : " + room.HostId });
            }
            catch (System.Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}