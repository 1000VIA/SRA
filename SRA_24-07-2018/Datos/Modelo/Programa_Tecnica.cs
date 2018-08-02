namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Programa_Tecnica")]
    public partial class Programa_Tecnica
    {

        [Key]
        public int Id{ get; set; }

        public int Codigo_Programa { get; set; }

        public string Red_Tecnologica { get; set; }

        public string Version_Programa { get; set; }

        public string NombrePrograma { get; set; }

        public bool Estado { get; set; }
    }
}
