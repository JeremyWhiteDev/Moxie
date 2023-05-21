using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;
using MoxieApi.Models;
using MoxieApi.Utils;
using System.Diagnostics.Metrics;
using System.Reflection;
using System.Text;

namespace MoxieApi.Repositories;

public class BaseRepository<T>
{
    private readonly string _connectionString;

    private readonly Dictionary<PropertyInfo, string> _tableColumns;

    private string _tableName;

    public BaseRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
        _tableColumns = new Dictionary<PropertyInfo, string>();
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

    public void Add(T obj)
    {
        //I need the table name, DONE,
        //all the column names in a csv format, DONE
        //and attaching values from T type. dynamically, creating unique string values with @. Take the same list from above, at @ to each one.
        //Dynamically loop over the column list.
        //  for each one, I'm going to pass the
        //      cmd,
        //      the @string variable,
        //      the property that we are assigning it from. HARDEST PART.
        // loop over type properties, first or default for the current db attribute name.
        // get the value of that property, send it to top level DbUtils.
        var parameterNames = GetParameterNames();

        var props = typeof(T).GetProperties().Where(prop => Attribute.IsDefined(prop, typeof(DbColumnAttribute)));
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = $@"
                                    INSERT INTO {_tableName}
                                    ({String.Join(",", _tableColumns)})
                                    OUTPUT INSERTED.Id
                                    VALUES {String.Join(",", parameterNames)}";
                //DbUtils.AddParameterList(cmd, parameterNames, _tableColumns, props, obj);
                var id = cmd.ExecuteScalar();
            }
        }
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
                _tableColumns.Add(prop, attr.Name);
            }

        }

    }

    private List<string> GetParameterNames()
    {
        var parameterArr = new List<string>(); 
        foreach (KeyValuePair<PropertyInfo, string> column in _tableColumns)
        {
            parameterArr.Add("@"+column.Value);
        }
        return parameterArr;
       
    }

    private string GetIdColumnName()
    {
        var IdColumn = _tableColumns.FirstOrDefault(c => c.Value.Contains("[Id]"));
        return IdColumn.Value.ToString();
    }

    private string CreateSelectAllStatement()
    {
        StringBuilder sb = new StringBuilder();



        foreach (KeyValuePair<PropertyInfo, string> column in _tableColumns)
        {
            sb.Append($"{column.Value} as '{column.Value}',");
        }

        return sb.ToString().Remove(sb.Length - 1, 1);
    }
}
