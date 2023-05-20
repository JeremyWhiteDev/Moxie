using MoxieApi.Models;
using MoxieApi.Repositories;

namespace MoxieApi.Services;

public class UserService : IUserService 
{

    private readonly IUserRepository _repo;

    public UserService(IUserRepository userRepository)
    {
        _repo = userRepository;
    }


    public List<User> GetAll()
    {
        return _repo.GetAll();
    }
}
