namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Instructor_Tecnica")]
    public partial class Instructor_Tecnica
    {

        [Key]
        public int Id { get; set; }

        public string Cedula { get; set; }

        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public string Correo_Misena { get; set; }

        public string Correo_Alternativo { get; set; }

        public string Municipio { get; set; }

        public string Telefono_Fijo { get; set; }

        public string Celular { get; set; }

        public string Area { get; set; }

        public string Profesion { get; set; }

        public string Programa_Formacion { get; set; }

    }
}
