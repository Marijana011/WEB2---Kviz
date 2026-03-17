using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace KvizHub.API.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Questiones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    OptionA = table.Column<string>(type: "text", nullable: false),
                    OptionB = table.Column<string>(type: "text", nullable: false),
                    OptionC = table.Column<string>(type: "text", nullable: false),
                    OptionD = table.Column<string>(type: "text", nullable: false),
                    CurrentAnswer = table.Column<string>(type: "text", nullable: false),
                    QuizId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questiones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questiones_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questiones_QuizId",
                table: "Questiones",
                column: "QuizId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Questiones");
        }
    }
}
