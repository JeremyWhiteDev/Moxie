using MoxieApi.Models;

namespace MoxieApi.Repositories
{
    public interface IBaseRepo<T> 
    {
        Guid Add(T type);
        void Delete(int id);
        List<T> GetAll();
        T GetById(Guid id);
        void Update(T type, Guid id);
    }
}