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
    public class RegisterController : ControllerBase
    {
        PokerDAO pokerDAO = new PokerDAO();

        [HttpPost("")]
        public IActionResult Post([FromBody] Empdetails empdetails)
        {
            try
            {
                pokerDAO.insertIntoEmpDetails(empdetails);
                return Ok(new { message = "User created with Oracle Id : " + empdetails.EmpOracleId + " and Name : " + empdetails.EmpName });
            }
            catch (System.Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}
