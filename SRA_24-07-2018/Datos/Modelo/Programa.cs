namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Programa")]
    public partial class Programa
    {


        [Key]
        public int IdPrograma { get; set; }

        public int CodigoPrograma { get; set; }

        public string Nivel { get; set; }

        public string Version_Programa { get; set; }

        public string NombrePrograma { get; set; }

        public string  Area { get; set; }

    }
}
