using MoxieApi.Attributes;

namespace MoxieApi.Models;

public abstract class IdEntity
{
    [DbColumn("[Id]")]
    public Guid? Id { get; set; }

}

