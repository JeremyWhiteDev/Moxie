using MoxieApi.Models;
using MoxieApi.Repositories;

namespace MoxieApi.Services;

public class TagService : ITagService 
{

    private readonly ITagRepo _repo;

    private readonly ISkillTreeTagRepo _skillTreeTagRepo;

    public TagService(ITagRepo userRepository, ISkillTreeTagRepo skillTreeTagRepo)
    {
        _repo = userRepository;
        _skillTreeTagRepo = skillTreeTagRepo;
    }


    public List<Tag> GetAll()
    {
        return _repo.GetAll();
    }

    public Tag GetById(Guid id)
    {
        return _repo.GetBy("Id", id).FirstOrDefault();
    }

    public List<Tag> GetByUser(Guid id)
    {
        return _repo.GetBy("UserId", id).OrderBy(t => t.Name).ToList();
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
        //first, I need to delete any references to this tag in the SkillTreeTag repo

        _skillTreeTagRepo.DeleteBy("TagId", id);
        _repo.Delete(id);

    }
}
