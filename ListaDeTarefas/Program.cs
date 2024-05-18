using System.Text.Json.Serialization;
using ListaDeTarefas.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);
var app = builder.Build();

List<Tarefa> tarefas = new List<Tarefa>();
List<Usuario> usuarios = new List<Usuario>();

// ENDPOINT PARA CADASTRAR Tarefa
app.MapPost(
    "/ListaDeTarefas/cadastrar/tarefa",
    ([FromBody] Tarefa tarefa, [FromServices] AppDbContext context) =>
    {
        Tarefa? tarefaBuscada = context.Tarefas.FirstOrDefault(n =>
            n.Nome.ToUpper() == tarefa.Nome.ToUpper()
        );
        if (tarefaBuscada == null)
        {
            tarefa.Nome = tarefa.Nome.ToUpper();
            tarefa.DescricaoTarefa = tarefa.DescricaoTarefa.ToUpper(); // Adiciona Descricao
            context.Tarefas.Add(tarefa);
            context.SaveChanges();
            return Results.Ok("A Tarefa foi cadastrado");
        }
        return Results.BadRequest("Tarefa com o mesmo nome já criado");
    }
);

// ENDPOINT PARA BUSCAR Tarefa
app.MapGet(
    "/ListaDeTarefas/buscar/tarefa/{id}",
    ([FromRoute] string id, [FromServices] AppDbContext context) =>
    {
        Tarefa? tarefa = context.Tarefas.FirstOrDefault(x => x.Id == id);

        if (tarefas is null)
        {
            return Results.NotFound("Tarefa não encontrado!");
        }

        // Retorna a tarefa com a Descricao
        return Results.Ok(
            new
            {
                Id = tarefa.Id,
                Nome = tarefa.Nome,
                Descricao = tarefa.DescricaoTarefa
            }
        );
    }
);

// ENDPOINT PARA LISTAR Tarefa
app.MapGet(
    "/ListaDeTarefas/listar/tarefa",
    ([FromServices] AppDbContext context) =>
    {
        if (context.Tarefas.Any())
        {
            // Retorna uma lista de tarefas com Descricao
            return Results.Ok(
                context
                    .Tarefas.Select(t => new
                    {
                        Id = t.Id,
                        Nome = t.Nome,
                        Descricao = t.DescricaoTarefa
                    })
                    .ToList()
            );
        }

        return Results.NotFound("Não existem Tarefas na tabela");
    }
);

// ENDPOINT PARA ATUALIZAR Tarefa
app.MapPut(
    "/ListaDeTarefas/atualizar/tarefa/{id}",
    (
        [FromRoute] string id,
        [FromBody] Tarefa tarefaAtualizada,
        [FromServices] AppDbContext context
    ) =>
    {
        Tarefa? tarefaExistente = context.Tarefas.FirstOrDefault(n => n.Id == id);

        if (tarefaExistente == null)
        {
            return Results.NotFound("Tarefa não encontrado!");
        }

        Tarefa? tarefaDuplicada = context.Tarefas.FirstOrDefault(n =>
            n.Nome.ToUpper() == tarefaAtualizada.Nome.ToUpper() && n.Id != id
        );

        if (tarefaDuplicada != null)
        {
            return Results.BadRequest("Já existe um Tarefa com este nome!");
        }

        tarefaExistente.Nome = tarefaAtualizada.Nome.ToUpper();
        tarefaExistente.DescricaoTarefa = tarefaAtualizada.DescricaoTarefa.ToUpper(); // Atualiza Descricao

        context.SaveChanges();
        return Results.Ok("A Tarefa foi atualizado com sucesso!");
    }
);

// ENDPOINT PARA DELETAR Tarefa
app.MapDelete(
    "/ListaDeTarefas/deletar/tarefa/{id}",
    ([FromRoute] string id, [FromServices] AppDbContext context) =>
    {
        Tarefa? tarefaParaDeletar = context.Tarefas.FirstOrDefault(n => n.Id == id);

        if (tarefaParaDeletar == null)
        {
            return Results.NotFound("Tarefa não encontrado!");
        }

        context.Tarefas.Remove(tarefaParaDeletar);
        context.SaveChanges();

        return Results.Ok("A Tarefa foi deletado com sucesso!");
    }
);

//ENDPOINT PARA CADASTRAR usuario
app.MapPost(
    "/ListaDeTarefas/cadastrar/usuario",
    ([FromBody] Usuario usuario, [FromServices] AppDbContext context) =>
    {
        Usuario? usuarioBuscado = context.Usuarios.FirstOrDefault(n => n.Cpf == usuario.Cpf);
        if (usuarioBuscado == null)
        {
            usuario.Nome = usuario.Nome.ToUpper();
            context.Usuarios.Add(usuario);
            context.SaveChangesAsync();
            return Results.Ok("O usuario foi cadastrado");
        }
        return Results.BadRequest("Usuario com o mesmo CPF já foi criado");
    }
);

//ENDPOINT PARA BUSCAR usuario
app.MapGet(
    "/ListaDeTarefas/buscar/usuario/{id}",
    ([FromRoute] string id, [FromServices] AppDbContext context) =>
    {
        //Endpoint com várias linhas de código
        Usuario? usuario = context.Usuarios.FirstOrDefault(x => x.Id == id);

        if (usuario is null)
        {
            return Results.NotFound("Usuario não encontrado!");
        }
        return Results.Ok(usuario);
    }
);

//ENDPOINT PARA LISTAR usuario
app.MapGet(
    "/ListaDeTarefas/listar/usuario",
    ([FromServices] AppDbContext context) =>
    {
        if (context.Usuarios.Any())
        {
            return Results.Ok(context.Usuarios.ToList());
        }
        return Results.NotFound("Usuarios não encontrados!");
    }
);

//ENDPOINT PARA ALTERAR usuario
app.MapPut(
    "/ListaDeTarefas/alterar/usuario/{id}",
    (
        [FromRoute] string id,
        [FromBody] Usuario usuarioAlterado,
        [FromServices] AppDbContext context
    ) =>
    {
        Usuario? usuario = context.Usuarios.Find(id);

        if (usuario is null)
        {
            return Results.NotFound("Usuario não encontrado!");
        }

        usuario.Nome = usuarioAlterado.Nome;
        usuario.Cpf = usuarioAlterado.Cpf;
        usuario.Genero = usuarioAlterado.Genero;
        usuario.Email = usuarioAlterado.Email;

        context.Usuarios.Update(usuario);
        context.SaveChanges();

        return Results.Ok("Usuario alterado com sucesso!");
    }
);


//ENDPOINT PARA DELETAR usuario
app.MapDelete(
    "/ListaDeTarefas/deletar/usuario/{id}",
    ([FromRoute] string id, [FromServices] AppDbContext context) =>
    {
        Usuario? usuarioParaDeletar = context.Usuarios.FirstOrDefault(n => n.Id == id);

        if (usuarioParaDeletar is null)
        {
            return Results.NotFound("Usuario não encontrado!");
        }
        context.Usuarios.Remove(usuarioParaDeletar);
        context.SaveChanges();
        return Results.Ok("Usuario deletado com sucesso");
    }
);


app.Run();
