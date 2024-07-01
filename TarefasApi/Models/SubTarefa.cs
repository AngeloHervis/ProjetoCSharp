namespace TarefasApi.Models;

public class SubTarefa
{
    public string SubTarefaId { get; set; } = Guid.NewGuid().ToString();
    public string TarefaId { get; set; }
    public string Titulo { get; set; }
    public string Descricao { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
    public string Status { get; set; } = "Não iniciada";
}