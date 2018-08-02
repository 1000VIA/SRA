namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ListaChequeoTecnica")]
    public partial class ListaChequeoTecnica
    {

        [Key]
        public int Id { get; set; }

        public string Observaciones { get; set; }

        public string Institucion { get; set; }

        public bool Criterio1 { get; set; }

        public bool Criterio2 { get; set; }

        public bool Criterio3 { get; set; }

        public bool Criterio4 { get; set; }

        public bool Criterio5 { get; set; }

        public bool Criterio6 { get; set; }

        public bool Criterio7 { get; set; }

        public bool Criterio8 { get; set; }

        public bool Criterio9 { get; set; }

        public bool Criterio10 { get; set; }

        public bool Criterio11 { get; set; }

        public bool Criterio12 { get; set; }

        public bool Criterio13 { get; set; }

        public bool Criterio14 { get; set; }

        public bool Estado { get; set; }

    }
}
