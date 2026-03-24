using Microsoft.AspNetCore.Mvc;
using KvizHub.API.DTOs;
using KvizHub.API.Services;

namespace KvizHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            await _authService.Register(dto);
            return Ok("User registered successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var result = await _authService.Login(dto);
            if(result == null)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(new {result = result});
        }
    }
}