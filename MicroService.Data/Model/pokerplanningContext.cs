using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MicroService.Data.Model
{
    public partial class pokerplanningContext : DbContext
    {
        public pokerplanningContext()
        {
        }

        public pokerplanningContext(DbContextOptions<pokerplanningContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Empdetails> Empdetails { get; set; }
        public virtual DbSet<Room> Room { get; set; }
        public virtual DbSet<Roomdetails> Roomdetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL("Server=localhost;Uid=root;Pwd=AaBb11%%;Database=poker-planning;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Empdetails>(entity =>
            {
                entity.HasKey(e => e.EmpOracleId)
                    .HasName("PRIMARY");

                entity.ToTable("empdetails");

                entity.Property(e => e.EmpOracleId)
                    .HasColumnName("empOracleId")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EmpName)
                    .IsRequired()
                    .HasColumnName("empName")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("room");

                entity.HasIndex(e => e.HostId)
                    .HasName("hostId");

                entity.Property(e => e.RoomId)
                    .HasColumnName("roomId")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.HostId)
                    .HasColumnName("hostId")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Story).HasColumnName("story");

                entity.Property(e => e.StoryId)
                    .HasColumnName("storyId")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.Host)
                    .WithMany(p => p.Room)
                    .HasForeignKey(d => d.HostId)
                    .HasConstraintName("room_ibfk_1");
            });

            modelBuilder.Entity<Roomdetails>(entity =>
            {
                entity.HasKey(e => new { e.RoomId, e.EmpId })
                    .HasName("PRIMARY");

                entity.ToTable("roomdetails");

                entity.HasIndex(e => e.EmpId)
                    .HasName("empId");

                entity.Property(e => e.RoomId)
                    .HasColumnName("roomId")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EmpId)
                    .HasColumnName("empId")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.HostStatus)
                    .HasColumnName("hostStatus")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.NumberChoosen)
                    .HasColumnName("numberChoosen")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.NumberChoosenStatus)
                    .HasColumnName("numberChoosenStatus")
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasDefaultValueSql("'no'");

                entity.HasOne(d => d.Emp)
                    .WithMany(p => p.Roomdetails)
                    .HasForeignKey(d => d.EmpId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("roomdetails_ibfk_2");

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.Roomdetails)
                    .HasForeignKey(d => d.RoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("roomdetails_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
