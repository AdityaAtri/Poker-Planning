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
    public class GetHostProfileDetailsController : ControllerBase
    {
        [HttpGet("{id}")]
        public IActionResult GetHostName(string id)
        {
            try
            {
                PokerDAO pokerDAO = new PokerDAO();
                return (new JsonResult(pokerDAO.getHostNameValid(id)));
            }
            catch (System.Exception)
            {
                return NotFound(new { message = "Host ID Not Found" });
            }

        }
    }
}