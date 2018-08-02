using ClosedXML.Excel;
using Datos.DTO;
using Datos.Modelo;
using LogicaNegocio.Enumeraciones;
using LogicaNegocio.Mail;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace LogicaNegocio.LogicaNegocio
{
    public class BasicasBl
    {
        Model1 entity = new Model1();

        public List<Instructor> ConsultarInstructores()
        {
            var Datos = (from i in entity.Instructor
                         where i.Estado == true && i.Area == "COMPETENCIAS BÁSICAS"
                         orderby i.Nombre
                         select i).ToList();

            return Datos;
        }

        public List<Programa> ConsultarProgramas()
        {
            var Datos = (from i in entity.Programa
                         where i.Area == "COMPETENCIAS BÁSICAS"
                         select i).ToList();
            return Datos;
        }

        public bool GuardarEmpresa(Empresa oEmpresa)
        {

            var Datos = (from i in entity.Empresa
                         where i.NIT == oEmpresa.NIT
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Database.ExecuteSqlCommand("GuardarEmpresa @nit,@nom,@dir,@email,@tel,@est,@Enc,@tel_E,@TipoP",
                new SqlParameter("@nit", oEmpresa.NIT),
                new SqlParameter("@nom", oEmpresa.Nombre),
                new SqlParameter("@dir", oEmpresa.Direccion),
                new SqlParameter("@email", oEmpresa.Email),
                new SqlParameter("@tel", oEmpresa.Telefono),
                new SqlParameter("@est", 1),
                new SqlParameter("@Enc", oEmpresa.Encargado),
                new SqlParameter("@tel_E", oEmpresa.Telefono_Encargado),
                new SqlParameter("@TipoP", "")
                );
                return true;
            }
            else
            {
                return false;
            }

        }

        public List<Ficha_CBasicas> ConsultarFichas()
        {
            var Datos = (from i in entity.Ficha_CBasicas
                         where i.Estado == true
                         select i).ToList();
            return Datos;
        }

        public void CambiarEstadoEmpresa(Empresa oInstructor)
        {
            Model1 entity = new Model1();
            var Item = (from i in entity.Empresa
                        where i.NIT == oInstructor.NIT
                        select i).First();
            if (Item.Estado == true)
            {
                Item.Estado = false;
                entity.SaveChanges();
            }
            else
            {
                Item.Estado = true;
                entity.SaveChanges();
            }
        }

        public Empresa ConsultarEmpresa1(int Nit)
        {
            Model1 entity = new Model1();
            var Datos = (from i in entity.Empresa
                         where i.NIT == Nit
                         select i).FirstOrDefault();
            return Datos;

        }

        public void ActualizarRegistro(Empresa oInstructor)
        {
            Model1 entity = new Model1();

            var Item = (from i in entity.Empresa
                        where i.NIT == oInstructor.NIT
                        select i).First();
            Item.NIT = oInstructor.NIT;
            Item.Nombre = oInstructor.Nombre;
            Item.Direccion = oInstructor.Direccion;
            Item.Email = oInstructor.Email;
            Item.Telefono = oInstructor.Telefono;
            Item.Encargado = oInstructor.Encargado;
            Item.Telefono_Encargado = oInstructor.Telefono_Encargado;
            Item.Estado = true;
            entity.SaveChanges();

        }

        public List<Competencias_Basicas> ConsultarProgramacion()
        {
            var Datos = (from i in entity.Competencias_Basicas
                         where i.Estado == true
                         select i).ToList();

            foreach (var item in Datos)
            {
                var fecha = DateTime.Parse(item.Fecha_Final);

                if (DateTime.Now >= fecha)
                {
                    item.Estado = false;
                    entity.SaveChanges();
                }
            }


            var Datos1 = (from i in entity.Competencias_Basicas
                          where i.Estado == true
                          select i).ToList();

            return Datos1;
        }

        public bool GuardarProgramacion(Competencias_Basicas oCBasicas)
        {
            entity.Competencias_Basicas.Add(oCBasicas);
            entity.SaveChanges();
            return true;
        }

        public Competencias_Basicas ConsultarProgramacionId(int Id)
        {
            Model1 entity = new Model1();
            var Datos = (from i in entity.Competencias_Basicas
                         where i.Id == Id
                         select i).FirstOrDefault();
            return Datos;

        }

        public List<Competencias_Basicas> ConsultarProgramacionInstructor(int Id)
        {
            Model1 entity = new Model1();
            var Datos = (from i in entity.Competencias_Basicas
                         where i.Instructor == Id && i.Estado == true
                         select i).ToList();
            return Datos;

        }

        public void ActualizarRegistroProgramacion(Competencias_Basicas oInstructor)
        {
            Model1 entity = new Model1();

            var Item = (from i in entity.Competencias_Basicas
                        where i.Id == oInstructor.Id
                        select i).First();
            Item.Fecha_Inicio = oInstructor.Fecha_Inicio;
            Item.Fecha_Final = oInstructor.Fecha_Final;
            Item.Hora_Inicio = oInstructor.Hora_Inicio;
            Item.Hora_Final = oInstructor.Hora_Final;
            Item.Num_Ficha = oInstructor.Num_Ficha;
            Item.Instructor = oInstructor.Instructor;
            Item.Lugar = oInstructor.Lugar;
            Item.Desc_Lugar = oInstructor.Desc_Lugar;
            Item.Dias = oInstructor.Dias;
            Item.Estado = true;
            entity.SaveChanges();

        }

        public void InHabilitarProgramacion(int IdProgramacion)
        {
            var Datos = (from i in entity.Competencias_Basicas
                         where i.Id == IdProgramacion
                         select i).FirstOrDefault();

            Datos.Estado = false;
            entity.SaveChanges();
        }

        public bool GuardarInstitucion(Instituciones objInsti)
        {
            var Datos = (from i in entity.Instituciones
                         where i.Nombre == objInsti.Nombre
                         select i).FirstOrDefault();
            if(Datos == null)
            {
                entity.Instituciones.Add(objInsti);
                entity.SaveChanges();
                return true;
            }else
            {
                return false;
            }
        }

        public List<Instituciones> ConsultarInstituciones()
        {
            var Datos = (from i in entity.Instituciones
                         where i.Estado == true
                         select i).ToList();
            return Datos; 
        }

        public void GuardarModificacionInstitucion(Instituciones objInst)
        {
            var Datos = (from i in entity.Instituciones
                         where i.Id == objInst.Id
                         select i).FirstOrDefault();
            Datos.Nombre = objInst.Nombre;
            Datos.Direccion = objInst.Direccion;
            Datos.Email = objInst.Email;
            Datos.Telefono_Institucion = objInst.Telefono_Institucion;
            Datos.Encargado = objInst.Encargado;
            Datos.Telefono_Encargado = objInst.Telefono_Encargado;
            entity.SaveChanges();
        }

        public void inhabilitarInsti(int Id)
        {
            var Datos = (from i in entity.Instituciones
                         where i.Id == Id
                         select i).FirstOrDefault();

            if (Datos.Estado)
            {
                Datos.Estado = false;
            }
            else
            {
                Datos.Estado = true;
            }
            entity.SaveChanges();
        }

        public bool GuardarFicha(Ficha_CBasicas obj)
        {
            var datos = (from i in entity.Ficha_CBasicas
                         where i.Num_Ficha == obj.Num_Ficha
                         select i).FirstOrDefault();

            if (datos == null)
            {
                entity.Ficha_CBasicas.Add(obj);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public void GuardarModificacionFicha(Ficha_CBasicas obj)
        {
            var Datos = (from i in entity.Ficha_CBasicas
                         where i.Id == obj.Id
                         select i).FirstOrDefault();
            Datos.Num_Ficha = obj.Num_Ficha;
            Datos.Programa = obj.Programa;
            Datos.Num_Aprendices = obj.Num_Aprendices;
            Datos.Fecha_Inicio = obj.Fecha_Inicio;
            Datos.Fecha_Fin = obj.Fecha_Fin;
            entity.SaveChanges();
        }

        public Ficha_CBasicas ModificarFicha(int id)
        {
            var Datos = (from i in entity.Ficha_CBasicas
                         where i.Id == id
                         select i).FirstOrDefault();
            return Datos;
        }

        public void InHabilitarFicha(int id)
        {
            var Datos = (from i in entity.Ficha_CBasicas
                         where i.Id == id
                         select i).FirstOrDefault();
            if (Datos.Estado)
            {
                Datos.Estado = false;
            }
            else
            {
                Datos.Estado = true;
            }
            entity.SaveChanges();
        }
    }
}
