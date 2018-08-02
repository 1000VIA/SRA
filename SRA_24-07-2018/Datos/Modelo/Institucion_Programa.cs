namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Institucion_Programa")]
    public partial class Institucion_Programa
    {

        [Key]
        public int Id { get; set; }

        public int Id_Institucion { get; set; }

        public int Id_Programa { get; set; }

        public bool Estado { get; set; }

    }
}
