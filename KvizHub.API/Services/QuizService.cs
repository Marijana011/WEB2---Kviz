using KvizHub.API.Data;
using KvizHub.API.DTOs;
using KvizHub.API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;


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
                Category = dto.Category,
                TimeLimit = dto.Questions.Count * 30,
                Questions = dto.Questions.Select(q => new Question
                {
                    Text = q.Text,
                    Type = q.Type,
                    OptionA = q.OptionA.Trim(),
                    OptionB = q.OptionB.Trim(),
                    OptionC = q.OptionC.Trim(),
                    OptionD = q.OptionD.Trim(),
                    CorrectAnswer = q.CorrectAnswer.Trim()
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

        public async Task<object> SubmitQuiz(SubmitQuizDto dto)
        {
            var questions = await _context.Questiones
                .Where(q => q.QuizId == dto.QuizId)
                .ToListAsync();

            int score = 0;

            foreach (var answer in dto.Answers)
            {
                var question = questions.FirstOrDefault(q => q.Id == answer.QuestionId);

                if (question != null)
                {
                    if (question.Type == "Multiple")
                    {
                        var correct = question.CorrectAnswer
                            .Split(',')
                            .Select(x => x.Trim().ToLower())
                            .Where(x => !string.IsNullOrEmpty(x))
                            .OrderBy(x => x);

                        var user = answer.Answer
                            .Split(',')
                            .Select(x => x.Trim().ToLower())
                            .Where (x => !string.IsNullOrEmpty(x))
                            .OrderBy(x => x);


                        if (correct.SequenceEqual(user))
                        {
                            score++;
                        }
                    }
                    else
                    {
                        var correctAnswer = string.Join(", ",
                        (question.CorrectAnswer ?? "")
                        .Split(',')
                        .Select(x => x.Trim())
                        .Where(x => !string.IsNullOrEmpty(x)));

                        var userAnswer = string.Join(", ",
                        (answer.Answer ?? "")
                        .Split(',')
                        .Select(x => x.Trim())
                        .Where(x => !string.IsNullOrEmpty(x)));

                        if (correctAnswer == userAnswer)
                        {
                            score++;
                        }
                    }
                }
            }

            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if(currentUser == null)
            {
                throw new Exception("User not found");
            }


            var details = new List<object>();

            foreach (var a in dto.Answers)
            {
                var question = questions.FirstOrDefault(q => q.Id == a.QuestionId);

                if (question == null) continue;

                var correctAnswers = (question.CorrectAnswer ?? "")
                    .Split(',')
                    .Select(x => x.Trim())
                    .Where(x => !string.IsNullOrEmpty(x))
                    .OrderBy(x => x)
                    .ToList();

                var userAnswers = (a.Answer ?? "")
                    .Split(',')
                    .Select(x => x.Trim())
                    .Where(x => !string.IsNullOrEmpty(x))
                    .OrderBy(x => x)
                    .ToList();

                var isCorrect = correctAnswers.SequenceEqual(userAnswers);

                details.Add(new
                {
                    questionText = question.Text,
                    userAnswer = string.Join(", ", userAnswers),
                    correctAnswer = string.Join(", ", correctAnswers),
                    isCorrect = isCorrect
                });
            }


            var result = new Result
            {
                UserId = currentUser.Id,
                QuizId = dto.QuizId,
                Score = score,
                CreatedAt = DateTime.UtcNow,
                DetailsJson = JsonSerializer.Serialize(details)
            };

            _context.Results.Add(result);
            await _context.SaveChangesAsync();

            return new
            {
                score = score,
                total = questions.Count(),
                details = dto.Answers.Select(answer =>
                {
                    var question = questions.First(q => q.Id == answer.QuestionId);

                    bool isCorrect = false;

                    if (question.Type == "Multiple")
                    {
                        var correct = question.CorrectAnswer
                            .Split(',')
                            .Select(x => x.Trim().ToLower())
                            .Where(x => !string.IsNullOrEmpty(x))
                            .OrderBy(x => x);

                        var user = answer.Answer
                            .Split(',')
                            .Select(x => x.Trim().ToLower())
                            .Where(x => !string.IsNullOrEmpty(x))
                            .OrderBy(x => x);

                        isCorrect = correct.SequenceEqual(user);
                    }
                    else
                    {
                        var correct = (question.CorrectAnswer ?? "").Trim().ToLower();
                        var user = (answer.Answer ?? "").Trim().ToLower();

                        isCorrect = correct == user;
                    }

                    return new
                    {
                        question = question.Text,
                        userAnswer = string.Join(", ",(answer.Answer ?? "")
                        .Split(',').Select(x => x.Trim()).Where(x => !string.IsNullOrEmpty(x))),

                        correctAnswer = string.Join(", ",(question.CorrectAnswer ?? "")
                        .Split(',').Select(x => x.Trim()).Where(x => !string.IsNullOrEmpty(x))),
                        isCorrect = isCorrect
                    };
                })
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

        public async Task<object> GetUserResults(string email)
        {
            var cleanEmail = email.Trim().ToLower();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == cleanEmail);

            if (user == null)
                return new List<object>();

            var results = await _context.Results
            .Where(r => r.UserId == user.Id)
            .Include(r => r.Quiz)
            .Select(r => new
            {
                quizTitle = r.Quiz.Title,
                score = r.Score,
                total = r.Quiz.Questions.Count,
                date = r.CreatedAt,
                quizId = r.QuizId,
                details = r.DetailsJson
            })
            .ToListAsync();
                return results;
            }


        public async Task<List<Quiz>> GetAllQuizzes()
        {
            return await _context.Quizzes.ToListAsync();
        }

        public async Task<object> GetLeaderboard(int id)
        {
            var results = await _context.Results
                .Where(r => r.QuizId == id)
                .Include(r => r.User)
                .ToListAsync();

            var leaderboard = results
                .GroupBy(r => r.User.Username)
                .Select(g => g
                    .OrderByDescending(r => r.Score)
                    .ThenBy(r => r.CreatedAt)
                    .First())
                .OrderByDescending(r => r.Score)
                .ThenBy(r => r.CreatedAt)
                .Select(r => new
                {
                    username = r.User.Username,
                    score = r.Score,
                    createdAt = r.CreatedAt
                })
                .ToList();

            return leaderboard;
        }
    }
}
