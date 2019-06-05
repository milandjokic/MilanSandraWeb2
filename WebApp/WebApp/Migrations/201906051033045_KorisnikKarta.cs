namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KorisnikKarta : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Administrators", newName: "Korisniks");
            CreateTable(
                "dbo.Koeficijents",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TipKorisnika = c.Int(nullable: false),
                        Koef = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.KorisnikKartas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IdKorisnik = c.Int(nullable: false),
                        IdKarta = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Kartas", t => t.IdKarta, cascadeDelete: true)
                .ForeignKey("dbo.Korisniks", t => t.IdKorisnik, cascadeDelete: true)
                .Index(t => t.IdKorisnik)
                .Index(t => t.IdKarta);
            
            AddColumn("dbo.Korisniks", "SlikaIndexa", c => c.String());
            AddColumn("dbo.Korisniks", "SlikaCeka", c => c.String());
            AddColumn("dbo.Korisniks", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            DropTable("dbo.Djaks");
            DropTable("dbo.Kontrolors");
            DropTable("dbo.Penzioners");
            DropTable("dbo.RegularniKorisniks");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.RegularniKorisniks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Ime = c.String(),
                        Prezime = c.String(),
                        Email = c.String(),
                        Lozinka = c.String(),
                        DatumRodjenja = c.DateTime(nullable: false),
                        Adresa = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Penzioners",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SlikaCeka = c.String(),
                        Ime = c.String(),
                        Prezime = c.String(),
                        Email = c.String(),
                        Lozinka = c.String(),
                        DatumRodjenja = c.DateTime(nullable: false),
                        Adresa = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Kontrolors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Ime = c.String(),
                        Prezime = c.String(),
                        Email = c.String(),
                        Lozinka = c.String(),
                        DatumRodjenja = c.DateTime(nullable: false),
                        Adresa = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
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
            
            DropForeignKey("dbo.KorisnikKartas", "IdKorisnik", "dbo.Korisniks");
            DropForeignKey("dbo.KorisnikKartas", "IdKarta", "dbo.Kartas");
            DropIndex("dbo.KorisnikKartas", new[] { "IdKarta" });
            DropIndex("dbo.KorisnikKartas", new[] { "IdKorisnik" });
            DropColumn("dbo.Korisniks", "Discriminator");
            DropColumn("dbo.Korisniks", "SlikaCeka");
            DropColumn("dbo.Korisniks", "SlikaIndexa");
            DropTable("dbo.KorisnikKartas");
            DropTable("dbo.Koeficijents");
            RenameTable(name: "dbo.Korisniks", newName: "Administrators");
        }
    }
}
