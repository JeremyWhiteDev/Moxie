using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoxieApi.Models;
using MoxieApi.Services;

namespace MoxieApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SkillGoalController : ControllerBase
{
    private readonly ISkillGoalService _skillGoalService;

    public SkillGoalController(ISkillGoalService skillGoalService)
    {
        _skillGoalService = skillGoalService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_skillGoalService.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        return Ok(_skillGoalService.GetById(id));
    }

    [HttpPost]
    public IActionResult Add(SkillGoal skillGoal)
    {
        return Ok(_skillGoalService.Add(skillGoal));
    }

    [HttpPut("{id}")]
    public IActionResult Update(SkillGoal skillGoal, Guid id)
    {
        _skillGoalService.Update(skillGoal, id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        _skillGoalService.Delete(id);
        return NoContent();
    }
}
