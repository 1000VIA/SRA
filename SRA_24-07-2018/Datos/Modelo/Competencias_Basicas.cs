namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Competencias_Basicas
    {

        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string Hora_Inicio { get; set; }

        public string Hora_Final { get; set; }

        public int Num_Ficha { get; set; }

        public int Instructor { get; set; }

        public string Dias { get; set; }

        public string Fecha_Inicio { get; set; }

        public string Fecha_Final { get; set; }

        public string Lugar { get; set; }

        public string Desc_Lugar { get; set; }

        public bool Estado { get; set; }

    }
}
