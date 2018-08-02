namespace Datos.Modelo
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Instructor")]
    public partial class Instructor
    {

        [Key]
        public int IdInstructor { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public int? IdUsuario { get; set; }

        public string Cedula { get; set; }

        public string Email { get; set; }

        public bool Estado { get; set; }

        public string TipoContrato { get; set; }

        public string Telefono { get; set; }

        public string Area { get; set; }

        public bool? EnvioCorreo { get; set; }

        public string Num_Contrato { get; set; }

        public string Inicio_Contrato { get; set; }
        
        public string Fin_Contrato { get; set; }

        public string Adicion { get; set; }

        public string Numero { get; set; }

        public string MunicipioVivienda { get; set; }

        public string Celular { get; set; }

        public string DiaNacimiento { get; set; }

        public string MesNacimiento { get; set; }

        public string AnioNacimiento { get; set; }

        public string Profesion { get; set; }

        public string ProgramaFormacion { get; set; }

        public string EmailAlternativo { get; set; }

    }
}
