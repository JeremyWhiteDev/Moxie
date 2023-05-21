using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;
using MoxieApi.Models;
using MoxieApi.Utils;
using System.Diagnostics.Metrics;
using System.Reflection;
using System.Text;

namespace MoxieApi.Repositories;

public class BaseRepository<T> : IBaseRepository<T> where T : IBaseEntity
{
    private readonly string _connectionString;

    private readonly List<string> _tableColumns;

    private string _tableName;

    public BaseRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
        _tableColumns = new List<string>();
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
                                    SELECT {CreateSelectAllStatement()}
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


    public T GetById(Guid id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = $@"
                                    SELECT {CreateSelectAllStatement()}
                                    FROM {_tableName}
                                    WHERE {GetIdColumnName()} = @Id";
                DbUtils.AddParameter(cmd, "@Id", id);
                var reader = cmd.ExecuteReader();
                T item = default(T);
                if (reader.Read())
                {
                    item = (T)Activator.CreateInstance(typeof(T), reader);
                };

                reader.Close();
                return item;
            }
        }
    }

    public void Add(T type)
    {

    }

    public void Update(T type)
    {

    }

    public void Delete(int id) { }


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
                _tableColumns.Add(attr.Name);
            }

        }

    }

    private string GetIdColumnName()
    {
        var IdColumn = _tableColumns.FirstOrDefault(c => c.Contains("[Id]"));
        return IdColumn.ToString();
    }

    private string CreateSelectAllStatement()
    {
        StringBuilder sb = new StringBuilder();



        foreach (string column in _tableColumns)
        {
            sb.Append($"{column} as '{column}',");
        }

        return sb.ToString().Remove(sb.Length - 1, 1);
    }
}
