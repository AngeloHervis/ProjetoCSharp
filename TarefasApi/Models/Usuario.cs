using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TarefasApi.Models;

public class Usuario
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;

    [JsonIgnore]
    public ICollection<Tarefa> Tarefas { get; set; } = new List<Tarefa>();
}
