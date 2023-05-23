using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;
using MoxieApi.Utils;
using System.Reflection;

namespace MoxieApi.Models;

public class IdNameEntity
{
    public string Id { get; set; }
    public string Name { get; set; }

}
