using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using MicroService.Data;
using MicroService.Data.Model;
using System;
using Microsoft.AspNetCore.Cors;

namespace PokerProject.MicroService.Web.Controllers
{
    [ApiController]
    [EnableCors("MyAllowSpecificOrigins")]
    [Route("planningpoker/[controller]")]

    public class JoinExistingRoomController : ControllerBase
    {
        PokerDAO pokerDAO = new PokerDAO();

        [HttpPost("")]
        public IActionResult Post([FromBody] Roomdetails roomdetails)
        {
            try
            {

                pokerDAO.insertIntoRoomDetails(roomdetails);
                return Ok(new { message = "Room is Joined - Room Id : " + roomdetails.RoomId + " and Host Id : " + roomdetails.EmpId });
            }
            catch (System.Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}