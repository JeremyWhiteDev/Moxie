using Microsoft.Data.SqlClient;
using Microsoft.VisualBasic;
using MoxieApi.Attributes;
using MoxieApi.Models;
using MoxieApi.Utils;
using System.Diagnostics.Metrics;
using System.Reflection;
using System.Text;

namespace MoxieApi.Repositories;

public class BaseRepo<T> : IBaseRepo<T>
{
    private readonly string _connectionString;

    private readonly Dictionary<PropertyInfo, (string columnName, string parameterName)> _tableColumns;

    //get the foreign keys matched with the table names/objects.
    //loop over the foreign keys. get each one with the instance of the tableName/property.
    //this is a problem I can chew on a little bit.
    //Would rather get CRUD working first.


    private string _tableName;

    public BaseRepo(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
        _tableColumns = new Dictionary<PropertyInfo, (string, string)>();
        SetupTableData();
    }

    protected SqlConnection Connection
    {
        get
        {
            return new SqlConnection(_connectionString);
        }
    }

    public List<T> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = $@"
                                    SELECT {CreateSelectAllString()}
                                    FROM {_tableName}";
                var reader = cmd.ExecuteReader();
                List<T> list = new List<T>();
                while (reader.Read())
                {
                    list.Add((T)Activator.CreateInstance(typeof(T), reader));
                };

                reader.Close();
                return list;
            }
        }
    }

    public List<T> GetByFieldWithManyExpanded<U,V>(string columnName, object value)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = $@"
                                    SELECT {CreateSelectAllString()}
                                    FROM {_tableName}
                                    WHERE {ResolveColumnName(columnName)} = @Entity";
                DbUtils.AddParameter(cmd, "@Entity", value);
                var reader = cmd.ExecuteReader();
                List<T> list = new List<T>();
                while (reader.Read())
                {
                    list.Add((T)Activator.CreateInstance(typeof(T), reader));
                };

                reader.Close();
                return list;
            }
        }
    }


    public List<T> GetBy(string columnName, object value)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = $@"
                                    SELECT {CreateSelectAllString()}
                                    FROM {_tableName}
                                    WHERE {ResolveColumnName(columnName)} = @Entity";
                DbUtils.AddParameter(cmd, "@Entity", value);
                var reader = cmd.ExecuteReader();
                List<T> list = new List<T>();
                while (reader.Read())
                {
                    list.Add((T)Activator.CreateInstance(typeof(T), reader));
                };

                reader.Close();
                return list;
            }
        }
    }

    public Guid Add(T obj)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = $@"
                                    INSERT INTO {_tableName}
                                    ({String.Join(",", _tableColumns.Values.Where(x => !x.columnName.Contains("[Id]")).Select(x =>  x.columnName.ToString()).ToList())})
                                    OUTPUT INSERTED.Id
                                    VALUES ({String.Join(",", _tableColumns.Values.Where(x => !x.parameterName.Contains("@Id")).Select(x => x.parameterName.ToString()).ToList())})";
                DbUtils.AddParameterList(cmd, _tableColumns, obj);
                return (Guid)cmd.ExecuteScalar();
                
                
            }
        }
    }

    public void Update(T obj, Guid id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {


                cmd.CommandText = $@"
                                    UPDATE {_tableName}
                                    SET {CreateUpdateString()}
                                    WHERE {ResolveColumnName("Id")} = @EntityId";
                DbUtils.AddParameter(cmd, "@EntityId", id);
                DbUtils.AddParameterList(cmd, _tableColumns, obj);
                cmd.ExecuteNonQuery();
            }
        }
    }

    public void Delete(Guid id) 
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {


                cmd.CommandText = $@"DELETE FROM {_tableName}
                                    WHERE {ResolveColumnName("Id")} = @EntityId";
                DbUtils.AddParameter(cmd, "@EntityId", id);

                cmd.ExecuteNonQuery();
            }
        }
    }


    private void SetupTableData()
    {
        Attribute[] attrs = Attribute.GetCustomAttributes(typeof(T));
        foreach (Attribute attr in attrs)
        {
            if (attr is DbTableAttribute t)
            {
                _tableName = t.Name;
            }
        }
        var props = typeof(T).GetProperties().Where(prop => Attribute.IsDefined(prop, typeof(DbColumnAttribute)));

        foreach (PropertyInfo prop in props)
        {
            var attr = prop.GetCustomAttribute<DbColumnAttribute>(true);

            if (attr != null)
            {
                _tableColumns.Add(prop, (columnName: attr.Name, parameterName: "@"+prop.Name));
            }

        }

    }

    private string ResolveColumnName(string columnName)
    {
        var IdColumn = _tableColumns.FirstOrDefault(c => c.Value.columnName.Contains($"[{columnName}]"));
        return IdColumn.Value.columnName.ToString();
    }

    private string CreateSelectAllString()
    {
        StringBuilder sb = new StringBuilder();



        foreach (KeyValuePair<PropertyInfo, (string columnName, string parameterName)> column in _tableColumns)
        {
            sb.Append($"{column.Value.columnName} as '{column.Value.columnName}',");
        }

        return sb.ToString().Remove(sb.Length - 1, 1);
    }

    private string CreateUpdateString()
    {
        StringBuilder sb = new StringBuilder();



        foreach (KeyValuePair<PropertyInfo, (string columnName, string parameterName)> column in _tableColumns)
        {
            if (column.Value.columnName.Contains("[Id]"))
            {
                continue;
            }
            sb.Append($"{column.Value.columnName} = {column.Value.parameterName},");
        }

        return sb.ToString().Remove(sb.Length - 1, 1);
    }
}
