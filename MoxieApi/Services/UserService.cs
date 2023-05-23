using MoxieApi.Models;
using MoxieApi.Repositories;

namespace MoxieApi.Services;

public class UserService : IUserService 
{

    private readonly IUserRepo _repo;

    public UserService(IUserRepo userRepository)
    {
        _repo = userRepository;
    }


    public List<User> GetAll()
    {
        return _repo.GetAll();
    }

    public User GetById(Guid id)
    {
        return _repo.GetById(id);
    }

    public Guid Add(User user)
    {
        return _repo.Add(user);
    }

    public void Update(User user, Guid id)
    {
        _repo.Update(user, id);
    }
}
