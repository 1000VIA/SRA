using Datos.DTO;
using Datos.Modelo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LogicaNegocio.LogicaNegocio
{
    public class ProgramaBl
    {
        Model1 entity = new Model1();

        public bool GuardarPrograma(Programa oPrograma)
        {
            var Datos = (from i in entity.Programa
                         where i.CodigoPrograma == oPrograma.CodigoPrograma
                         select i).FirstOrDefault();
            if (Datos != null)
            {
                return false;
            }
            else
            {
                entity.Programa.Add(oPrograma);
                entity.SaveChanges();
                return true;
            }
        }

        public List<Programa> ConsultarProgramas()
        {
            var Datos = (from i in entity.Programa
                         select i).ToList();
            return Datos;
        }


        public void ActualizarRegistro(Programa oPrograma)
        {
            var Item = (from i in entity.Programa
                        where i.IdPrograma == oPrograma.IdPrograma
                        select i).FirstOrDefault();

            Item.CodigoPrograma = oPrograma.CodigoPrograma;
            Item.Nivel = oPrograma.Nivel;
            Item.Version_Programa = oPrograma.Version_Programa;
            Item.Area = oPrograma.Area;
            Item.NombrePrograma = oPrograma.NombrePrograma;
            entity.SaveChanges();

        }

        public bool EliminarPrograma(int IdProgrma)
        {
                var programas = (from i in entity.Programa
                             where i.IdPrograma == IdProgrma
                             select i).FirstOrDefault();
                entity.Programa.Remove(programas);
                entity.SaveChanges();
                return true;
          
        }

    }
}
