﻿using Microsoft.AspNetCore.Http;
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

    [HttpGet("withTags/{skillId}")]
    public IActionResult GetByIdWithTags(Guid skillId)
    {
        return Ok(_skillTreeService.GetByIdWithTags(skillId));
    }

    [HttpGet("withTags/user/{userId}")]
    public IActionResult GetByUserWithTags(Guid userId)
    {
        return Ok(_skillTreeService.GetAllByUserIdWithTags(userId));
    }

    [HttpPost]
    public IActionResult Add(SkillTreeService.AddSkill skillTree)
    {
        return Ok(_skillTreeService.Add(skillTree));
    }


    [HttpPut("{id}")]
    public IActionResult Update(SkillTree skillTree, Guid id)
    {
        _skillTreeService.Update(skillTree, id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        _skillTreeService.Delete(id);
        return NoContent();
    }
}
