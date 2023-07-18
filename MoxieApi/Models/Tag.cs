using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;

namespace MoxieApi.Models;

[DbTable("[Moxie].[dbo].[Tag]")]
public class Tag : BaseEntity<Tag>
{
    public Tag(SqlDataReader reader) : base(reader) { }

    public Tag() : base() { }


    [DbColumn("[Moxie].[dbo].[Tag].[Id]")]
    public Guid? Id { get; set; }

    [DbColumn("[Moxie].[dbo].[Tag].[Name]")]
    public string Name { get; set; }

    [DbColumn("[Moxie].[dbo].[Tag].[UserId]")]
    public Guid UserId { get; set; }
}
