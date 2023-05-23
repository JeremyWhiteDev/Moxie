USE [master]
GO
IF db_id('Moxie') IS NULL
  CREATE DATABASE [Moxie]
GO
USE [Moxie]
GO

CREATE TABLE [ShemaVersion] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Version] float,
  [Description] varchar(100)
)
GO

CREATE TABLE [User] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Uid] varchar(36) NOT NULL,
  [FirstName] varchar(36) NOT NULL,
  [LastName] varchar(36) NOT NULL,
  [ImageUrl] varchar(64),
  [DateCreated] dateTime NOT NULL,
  [DateLastModified] dateTime NOT NULL,
  [SkillLevel] int DEFAULT 1
)
GO

CREATE TABLE [SkillTree] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [UserId] UNIQUEIDENTIFIER NOT NULL,
  [ProficiencyLevel] varchar(64),
  [ExperiencePoints] int NOT NULL DEFAULT 0,
  [DateCreated] dateTime NOT NULL,
  [DateLastModified] dateTime NOT NULL,
  [AvailableSkillPoints] int NOT NULL DEFAULT 0
)
GO

CREATE TABLE [SkillTreeTag] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [SkillTreeId] UNIQUEIDENTIFIER,
  [TagId] UNIQUEIDENTIFIER
)
GO

CREATE TABLE [Tag] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Name] Varchar(64)
)
GO

CREATE TABLE [ActivityTypeTag] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [ActivityTypeId] UNIQUEIDENTIFIER,
  [TagId] UNIQUEIDENTIFIER
)
GO

CREATE TABLE [SkillGoal] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [SkillTreeId] UNIQUEIDENTIFIER,
  [RewardType] UNIQUEIDENTIFIER,
  [RewardValue] varchar(64),
  [ExperiencePointsRequired] int,
  [isComplete] bit,
  [DateCreated] dateTime,
  [DateLastModified] dateTime
)
GO

CREATE TABLE [ActivityLog] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [ActivityTypeId] UNIQUEIDENTIFIER,
  [SkillTreeId] UNIQUEIDENTIFIER,
  [DateCompleted] dateTime,
  [totalExperiencePoints] int
)
GO

CREATE TABLE [ActivityLogLineItem] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [ActivityLogId] UNIQUEIDENTIFIER,
  [ActivityItemId] UNIQUEIDENTIFIER,
  [Quantity] int
)
GO

CREATE TABLE [ActivityItem] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [ActivityTypeId] UNIQUEIDENTIFIER,
  [GearId] UNIQUEIDENTIFIER,
  [TechniqueId] UNIQUEIDENTIFIER,
  [Duration] int,
  [DurationUnits] nvarchar(255),
  [ExperiencePointsRewarded] int,
  [Quantity] int,
  [DifficultyLevel] int,
  [DifficultyUnits] varchar(32)
)
GO

CREATE TABLE [ActivityItemHighlight] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [ActivityItemId] UNIQUEIDENTIFIER,
  [HighlightId] UNIQUEIDENTIFIER,
  [Value] int
)
GO

CREATE TABLE [Highlight] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Name] varchar(32),
  [UnitsOfMeasure] varchar(32),
  [HigherIsBetter] bit
)
GO

CREATE TABLE [ActivityType] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Name] varchar(32)
)
GO

CREATE TABLE [ActivityTypeHighlight] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [ActivityTypeId] UNIQUEIDENTIFIER,
  [HighlightId] UNIQUEIDENTIFIER
)
GO

CREATE TABLE [Gear] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Name] varchar(32),
  [IsOwned] bit,
  [PurchasedByApp] bit,
  [ExperiencePointCost] int
)
GO

CREATE TABLE [GearTag] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [GearId] UNIQUEIDENTIFIER,
  [TagId] UNIQUEIDENTIFIER
)
GO

CREATE TABLE [Technique] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Name] Varchar(32),
  [ProficiencyLevel] varchar(64)
)
GO

CREATE TABLE [TechniqueResource] (
  [Id] UNIQUEIDENTIFIER DEFAULT NEWID(),
  [Name] varchar(32),
  [TechniqueId] UNIQUEIDENTIFIER,
  [Url] varchar(64)
)
GO

CREATE TABLE [GearTechnique] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [GearId] UNIQUEIDENTIFIER,
  [TechniqueId] UNIQUEIDENTIFIER
)
GO

CREATE TABLE [Challenge] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  [Name] varchar(32),
  [Description] varchar(128),
  [SkillTreeId] UNIQUEIDENTIFIER,
  [HighlightId] UNIQUEIDENTIFIER,
  [ExperiencePointsRewarded] int,
  [isComplete] bit
)
GO

ALTER TABLE [SkillTree] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [SkillGoal] ADD FOREIGN KEY ([SkillTreeId]) REFERENCES [SkillTree] ([Id])
GO

ALTER TABLE [SkillTreeTag] ADD FOREIGN KEY ([SkillTreeId]) REFERENCES [SkillTree] ([Id])
GO

ALTER TABLE [SkillTreeTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
GO


ALTER TABLE [ActivityLog] ADD FOREIGN KEY ([SkillTreeId]) REFERENCES [SkillTree] ([Id])
GO

ALTER TABLE [ActivityLogLineItem] ADD FOREIGN KEY ([ActivityLogId]) REFERENCES [ActivityLog] ([Id])
GO

ALTER TABLE [ActivityLogLineItem] ADD FOREIGN KEY ([ActivityItemId]) REFERENCES [ActivityItem] ([Id])
GO

ALTER TABLE [ActivityItemHighlight] ADD FOREIGN KEY ([ActivityItemId]) REFERENCES [ActivityItem] ([Id])
GO

ALTER TABLE [ActivityItemHighlight] ADD FOREIGN KEY ([HighlightId]) REFERENCES [Highlight] ([Id])
GO

ALTER TABLE [ActivityLog] ADD FOREIGN KEY ([ActivityTypeId]) REFERENCES [ActivityType] ([Id])
GO

ALTER TABLE [ActivityTypeTag] ADD FOREIGN KEY ([ActivityTypeId]) REFERENCES [ActivityType] ([Id])
GO

ALTER TABLE [ActivityTypeTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
GO

ALTER TABLE [ActivityTypeHighlight] ADD FOREIGN KEY ([ActivityTypeId]) REFERENCES [ActivityType] ([Id])
GO

ALTER TABLE [ActivityTypeHighlight] ADD FOREIGN KEY ([HighlightId]) REFERENCES [Highlight] ([Id])
GO

ALTER TABLE [ActivityItem] ADD FOREIGN KEY ([GearId]) REFERENCES [Gear] ([Id])
GO

ALTER TABLE [ActivityItem] ADD FOREIGN KEY ([TechniqueId]) REFERENCES [Technique] ([Id])
GO

ALTER TABLE [GearTechnique] ADD FOREIGN KEY ([GearId]) REFERENCES [Gear] ([Id])
GO

ALTER TABLE [GearTechnique] ADD FOREIGN KEY ([TechniqueId]) REFERENCES [Technique] ([Id])
GO

ALTER TABLE [TechniqueResource] ADD FOREIGN KEY ([TechniqueId]) REFERENCES [Technique] ([Id])
GO

ALTER TABLE [GearTag] ADD FOREIGN KEY ([GearId]) REFERENCES [Gear] ([Id])
GO

ALTER TABLE [GearTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
GO
