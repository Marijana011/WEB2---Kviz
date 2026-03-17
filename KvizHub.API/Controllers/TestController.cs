using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace KvizHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [Authorize]
        [HttpGet("protected")]
        public IActionResult Protected()
        {
            return Ok("Token works - access allowed");
        }
    }
}
