using MoxieApi.Models;
using MoxieApi.Services;
using MoxieApi.Utils;
using System.Text.Json;

namespace MoxieApi.Repositories;

public class SkillTreeRepo : BaseRepo<SkillTree>, ISkillTreeRepo
{
    public SkillTreeRepo(IConfiguration configuration) : base(configuration) { }

    public List<SkillTreeService.SkillTreeWithTags> GetAllByUserIdWithTags(Guid userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"  SELECT ST.Id
                                      ,ST.userId
                                      ,[ProficiencyLevel]
                                      ,[ExperiencePoints]
                                      ,[DateCreated]
                                      ,[DateLastModified]
                                      ,[AvailableSkillPoints]
                                      ,ST.Name
                                      ,[Icon]
                                    ,       '[' + STRING_AGG(
                                        JSON_QUERY(
                                            '{""Id"":""' + CONVERT(varchar(36), T.Id) + '"",""Name"":""' + T.Name + '""}'
                                        ),
                                        ','
                                    ) + ']' AS Tags
                                  FROM [Moxie].[dbo].[SkillTree] AS ST
                                  LEFT JOIN [SkillTreeTag] STT ON STT.SkillTreeId = ST.Id
                                  LEFT JOIN [TAG] T ON T.Id = STT.TagId
                                  WHERE ST.userId = @UserId
                                  GROUP BY ST.Id, ST.UserId, ST.ProficiencyLevel, ST.ExperiencePoints, ST.DateCreated, ST.DateLastModified, ST.AvailableSkillPoints, ST.Name, ST.Icon
                                  ORDER BY ST.DateCreated DESC";
                DbUtils.AddParameter(cmd, "@UserId", userId);

                var reader = cmd.ExecuteReader();
                var skills = new List<SkillTreeService.SkillTreeWithTags>();

                while (reader.Read())
                {

                    skills.Add(new SkillTreeService.SkillTreeWithTags()
                    {
                        Id = DbUtils.GetGuid(reader, "Id"),
                        Name = DbUtils.GetString(reader, "Name"),
                        UserId = (Guid)DbUtils.GetGuid(reader, "UserId"),
                        ProficiencyLevel = DbUtils.GetString(reader, "ProficiencyLevel"),
                        ExperiencePoints = DbUtils.GetInt(reader, "ExperiencePoints"),
                        DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        DateLastModified = DbUtils.GetDateTime(reader, "DateLastModified"),
                        AvailableSkillPoints = DbUtils.GetInt(reader, "AvailableSkillPoints"),
                        Icon = DbUtils.GetString(reader, "Icon"),
                        Tags = DbUtils.IsNotDbNull(reader, "Tags") 
                        ? JsonSerializer.Deserialize<List<IdNamePair>>(DbUtils.GetString(reader, "Tags")) 
                        : new List<IdNamePair>()
                    });

                }

                reader.Close();
                return skills;
            }
        }
    }

    public SkillTreeService.SkillTreeWithTags GetByIdWithTags(Guid skillId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"  SELECT ST.Id
                                      ,ST.userId
                                      ,[ProficiencyLevel]
                                      ,[ExperiencePoints]
                                      ,[DateCreated]
                                      ,[DateLastModified]
                                      ,[AvailableSkillPoints]
                                      ,ST.Name
                                      ,[Icon]
                                    ,       '[' + STRING_AGG(
                                        JSON_QUERY(
                                            '{""Id"":""' + CONVERT(varchar(36), T.Id) + '"",""Name"":""' + T.Name + '""}'
                                        ),
                                        ','
                                    ) + ']' AS Tags
                                  FROM [Moxie].[dbo].[SkillTree] AS ST
                                  LEFT JOIN [SkillTreeTag] STT ON STT.SkillTreeId = ST.Id
                                  LEFT JOIN [TAG] T ON T.Id = STT.TagId
                                  WHERE ST.Id = @Id
                                  GROUP BY ST.Id, ST.UserId, ST.ProficiencyLevel, ST.ExperiencePoints, ST.DateCreated, ST.DateLastModified, ST.AvailableSkillPoints, ST.Name, ST.Icon
                                  ORDER BY ST.DateCreated DESC";
                DbUtils.AddParameter(cmd, "@Id", skillId);

                var reader = cmd.ExecuteReader();
                SkillTreeService.SkillTreeWithTags skill = null;

                if (reader.Read())
                {

                    skill = new SkillTreeService.SkillTreeWithTags()
                    {
                        Id = DbUtils.GetGuid(reader, "Id"),
                        Name = DbUtils.GetString(reader, "Name"),
                        UserId = (Guid)DbUtils.GetGuid(reader, "UserId"),
                        ProficiencyLevel = DbUtils.GetString(reader, "ProficiencyLevel"),
                        ExperiencePoints = DbUtils.GetInt(reader, "ExperiencePoints"),
                        DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        DateLastModified = DbUtils.GetDateTime(reader, "DateLastModified"),
                        AvailableSkillPoints = DbUtils.GetInt(reader, "AvailableSkillPoints"),
                        Icon = DbUtils.GetString(reader, "Icon"),
                        Tags = DbUtils.IsNotDbNull(reader, "Tags")
                        ? JsonSerializer.Deserialize<List<IdNamePair>>(DbUtils.GetString(reader, "Tags"))
                        : new List<IdNamePair>()
                    };

                }

                reader.Close();
                return skill;
            }
        }
    }
}

