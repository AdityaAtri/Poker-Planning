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
    public class GetAllRoomVoteDetailsController : ControllerBase
    {
        [HttpGet("{roomId}", Name = "GetRoomDetails")]
        public IActionResult GetRoomDetails(string roomId)
        {
            try
            {
                PokerDAO pokerDAO = new PokerDAO();
                JsonResult roomParticipants = new JsonResult(pokerDAO.getRoomParticipants(roomId));
                return roomParticipants;
            }
            catch (System.Exception)
            {
                return NotFound(new { message = "Participants Not Found" });
            }
        }
    }
}

