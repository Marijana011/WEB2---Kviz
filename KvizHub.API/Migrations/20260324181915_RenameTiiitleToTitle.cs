using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KvizHub.API.Migrations
{
    /// <inheritdoc />
    public partial class RenameTiiitleToTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tiitle",
                table: "Quizzes",
                newName: "Title");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Quizzes",
                newName: "Tiitle");
        }
    }
}
