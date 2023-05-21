using MoxieApi.Models;

namespace MoxieApi.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(IConfiguration configuration) : base(configuration) { }

}
