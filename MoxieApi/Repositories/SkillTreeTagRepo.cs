using MoxieApi.Models;
using MoxieApi.Services;

namespace MoxieApi.Repositories;

public class SkillTreeTagRepo : BaseRepo<SkillTreeTag>, ISkillTreeTagRepo
{
    public SkillTreeTagRepo(IConfiguration configuration) : base(configuration) { }


}
