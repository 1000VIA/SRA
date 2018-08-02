using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos.DTO
{
    public class EmpresaDTO
    {
        public int NIT { get; set; }

        public string Nombre { get; set; }

        public string Direccion { get; set; }

        public string Email { get; set; }

        public string Telefono { get; set; }

        public string Encargado { get; set; }

        public string Telefono_Encargado { get; set; }

        public string Tipo_Poblacion { get; set; }
    }
}
