namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Poblacion_Especial
    {

        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string Hora_Inicio { get; set; }

        public string Hora_Final { get; set; }

        public int Num_Ficha { get; set; }

        public int Instructor { get; set; }

        public int Empresa { get; set; }

        public string Dias { get; set; }

        public string Fecha_Inicio { get; set; }

        public string Fecha_Final { get; set; }

        public bool Estado { get; set; }

        public string Programa { get; set; }

        public string Tipo_Curso { get; set; }

    }
}
