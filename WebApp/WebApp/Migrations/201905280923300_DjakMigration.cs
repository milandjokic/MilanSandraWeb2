namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DjakMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Djaks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SlikaIndexa = c.String(),
                        Ime = c.String(),
                        Prezime = c.String(),
                        Email = c.String(),
                        Lozinka = c.String(),
                        DatumRodjenja = c.DateTime(nullable: false),
                        Adresa = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Djaks");
        }
    }
}
