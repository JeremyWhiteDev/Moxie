using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoxieApi.Models;
using MoxieApi.Services;

namespace MoxieApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TagController : ControllerBase
{
    private readonly ITagService _tagService;

    public TagController(ITagService tagService)
    {
        _tagService = tagService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_tagService.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        return Ok(_tagService.GetById(id));
    }

    [HttpPost]
    public IActionResult Add(Tag tag)
    {
        return Ok(_tagService.Add(tag));
    }

    [HttpPut("{id}")]
    public IActionResult Update(Tag tag, Guid id)
    {
        _tagService.Update(tag, id);
        return NoContent();
    }
}
