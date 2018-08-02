using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos.DTO
{
    public class Institucion_ProgramaDTO
    {
        public int Codigo_Programa { get; set; }

        public int IdInst { get; set; }

        public int Id_Programa { get; set; }

        public bool Estado { get; set; }

        public string NombrePrograma { get; set; }

    }
}