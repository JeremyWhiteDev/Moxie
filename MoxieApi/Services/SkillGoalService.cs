﻿using MoxieApi.Models;
using MoxieApi.Repositories;

namespace MoxieApi.Services;

public class SkillGoalService : ISkillGoalService
{
    private readonly ISkillGoalRepo _repo;

    public SkillGoalService(ISkillGoalRepo skillGoalRepo)
    {
        _repo = skillGoalRepo;
    }


    public List<SkillGoal> GetAll()
    {
        return _repo.GetAll();
    }

    public SkillGoal GetById(Guid id)
    {
        return _repo.GetBy("Id", id).FirstOrDefault();
    }

    public Guid Add(SkillGoal skillTree)
    {
        return _repo.Add(skillTree);
    }

    public void Update(SkillGoal skillTree, Guid id)
    {
        _repo.Update(skillTree, id);
    }

    public void Delete(Guid id)
    {
        _repo.Delete(id);
    }

}
