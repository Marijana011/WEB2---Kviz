using Microsoft.EntityFrameworkCore;
using KvizHub.API.Models;


namespace KvizHub.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questiones { get; set; }
    }


}