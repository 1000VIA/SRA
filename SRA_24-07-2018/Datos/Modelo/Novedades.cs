namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Novedades")]
    public partial class Novedades
    {

        [Key]
        public int Id { get; set; }

        public int Ficha { get; set; }

        public int Aprendiz { get; set; }

        public string Descripcion { get; set; }

        public string Nueva_Ficha { get; set; }
    }
}
