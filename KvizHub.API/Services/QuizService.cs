using KvizHub.API.Data;
using KvizHub.API.DTOs;
using KvizHub.API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;


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
                Title = dto.Title,
                Description = dto.Description,
                Difficulty = dto.Difficulty,
                Questions = dto.Questions.Select(q => new Question
                {
                    Text = q.Text,
                    Type = q.Type,
                    OptionA = q.OptionA,
                    OptionB = q.OptionB,
                    OptionC = q.OptionC,
                    OptionD = q.OptionD,
                    CorrectAnswer = q.CorrectAnswer
                }).ToList()
            };

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();
        }

        public async Task<Quiz?> GetQuizId(int id)
        {
            var quiz = await _context.Quizzes.
                Include(q => q.Questions)
                .FirstOrDefaultAsync(q => q.Id == id);

            return quiz;
        }

        public async Task<object> SubmitQuiz(SubmitQuizDto dto, string email)
        {
            var questions = await _context.Questiones
                .Where(q => q.QuizId == dto.QuizId)
                .ToListAsync();

            int score = 0;

            foreach (var answer in dto.Answers)
            {
                var question = questions.FirstOrDefault(q => q.Id == answer.QuestionId);

                if (question != null && question.CorrectAnswer == answer.Answer)
                {
                    score++;
                }

            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            var result = new Result
            {
                UserId = user.Id,
                QuizId = dto.QuizId,
                Score = score
            };

            _context.Results.Add(result);
            await _context.SaveChangesAsync();

            return new
            {
                score = score,
                total = questions.Count()
            };
        }

        public async Task<object> GetResultByQuiz(int quizId)
        {
            var results = await _context.Results.
                Where(r => r.QuizId ==  quizId)
                .Include(r => r.User)
                .OrderByDescending(r => r.Score)
                .Select(r => new
                {
                    username = r.User.Username,
                    score = r.Score,
                    createdAt = r.CreatedAt

                }).ToListAsync();

            return results;
        }

        public async Task<List<Quiz>> GetAllQuizzes()
        {
            return await _context.Quizzes.ToListAsync();
        }
    }
}
