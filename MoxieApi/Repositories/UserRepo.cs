using MoxieApi.Models;

namespace MoxieApi.Repositories;

public class UserRepo : BaseRepo<User>, IUserRepo
{
    public UserRepo(IConfiguration configuration) : base(configuration) { }

}
