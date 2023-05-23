using MoxieApi.Models;
using MoxieApi.Repositories;

namespace MoxieApi.Services;

public class TagService : ITagService 
{

    private readonly ITagRepo _repo;

    public TagService(ITagRepo userRepository)
    {
        _repo = userRepository;
    }


    public List<Tag> GetAll()
    {
        return _repo.GetAll();
    }

    public Tag GetById(Guid id)
    {
        return _repo.GetById(id);
    }

    public Guid Add(Tag tag)
    {
        return _repo.Add(tag);
    }

    public void Update(Tag tag, Guid id)
    {
        _repo.Update(tag, id);
    }
    public void Delete(Guid id)
    {
        _repo.Delete(id);
    }
}
