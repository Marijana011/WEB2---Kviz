using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KvizHub.API.Migrations
{
    /// <inheritdoc />
    public partial class FixQuestionColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CurrentAnswer",
                table: "Questiones",
                newName: "CorrectAnswer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CorrectAnswer",
                table: "Questiones",
                newName: "CurrentAnswer");
        }
    }
}
