namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Virtualidad_Complementaria")]
    public partial class Virtualidad_Complementaria
    {

        [Key]
        public int Id { get; set; }

        public string Fecha_Inicio { get; set; }

        public string Fecha_Fin { get; set; }

        public string Hora_Inicio { get; set; }

        public string Hora_Fin { get; set; }

        public string Instructor { get; set; }

        public string Ficha { get; set; }

        public string Dias { get; set; }

        public bool Estado { get; set; }

    }
}
