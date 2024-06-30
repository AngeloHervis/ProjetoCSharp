using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TarefasApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AcessoTotal",
        builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
    );
});

var app = builder.Build();

app.MapGet("/", () => "Tarefas API");

//Endpoints Usuário
//GET: http://localhost:5272/usuario/listar
app.MapGet(
    "/usuario/listar",
    (AppDbContext context) =>
    {
        if (context.Usuarios.Count() == 0)
        {
            return Results.NotFound("Nenhum usuário encontrado");
        }
        return Results.Ok(context.Usuarios.ToList());
    }
);

//GET: http://localhost:5272/usuario/obter/{id}
app.MapGet(
    "/usuario/obter/{id}",
    (AppDbContext context, string id) =>
    {
        var usuario = context.Usuarios.Find(id);
        if (usuario == null)
        {
            return Results.NotFound($"Usuário com id {id} não encontrado");
        }
        return Results.Ok(usuario);
    }
);

//POST: http://localhost:5272/usuario/cadastrar
app.MapPost(
    "/usuario/cadastrar",
    (AppDbContext context, Usuario usuario) =>
    {
        context.Usuarios.Add(usuario);
        context.SaveChanges();
        return Results.Created($"/usuarios/obter/{usuario.Id}", usuario);
    }
);


//PUT: http://localhost:5272/usuario/editar/{id}
app.MapPut(
    "/usuario/editar/{id}",
    (AppDbContext context, string id, Usuario usuario) =>
    {
        var usuarioBanco = context.Usuarios.Find(id);
        if (usuarioBanco == null)
        {
            return Results.NotFound($"Usuário com id {id} não encontrado");
        }
        usuarioBanco.Nome = usuario.Nome;
        usuarioBanco.Email = usuario.Email;
        usuarioBanco.Senha = usuario.Senha;
        context.SaveChanges();
        return Results.Ok(usuarioBanco);
    }
);

//DELETE: http://localhost:5272/usuario/excluir/{id}
app.MapDelete(
    "/usuario/excluir/{id}",
    (AppDbContext context, string id) =>
    {
        var usuario = context.Usuarios.Find(id);
        if (usuario == null)
        {
            return Results.NotFound($"Usuário com id {id} não encontrado");
        }
        context.Usuarios.Remove(usuario);
        context.SaveChanges();
        return Results.NoContent();
    }
);

//Endpoints Tarefas
//GET: http://localhost:5272/tarefa/listar
app.MapGet(
    "/tarefa/listar",
    (AppDbContext context) =>
    {
        if (context.Tarefas.Count() == 0)
        {
            return Results.NotFound("Nenhuma tarefa encontrada");
        }
        return Results.Ok(context.Tarefas.ToList());
    }
);

//GET: http://localhost:5272/tarefa/obter/{id}
app.MapGet(
    "/tarefa/obter/{id}",
    (AppDbContext context, string id) =>
    {
        var tarefa = context.Tarefas.Find(id);
        if (tarefa == null)
        {
            return Results.NotFound($"Tarefa com id {id} não encontrada");
        }
        return Results.Ok(tarefa);
    }
);

//POST: http://localhost:5272/tarefa/cadastrar
app.MapPost(
    "/tarefa/cadastrar",
    (AppDbContext context, Tarefa tarefa) =>
    {
        context.Tarefas.Add(tarefa);
        context.SaveChanges();
        return Results.Created($"/tarefas/obter/{tarefa.TarefaId}", tarefa);
    }
);

//PUT: http://localhost:5272/tarefa/editar/{id}
app.MapPut(
    "/tarefa/editar/{id}",
    (AppDbContext context, string id, Tarefa tarefa) =>
    {
        var tarefaBanco = context.Tarefas.Find(id);
        if (tarefaBanco == null)
        {
            return Results.NotFound($"Tarefa com id {id} não encontrada");
        }
        tarefaBanco.Titulo = tarefa.Titulo;
        tarefaBanco.Descricao = tarefa.Descricao;
        tarefaBanco.Categoria = tarefa.Categoria;
        tarefaBanco.Status = tarefa.Status;
        context.SaveChanges();
        return Results.Ok(tarefaBanco);
    }
);

//DELETE: http://localhost:5272/tarefa/excluir/{id}
app.MapDelete(
    "/tarefa/excluir/{id}",
    (AppDbContext context, string id) =>
    {
        // Verifica se a tarefa possui subtarefas antes de excluir e exclui as subtarefas também
        var subtarefas = context.SubTarefas.Where(s => s.TarefaId == id).ToList();
        if (subtarefas.Count > 0)
        {
            context.SubTarefas.RemoveRange(subtarefas);
        }
        var tarefa = context.Tarefas.Find(id);
        if (tarefa == null)
        {
            return Results.NotFound($"Tarefa com id {id} não encontrada");
        }
        context.Tarefas.Remove(tarefa);
        context.SaveChanges();
        return Results.NoContent();
    }
);

//Endpoints Categorias
//GET: http://localhost:5272/categoria/listar
app.MapGet(
    "/categoria/listar",
    (AppDbContext context) =>
    {
        if (context.Categorias.Count() == 0)
        {
            return Results.NotFound("Nenhuma categoria encontrada");
        }
        return Results.Ok(context.Categorias.ToList());
    }
);

//GET: http://localhost:5272/categoria/obter/{id}
app.MapGet(
    "/categoria/obter/{id}",
    (AppDbContext context, string id) =>
    {
        var categoria = context.Categorias.Find(id);
        if (categoria == null)
        {
            return Results.NotFound($"Categoria com id {id} não encontrada");
        }
        return Results.Ok(categoria);
    }
);

//POST: http://localhost:5272/categoria/cadastrar
app.MapPost(
    "/categoria/cadastrar",
    (AppDbContext context, Categoria categoria) =>
    {
        context.Categorias.Add(categoria);
        context.SaveChanges();
        return Results.Created($"/categorias/obter/{categoria.CategoriaId}", categoria);
    }
);

//PUT: http://localhost:5272/categoria/editar/{id}
app.MapPut(
    "/categoria/editar/{id}",
    (AppDbContext context, string id, Categoria categoria) =>
    {
        var categoriaBanco = context.Categorias.Find(id);
        if (categoriaBanco == null)
        {
            return Results.NotFound($"Categoria com id {id} não encontrada");
        }
        categoriaBanco.Nome = categoria.Nome;
        context.SaveChanges();
        return Results.Ok(categoriaBanco);
    }
);

//DELETE: http://localhost:5272/categoria/excluir/{id}
app.MapDelete(
    "/categoria/excluir/{id}",
    (AppDbContext context, string id) =>
    {
        // Verifica se a categoria está sendo usada em alguma tarefa antes de excluir
        var tarefa = context.Tarefas.FirstOrDefault(t => t.Categoria.CategoriaId == id);
        if (tarefa != null)
        {
            return Results.BadRequest("Categoria não pode ser excluída, pois está sendo usada em uma tarefa");
        }
        var categoria = context.Categorias.Find(id);
        if (categoria == null)
        {
            return Results.NotFound($"Categoria com id {id} não encontrada");
        }
        context.Categorias.Remove(categoria);
        context.SaveChanges();
        return Results.NoContent();
    }
);

//Endpoints SubTarefas
//GET: http://localhost:5272/tarefa/{tarefaId}/subtarefa/listar
app.MapGet(
    "/tarefa/{tarefaId}/subtarefa/listar",
    (AppDbContext context, string tarefaId) =>
    {
        var tarefa = context.Tarefas.Find(tarefaId);
        if (tarefa == null)
        {
            return Results.NotFound($"Tarefa com id {tarefaId} não encontrada");
        }
        if (context.SubTarefas.Count() == 0)
        {
            return Results.NotFound("Nenhuma subtarefa encontrada");
        }
        return Results.Ok(context.SubTarefas.Where(s => s.TarefaId == tarefaId).ToList());
    }
);

//GET: http://localhost:5272/tarefa/{tarefaId}/subtarefa/obter/{id}
app.MapGet(
    "/tarefa/{tarefaId}/subtarefa/obter/{id}",
    (AppDbContext context, string tarefaId, string id) =>
    {
        var subTarefa = context.SubTarefas.Find(id);
        if (subTarefa == null)
        {
            return Results.NotFound($"Subtarefa com id {id} não encontrada");
        }
        return Results.Ok(subTarefa);
    }
);

//POST: http://localhost:5272/tarefa/{tarefaId}/subtarefa/cadastrar
app.MapPost(
    "/tarefa/{tarefaId}/subtarefa/cadastrar",
    (AppDbContext context, string tarefaId, SubTarefa subTarefa) =>
    {
        var tarefa = context.Tarefas.Find(tarefaId);
        if (tarefa == null)
        {
            return Results.NotFound($"Tarefa com id {tarefaId} não encontrada");
        }
        subTarefa.TarefaId = tarefaId;
        context.SubTarefas.Add(subTarefa);
        context.SaveChanges();
        return Results.Created(
            $"/tarefas/{tarefaId}/subtarefas/obter/{subTarefa.SubTarefaId}",
            subTarefa
        );
    }
);

//PUT: http://localhost:5272/tarefa/{tarefaId}/subtarefa/editar/{id}
app.MapPut(
    "/tarefa/{tarefaId}/subtarefa/editar/{id}",
    (AppDbContext context, string tarefaId, string id, SubTarefa subTarefa) =>
    {
        var subTarefaBanco = context.SubTarefas.Find(id);
        if (subTarefaBanco == null)
        {
            return Results.NotFound($"Subtarefa com id {id} não encontrada");
        }
        subTarefaBanco.Titulo = subTarefa.Titulo;
        subTarefaBanco.Descricao = subTarefa.Descricao;
        subTarefaBanco.Status = subTarefa.Status;
        context.SaveChanges();
        return Results.Ok(subTarefaBanco);
    }
);

//DELETE: http://localhost:5272/tarefa/{tarefaId}/subtarefa/excluir/{id}
app.MapDelete(
    "/tarefa/{tarefaId}/subtarefa/excluir/{id}",
    (AppDbContext context, string tarefaId, string id) =>
    {
        var subTarefa = context.SubTarefas.Find(id);
        if (subTarefa == null)
        {
            return Results.NotFound($"Subtarefa com id {id} não encontrada");
        }
        context.SubTarefas.Remove(subTarefa);
        context.SaveChanges();
        return Results.NoContent();
    }
);

app.UseCors("AcessoTotal");
app.Run();
