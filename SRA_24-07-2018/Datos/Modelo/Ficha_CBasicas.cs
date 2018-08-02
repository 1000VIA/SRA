namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Ficha_CBasicas")]
    public partial class Ficha_CBasicas
    {

        [Key]
        public int Id { get; set; }

        public int Num_Ficha { get; set; }

        public int Programa { get; set; }

        public int Num_Aprendices { get; set; }

        public string Fecha_Inicio { get; set; }

        public string Fecha_Fin { get; set; }

        public bool Estado { get; set; }

    }
}
