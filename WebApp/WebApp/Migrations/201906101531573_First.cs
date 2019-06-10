namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class First : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Coefficients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserType = c.Int(nullable: false),
                        Coef = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Items",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PricelistItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Price = c.Double(nullable: false),
                        IdPricelist = c.Int(nullable: false),
                        IdItem = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Items", t => t.IdItem, cascadeDelete: true)
                .ForeignKey("dbo.Pricelists", t => t.IdPricelist, cascadeDelete: true)
                .Index(t => t.IdPricelist)
                .Index(t => t.IdItem);
            
            CreateTable(
                "dbo.Pricelists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Start = c.DateTime(nullable: false),
                        End = c.DateTime(nullable: false),
                        Active = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AspNetUsers", "Name", c => c.String());
            AddColumn("dbo.AspNetUsers", "Lastname", c => c.String());
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            AddColumn("dbo.AspNetUsers", "DateOfBirth", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "Image", c => c.String());
            AddColumn("dbo.AspNetUsers", "Activated", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "UserType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PricelistItems", "IdPricelist", "dbo.Pricelists");
            DropForeignKey("dbo.PricelistItems", "IdItem", "dbo.Items");
            DropIndex("dbo.PricelistItems", new[] { "IdItem" });
            DropIndex("dbo.PricelistItems", new[] { "IdPricelist" });
            DropColumn("dbo.AspNetUsers", "UserType");
            DropColumn("dbo.AspNetUsers", "Activated");
            DropColumn("dbo.AspNetUsers", "Image");
            DropColumn("dbo.AspNetUsers", "DateOfBirth");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "Lastname");
            DropColumn("dbo.AspNetUsers", "Name");
            DropTable("dbo.Pricelists");
            DropTable("dbo.PricelistItems");
            DropTable("dbo.Items");
            DropTable("dbo.Coefficients");
        }
    }
}
