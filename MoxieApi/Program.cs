using MoxieApi.Repositories;
using MoxieApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//User Transients
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IUserRepo, UserRepo>();

//SkillTree Transients
builder.Services.AddTransient<ISkillTreeService, SkillTreeService>();
builder.Services.AddTransient<ISkillTreeRepo, SkillTreeRepo>();

//SkillGoal Transients
builder.Services.AddTransient<ISkillGoalService, SkillGoalService>();
builder.Services.AddTransient<ISkillGoalRepo, SkillGoalRepo>();

//Tag Transients
builder.Services.AddTransient<ITagService, TagService>();
builder.Services.AddTransient<ITagRepo, TagRepo>();

builder.Services.AddTransient<ISkillTreeTagRepo, SkillTreeTagRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors(options =>
    {
        options.AllowAnyOrigin();
        options.AllowAnyMethod();
        options.AllowAnyHeader();
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
