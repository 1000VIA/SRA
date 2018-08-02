namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Aprendices_Titulada")]
    public partial class Aprendices_Titulada
    {

        [Key]
        public int Id { get; set; }

        public string Documento { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public string Email { get; set; }

        public string Telefono { get; set; }

        public string Estado { get; set; }

        public int Ficha { get; set; }

        public string TipoDocumento { get; set; } 
        

    }
}
