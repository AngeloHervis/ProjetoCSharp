using System.ComponentModel.DataAnnotations;

namespace TarefasApi.Models;

public class Usuario
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Nome { get; set; }
    public required string Email { get; set; }
    public required string Senha { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
