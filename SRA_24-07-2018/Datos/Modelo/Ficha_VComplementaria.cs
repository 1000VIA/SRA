namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Ficha_VComplementaria")]
    public partial class Ficha_VComplementaria
    {

        [Key]
        public int Id { get; set; }

        public int Num_Ficha { get; set; }

        public int Num_Aprendices { get; set; }

        public string Programa { get; set; }

        public string Fecha_Inicio { get; set; }

        public string Fecha_Fin { get; set; }

        public int Retirados { get; set; }

        public int Aprobados { get; set; }

        public string Porc_Certificacion { get; set; }

        public string Estado { get; set; }

        public int No_Aprobados { get; set; }

    }
}
