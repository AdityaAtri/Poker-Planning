using Microsoft.AspNetCore.Mvc;
using MicroService.Data;
using Microsoft.AspNetCore.Cors;

namespace PokerProject.MicroService.Web.Controllers
{
    [ApiController]
    [EnableCors("MyAllowSpecificOrigins")]
    [Route("planningpoker/[controller]")]

    public class DeleteRoomController : ControllerBase
    {
        PokerDAO pokerDAO = new PokerDAO();

        [HttpDelete("{roomId}")]
        public IActionResult Delete(string roomId)
        {
            try
            {
                PokerDAO pokerDAO = new PokerDAO();
                pokerDAO.deleteRoom(roomId);
                return Ok(new { message = "Room Deleted : " + roomId });
            }
            catch (System.Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}