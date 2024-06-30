using TarefasApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AcessoTotal", builder =>
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
});

var app = builder.Build();

app.UseCors("AcessoTotal");

app.MapGet("/", () => "Tarefas API");

//Endpoints Usuários
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
    (AppDbContext context, int id) =>
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
        return Results.Created($"/usuario/obter/{usuario.Id}", usuario);
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
//GET: http://localhost:5272/usuario/{usuarioId}/tarefa/listar
app.MapGet(
    "/usuario/{usuarioId}/tarefa/listar",
    (AppDbContext context, string usuarioId) =>
    {
        var usuario = context.Usuarios.Find(usuarioId);
        if (usuario == null)
        {
            return Results.NotFound($"Usuário com id {usuarioId} não encontrado");
        }
        if (context.Tarefas.Count() == 0)
        {
            return Results.NotFound("Nenhuma tarefa encontrada");
        }
        return Results.Ok(context.Tarefas.Where(t => t.UsuarioId == usuarioId).ToList());
    }
);

//GET: http://localhost:5272/usuario/{usuarioId}/tarefa/obter/{id}
app.MapGet(
    "/usuario/{usuarioId}/tarefa/obter/{id}",
    (AppDbContext context, string usuarioId, string id) =>
    {
        var tarefa = context.Tarefas.Find(id);
        if (tarefa == null)
        {
            return Results.NotFound($"Tarefa com id {id} não encontrada");
        }
        return Results.Ok(tarefa);
    }
);

//POST: http://localhost:5272/usuario/{usuarioId}/tarefa/cadastrar
app.MapPost(
    "/usuario/{usuarioId}/tarefa/cadastrar",
    (AppDbContext context, string usuarioId, Tarefa tarefa) =>
    {
        var usuario = context.Usuarios.Find(usuarioId);
        if (usuario == null)
        {
            return Results.NotFound($"Usuário com id {usuarioId} não encontrado");
        }

        tarefa.UsuarioId = usuarioId;
        context.Tarefas.Add(tarefa);
        context.SaveChanges();
        
        return Results.Created($"/usuario/{usuarioId}/tarefa/obter/{tarefa.TarefaId}", tarefa);
    }
);

//PUT: http://localhost:5272/usuario/{usuarioId}/tarefa/editar/{id}
app.MapPut(
    "/usuario/{usuarioId}/tarefa/editar/{id}",
    (AppDbContext context, string usuarioId, string id, Tarefa tarefa) =>
    {
        var tarefaBanco = context.Tarefas.Find(id);
        if (tarefaBanco == null)
        {
            return Results.NotFound($"Tarefa com id {id} não encontrada");
        }
        tarefaBanco.Titulo = tarefa.Titulo;
        tarefaBanco.Descricao = tarefa.Descricao;
        tarefaBanco.Status = tarefa.Status;
        context.SaveChanges();
        return Results.Ok(tarefaBanco);
    }
);

//DELETE: http://localhost:5272/usuario/{usuarioId}/tarefa/excluir/{id}
app.MapDelete(
    "/usuario/{usuarioId}/tarefa/excluir/{id}",
    (AppDbContext context, string usuarioId, string id) =>
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
        return Results.Created($"/categoria/obter/{categoria.CategoriaId}", categoria);
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

//DELETE pelo nome da categoria
//DELETE: http://localhost:5272/categoria/excluir/nome/{nome}
app.MapDelete(
    "/categoria/excluir/nome/{nome}",
    (AppDbContext context, string nome) =>
    {
        var categoria = context.Categorias.FirstOrDefault(c => c.Nome == nome);
        if (categoria == null)
        {
            return Results.NotFound($"Categoria com nome {nome} não encontrada");
        }
        context.Categorias.Remove(categoria);
        context.SaveChanges();
        return Results.NoContent();
    }
);

//Endpoints SubTarefas
//GET: http://localhost:5272/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/listar
app.MapGet(
    "/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/listar",
    (AppDbContext context, string usuarioId, string tarefaId) =>
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

//GET: http://localhost:5272/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/obter/{id}
app.MapGet(
    "/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/obter/{id}",
    (AppDbContext context, string usuarioId, string tarefaId, string id) =>
    {
        var subTarefa = context.SubTarefas.Find(id);
        if (subTarefa == null)
        {
            return Results.NotFound($"Subtarefa com id {id} não encontrada");
        }
        return Results.Ok(subTarefa);
    }
);

//POST: http://localhost:5272/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/cadastrar
app.MapPost(
    "/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/cadastrar",
    (AppDbContext context, string usuarioId, string tarefaId, SubTarefa subTarefa) =>
    {
        var tarefa = context.Tarefas.Find(tarefaId);
        if (tarefa == null)
        {
            return Results.NotFound($"Tarefa com id {tarefaId} não encontrada");
        }

        subTarefa.TarefaId = tarefaId;
        context.SubTarefas.Add(subTarefa);
        context.SaveChanges();
        
        return Results.Created($"/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/obter/{subTarefa.SubTarefaId}", subTarefa);
    }
);

//PUT: http://localhost:5272/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/editar/{id}
app.MapPut(
    "/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/editar/{id}",
    (AppDbContext context, string usuarioId, string tarefaId, string id, SubTarefa subTarefa) =>
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

//DELETE: http://localhost:5272/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/excluir/{id}
app.MapDelete(
    "/usuario/{usuarioId}/tarefa/{tarefaId}/subtarefa/excluir/{id}",
    (AppDbContext context, string usuarioId, string tarefaId, string id) =>
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

app.Run();
