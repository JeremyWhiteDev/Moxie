using MoxieApi.Models;

namespace MoxieApi.Services;

public interface IUserService
{
    List<User> GetAll();
    User GetById(Guid id);
    User GetByFbUid(string? fbUid);
    Guid Add(User user);
    void Update(User user, Guid id);
    void Delete(Guid id);
}