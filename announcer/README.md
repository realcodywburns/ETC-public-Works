## Public Announcement Channel

Depolyed at: 0xDB9f62b24B14A8B326f10b4243cDC8c9DB73cB95
Current Version: beta

## Workflow:
  
-  A member make's a pre-announcement
  
-  Voting members vote to approve or disapprove a message, and provide justification
  
-  After the `Debating Period` if an announcement has at least met `minimumQuorum` and has more true than false votes; it becomes an official announcement
  
# Events

## Public
   
   `AnnouncementAdded` a new announcement is pending approval
    `Voted` a member has voted on the announcement, they can include justification
    `AnnouncementTallied` official outcome of an announcements votes
    `officialAnnouncement` an official announcement!
   
   Meta
    `MembershipChanged` a voting member is added or removed
    `ChangeOfRules` a change in contract rules

# Functions

## Public
 
    `checkAnnouncementCode` validate an announcement
    `executeAnnouncement` finalize announcement after voting has closed
    
    Check:
      `members` voting members
      `minimumQuorum` how many must vote on announcement
      `debatingPeriodInMinutes` how long a message can be voted on
      
      `numAnnouncements` number of pre announcements
      `Announcements` list of pre-announcements
     
      `officailAnnCount` number of official announcements
      `officialAnnouncements` official announcements
      
      
      
    

