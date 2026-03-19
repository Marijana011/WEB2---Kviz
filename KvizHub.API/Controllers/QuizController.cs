using KvizHub.API.DTOs;
using KvizHub.API.Services;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuiz(int id)
        {
            var quiz = await _quizService.GetQuizId(id);

            if (quiz == null)
            {
                return NotFound();
            }
            return Ok(quiz);
        }

        [HttpPost("submit")]
        [Authorize]
        public async Task<IActionResult> SubmitQuiz(SubmitQuizDto dto)
        {
            var email = User.Identity.Name;

            var result = await _quizService.SubmitQuiz(dto, email);
            return Ok(result);

        }


        [HttpGet("{id}/results")]
        public async Task<IActionResult> GetResult(int id)
        {
            var results = await _quizService.GetResultByQuiz(id);
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllQuizzes()
        {
            var quizzes = await _quizService.GetAllQuizzes();
            return Ok(quizzes);
        }
    
    }
}
