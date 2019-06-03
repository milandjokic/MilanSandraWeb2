namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LinijaMigration : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StanicaLinijas", "Stanica_Id", "dbo.Stanicas");
            DropForeignKey("dbo.StanicaLinijas", "Linija_Id", "dbo.Linijas");
            DropIndex("dbo.StanicaLinijas", new[] { "Stanica_Id" });
            DropIndex("dbo.StanicaLinijas", new[] { "Linija_Id" });
            DropTable("dbo.StanicaLinijas");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.StanicaLinijas",
                c => new
                    {
                        Stanica_Id = c.Int(nullable: false),
                        Linija_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Stanica_Id, t.Linija_Id });
            
            CreateIndex("dbo.StanicaLinijas", "Linija_Id");
            CreateIndex("dbo.StanicaLinijas", "Stanica_Id");
            AddForeignKey("dbo.StanicaLinijas", "Linija_Id", "dbo.Linijas", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StanicaLinijas", "Stanica_Id", "dbo.Stanicas", "Id", cascadeDelete: true);
        }
    }
}
