using KvizHub.API.Data;
using KvizHub.API.DTOs;
using KvizHub.API.Models;


namespace KvizHub.API.Services
{
    public class QuizService
    {
        private readonly AppDbContext _context;

        public QuizService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateQuiz(CreateQuizDto dto)
        {
            var quiz = new Quiz
            {
                Tiitle = dto.Title,
                Description = dto.Description,
                Difficulty = dto.Difficulty,
                TimeLimit = dto.TimeLimit,
                Category = dto.Category
            };

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();
        }
    }
}
