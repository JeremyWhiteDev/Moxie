﻿using System;
using System.Data.Common;
using System.Reflection;
using Microsoft.Data.SqlClient;
using MoxieApi.Attributes;

namespace MoxieApi.Utils;

/// <summary>
///  A set of useful function for interacting with ADO.NET
/// </summary>
public static class DbUtils
{
    /// <summary>
    ///  Get a string from a data reader object and gracefully handle NULL values
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
    /// <returns>The value of the given column or null.</returns>
    public static string GetString(SqlDataReader reader, string column)
    {
        var ordinal = reader.GetOrdinal(column);
        if (reader.IsDBNull(ordinal))
        {
            return null;
        }

        return reader.GetString(ordinal);
    }

    public static Guid? GetGuid(SqlDataReader reader, string column)
    {
        var ordinal = reader.GetOrdinal(column);
        if (reader.IsDBNull(ordinal))
        {
            return null;
        }
        return reader.GetGuid(ordinal);

    }

    public static string? GetNullableString(SqlDataReader reader, string column)
    {
        var ordinal = reader.GetOrdinal(column);
        if (reader.IsDBNull(ordinal))
        {
            return null;
        }

        return reader.GetString(reader.GetOrdinal(column));
    }

    /// <summary>
    ///  Get an int from a data reader object.
    ///  This method assumes the value is not NULL.
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
    /// <returns>The value of the given column.</returns>
    public static int GetInt(SqlDataReader reader, string column)
    {
        return reader.GetInt32(reader.GetOrdinal(column));
    }

    public static double GetDouble(SqlDataReader reader, string column)
    {
        return reader.GetDouble(reader.GetOrdinal(column));
    }

    public static bool GetBoolean(SqlDataReader reader, string column)
    {
        return reader.GetBoolean(reader.GetOrdinal(column));
    }

    public static bool? GetNullableBoolean(SqlDataReader reader, string column)
    {
        var ordinal = reader.GetOrdinal(column);
        if (reader.IsDBNull(ordinal))
        {
            return null;
        }

        return reader.GetBoolean(reader.GetOrdinal(column));
    }

    /// <summary>
    ///  Get a DateTime from a data reader object.
    ///  This method assumes the value is not NULL.
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
    /// <returns>The value of the given column.</returns>
    public static DateTime GetDateTime(SqlDataReader reader, string column)
    {
        return reader.GetDateTime(reader.GetOrdinal(column));
    }

    /// <summary>
    ///  Get an int? (nullable int) from a data reader object and gracefully handle NULL values
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
    /// <returns>The value of the given column or null.</returns>
    public static int? GetNullableInt(SqlDataReader reader, string column)
    {
        var ordinal = reader.GetOrdinal(column);
        if (reader.IsDBNull(ordinal))
        {
            return null;
        }

        return reader.GetInt32(ordinal);
        //return reader.GetInt32(ordinal);
        //return reader.GetInt32(reader.GetOrdinal(column));
    }

    /// <summary>
    ///  Get a DateTime? (nullable DateTime) from a data reader object and gracefully handle NULL values
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
    /// <returns>The value of the given column or null.</returns>
    public static DateTime? GetNullableDateTime(SqlDataReader reader, string column)
    {
        var ordinal = reader.GetOrdinal(column);
        if (reader.IsDBNull(ordinal))
        {
            return null;
        }

        return reader.GetDateTime(ordinal);
    }

    /// <summary>
    ///  Determine if the value a given column is NULL
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
    /// <returns>true if "column" is NULL in the database otherwise false.</returns>
    public static bool IsDbNull(SqlDataReader reader, string column)
    {
        return reader.IsDBNull(reader.GetOrdinal(column));
    }

    /// <summary>
    ///  Determine if the value a given column is not NULL
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
    /// <returns>true if "column" is not NULL in the database otherwise false.</returns>
    public static bool IsNotDbNull(SqlDataReader reader, string column)
    {
        return !IsDbNull(reader, column);
    }

    /// <summary>
    ///  Add a parameter to the given SqlCommand object and gracefully handle null values.
    /// </summary>
    /// <param name="cmd">The command to which to add the parameter.</param>
    /// <param name="name">The name of the parameter.</param>
    /// <param name="value">The value of the parameter. May be null.</param>
    public static void AddParameter(SqlCommand cmd, string name, object value)
    {
        if (value == null)
        {
            cmd.Parameters.AddWithValue(name, DBNull.Value);
        }
        else
        {
            cmd.Parameters.AddWithValue(name, value);
        }
    }

    /// <summary>
    ///  Add a parameter to the given SqlCommand object and gracefully handle null values.
    /// </summary>
    /// <param name="cmd">The command to which to add the parameter.</param>
    /// <param name="name">The name of the parameter.</param>
    /// <param name="value">The value of the parameter. May be null.</param>
    //public static void AddParameterList(SqlCommand cmd, List<string> parameterNames, List<string> columnNames, IEnumerable<PropertyInfo> props, object obj)
    //{
    //    foreach(string cName in columnNames)
    //    {
    //        //parameter is "@thisColumn"
    //        //column names is "thisColumn"
    //        //pops is List<Prop Info> like  Guid string, datetime datecreated, etc.

    //        var currentProp = props.FirstOrDefault(p => p.GetCustomAttribute<DbColumnAttribute>(true).Name == cName);

    //        //need to pass in the current obj
    //        cmd.Parameters.AddWithValue(parameterName, currentProp.GetValue(obj));

    //    }
    //    if (value == null)
    //    {
    //        cmd.Parameters.AddWithValue(name, DBNull.Value);
    //    }
    //    else
    //    {
    //        cmd.Parameters.AddWithValue(name, value);
    //    }
    //}


    /// <summary>
    ///  Resolve the correct type of reader to implement based on the Property Type
    /// </summary>
    /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
    /// <param name="attr">A DbColumnAttribute that contains the column name.</param>
    /// <param name="prop">A Propoerty Info of the current Object Property.</param>
    /// <param name="obj">The instance of the Object to write the property to</param>
    public static void ResolveReaderAndSetValue(SqlDataReader reader, DbColumnAttribute attr, PropertyInfo prop, object obj)
    {
     if (prop.PropertyType == typeof(string)) 
        {
        prop.SetValue(obj, GetNullableString(reader, attr.Name));
        } 
     else if (prop.PropertyType == typeof(int))
        {
            prop.SetValue(obj, GetInt(reader, attr.Name));
        }
     else if (prop.PropertyType == typeof(Guid?))
        {
            prop.SetValue(obj, GetGuid(reader, attr.Name));
        }
     else if (prop.PropertyType == typeof(int?))
        {
            prop.SetValue(obj, GetNullableInt(reader, attr.Name));
        }
     else if (prop.PropertyType == typeof(double))
        {
            prop.SetValue(obj, GetDouble(reader, attr.Name));
        }
     else if (prop.PropertyType == typeof(bool))
        {
            prop.SetValue(obj, GetBoolean(reader, attr.Name));
        }
     else if (prop.PropertyType == typeof(bool?))
        {
            prop.SetValue(obj, GetNullableBoolean(reader, attr.Name));
        }
     else if (prop.PropertyType == typeof(DateTime))
        {
            prop.SetValue(obj, GetDateTime(reader, attr.Name));
        }
        else if (prop.PropertyType == typeof(DateTime?))
        {
            prop.SetValue(obj, GetNullableDateTime(reader, attr.Name));
        }


    }

}