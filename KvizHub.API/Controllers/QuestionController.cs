using KvizHub.API.DTOs;
using KvizHub.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace KvizHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly QuestionService _questionService;
        
        public QuestionController(QuestionService questionService) 
        {
            _questionService = questionService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuestion(CreateQuestionDto dto)
        {
            await _questionService.CreateQuestion(dto);
            return Ok("Question added");
        }

        

    }
}
