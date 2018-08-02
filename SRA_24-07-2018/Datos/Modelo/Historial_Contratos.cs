namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Historial_Contratos")]
    public partial class Historial_Contratos
    {

        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public int Num_Contrato { get; set; }

        public string Inicio_Contrato { get; set; }

        public string Fin_Contrato { get; set; }

        public string Adicion { get; set; }

    }
}
