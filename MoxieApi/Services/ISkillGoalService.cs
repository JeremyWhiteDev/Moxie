using MoxieApi.Models;

namespace MoxieApi.Services;

public interface ISkillGoalService
{
    Guid Add(SkillGoal skillGoal);
    List<SkillGoal> GetAll();
    SkillGoal GetById(Guid id);
    void Update(SkillGoal skillGoal, Guid id);
    void Delete(Guid id);
}