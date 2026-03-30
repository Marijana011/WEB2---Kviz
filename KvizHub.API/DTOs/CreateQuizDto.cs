namespace KvizHub.API.DTOs
{
    public class CreateQuizDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Difficulty {  get; set; } = string.Empty;
        public int TimeLimit { get; set; }
        public string Category {  get; set; } = string.Empty;

        public List<CreateQuestionDto> Questions { get; set; }
    }
}
