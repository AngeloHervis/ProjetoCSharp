namespace ListaDeTarefas.Models;

public class Tarefa{
    public string Id {get;set;}
    public string? Nome{get;set;}
     public string? DescricaoTarefa{get;set;}
    public List<Usuario> Usuarios {get;set;}
    
    
    public Tarefa(string nome, string descricaoTarefa){
        Nome = nome;
        DescricaoTarefa = descricaoTarefa;

    }

    public Tarefa(){
        Usuarios = new List<Usuario>();
        Id = Guid.NewGuid().ToString();
    }
}