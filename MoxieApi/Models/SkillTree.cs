using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;

namespace MoxieApi.Models;

[DbTable("[Moxie].[dbo].[SkillTree]")]
public class SkillTree : BaseEntity<SkillTree>
{
    public SkillTree(SqlDataReader reader) : base(reader) { }

    public SkillTree() : base() { }


    [DbColumn("[Moxie].[dbo].[SkillTree].[Id]")]
    public Guid? Id { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTree].[Name]")]
    public string Name { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTree].[Icon]")]
    public string Icon { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTree].[UserId]")]
    public Guid UserId { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTree].[ProficiencyLevel]")]
    public string ProficiencyLevel { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTree].[ExperiencePoints]")]
    public int ExperiencePoints { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTree].[AvailableSkillPoints]")]
    public int AvailableSkillPoints { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTree].[DateCreated]")]
    public DateTime DateCreated { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTree].[DateLastModified]")]
    public DateTime DateLastModified { get; set; }
}
