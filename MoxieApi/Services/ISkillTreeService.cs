﻿using MoxieApi.Models;

namespace MoxieApi.Services;

public interface ISkillTreeService
{
    Guid Add(SkillTreeService.AddSkill skill);
    List<SkillTree> GetAll();
    SkillTree GetById(Guid id);
    void Update(SkillTree skillTree, Guid id);
    void Delete(Guid id);
}