using System;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using MicroService.Data;
using MicroService.Data.Model;
using Microsoft.AspNetCore.Cors;
namespace PokerProject.MicroService.Web.Controllers
{
    [ApiController]
    [EnableCors("MyAllowSpecificOrigins")]
    [Route("planningpoker/[controller]")]
    public class GetRoomDetailsController : ControllerBase
    {
        [HttpGet("{roomId}")]
        public IActionResult GetRoomDetailsParticipants(string roomId)
        {
            try
            {
                PokerDAO pokerDAO = new PokerDAO();
                return (new JsonResult(pokerDAO.getRoomDetails(roomId)));
            }
            catch (System.Exception)
            {
                return NotFound(new { message = "Room Details Not Found" });
            }

        }
    }
}