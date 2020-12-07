using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using MicroService.Data;
using MicroService.Data.Model;
using System;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace PokerProject.MicroService.Web.Controllers
{
    [ApiController]
    [EnableCors("MyAllowSpecificOrigins")]
    [Route("planningpoker/[controller]")]
    public class UpdateStoryController : ControllerBase
    {
        PokerDAO pokerDAO = new PokerDAO();

        [HttpPost("")]
        public IActionResult Post([FromBody] dynamic passingData)
        {
            try
            {
                string validString = Convert.ToString(passingData);
                var obj = JObject.Parse(validString);
                var storyId = obj["storyId"].ToString();
                var story = obj["story"].ToString();
                var roomId = obj["roomId"].ToString();
                var hostId = obj["hostId"].ToString();
                pokerDAO.updateStory(storyId, story, roomId, hostId);
                return Ok(new { message = "Story Updated" });
            }
            catch (System.Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}

