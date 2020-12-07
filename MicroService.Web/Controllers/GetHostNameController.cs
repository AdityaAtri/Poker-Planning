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

    public class GetHostNameController : ControllerBase
    {
        [HttpGet("{roomId}")]
        public IActionResult GetRoomNameForParticipants(string roomId)
        {
            try
            {
                PokerDAO pokerDAO = new PokerDAO();
                return (new JsonResult(pokerDAO.getHostName(roomId)));
            }
            catch (System.Exception)
            {
                return NotFound(new { message = "Host Name Not Found" });
            }

        }
    }
}
