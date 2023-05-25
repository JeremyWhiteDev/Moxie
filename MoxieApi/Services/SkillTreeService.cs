using MoxieApi.Models;
using MoxieApi.Repositories;

namespace MoxieApi.Services;

public class SkillTreeService : ISkillTreeService
{
    private readonly ISkillTreeRepo _repo;

    public SkillTreeService(ISkillTreeRepo userRepository)
    {
        _repo = userRepository;
    }


    public List<SkillTree> GetAll()
    {
        return _repo.GetAll();
    }

    public SkillTree GetById(Guid id)
    {
        return _repo.GetBy("Id", id).FirstOrDefault();
    }

    public Guid Add(SkillTree skillTree)
    {
        return _repo.Add(skillTree);
    }

    public void Update(SkillTree skillTree, Guid id)
    {
        _repo.Update(skillTree, id);
    }
    public void Delete(Guid id)
    {
        _repo.Delete(id);
    }

}
