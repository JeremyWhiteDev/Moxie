using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;
using MoxieApi.Utils;
using System.Reflection;

namespace MoxieApi.Models;

[DbTable("[Moxie].[dbo].[SkillTreeTag]")]
public class SkillTreeTag : BaseEntity<SkillTreeTag>
{

    public SkillTreeTag(SqlDataReader reader) : base(reader) { }

    public SkillTreeTag() : base() { }

    [DbColumn("[Moxie].[dbo].[SkillTreeTag].[Id]")]
    public Guid Id { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTreeTag].[SkillTreeId]")]
    public Guid SkillTreeId { get; set; }

    [DbColumn("[Moxie].[dbo].[SkillTreeTag].[TagId]")]
    public Guid TagId { get; set; }
}
