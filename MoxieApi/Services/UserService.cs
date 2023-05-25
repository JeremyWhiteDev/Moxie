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

    public User GetByFbUid(string? fbUid)
    {
        return _repo.GetBy("Uid", fbUid).FirstOrDefault();
    }

    public User GetById(Guid id)
    {
        return _repo.GetBy("Id", id).FirstOrDefault();
    }

    public Guid Add(User user)
    {
        return _repo.Add(user);
    }

    public void Update(User user, Guid id)
    {
        _repo.Update(user, id);
    }
    public void Delete(Guid id)
    {
        _repo.Delete(id);
    }
}
