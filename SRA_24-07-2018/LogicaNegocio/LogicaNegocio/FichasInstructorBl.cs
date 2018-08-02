using Datos.Modelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace LogicaNegocio.LogicaNegocio
{
    public  class FichasInstructorBl
    {
        Model1 entity = new Model1();

        public List<Ficha_VTitulada> CargarFichasInstructor(int cedula)
        {
            var fichas = (from i in entity.Instructores_Ficha
                          where i.Lider == cedula
                          select i.Id_Ficha).ToList();

            List<Ficha_VTitulada> Datos = new List<Ficha_VTitulada>();

            foreach(var item in fichas)
            {
                var FichaI = (from i in entity.Ficha_VTitulada
                              where i.Num_Ficha == item
                              select i).FirstOrDefault();
                Datos.Add(FichaI);
            }

            return Datos;
        }

        public List<Aprendices_Titulada> verAprendices(int id)
        {
            var Datos = (from i in entity.Aprendices_Titulada
                         where i.Ficha == id && i.Estado == "Activo"
                         select i).ToList();
            return Datos;
        }

        public bool GuardarAlternativa(Alternativa_Practicas obj)
        {
            entity.Alternativa_Practicas.Add(obj);
            entity.SaveChanges();
            return true;
        }

        public bool validarAlternativa(int IdAprendiz)
        {
            var Datos = (from i in entity.Alternativa_Practicas
                         where i.Aprendiz == IdAprendiz
                         select i).FirstOrDefault();
            if(Datos == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public Alternativa_Practicas ConsultarAlternativa(int IdAprendiz)
        {
            var Datos = (from i in entity.Alternativa_Practicas
                         where i.Aprendiz == IdAprendiz
                         select i).FirstOrDefault();
            return Datos;
        }

        public void GuardarAlternativaEdit(Alternativa_Practicas obj)
        {
            var Datos = (from i in entity.Alternativa_Practicas
                         where i.Id == obj.Id
                         select i).FirstOrDefault();
            Datos.Alternativa = obj.Alternativa;
            Datos.Descripcion = obj.Descripcion;
            entity.SaveChanges();
        }

    }
}
