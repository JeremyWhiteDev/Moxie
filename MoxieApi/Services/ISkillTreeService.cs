using MoxieApi.Models;

namespace MoxieApi.Services;

public interface ISkillTreeService
{
    Guid Add(SkillTree skillTree);
    List<SkillTree> GetAll();
    SkillTree GetById(Guid id);
    void Update(SkillTree skillTree, Guid id);
}