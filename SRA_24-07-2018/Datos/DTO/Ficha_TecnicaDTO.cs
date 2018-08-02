using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos.DTO
{
    public class Ficha_TecnicaDTO
    {

        public int Id { get; set; }

        public int Num_Ficha { get; set; }

        public string Fecha_Inicio { get; set; }

        public string Fecha_Fin { get; set; }

        public int Num_Aprendices { get; set; }

        public string Institucion { get; set; }

        public string Programa { get; set; }

        public string Estado { get; set; }

    }
}
