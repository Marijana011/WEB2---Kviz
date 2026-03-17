namespace KvizHub.API.DTOs
{
    public class CreateQuestionDto
    {
        public string Text { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string OptionA { get; set; } = string.Empty;
        public string OptionB { get; set; } = string.Empty;
        public string OptionC { get; set; } = string.Empty;
        public string OptionD { get; set; } = string.Empty;

        public string CorrectAnswer { get; set; } = string.Empty;
        public int QuizId {  get; set; }

    }
}
