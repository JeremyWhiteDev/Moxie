namespace MoxieApi.Models;

public interface IBaseEntity
{
    public string GetTableName();
    public string GetSelectAllStatement();
}
