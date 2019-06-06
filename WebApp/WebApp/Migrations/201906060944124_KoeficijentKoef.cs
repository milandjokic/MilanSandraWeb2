namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KoeficijentKoef : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Koeficijents", "Koef", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Koeficijents", "Koef", c => c.Single(nullable: false));
        }
    }
}
