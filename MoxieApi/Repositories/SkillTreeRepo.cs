using MoxieApi.Models;

namespace MoxieApi.Repositories;

public class SkillTreeRepo : BaseRepo<SkillTree>, ISkillTreeRepo
{
    public SkillTreeRepo(IConfiguration configuration) : base(configuration) { }


}
