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

    public class GetStoryController : ControllerBase
    {
        [HttpGet("{roomId}", Name = "GetStoryDetails")]
        public IActionResult GetStoryDetails(string roomId)
        {
            try
            {
                PokerDAO pokerDAO = new PokerDAO();
                JsonResult storyDetails = new JsonResult(pokerDAO.getStory(roomId));
                return storyDetails;
            }
            catch (System.Exception)
            {
                return NotFound(new { message = "Story Not Found" });
            }
        }
    }
}