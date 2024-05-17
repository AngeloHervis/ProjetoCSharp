namespace ListaDeTarefas.Models;

public class Usuario
{
    public string Id { get; set; }
    public string? Nome { get; set; }
    public string Cpf { get; set; }
    public string? Genero { get; set; }
    public string? Email { get; set; }

    public Usuario(string nome, string cpf, string genero, string email)
    {
        Nome = nome;
        Cpf = cpf;
        Genero = genero;
        Email = email;
    }

    public Usuario()
    {
        Id = Guid.NewGuid().ToString();
    }
}
