﻿using Microsoft.Data.SqlClient;
using MoxieApi.Utils;
using System.Xml.Linq;

namespace MoxieApi.Models;

public class User : IdEntity, IBaseEntity
{
    /// <summary>
    ///  Creates a User using the sql data reader and an option to include an owner.
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// 
    /// 
    ///
    public User(SqlDataReader reader)
    {
        Id = DbUtils.GetString(reader, COLUMNS.Id);
        Uid = DbUtils.GetString(reader, COLUMNS.Uid);
        FirstName = DbUtils.GetString(reader, COLUMNS.FirstName);
        LastName = DbUtils.GetString(reader, COLUMNS.LastName);
        ImageUrl = DbUtils.GetNullableString(reader, COLUMNS.ImageUrl);
        DateCreated = DbUtils.GetDateTime(reader, COLUMNS.DateCreated);
        DateLastModified = DbUtils.GetDateTime (reader, COLUMNS.DateLastModified);

    }

    public User() { }
    public string Uid { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ImageUrl { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateLastModified { get; set; }

    public static class TABLE
    {
        public static string Name = "[Moxie].[dbo].[User]";
    }
    public static class COLUMNS
    {
        public static readonly string Id = $"{TABLE.Name}.[Id]";
        public static readonly string Uid = $"{TABLE.Name}.[Uid]";
        public static readonly string FirstName = $"{TABLE.Name}.[FirstName]";
        public static readonly string LastName = $"{TABLE.Name}.[LastName]";
        public static readonly string ImageUrl = $"{TABLE.Name}.ImageUrl";
        public static readonly string DateCreated = $"{TABLE.Name}.[DateCreated]";
        public static readonly string DateLastModified = $"{TABLE.Name}.[DateLastModified]";

        public static readonly string SelectAll = $@"  {Id} AS '{Id}',
                                                       {FirstName} AS '{FirstName}',
	                                                   {LastName} AS '{LastName}',
	                                                   {ImageUrl} AS '{ImageUrl}',
	                                                   {DateCreated} AS '{DateCreated}',
	                                                   {DateLastModified} AS '{DateLastModified}'";
    }

    public string GetTableName()
    {
        return TABLE.Name;
    }

    public string GetSelectAllStatement()
    {
        return COLUMNS.SelectAll;
    }
}