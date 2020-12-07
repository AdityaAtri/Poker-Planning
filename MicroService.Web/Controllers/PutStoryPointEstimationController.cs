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

    public class PutStoryPointEstimationController : ControllerBase
    {
        PokerDAO pokerDAO = new PokerDAO();

        [HttpPost("")]
        public IActionResult Post([FromBody] dynamic passingData)
        {
            try
            {
                string validString = Convert.ToString(passingData);
                var obj = JObject.Parse(validString);
                var numberChoosen = obj["numberChoosen"].ToString();
                var roomId = obj["roomId"].ToString();
                var empId = obj["empId"].ToString();
                pokerDAO.storyPointEstimation(numberChoosen, roomId, empId);
                return Ok(new { message = "Story Point Estimation - " + numberChoosen });
            }
            catch (System.Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}