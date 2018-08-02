namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Instructor_Ficha_VirtualT")]
    public partial class Instructor_Ficha_VirtualT
    {

        [Key]
        public int Id { get; set; }

        public int Instructor { get; set; }

        public int Ficha { get; set; }

        public bool Estado { get; set; }

    }
}
