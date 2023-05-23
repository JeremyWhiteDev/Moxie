using MoxieApi.Models;

namespace MoxieApi.Repositories;

public class TagRepo : BaseRepo<Tag>, ITagRepo
{
    public TagRepo(IConfiguration configuration) : base(configuration) { }

}
