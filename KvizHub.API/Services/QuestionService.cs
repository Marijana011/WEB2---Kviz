using KvizHub.API.Data;
using KvizHub.API.DTOs;
using KvizHub.API.Models;


namespace KvizHub.API.Services
{
    public class QuestionService
    {
        private readonly AppDbContext _context;

        public QuestionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateQuestion(CreateQuestionDto dto)
        {
            var question = new Question
            {
                Text = dto.Text,
                Type = dto.Type,
                OptionA = dto.OptionA,
                OptionB = dto.OptionB,
                OptionC = dto.OptionC,
                OptionD = dto.OptionD,
                CorrectAnswer = dto.CorrectAnswer,
                QuizId = dto.QuizId
            };
            _context.Questiones.Add(question);
            await _context.SaveChangesAsync();

        }

    }
}
