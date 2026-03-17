using KvizHub.API.DTOs;
using KvizHub.API.Services;
using Microsoft.AspNetCore.Mvc;


namespace KvizHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly QuizService _quizService;
        public QuizController(QuizService quizService)
        {
            _quizService = quizService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuiz(CreateQuizDto dto)
        {
            await _quizService.CreateQuiz(dto);
            return Ok("Quiz added");
        }
    }
}
