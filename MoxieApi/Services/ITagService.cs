using MoxieApi.Models;

namespace MoxieApi.Services;

public interface ITagService
{
    List<Tag> GetAll();
    Tag GetById(Guid id);
    Guid Add(Tag tag);
    void Update(Tag tag, Guid id);
    void Delete(Guid id);

    public List<Tag> GetByUser(Guid id);
}