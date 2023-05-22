using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoxieApi.Models;
using MoxieApi.Repositories;
using MoxieApi.Services;

namespace MoxieApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SkillTreeController : ControllerBase
{
    private readonly ISkillTreeService _skillTreeService;

    public SkillTreeController(ISkillTreeService skillTreeService)
    {
        _skillTreeService = skillTreeService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_skillTreeService.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        return Ok(_skillTreeService.GetById(id));
    }

    [HttpPost]
    public IActionResult Add(SkillTree skillTree)
    {
        return Ok(_skillTreeService.Add(skillTree));
    }

    [HttpPut("{id}")]
    public IActionResult Update(SkillTree skillTree, Guid id)
    {
        _skillTreeService.Update(skillTree, id);
        return NoContent();
    }
}
