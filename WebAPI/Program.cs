using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebAPI.Data;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Configurar serviços
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<TaskService>();

var app = builder.Build();

// Configurar o pipeline de solicitação
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Definir endpoints
app.MapControllers();

app.Run();
