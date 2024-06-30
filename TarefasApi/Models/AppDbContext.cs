using Microsoft.EntityFrameworkCore;

namespace TarefasApi.Models;

public class AppDbContext : DbContext
{
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=Tarefas.db");
        }

    public DbSet<Tarefa> Tarefas { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<SubTarefa> SubTarefas { get; set; }
}