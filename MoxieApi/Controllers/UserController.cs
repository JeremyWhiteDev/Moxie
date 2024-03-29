﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoxieApi.Models;
using MoxieApi.Services;

namespace MoxieApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public IActionResult Get(string? uid = null)
    {
        if (uid != null)
        {
            User user = _userService.GetByFbUid(uid);
            return Ok(user != null ? user : false);
        }
        return Ok(_userService.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        return Ok(_userService.GetById(id));
    }

    [HttpPost]
    public IActionResult Add(User user)
    {
        return Ok(_userService.Add(user));
    }

    [HttpPut("{id}")]
    public IActionResult Update(User user, Guid id)
    {
        _userService.Update(user, id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        _userService.Delete(id);
        return NoContent();
    }
}
