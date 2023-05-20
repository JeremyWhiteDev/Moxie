namespace MoxieApi.Attributes;

[System.AttributeUsage(System.AttributeTargets.Class)]
public class DbTableAttribute : Attribute
{
    public string Name { get; set; }

    public DbTableAttribute(string name)
    {
       Name = name;
    }
}
