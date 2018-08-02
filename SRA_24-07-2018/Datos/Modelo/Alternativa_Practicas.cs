namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Alternativa_Practicas")]
    public partial class Alternativa_Practicas
    {

        [Key]
        public int Id { get; set; }

        public int Aprendiz { get; set; }

        public int Alternativa { get; set; }

        public string Descripcion { get; set; }
    }
}
