using MoxieApi.Models;

namespace MoxieApi.Repositories;

public class SkillTreeTagRepo : BaseRepo<SkillTreeTag>, ISkillTreeTagRepo
{
    public SkillTreeTagRepo(IConfiguration configuration) : base(configuration) { }

}
