namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Ficha_VTitulada")]
    public partial class Ficha_VTitulada
    {
        public int id;

        [Key]
        public int Id { get; set; }

        public int Num_Ficha { get; set; }

        public int Num_Aprendices { get; set; }

        public string Programa { get; set; }

        public string Inicio_Lectiva { get; set; }

        public string Inicio_Productiva { get; set; }

        public string Fin_Productiva { get; set; }

        public int Num_Retirados { get; set; }

        public int Num_Cancelados { get; set; }

        public int Num_Certificados { get; set; }

        public string Porc_Certificacion { get; set; }

        public string Etapa { get; set; }

        public int Cambio_Ficha { get; set; }

    }
}
