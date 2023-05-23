using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;
using MoxieApi.Utils;
using System.Reflection;
using System.Xml.Linq;

namespace MoxieApi.Models;

[DbTable("[Moxie].[dbo].[User]")]
public class User : BaseEntity<User>
{
    public User(SqlDataReader reader) : base(reader) { }

    public User() : base() { }

    [DbColumn("[Moxie].[dbo].[User].[Id]")]
    public Guid? Id { get; set; }

    [DbColumn("[Moxie].[dbo].[User].[Uid]")]
    public string Uid { get; set; }

    [DbColumn("[Moxie].[dbo].[User].[FirstName]")]
    public string FirstName { get; set; }

    [DbColumn("[Moxie].[dbo].[User].[LastName]")]
    public string LastName { get; set; }

    [DbColumn("[Moxie].[dbo].[User].[ImageUrl]")]
    public string ImageUrl { get; set; }

    [DbColumn("[Moxie].[dbo].[User].[DateCreated]")]
    public DateTime DateCreated { get; set; }

    [DbColumn("[Moxie].[dbo].[User].[DateLastModified]")]
    public DateTime DateLastModified { get; set; }
}
