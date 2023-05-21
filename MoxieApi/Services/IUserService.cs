using MoxieApi.Models;

namespace MoxieApi.Services;

public interface IUserService
{
    List<User> GetAll();

    User GetById(Guid id);
}