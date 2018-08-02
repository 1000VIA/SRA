namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Media_Tecnica")]
    public partial class Media_Tecnica
    {

        [Key]
        public int Id { get; set; }

        public string Hora_Inicio { get; set; }

        public string Hora_Fin { get; set; }

        public int Grado { get; set; }

        public int Ficha { get; set; }

        public string Instructor { get; set; }

        public string Dias { get; set; }
    }
}
