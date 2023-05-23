using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;

namespace MoxieApi.Models;

[DbTable("[Moxie].[dbo].[SkillGoal]")]
public class SkillGoal : BaseEntity<SkillGoal>
{
    public SkillGoal(SqlDataReader reader) : base(reader) { }

    public SkillGoal() : base() { }


    [DbColumn("[Moxie].[dbo].[SkillGoal].[Id]")]
    public Guid? Id { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillGoal].[SkillTreeId]")]
    public Guid SkillTreeId { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillGoal].[RewardType]")]
    public Guid? RewardType { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillGoal].[RewardValue]")]
    public string RewardValue { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillGoal].[ExperiencePointsRequired]")]
    public int ExperiencePointsRequired { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillGoal].[IsComplete]")]
    public bool IsComplete { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillGoal].[DateCreated]")]
    public DateTime DateCreated { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillGoal].[DateLastModified]")]
    public DateTime DateLastModified { get; set; }
}
