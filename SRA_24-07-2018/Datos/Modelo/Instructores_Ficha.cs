namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Instructores_Ficha")]
    public partial class Instructores_Ficha
    {

        [Key]
        public int Id { get; set; }

        public int Id_Ficha { get; set; }

        public int Lider { get; set; }

        public int Tecnico { get; set; }

        public int Emprendimiento { get; set; }

        public int Salud_Ocupacional { get; set; }

        public int Cultura_Fisica { get; set; }

        public int Medio_Ambiente { get; set; }

        public int Etica { get; set; }

        public int Comunicacion { get; set; }

        public int Ingles { get; set; }

        public int TIC { get; set; }

    }
}
