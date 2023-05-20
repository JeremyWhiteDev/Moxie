using Microsoft.Data.SqlClient;
using MoxieApi.Models;

namespace MoxieApi.Repositories;

public class BaseRepository<T> where T : IBaseEntity
{
    private readonly string _connectionString;

    private readonly T _entity;

    public BaseRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    protected SqlConnection Connection
    {
        get
        {
            return new SqlConnection(_connectionString);
        }
    }

    public List <T> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = $@"
                                    SELECT {_entity.GetSelectAllStatement()}
                                    FROM {_entity.GetTableName()}";
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


    public T GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = $@"
                                    SELECT {_entity.GetSelectAllStatement()}
                                    FROM {_entity.GetTableName()}
                                    WHERE {id} = @Id";
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
}
