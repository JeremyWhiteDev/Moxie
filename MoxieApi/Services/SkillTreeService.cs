using MoxieApi.Models;
using MoxieApi.Repositories;

namespace MoxieApi.Services;

public class SkillTreeService : ISkillTreeService
{
    private readonly ISkillTreeRepo _skillTreeRepo;

    private readonly ISkillTreeTagRepo _skillTreeTagRepo;

    public SkillTreeService(ISkillTreeRepo userRepository, ISkillTreeTagRepo skillTreeTagRepo)
    {
        _skillTreeRepo = userRepository;
        _skillTreeTagRepo= skillTreeTagRepo;

    }


    public List<SkillTree> GetAll()
    {
        return _skillTreeRepo.GetAll().OrderByDescending(s => s.DateCreated).ToList();
    }

    public SkillTree GetById(Guid id)
    {
        return _skillTreeRepo.GetBy("Id", id).FirstOrDefault();
    }

    public Guid Add(AddSkill skill)
    {
        
        SkillTree skillTree = new SkillTree()
        {
            Name = skill.Name,
            Icon = skill.Icon,
            UserId = skill.UserId,
            ProficiencyLevel= skill.ProficiencyLevel,
            DateCreated = DateTime.UtcNow,
            DateLastModified = DateTime.UtcNow,
        };

        Guid insertedGuid = _skillTreeRepo.Add(skillTree);

        skill.TagIds.ForEach(t => _skillTreeTagRepo.Add(new SkillTreeTag()
        {
            SkillTreeId = insertedGuid,
            TagId = t
        }));

        return insertedGuid;


    }

    public void Update(SkillTree skillTree, Guid id)
    {
        _skillTreeRepo.Update(skillTree, id);
    }
    public void Delete(Guid id)
    {
        _skillTreeRepo.Delete(id);
    }

    public class AddSkill
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public Guid UserId { get; set; }
        public string ProficiencyLevel { get; set; }
        public List<Guid> TagIds { get; set; } = new List<Guid>();

    }

}
