using KvizHub.API.Data;
using KvizHub.API.DTOs;
using KvizHub.API.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;



namespace KvizHub.API.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        
        public async Task Register(RegisterDto dto)
        {
            if (_context.Users.Any(u => u.Username == dto.Username))
            {
                throw new Exception("Username already exists");
            }

            if (_context.Users.Any(u => u.Email == dto.Email))
            {
                throw new Exception("Email already exists");
            }

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                ImageUri = dto.ImageUri,
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<object?> Login(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);

            if (user == null)
            {
                return null;
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

            if (!isPasswordValid)
                return null;

            var claims = new[]
            {   
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new
            {
                result = new JwtSecurityTokenHandler().WriteToken(token),
                imageUri = user.ImageUri,
                role = user.Role,
                email = user.Email
            };
        }
    }
}
