using MoxieApi.Models;

namespace MoxieApi.Repositories;

public class SkillTreeRepo : BaseRepository<SkillTree>, ISkillTreeRepo
{
    public SkillTreeRepo(IConfiguration configuration) : base(configuration) { }

}
