namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Instituciones")]
    public partial class Instituciones
    {

        [Key]
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Direccion { get; set; }

        public string Email { get; set; }

        public string Telefono_Institucion { get; set; }

        public string Encargado { get; set; }

        public string Telefono_Encargado { get; set; }

        public bool Estado { get; set; }

    }
}
