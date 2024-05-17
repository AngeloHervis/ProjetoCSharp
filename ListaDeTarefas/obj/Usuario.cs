
namespace ListaDeTarefas.Models;

public class Usuario{
 
    public string Id {get; set;}
    public string? Nome {get;set;}
    public string? Email{get;set;}
    public string? Genero{get;set;}
    public Tarefa Tarefa{get;set;}

       public Usuario(string nome, string genero, string email)
{
    Nome = nome;
    Genero = genero
    Email = email;
}
    public Usuario(){
        Id = Guid.NewGuid().ToString();
    }

}
