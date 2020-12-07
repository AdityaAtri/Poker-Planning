using Microsoft.AspNetCore.Mvc;
using MicroService.Data;
using Microsoft.AspNetCore.Cors;

namespace PokerProject.MicroService.Web.Controllers
{
    [ApiController]
    [EnableCors("MyAllowSpecificOrigins")]
    [Route("planningpoker/[controller]")]
    public class LeaveRoomController : ControllerBase
    {
        [HttpDelete("{roomId}/{empId}")]
        public IActionResult Delete(string roomId, string empId)
        {
            try
            {
                PokerDAO pokerDAO = new PokerDAO();
                pokerDAO.leaveRoom(roomId, empId);
                return Ok(new { message = "Room Left : " + "(" + roomId + "," + empId + ")" });
            }
            catch (System.Exception e)
            {

                return NotFound(new { message = e.Message });
            }
        }
    }
}


