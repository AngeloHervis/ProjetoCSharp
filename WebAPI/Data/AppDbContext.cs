using Microsoft.EntityFrameworkCore;
using WebAPI.Models; // Importe o namespace WebAPI.Models

namespace WebAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } // Referência para a classe User

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=app.db");
        }
    }
}
