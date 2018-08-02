namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Colegios")]
    public partial class Colegios
    {

        [Key]
        public int Id { get; set; }

        public int NIT { get; set; }

        public int Codigo_DANE { get; set; }

        public string Nombre_Colegio { get; set; }

        public string Direccion { get; set; }

        public string Correo_Colegio { get; set; }

        public int Num_Resolucion { get; set; }

        public int Municipio { get; set; }

        public string Tipo { get; set; }

        public string Categoria { get; set; }

        public string Nombre_Rector { get; set; }

        public string Apellidos_Rector { get; set; }

        public string Telefono_Rector { get; set; }

        public string Correo_Rector { get; set; }

        public string Nombre_Coordinador { get; set; }

        public string Apellidos_Coordinador { get; set; }

        public string Telefono_Coordinador { get; set; }

        public string Correo_Coordinador { get; set; }

        public bool Estado { get; set; }

    }
}
