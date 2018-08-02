namespace Datos.Modelo
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Model1 : DbContext
    {
        public Model1()
            : base("name=Model1")
        {
        }
        public virtual DbSet<Alternativa_Practicas> Alternativa_Practicas { get; set; }
        public virtual DbSet<Ambiente> Ambiente { get; set; }
        public virtual DbSet<Area> Area { get; set; }
        public virtual DbSet<Aprendices_Titulada> Aprendices_Titulada { get; set; }
        public virtual DbSet<Aprendices_Tecnica> Aprendices_Tecnica { get; set; }
        public virtual DbSet<Competencia> Competencia { get; set; }
        public virtual DbSet<Coordinacion> Coordinacion { get; set; }
        public virtual DbSet<Departamento> Departamento { get; set; }
        public virtual DbSet<Docente_Par> Docente_Par { get; set; }
        public virtual DbSet<Empresa> Empresa { get; set; }
        public virtual DbSet<Poblacion_Especial> Poblacion_Especial { get; set; }
        public virtual DbSet<Competencias_Basicas> Competencias_Basicas { get; set; }
        public virtual DbSet<Ficha> Ficha { get; set; }
        public virtual DbSet<Ficha_CBasicas> Ficha_CBasicas{ get; set; }
        public virtual DbSet<Ficha_PEspecial> Ficha_PEspecial { get; set; }
        public virtual DbSet<Ficha_Tecnica> Ficha_Tecnica { get; set; }
        public virtual DbSet<Ficha_VTitulada> Ficha_VTitulada { get; set; }
        public virtual DbSet<Ficha_VComplementaria> Ficha_VComplementaria { get; set; }
        public virtual DbSet<ListaChequeoTecnica> ListaChequeoTecnica { get; set; }
        public virtual DbSet<Programa_Tecnica> Programa_Tecnica { get; set; }
        public virtual DbSet<Institucion_Programa> Institucion_Programa { get; set; }
        public virtual DbSet<Instructores_Ficha> Instructores_Ficha { get; set; }
        public virtual DbSet<Instructor_Ficha_VirtualT> Instructor_Ficha_VirtualT { get; set; }
        public virtual DbSet<Instructor_Ficha_VirtualC> Instructor_Ficha_VirtualC { get; set; }
        public virtual DbSet<Ficha_Ambiente> Ficha_Ambiente { get; set; }
        public virtual DbSet<Historial_Contratos> Historial_Contratos { get; set; }
        public virtual DbSet<Instituciones> Instituciones { get; set; }
        public virtual DbSet<Instructor> Instructor { get; set; }
        public virtual DbSet<instructor_PEspecial> instructor_PEspecial { get; set; }
        public virtual DbSet<Instructor_Tecnica> Instructor_Tecnica { get; set; }
        public virtual DbSet<Media_Tecnica> Media_Tecnica { get; set; }
        public virtual DbSet<Municipio> Municipio { get; set; }
        public virtual DbSet<Novedades> Novedades { get; set; }
        public virtual DbSet<Novedades_Tecnica> Novedades_Tecnica { get; set; }
        public virtual DbSet<Colegios> Colegios { get; set; }
        public virtual DbSet<Programa> Programa { get; set; }
        public virtual DbSet<Resultado_Aprendizaje> Resultado_Aprendizaje { get; set; }
        public virtual DbSet<Sede> Sede { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<Solicitud> Solicitud { get; set; }
        public virtual DbSet<Virtualidad_Complementaria> Virtualidad_Complementaria { get; set; }
        public virtual DbSet<Virtualidad_Titulada> Virtualidad_Titulada { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Ambiente>()
            //    .Property(e => e.Numero)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Ambiente>()
            //    .HasMany(e => e.Ficha_Ambiente)
            //    .WithRequired(e => e.Ambiente)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Area>()
            //    .Property(e => e.Nombre)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Area>()
            //    .Property(e => e.Descripcion)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Area>()
            //    .HasMany(e => e.Ambiente)
            //    .WithRequired(e => e.Area)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Area>()
            //    .HasMany(e => e.Programa)
            //    .WithRequired(e => e.Area)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Competencia>()
            //    .Property(e => e.Nombre)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Competencia>()
            //    .HasMany(e => e.Resultado_Aprendizaje)
            //    .WithRequired(e => e.Competencia)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Coordinacion>()
            //    .Property(e => e.Nombre_Coordinacion)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Coordinacion>()
            //    .Property(e => e.Cedula)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Coordinacion>()
            //    .Property(e => e.Nombre)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Coordinacion>()
            //    .Property(e => e.Apellido)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Coordinacion>()
            //    .Property(e => e.Telefono)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Coordinacion>()
            //    .Property(e => e.Correo)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Departamento>()
            //    .Property(e => e.NombreDepartamento)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Departamento>()
            //    .HasMany(e => e.Municipio)
            //    .WithRequired(e => e.Departamento)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Empresa>()
            //    .Property(e => e.Nombre)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Empresa>()
            //    .Property(e => e.Direccion)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Empresa>()
            //    .Property(e => e.Email)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Empresa>()
            //    .Property(e => e.Telefono)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Ficha>()
            //    .Property(e => e.Ficha1)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Ficha>()
            //    .Property(e => e.TipoFormacion)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Ficha>()
            //    .Property(e => e.Jornada)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Ficha>()
            //    .HasMany(e => e.Ficha_Ambiente)
            //    .WithRequired(e => e.Ficha)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Ficha_Ambiente>()
            //    .Property(e => e.Color)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Ficha_Ambiente>()
            //    .Property(e => e.NombreEmpresa)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Instructor>()
            //    .Property(e => e.Nombre)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Instructor>()
            //    .Property(e => e.Apellido)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Instructor>()
            //    .Property(e => e.Cedula)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Instructor>()
            //    .Property(e => e.Email)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Instructor>()
            //    .Property(e => e.Telefono)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Instructor>()
            //    .HasMany(e => e.Ficha_Ambiente)
            //    .WithRequired(e => e.Instructor)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Municipio>()
            //    .Property(e => e.IdMunicipio)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Municipio>()
            //    .Property(e => e.NombreMunicipio)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Municipio>()
            //    .HasMany(e => e.Sede)
            //    .WithRequired(e => e.Municipio)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Programa>()
            //    .Property(e => e.Nivel)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Programa>()
            //    .Property(e => e.LineaTecnologica)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Programa>()
            //    .Property(e => e.Red_Tecnologica)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Programa>()
            //    .Property(e => e.Perfil_Instructor)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Programa>()
            //    .Property(e => e.NombrePrograma)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Programa>()
            //    .HasMany(e => e.Competencia)
            //    .WithRequired(e => e.Programa)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Programa>()
            //    .HasMany(e => e.Ficha)
            //    .WithRequired(e => e.Programa)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Resultado_Aprendizaje>()
            //    .Property(e => e.Resultado)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Resultado_Aprendizaje>()
            //    .HasMany(e => e.Ficha_Ambiente)
            //    .WithRequired(e => e.Resultado_Aprendizaje)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Sede>()
            //    .Property(e => e.Nombre_Sede)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Sede>()
            //    .Property(e => e.Direccion)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Sede>()
            //    .Property(e => e.IdMunicipio)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Sede>()
            //    .HasMany(e => e.Ambiente)
            //    .WithRequired(e => e.Sede)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Usuario>()
            //    .Property(e => e.NombreUsuario)
            //    .IsUnicode(false);

            //modelBuilder.Entity<Usuario>()
            //    .Property(e => e.Password)
            //    .IsUnicode(false);
        }
    }
}
