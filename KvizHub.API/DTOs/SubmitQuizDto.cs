namespace KvizHub.API.DTOs
{
    public class SubmitQuizDto
    {
        public int QuizId {  get; set; }
        public List<AnswerDto> Answers { get; set; }
    }
}
