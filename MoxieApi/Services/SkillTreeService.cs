using MoxieApi.Attributes;
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

    public List<SkillTreeWithTags> GetAllByUserIdWithTags(Guid userId)
    {
        return _skillTreeRepo.GetAllByUserIdWithTags(userId);
    }

    public SkillTreeWithTags GetByIdWithTags(Guid skillId)
    {
        return _skillTreeRepo.GetByIdWithTags(skillId);
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
       var relationShips = _skillTreeTagRepo.GetBy("SkillTreeId", id);
        relationShips.ForEach(r => _skillTreeTagRepo.Delete(r.Id));

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

    public class SkillTreeWithTags : SkillTree
    {
        [DbColumn("TagAgg")]
        public List<IdNamePair>? Tags { get; set; } = new List<IdNamePair>();
    }

}
