using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;
using MoxieApi.Utils;
using System.Reflection;

namespace MoxieApi.Models;

public abstract class BaseEntity<T> 
{

    /// <summary>
    ///  Creates a Base Entity using the sql data reader.
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// 
    /// 
    ///
    public BaseEntity(SqlDataReader reader)
    {

        var props = typeof(T).GetProperties().Where(prop => Attribute.IsDefined(prop, typeof(DbColumnAttribute)));

        foreach (PropertyInfo prop in props)
        {
            var attr = prop.GetCustomAttribute<DbColumnAttribute>(true);
            if (attr == null)
            {
                throw new Exception("Column Attribute missing on model class.");
            }
            DbUtils.ResolveReaderAndSetValue(reader, attr, prop, this);
        }
    }

    public BaseEntity() { }
}

