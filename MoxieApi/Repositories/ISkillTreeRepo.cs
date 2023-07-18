using MoxieApi.Models;
using MoxieApi.Services;

namespace MoxieApi.Repositories;

public interface ISkillTreeRepo : IBaseRepo<SkillTree>
{
    List<SkillTreeService.SkillTreeWithTags> GetAllByUserIdWithTags(Guid userId);

    public SkillTreeService.SkillTreeWithTags GetByIdWithTags(Guid skillId);
}
