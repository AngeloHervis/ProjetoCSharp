using Microsoft.EntityFrameworkCore;

namespace TarefasApi.Models;

public class AppDbContext : DbContext
{
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

    public DbSet<Tarefa> Tarefas { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<SubTarefa> SubTarefas { get; set; }
}
