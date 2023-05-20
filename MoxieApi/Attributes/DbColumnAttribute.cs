namespace MoxieApi.Attributes;

[System.AttributeUsage(System.AttributeTargets.Property)
]
public class DbColumnAttribute : Attribute
{
    public string Name { get; set; }

    public DbColumnAttribute(string name)
    {
        Name = name;
    }
}
