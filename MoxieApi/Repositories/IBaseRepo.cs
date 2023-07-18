using MoxieApi.Models;

namespace MoxieApi.Repositories
{
    public interface IBaseRepo<T> 
    {
        Guid Add(T type);
        void Delete(Guid id);
        List<T> GetAll();
        List<T> GetBy(string columnName, object value);
        void Update(T type, Guid id);
        void DeleteBy(string columnName, object value);
    }
}