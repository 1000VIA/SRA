namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Docente_Par")]
    public partial class Docente_Par
    {

        [Key]
        public int Id { get; set; }

        public string Telefono { get; set; }

        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public string Email { get; set; }

        public int Id_Institucion { get; set; }

        public int Id_Programa { get; set; }
    }
}
