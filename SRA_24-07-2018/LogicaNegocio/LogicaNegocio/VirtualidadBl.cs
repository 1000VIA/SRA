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
    public class VirtualidadBl
    {

        Model1 entity = new Model1();

        public List<Instructor> ConsultarInstructores()
        {
            var Datos = (from i in entity.Instructor
                         where i.Estado == true && i.Area == "TITULADA VIRTUAL"
                         orderby i.Nombre
                         select i).ToList();

            return Datos;

        }

        public List<Instructor> ConsultarInstructoresTodos()
        {
            var Datos = (from i in entity.Instructor
                         where i.Estado == true
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

            var AreaPE = (from x in entity.Instructor
                          where x.Area == oInstructor.Area
                          select x).FirstOrDefault();

            var EstadoInstructor = (from i in entity.Instructor
                                    where i.Estado == oInstructor.Estado
                                    select i).FirstOrDefault();

            if (Datos == null)
            {
                if ((TipoUsuario.PoblacionE == TipoUsuario.PoblacionE) && (AreaPE.Area == "POBLACION ESPECIAL") && (EstadoInstructor.Estado == true))
                {
                    Usuario oUsuarioE = new Usuario();
                    oUsuarioE.NombreUsuario = oInstructor.Cedula;
                    var Encriptar1 = SecurityEncode.SecurityEncode.Encriptar(oInstructor.Cedula);
                    oUsuarioE.Password = Encriptar1;
                    oUsuarioE.TipoUsuario = (int)TipoUsuario.PoblacionE;
                    oUsuarioE.Correo = oInstructor.Email;
                    entity.Usuario.Add(oUsuarioE);
                    entity.SaveChanges();
                    oInstructor.Estado = true;
                    oInstructor.IdUsuario = oUsuarioE.IdUsuario;
                    oInstructor.EnvioCorreo = false;
                    entity.Instructor.Add(oInstructor);
                    entity.SaveChanges();
                }
                else
                {
                    if ((TipoUsuario.Basicas == TipoUsuario.Basicas) && (AreaPE.Area == "COMPETENCIAS BÁSICAS"))
                    {
                        Usuario oUsuarioB = new Usuario();
                        oUsuarioB.NombreUsuario = oInstructor.Cedula;
                        var Encriptar1 = SecurityEncode.SecurityEncode.Encriptar(oInstructor.Cedula);
                        oUsuarioB.Password = Encriptar1;
                        oUsuarioB.TipoUsuario = (int)TipoUsuario.Basicas;
                        oUsuarioB.Correo = oInstructor.Email;
                        entity.Usuario.Add(oUsuarioB);
                        entity.SaveChanges();
                        oInstructor.Estado = true;
                        oInstructor.IdUsuario = oUsuarioB.IdUsuario;
                        oInstructor.EnvioCorreo = false;
                        entity.Instructor.Add(oInstructor);
                        entity.SaveChanges();
                    }
                    else
                    {
                        if ((TipoUsuario.Titulada == TipoUsuario.Titulada) && (AreaPE.Area == "TITULADA VIRTUAL"))
                        {
                            Usuario oUsuarioTV = new Usuario();
                            oUsuarioTV.NombreUsuario = oInstructor.Cedula;
                            var Encriptar1 = SecurityEncode.SecurityEncode.Encriptar(oInstructor.Cedula);
                            oUsuarioTV.Password = Encriptar1;
                            oUsuarioTV.TipoUsuario = (int)TipoUsuario.Titulada;
                            oUsuarioTV.Correo = oInstructor.Email;
                            entity.Usuario.Add(oUsuarioTV);
                            entity.SaveChanges();
                            oInstructor.Estado = true;
                            oInstructor.IdUsuario = oUsuarioTV.IdUsuario;
                            oInstructor.EnvioCorreo = false;
                            entity.Instructor.Add(oInstructor);
                            entity.SaveChanges();
                        }
                        else
                        {
                            if ((TipoUsuario.Complementaria == TipoUsuario.Complementaria) && (AreaPE.Area == "COMPLEMENTARIA VIRTUAL"))
                            {
                                Usuario oUsuarioCV = new Usuario();
                                oUsuarioCV.NombreUsuario = oInstructor.Cedula;
                                var Encriptar1 = SecurityEncode.SecurityEncode.Encriptar(oInstructor.Cedula);
                                oUsuarioCV.Password = Encriptar1;
                                oUsuarioCV.TipoUsuario = (int)TipoUsuario.Complementaria;
                                oUsuarioCV.Correo = oInstructor.Email;
                                entity.Usuario.Add(oUsuarioCV);
                                entity.SaveChanges();
                                oInstructor.Estado = true;
                                oInstructor.IdUsuario = oUsuarioCV.IdUsuario;
                                oInstructor.EnvioCorreo = false;
                                entity.Instructor.Add(oInstructor);
                                entity.SaveChanges();
                            }
                            else
                            {
                                Usuario oUsuario = new Usuario();
                                oUsuario.NombreUsuario = oInstructor.Cedula;
                                var Encriptar = SecurityEncode.SecurityEncode.Encriptar(oInstructor.Cedula);
                                oUsuario.Password = Encriptar;
                                oUsuario.TipoUsuario = (int)TipoUsuario.Instructor;
                                oUsuario.Correo = oInstructor.Email;
                                entity.Usuario.Add(oUsuario);
                                entity.SaveChanges();
                                oInstructor.Estado = true;
                                oInstructor.IdUsuario = oUsuario.IdUsuario;
                                oInstructor.EnvioCorreo = false;
                                entity.Instructor.Add(oInstructor);
                                entity.SaveChanges();
                            }
                        }
                    }
                }              

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

        public Instructor InstructorCedula(string cedula)
        {
            var Datos = (from i in entity.Instructor
                         where i.Cedula == cedula
                         select i).FirstOrDefault();
            return Datos;
        }
        public Instructor AprendizCedula(string cedula)
        {
            var Datos = (from i in entity.Instructor
                         where i.Cedula == cedula
                         select i).FirstOrDefault();
            return Datos;
        }

        public bool GuardarFicha(Ficha_VTitulada objFichaT)
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Num_Ficha == objFichaT.Num_Ficha
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Ficha_VTitulada.Add(objFichaT);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Ficha_VTitulada> ConsultarFichas()
        {
            var Datos2 = (from i in entity.Ficha_VTitulada
                          select i).ToList();

            foreach (var item in Datos2)
            {
                var fecha = DateTime.Parse(item.Inicio_Productiva);
                var fecha2 = DateTime.Parse(item.Fin_Productiva);
                if (fecha2 < DateTime.Now)
                {
                    item.Etapa = "Finalizada";
                    entity.SaveChanges();
                }
                else if (fecha < DateTime.Now)
                {
                    item.Etapa = "Productiva";
                    entity.SaveChanges();
                }
                else
                {
                    item.Etapa = "Lectiva";
                    entity.SaveChanges();
                }
            }

            var Datos = (from i in entity.Ficha_VTitulada
                         select i).ToList();

            return Datos;
        }

        public Ficha_VTitulada ModificarFicha(int ficha)
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Id == ficha
                         select i).FirstOrDefault();
            return Datos;
        }

        public void GuardarEdicionFicha(Ficha_VTitulada ficha)
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Id == ficha.Id
                         select i).FirstOrDefault();

            Datos.Num_Ficha = ficha.Num_Ficha;
            Datos.Num_Aprendices = ficha.Num_Aprendices;
            Datos.Programa = ficha.Programa;
            Datos.Inicio_Lectiva = ficha.Inicio_Lectiva;
            Datos.Inicio_Productiva = ficha.Inicio_Productiva;
            Datos.Fin_Productiva = ficha.Fin_Productiva;
            entity.SaveChanges();
        }

        public List<Programa> ConsultarProgramas()
        {
            var Datos = (from i in entity.Programa
                         where i.Area == "TITULADA VIRTUAL"
                         select i).ToList();
            return Datos;
        }

        public List<Ficha_VTitulada> ConsultarFichasLectiva()
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Etapa != "Finalizada"
                         select i).ToList();
            return Datos;
        }

        public bool AgregarDetalleFichas(int Ficha, int Instruc)
        {
            var Datos = (from i in entity.Instructor_Ficha_VirtualT
                         where i.Ficha == Ficha && i.Instructor == Instruc
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                Instructor_Ficha_VirtualT obj = new Instructor_Ficha_VirtualT();
                obj.Instructor = Instruc;
                obj.Ficha = Ficha;
                obj.Estado = true;
                entity.Instructor_Ficha_VirtualT.Add(obj);
                entity.SaveChanges();
            }
            return true;
        }

        public List<Ficha_VTitulada> VerFichasI(int Cedula)
        {
            List<Ficha_VTitulada> ListStr = new List<Ficha_VTitulada>();
            var Datos = (from i in entity.Instructor_Ficha_VirtualT
                         where i.Instructor == Cedula
                         select i).ToList();
            foreach (var item in Datos)
            {
                var Datos2 = (from i in entity.Ficha_VTitulada
                              where i.Id == item.Ficha
                              select i).FirstOrDefault();
                if (Datos2.Etapa == "Finalizada")
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

        public Ficha_VTitulada gestionFicha(int IdFicha)
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Id == IdFicha
                         select i).FirstOrDefault();
            return Datos;
        }

        public void GuardarGestionFicha(int id, int reti, int cance, int cert, int cambio, string certiP)
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Id == id
                         select i).FirstOrDefault();
            Datos.Num_Retirados = reti;
            Datos.Num_Cancelados = cance;
            Datos.Num_Certificados = cert;
            Datos.Porc_Certificacion = certiP;
            Datos.Cambio_Ficha = cambio;
            entity.SaveChanges();
        }

        public Ficha_VTitulada VerFicha(int id)
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Id == id
                         select i).FirstOrDefault();

            return Datos;
        }


        /*Función que permite Filtrar los aprendices*/
        public List<Aprendices_TituladaDTO> FiltrarAprendiz(Aprendices_Titulada oTipodocumento)
        {

            List<Aprendices_TituladaDTO> oAprendizDto = new List<Aprendices_TituladaDTO>();


            var TipoDocumento = oTipodocumento.TipoDocumento;
            var Ficha = oTipodocumento.Ficha;
            var Estado = oTipodocumento.Estado;

            List<Aprendices_Titulada> stringArray = new List<Aprendices_Titulada>();

            if ((TipoDocumento != null || TipoDocumento == "") && Ficha == 0 && (Estado == null || Estado == "")) //consulta sólo  por Documento de identidad
            {
                var Datos = (from i in entity.Aprendices_Titulada
                             where i.TipoDocumento == TipoDocumento
                             select i).ToList();

                stringArray = Datos;


            }
            else
            {
                if (Ficha != 0 && (TipoDocumento == null || TipoDocumento == "") && (Estado == null || Estado == "")) //consulta sólo  ficha
                {
                    var Datos = (from i in entity.Aprendices_Titulada
                                 where i.Ficha == Ficha
                                 select i).ToList();

                    stringArray = Datos;

                }
                else
                {

                    if ((Estado != null || Estado != "") && (TipoDocumento == null || TipoDocumento == "") && Ficha == 0) //consulta sólo  Estado
                    {

                        var Datos = (from i in entity.Aprendices_Titulada
                                     where i.Estado == Estado
                                     select i).ToList();


                        stringArray = Datos;

                    }
                    else
                    {
                        if ((TipoDocumento != null || TipoDocumento != "") && Ficha != 0 && (Estado == null || Estado == "")) //consulta por TipoDocumento y ficha
                        {
                            var Datos = (from i in entity.Aprendices_Titulada
                                         where i.TipoDocumento == TipoDocumento && i.Ficha == Ficha
                                         select i).ToList();

                            stringArray = Datos;
                        }
                        else
                        {
                            if ((TipoDocumento != null || TipoDocumento != "") && Ficha == 0 && (Estado != null || Estado != "")) //consulta por TipoDocumento y Estado
                            {
                                var Datos = (from i in entity.Aprendices_Titulada
                                             where i.TipoDocumento == TipoDocumento && i.Estado == Estado
                                             select i).ToList();

                                stringArray = Datos;
                            }
                            else
                            {
                                if ((TipoDocumento == null || TipoDocumento == "") && (Estado != null || Estado != "") && Ficha != 0) //consulta por Ficha y Estado
                                {
                                    var Datos = (from i in entity.Aprendices_Titulada
                                                 where i.Ficha == Ficha && i.Estado == Estado
                                                 select i).ToList();

                                    stringArray = Datos;
                                }
                                else
                                {
                                    if ((TipoDocumento != null || TipoDocumento == "") && Ficha != 0 && (Estado != null || Estado != ""))//consulta por TipoDocumento, ficha y estado.
                                    {
                                        var Datos = (from i in entity.Aprendices_Titulada
                                                     where i.TipoDocumento == TipoDocumento && i.Ficha == Ficha && i.Estado == Estado
                                                     select i).ToList();

                                        stringArray = Datos;
                                    }
                                }
                            }

                        }
                    }
                }
            }


            foreach (var item in stringArray)
            {
                Aprendices_TituladaDTO oAprendiz = new Aprendices_TituladaDTO();

                var id = item.TipoDocumento;

                var Documento = (from e in entity.Aprendices_Titulada
                                 where e.Documento == item.TipoDocumento
                                 select e.TipoDocumento).FirstOrDefault();

                var Num_Ficha = (from a in entity.Aprendices_Titulada
                                 where a.Id == item.Ficha
                                 select a.Ficha).FirstOrDefault();


                var Fichas = item.Ficha;
                var fichaId = (from x in entity.Ficha_VTitulada
                               where x.Id == Fichas
                               select x.Num_Ficha).FirstOrDefault();

                oAprendiz.Id = item.Id;
                oAprendiz.NumFicha = Convert.ToInt32(fichaId);
                oAprendiz.TipoDocumento = item.TipoDocumento;
                oAprendiz.Documento = item.Documento;
                oAprendiz.Nombre = item.Nombre;
                oAprendiz.Apellido = item.Apellido;
                oAprendiz.Email = item.Email;
                oAprendiz.Telefono = item.Telefono;
                oAprendiz.Estado = item.Estado;
                oAprendiz.Descripcion = item.Estado;
                oAprendiz.Ficha = Convert.ToInt32(Num_Ficha);

                oAprendizDto.Add(oAprendiz);
            }

            return oAprendizDto;

        }


        public bool GuardarProgramacion(Virtualidad_Titulada objVT)
        {
            var Datos = (from i in entity.Virtualidad_Titulada
                         where i.Instructor == objVT.Instructor && i.Ficha == objVT.Ficha && i.Fecha_Inicio == objVT.Fecha_Inicio
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                Instructor_Ficha_VirtualT obj = new Instructor_Ficha_VirtualT();
                obj.Instructor = Convert.ToInt32(objVT.Instructor);
                obj.Ficha = Convert.ToInt32(objVT.Ficha);
                obj.Estado = true;
                entity.Virtualidad_Titulada.Add(objVT);
                entity.Instructor_Ficha_VirtualT.Add(obj);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Virtualidad_Titulada> ConsultarProgramacion(int cedula)
        {
            var Datos = (from i in entity.Virtualidad_Titulada
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

            var Datos2 = (from i in entity.Virtualidad_Titulada
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
                var ficha = (from i in entity.Ficha_VTitulada
                             where i.Id == fic
                             select i.Num_Ficha).FirstOrDefault();
                var prog = (from i in entity.Ficha_VTitulada
                            where i.Id == fic
                            select i.Programa).FirstOrDefault();
                item.Instructor = nombre + " " + apellido;
                item.Ficha = ficha.ToString() + " - " + prog;
            }

            return Datos2;
        }

        public List<Virtualidad_Titulada> ConsultarProgramacion2(string ficha)
        {
            var Datos = (from i in entity.Virtualidad_Titulada
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

            var Datos2 = (from i in entity.Virtualidad_Titulada
                          where i.Ficha == ficha && i.Estado == true
                          select i).ToList();

            var fic = Convert.ToInt32(ficha);

            var prog = (from i in entity.Ficha_VTitulada
                        where i.Id == fic
                        select i.Programa).FirstOrDefault();

            var numF = (from i in entity.Ficha_VTitulada
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

        public Virtualidad_Titulada ConsultarProgramacionId(int id)
        {
            Model1 entity = new Model1();
            var Datos = (from i in entity.Virtualidad_Titulada
                         where i.Id == id
                         select i).FirstOrDefault();
            return Datos;
        }

        public void EliminarProgramacion(int id)
        {
            var Datos = (from i in entity.Virtualidad_Titulada
                         where i.Id == id
                         select i).FirstOrDefault();
            Datos.Estado = false;
            entity.SaveChanges();
        }

        public void GuardarModificacionProgramacion(Virtualidad_Titulada obj)
        {
            var Datos = (from i in entity.Virtualidad_Titulada
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

        public List<Virtualidad_Titulada> VerHorasI(int Cedula)
        {
            var fecha = DateTime.Now.ToShortDateString().Split('/');
            var año = fecha[2];

            var ensayo = entity.Virtualidad_Titulada.Where(item => item.Fecha_Inicio.Contains(año) && item.Instructor == Cedula.ToString()).ToList();

            return ensayo;
        }

        public List<Ficha_VTitulada> ConsultarFichasNoF()
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Etapa == "Lectiva"
                         select i).ToList();
            return Datos;
        }

        public void GuardarEdicionContrato(Instructor obj)
        {
            var Datos = (from i in entity.Instructor
                         where i.IdInstructor == obj.IdInstructor
                         select i).FirstOrDefault();

            if (Datos.Num_Contrato == "")
            {
                Datos.Num_Contrato = obj.Num_Contrato;
                Datos.Inicio_Contrato = obj.Inicio_Contrato;
                Datos.Fin_Contrato = obj.Fin_Contrato;
            }
            else
            {
                Datos.Adicion = obj.Adicion;
            }
            entity.SaveChanges();
        }

        public void ContratoRenovar(int id)
        {
            var Datos = (from i in entity.Instructor
                         where i.IdInstructor == id
                         select i).FirstOrDefault();
            Datos.Num_Contrato = "";
            Datos.Inicio_Contrato = "";
            Datos.Fin_Contrato = "";
            Datos.Adicion = "";
            entity.SaveChanges();
        }

        public Instructores_Ficha InstructoresFicha(int id)
        {
            var Datos = (from i in entity.Instructores_Ficha
                         where i.Id_Ficha == id
                         select i).FirstOrDefault();
            return Datos;
        }

        public void GuardarInstructoresFicha(Instructores_Ficha obj)
        {
            var Datos = (from i in entity.Instructores_Ficha
                         where i.Id_Ficha == obj.Id_Ficha
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Instructores_Ficha.Add(obj);
            }
            else
            {
                Datos.Lider = obj.Lider;
                Datos.Tecnico = obj.Tecnico;
                Datos.Emprendimiento = obj.Emprendimiento;
                Datos.Salud_Ocupacional = obj.Salud_Ocupacional;
                Datos.Cultura_Fisica = obj.Cultura_Fisica;
                Datos.Medio_Ambiente = obj.Medio_Ambiente;
                Datos.Etica = obj.Etica;
                Datos.Comunicacion = obj.Comunicacion;
                Datos.Ingles = obj.Ingles;
                Datos.TIC = obj.TIC;
            }
            entity.SaveChanges();
        }

        public bool GuardarHistorial(Historial_Contratos obj)
        {
            entity.Historial_Contratos.Add(obj);
            entity.SaveChanges();
            return true;
        }

        public List<Historial_Contratos> verHistorialContratos(string nombre, string apellido)
        {
            var Datos = (from i in entity.Historial_Contratos
                         where i.Nombre == nombre && i.Apellido == apellido
                         select i).ToList();
            return Datos;
        }

        public List<Aprendices_Titulada> ConsultarAprendices()   //Revisar Con Brayan
        {

            var Datos = (from i in entity.Aprendices_Titulada
                         select i).ToList();

            foreach (var item in Datos)
            {
                Aprendices_TituladaDTO objAprendiz = new Aprendices_TituladaDTO();
                var Id = item.Ficha;
                var NumFi = (from i in entity.Ficha_VTitulada
                             where i.Id == Id
                             select i.Num_Ficha).FirstOrDefault();

                objAprendiz.Id = item.Id;
                objAprendiz.NumFicha = NumFi;
                objAprendiz.TipoDocumento = item.TipoDocumento;
                objAprendiz.Documento = item.Documento;
                objAprendiz.Nombre = item.Nombre;

            }

            return Datos;
        }

        public bool GuardarAprendiz(Aprendices_Titulada obj)
        {
            var Datos = (from i in entity.Aprendices_Titulada
                         where i.Documento == obj.Documento
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Aprendices_Titulada.Add(obj);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool GuardarAprendizEdit(Aprendices_Titulada obj)
        {
            var Datos = (from i in entity.Aprendices_Titulada
                         where i.Id == obj.Id
                         select i).FirstOrDefault();
            if (obj.Documento == Datos.Documento)
            {
                Datos.Nombre = obj.Nombre;
                Datos.Apellido = obj.Apellido;
                Datos.Email = obj.Email;
                Datos.Telefono = obj.Telefono;
                Datos.Ficha = obj.Ficha;
                Datos.TipoDocumento = obj.TipoDocumento;
                entity.SaveChanges();
                return true;
            }
            else
            {
                var newDoc = (from i in entity.Aprendices_Titulada
                              where i.Documento == obj.Documento
                              select i).FirstOrDefault();
                if (newDoc == null)
                {
                    Datos.Documento = obj.Documento;
                    Datos.Nombre = obj.Nombre;
                    Datos.Apellido = obj.Apellido;
                    Datos.Email = obj.Email;
                    Datos.Telefono = obj.Telefono;
                    entity.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }


        public bool GuardarAprendizEstado(int Id, string Estado, string Descripcion)
        {
            Novedades objN = new Novedades();
            var Datos = (from i in entity.Aprendices_Titulada
                         where i.Id == Id
                         select i).FirstOrDefault();

            var Datos1 = (from i in entity.Ficha_VTitulada
                          where i.Id == Datos.Ficha
                          select i).FirstOrDefault();

            if (Datos1 != null)
            {
                objN.Aprendiz = Id;
                objN.Ficha = Datos.Ficha;
                objN.Descripcion = Descripcion;
                objN.Nueva_Ficha = "No Aplica";
                entity.Novedades.Add(objN);
                entity.SaveChanges();
                return true;
            }
            else
            {
                if (Datos.Estado == Estado)
                {
                    return false;
                }
                else
                {
                    var Datos2 = (from i in entity.Novedades
                                  where i.Aprendiz == Id
                                  select i).First();

                    Datos.Estado = Estado;
                    Datos2.Descripcion = Descripcion;
                    entity.SaveChanges();
                    return true;
                }

            }
        }

        public bool GuardarAprendizFicha(int Id, int Ficha, string Descrip)
        {
            var Datos = (from i in entity.Aprendices_Titulada
                         where i.Id == Id
                         select i).FirstOrDefault();
            if (Datos.Ficha == Ficha)
            {
                return false;
            }
            else
            {
                var Datos2 = (from i in entity.Ficha_VTitulada
                              where i.Id == Datos.Ficha
                              select i).FirstOrDefault();
                Novedades objN = new Novedades();
                objN.Aprendiz = Id;
                objN.Ficha = Datos.Ficha;
                objN.Descripcion = Descrip;
                objN.Nueva_Ficha = Ficha.ToString();
                Datos.Ficha = Ficha;
                entity.Novedades.Add(objN);
                entity.SaveChanges();
                return true;
            }
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
            if (Datos == null)
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

        public bool EstadoFicaAprendiz(int IdFicha)
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Id == IdFicha
                         select i).FirstOrDefault();
            if (Datos.Etapa == "Lectiva")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Novedades> verNovedades(int IdFicha)
        {
            var Datos = (from i in entity.Novedades
                         where i.Ficha == IdFicha
                         select i).ToList();
            return Datos;
        }

        public List<Novedades> verNovedades2(string IdFicha)
        {
            var Datos = (from i in entity.Novedades
                         where i.Nueva_Ficha == IdFicha
                         select i).ToList();
            return Datos;
        }

        public string NombreAprendiz(int aprendiz)
        {
            var Datos = (from i in entity.Aprendices_Titulada
                         where i.Id == aprendiz
                         select i).FirstOrDefault();
            var Nombre = Datos.Nombre + " " + Datos.Apellido;
            return Nombre;
        }

        public int FichaNovedad(int id)
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Id == id
                         select i.Num_Ficha).FirstOrDefault();
            return Datos;
        }

        public int FichaANovedad(int Ficha)
        {
            var Datos = (from i in entity.Ficha_VTitulada
                         where i.Id == Ficha
                         select i.Num_Ficha).FirstOrDefault();
            return Datos;
        }

        public int NumFicha(int id)
        {
            var NumFicha = (from i in entity.Ficha_VTitulada
                            where i.Id == id
                            select i.Num_Ficha).FirstOrDefault();
            return NumFicha;
        }

        public string Descripcion(int id)
        {
            var Descripcion = (from e in entity.Novedades_Tecnica
                               where e.Aprendiz == id
                               select e.Descripcion).FirstOrDefault();

            return Descripcion;
        }


        public Instructor ConsultarNumeroContrato(string numContrato)
        {

            var Datos = (from i in entity.Instructor
                         where i.Num_Contrato == numContrato
                         select i).FirstOrDefault();

            if (Datos == null)
            {
                return Datos;
            }
            else
            {
                return Datos;
            }


        }

    }
}
