using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos.DTO
{
    public class ColegioDTO
    {
        public int Id { get; set; }

        public int NIT { get; set; }

        public int Codigo_DANE { get; set; }      

        public string Nombre_Colegio { get; set; }

        public string Direccion { get; set; }

        public string Correo_Colegio { get; set; }

        public int Num_Resolucion { get; set; }

        public string Municipio { get; set; }

        public string Tipo { get; set; }

        public string Categoria { get; set; }

        public int Cedula_Rector { get; set; }

        public string Nombre_Rector { get; set; }

        public string Apellidos_Rector { get; set; }

        public string Telefono_Rector { get; set; }

        public string Correo_Rector { get; set; }

        public int Cedula_Coordinador { get; set; }

        public string Nombre_Coordinador { get; set; }

        public string Apellidos_Coordinador { get; set; }

        public string Telefono_Coordinador { get; set; }

        public string Correo_Coordinador { get; set; }

        public string Estado { get; set; }


    }
}