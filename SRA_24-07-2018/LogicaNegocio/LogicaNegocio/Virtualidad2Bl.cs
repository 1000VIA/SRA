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
    public class Virtualidad2Bl
    {
        Model1 entity = new Model1();

        public List<Instructor> ConsultarInstructores()
        {
            var Datos = (from i in entity.Instructor
                         where i.Estado == true && i.Area == "COMPLEMENTARIA VIRTUAL"
                         orderby i.Nombre
                         select i).ToList();

            return Datos;

        }

        public bool GuardarInstructor(Instructor oInstructor)
        {
            Model1 entity = new Model1();
            var Datos = (from i in entity.Instructor
                         where i.Cedula == oInstructor.Cedula
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                Usuario oUsuario = new Usuario();
                oUsuario.NombreUsuario = oInstructor.Cedula;
                var Encriptar = SecurityEncode.SecurityEncode.Encriptar(oInstructor.Cedula);
                oUsuario.Password = Encriptar;
                oUsuario.TipoUsuario = (int)TipoUsuario.Instructor;
                entity.Usuario.Add(oUsuario);
                entity.SaveChanges();
                oInstructor.Estado = true;
                oInstructor.IdUsuario = oUsuario.IdUsuario;
                oInstructor.EnvioCorreo = false;
                entity.Instructor.Add(oInstructor);
                entity.SaveChanges();
                //var Asunto = "Nuevo Usuario";
                //var Plantilla = "Usuario : " + oUsuario.NombreUsuario + "<br/> Contraseña: " + oUsuario.NombreUsuario;
                //SendMail.SendMailMessage(Asunto, Plantilla, oInstructor.Email);
                return true;
            }
            else
            {
                return false;
            }

        }

        public List<Programa> ConsultarProgramas()
        {
            var Datos = (from i in entity.Programa
                         where i.Area == "COMPLEMENTARIA VIRTUAL"
                         select i).ToList();
            return Datos;
        }

        public List<Ficha_VComplementaria> ConsultarFichas()
        {
            var Datos2 = (from i in entity.Ficha_VComplementaria
                          select i).ToList();

            foreach (var item in Datos2)
            {
                var fecha = DateTime.Parse(item.Fecha_Fin);
                if(fecha < DateTime.Now)
                {
                    item.Estado = "Finalizada";
                }
                else
                {
                    item.Estado = "Activa";
                }
                entity.SaveChanges();
            }

            var Datos = (from i in entity.Ficha_VComplementaria
                         select i).ToList();

            return Datos;
        }

        public Ficha_VComplementaria gestionFicha(int IdFicha)
        {
            var Datos = (from i in entity.Ficha_VComplementaria
                         where i.Id == IdFicha
                         select i).FirstOrDefault();
            return Datos;
        }

        public bool GuardarFicha(Ficha_VComplementaria objFichaT)
        {
            var Datos = (from i in entity.Ficha_VComplementaria
                         where i.Num_Ficha == objFichaT.Num_Ficha
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Ficha_VComplementaria.Add(objFichaT);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public void GuardarGestionFicha(int id, int reti, int cert, int NoCerti, string certiP)
        {
            var Datos = (from i in entity.Ficha_VComplementaria
                         where i.Id == id
                         select i).FirstOrDefault();
            Datos.Retirados = reti;
            Datos.Aprobados = cert;
            Datos.No_Aprobados = NoCerti;
            Datos.Porc_Certificacion = certiP;
            entity.SaveChanges();
        }

        public Ficha_VComplementaria ModificarFicha(int ficha)
        {
            var Datos = (from i in entity.Ficha_VComplementaria
                         where i.Id == ficha
                         select i).FirstOrDefault();
            return Datos;
        }

        public void GuardarEdicionFicha(Ficha_VComplementaria ficha)
        {
            var Datos = (from i in entity.Ficha_VComplementaria
                         where i.Id == ficha.Id
                         select i).FirstOrDefault();

            Datos.Num_Ficha = ficha.Num_Ficha;
            Datos.Num_Aprendices = ficha.Num_Aprendices;
            Datos.Programa = ficha.Programa;
            Datos.Fecha_Inicio = ficha.Fecha_Inicio;
            Datos.Fecha_Fin = ficha.Fecha_Fin;
            entity.SaveChanges();
        }

        public Ficha_VComplementaria VerFicha(int id)
        {
            var Datos = (from i in entity.Ficha_VComplementaria
                         where i.Id == id
                         select i).FirstOrDefault();

            return Datos;
        }

        public bool GuardarProgramacion(Virtualidad_Complementaria objVT)
        {
            var Datos = (from i in entity.Virtualidad_Complementaria
                         where i.Instructor == objVT.Instructor && i.Ficha == objVT.Ficha && i.Fecha_Inicio == objVT.Fecha_Inicio
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                Instructor_Ficha_VirtualC obj = new Instructor_Ficha_VirtualC();
                obj.Instructor = Convert.ToInt32(objVT.Instructor);
                obj.Ficha = Convert.ToInt32(objVT.Ficha);
                obj.Estado = true;
                entity.Virtualidad_Complementaria.Add(objVT);
                entity.Instructor_Ficha_VirtualC.Add(obj);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Virtualidad_Complementaria> ConsultarProgramacion(int cedula)
        {
            var Datos = (from i in entity.Virtualidad_Complementaria
                         where i.Instructor == cedula.ToString() && i.Estado == true
                         select i).ToList();

            foreach (var item in Datos)
            {
                if (DateTime.Parse(item.Fecha_Fin) < DateTime.Now)
                {
                    item.Estado = false;
                    entity.SaveChanges();
                }
            }

            var Datos2 = (from i in entity.Virtualidad_Complementaria
                         where i.Instructor == cedula.ToString() && i.Estado == true
                         select i).ToList();

            var nombre = (from i in entity.Instructor
                          where i.Cedula == cedula.ToString()
                          select i.Nombre).FirstOrDefault();
            var apellido = (from i in entity.Instructor
                            where i.Cedula == cedula.ToString()
                            select i.Apellido).FirstOrDefault();
            foreach (var item in Datos2)
            {
                var fic = Convert.ToInt32(item.Ficha);
                var ficha = (from i in entity.Ficha_VComplementaria
                             where i.Id == fic
                             select i.Num_Ficha).FirstOrDefault();
                var prog = (from i in entity.Ficha_VComplementaria
                            where i.Id == fic
                            select i.Programa).FirstOrDefault();
                item.Instructor = nombre + " " + apellido;
                item.Ficha = ficha.ToString() + " - " + prog;
            }

            return Datos2;
        }

        public List<Virtualidad_Complementaria> ConsultarProgramacion2(string ficha)
        {
            var Datos = (from i in entity.Virtualidad_Complementaria
                         where i.Ficha == ficha && i.Estado == true
                         select i).ToList();

            foreach (var item in Datos)
            {
                if (DateTime.Parse(item.Fecha_Fin) < DateTime.Now)
                {
                    item.Estado = false;
                    entity.SaveChanges();
                }
            }

            var Datos2 = (from i in entity.Virtualidad_Complementaria
                         where i.Ficha == ficha && i.Estado == true
                         select i).ToList();

            var fic = Convert.ToInt32(ficha);

            var prog = (from i in entity.Ficha_VComplementaria
                        where i.Id == fic
                        select i.Programa).FirstOrDefault();

            var numF = (from i in entity.Ficha_VComplementaria
                        where i.Id == fic
                        select i.Num_Ficha).FirstOrDefault();

            foreach (var item in Datos2)
            {
                var nombre = (from i in entity.Instructor
                              where i.Cedula == item.Instructor
                              select i.Nombre).FirstOrDefault();
                var apellido = (from i in entity.Instructor
                                where i.Cedula == item.Instructor
                                select i.Apellido).FirstOrDefault();
                item.Ficha = numF + " - " + prog;
                item.Instructor = nombre + " " + apellido;
            }

            return Datos2;
        }

        public Virtualidad_Complementaria ConsultarProgramacionId(int id)
        {
            var Datos = (from i in entity.Virtualidad_Complementaria
                         where i.Id == id
                         select i).FirstOrDefault();
            return Datos;
        }

        public void EliminarProgramacion(int id)
        {
            var Datos = (from i in entity.Virtualidad_Complementaria
                         where i.Id == id
                         select i).FirstOrDefault();
            Datos.Estado = false;
            entity.SaveChanges();
        }

        public void GuardarModificacionProgramacion(Virtualidad_Complementaria obj)
        {
            var Datos = (from i in entity.Virtualidad_Complementaria
                         where i.Id == obj.Id
                         select i).FirstOrDefault();

            Datos.Fecha_Inicio = obj.Fecha_Inicio;
            Datos.Fecha_Fin = obj.Fecha_Fin;
            Datos.Hora_Inicio = obj.Hora_Inicio;
            Datos.Hora_Fin = obj.Hora_Fin;
            Datos.Ficha = obj.Ficha;
            Datos.Instructor = obj.Instructor;
            Datos.Dias = obj.Dias;
            entity.SaveChanges();

        }

        public List<Ficha_VComplementaria> VerFichasI(int Cedula)
        {
            List<Ficha_VComplementaria> ListStr = new List<Ficha_VComplementaria>();
            var Datos = (from i in entity.Instructor_Ficha_VirtualC
                         where i.Instructor == Cedula
                         select i).ToList();
            foreach (var item in Datos)
            {
                var Datos2 = (from i in entity.Ficha_VComplementaria
                              where i.Id == item.Ficha
                              select i).FirstOrDefault();
                if (Datos2.Estado == "Finalizada")
                {
                    item.Estado = false;
                    entity.SaveChanges();
                }
                else
                {
                    ListStr.Add(Datos2);
                }
            }
            return ListStr;
        }

        public List<Ficha_VComplementaria> ConsultarFichasActivas()
        {
            var Datos = (from i in entity.Ficha_VComplementaria
                         where i.Estado == "Activa"
                         select i).ToList();
            return Datos;
        }

    }
}
