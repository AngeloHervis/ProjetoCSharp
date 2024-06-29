using TarefasApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(
    options =>
    {
        options.AddPolicy("AcessoTotal",
            builder => builder.
                AllowAnyOrigin().
                AllowAnyHeader().
                AllowAnyMethod());
    }
);

var app = builder.Build();

app.MapGet("/", () => "Tarefas API");

//Endpoints Usuários
//GET: https://localhost:5272/api/usuarios/listar
app.MapGet(
    "/api/usuarios/listar",
    (AppDbContext context) =>
    {
        if (context.Usuarios.Count() == 0)
        {
            return Results.NotFound("Nenhum usuário encontrado");
        }
        return Results.Ok(context.Usuarios.ToList());
    }
);

//POST: https://localhost:5272/api/usuarios/cadastrar
app.MapPost(
    "/api/usuarios/cadastrar",
    (AppDbContext context, Usuario usuario) =>
    {
        context.Usuarios.Add(usuario);
        context.SaveChanges();
        return Results.Created($"/api/usuarios/obter/{usuario.Id}", usuario);
    }
);

//PUT: https://localhost:5272/api/usuarios/alterar/{id}
app.MapPut(
    "/api/usuarios/alterar/{id}",
    (AppDbContext context, int id, Usuario usuario) =>
    {
        var usuarioBanco = context.Usuarios.Find(id);
        if (usuarioBanco == null)
        {
            return Results.NotFound($"Usuário com id {id} não encontrado");
        }
        usuarioBanco.Nome = usuario.Nome;
        usuarioBanco.Email = usuario.Email;
        context.SaveChanges();
        return Results.Ok(usuarioBanco);
    }
);

//DELETE: https://localhost:5272/api/usuarios/excluir/{id}
app.MapDelete(
    "/api/usuarios/excluir/{id}",
    (AppDbContext context, int id) =>
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
//GET: https://localhost:5272/api/tarefas/listar
app.MapGet(
    "/api/tarefas/listar",
    (AppDbContext context) =>
    {
        if (context.Tarefas.Count() == 0)
        {
            return Results.NotFound("Nenhuma tarefa encontrada");
        }
        return Results.Ok(context.Tarefas.ToList());
    }
);

//POST: https://localhost:5272/api/tarefas/cadastrar
app.MapPost(
    "/api/tarefas/cadastrar",
    (AppDbContext context, Tarefa tarefa) =>
    {
        context.Tarefas.Add(tarefa);
        context.SaveChanges();
        return Results.Created($"/api/tarefas/obter/{tarefa.TarefaId}", tarefa);
    }
);

//PUT: https://localhost:5272/api/tarefas/alterar/{id}
app.MapPut(
    "/api/tarefas/alterar/{id}",
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

//DELETE: https://localhost:5272/api/tarefas/excluir/{id}
app.MapDelete(
    "/api/tarefas/excluir/{id}",
    (AppDbContext context, string id) =>
    {
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
//GET: https://localhost:5272/api/categorias/listar
app.MapGet(
    "/api/categorias/listar",
    (AppDbContext context) =>
    {
        if (context.Categorias.Count() == 0)
        {
            return Results.NotFound("Nenhuma categoria encontrada");
        }
        return Results.Ok(context.Categorias.ToList());
    }
);

//POST: https://localhost:5272/api/categorias/cadastrar
app.MapPost(
    "/api/categorias/cadastrar",
    (AppDbContext context, Categoria categoria) =>
    {
        context.Categorias.Add(categoria);
        context.SaveChanges();
        return Results.Created($"/api/categorias/obter/{categoria.CategoriaId}", categoria);
    }
);

//PUT: https://localhost:5272/api/categorias/alterar/{id}
app.MapPut(
    "/api/categorias/alterar/{id}",
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

//DELETE: https://localhost:5272/api/categorias/excluir/{id}
app.MapDelete(
    "/api/categorias/excluir/{id}",
    (AppDbContext context, string id) =>
    {
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
//GET: https://localhost:5272/api/tarefas/{tarefaId}/subtarefas/listar
app.MapGet(
    "/api/tarefas/{tarefaId}/subtarefas/listar",
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

//POST: https://localhost:5272/api/tarefas/{tarefaId}/subtarefas/cadastrar
app.MapPost(
    "/api/tarefas/{tarefaId}/subtarefas/cadastrar",
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
            $"/api/tarefas/{tarefaId}/subtarefas/obter/{subTarefa.SubTarefaId}",
            subTarefa
        );
    }
);

//PUT: https://localhost:5272/api/tarefas/{tarefaId}/subtarefas/alterar/{id}
app.MapPut(
    "/api/tarefas/{tarefaId}/subtarefas/alterar/{id}",
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

//DELETE: https://localhost:5272/api/tarefas/{tarefaId}/subtarefas/excluir/{id}
app.MapDelete(
    "/api/tarefas/{tarefaId}/subtarefas/excluir/{id}",
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
