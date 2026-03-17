namespace KvizHub.API.Models
{
    public class Quiz
    {
        public int Id { get; set; }

        public string Tiitle { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Difficulty { get; set; } = string.Empty;

        public int TimeLimit { get; set; }

        public string Category { get; set; } = string.Empty;
        public List<Question> Questions { get; set; }
    }
}
