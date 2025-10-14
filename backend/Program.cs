using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000",
                                             "http://localhost:5173",
                                             "http://127.0.0.1:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials(); // Added this
                      });
});

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

// IMPORTANT: Order matters!
app.UseCors(MyAllowSpecificOrigins); // CORS first

app.MapReverseProxy(); // Then reverse proxy

app.Run();