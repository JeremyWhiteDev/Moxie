namespace MoxieApi.Attributes;

[System.AttributeUsage(System.AttributeTargets.Property)
]
public class ForeignKeyAttribute : Attribute
{
    public string Name { get; set; }

    public ForeignKeyAttribute(string name)
    {
        Name = name;
    }
}
