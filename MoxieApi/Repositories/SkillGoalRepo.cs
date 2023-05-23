using MoxieApi.Models;

namespace MoxieApi.Repositories;

public class SkillGoalRepo : BaseRepo<SkillGoal>, ISkillGoalRepo
{
    public SkillGoalRepo(IConfiguration configuration) : base(configuration) { }

}
