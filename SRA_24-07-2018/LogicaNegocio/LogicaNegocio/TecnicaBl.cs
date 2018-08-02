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
    public class TecnicaBl
    {

        Model1 entity = new Model1();

        public List<ColegioDTO> ConsultarInstituciones()
        {
            var Datos = (from i in entity.Colegios
                         where i.Estado == true
                         orderby i.Nombre_Colegio
                         select i).ToList();

            List<ColegioDTO> ListaInst = new List<ColegioDTO>();
            foreach (var item in Datos)
            {
                ColegioDTO oInstDTO = new ColegioDTO();

                oInstDTO.Id = item.Id;
                oInstDTO.NIT = item.NIT;
                oInstDTO.Codigo_DANE = item.Codigo_DANE;
                oInstDTO.Nombre_Colegio = item.Nombre_Colegio;
                oInstDTO.Direccion = item.Direccion;
                oInstDTO.Correo_Colegio = item.Correo_Colegio;
                oInstDTO.Num_Resolucion = item.Num_Resolucion;
                var Municipio = (from i in entity.Municipio
                                 where i.IdMunicipio == item.Municipio.ToString()
                                 select i.NombreMunicipio).FirstOrDefault();
                oInstDTO.Municipio = Municipio;
                oInstDTO.Tipo = item.Tipo;
                oInstDTO.Categoria = item.Categoria;
                oInstDTO.Nombre_Rector = item.Nombre_Rector;
                oInstDTO.Apellidos_Rector = item.Apellidos_Rector;
                oInstDTO.Telefono_Rector = item.Telefono_Rector;
                oInstDTO.Correo_Rector = item.Correo_Rector;
                oInstDTO.Nombre_Coordinador = item.Nombre_Coordinador;
                oInstDTO.Apellidos_Coordinador = item.Apellidos_Coordinador;
                oInstDTO.Telefono_Coordinador = item.Telefono_Coordinador;
                oInstDTO.Correo_Coordinador = item.Correo_Coordinador;

                ListaInst.Add(oInstDTO);
            }
            return ListaInst;
        }

        public List<ColegioDTO> ConsultarColegioId(int Id)
        {

            var Datos = (from i in entity.Colegios
                         where i.Id == Id && i.Estado == true
                         select i).ToList();

            List<ColegioDTO> ListaInst = new List<ColegioDTO>();
            foreach (var item in Datos)
            {
                ColegioDTO oInstDTO = new ColegioDTO();

                oInstDTO.Id = item.Id;
                oInstDTO.NIT = item.NIT;
                oInstDTO.Codigo_DANE = item.Codigo_DANE;
                oInstDTO.Nombre_Colegio = item.Nombre_Colegio;
                oInstDTO.Direccion = item.Direccion;
                oInstDTO.Correo_Colegio = item.Correo_Colegio;
                oInstDTO.Num_Resolucion = item.Num_Resolucion;
                var Municipio = (from i in entity.Municipio
                                 where i.IdMunicipio == item.Municipio.ToString()
                                 select i.NombreMunicipio).FirstOrDefault();
                oInstDTO.Municipio = Municipio;
                oInstDTO.Tipo = item.Tipo;
                oInstDTO.Categoria = item.Categoria;
                oInstDTO.Nombre_Rector = item.Nombre_Rector;
                oInstDTO.Apellidos_Rector = item.Apellidos_Rector;
                oInstDTO.Telefono_Rector = item.Telefono_Rector;
                oInstDTO.Correo_Rector = item.Correo_Rector;
                oInstDTO.Nombre_Coordinador = item.Nombre_Coordinador;
                oInstDTO.Apellidos_Coordinador = item.Apellidos_Coordinador;
                oInstDTO.Telefono_Coordinador = item.Telefono_Coordinador;
                oInstDTO.Correo_Coordinador = item.Correo_Coordinador;

                ListaInst.Add(oInstDTO);
            }
            return ListaInst;
        }

        public List<Municipio> ConsultarMunicipios()
        {
            var Datos = (from i in entity.Municipio
                         orderby i.NombreMunicipio
                         select i).ToList();
            return Datos;
        }

        public List<Instructor> ConsultarInstructores()
        {
            var Datos = (from i in entity.Instructor
                         where i.Estado == true && i.Area == "MEDIA TÉCNICA"
                         orderby i.Nombre
                         select i).ToList();
            return Datos;
        }

        public bool GuardarInstitucion(Colegios ObjColegio)
        {
            var datos = (from i in entity.Colegios
                         where i.NIT == ObjColegio.NIT
                         select i).FirstOrDefault();

            if (datos == null)
            {
                ObjColegio.Estado = true;
                entity.Colegios.Add(ObjColegio);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public void inhabilitarinstitucion(int Id)
        {
            var Datos = (from i in entity.Colegios
                         where i.Id == Id
                         select i).FirstOrDefault();
            if (Datos.Estado == true)
            {
                Datos.Estado = false;
                entity.SaveChanges();
            }
            else
            {
                Datos.Estado = true;
                entity.SaveChanges();
            }
        }

        public Colegios Modificar(int Id)
        {
            var Datos = (from i in entity.Colegios
                         where i.Id == Id
                         select i).FirstOrDefault();

            return Datos;
        }

        public void GuardarModificacion(Colegios ObjColegio)
        {
            var Item = (from i in entity.Colegios
                        where i.Id == ObjColegio.Id
                        select i).FirstOrDefault();
            Item.NIT = ObjColegio.NIT;
            Item.Codigo_DANE = ObjColegio.Codigo_DANE;
            Item.Nombre_Colegio = ObjColegio.Nombre_Colegio;
            Item.Direccion = ObjColegio.Direccion;
            Item.Correo_Colegio = ObjColegio.Correo_Colegio;
            Item.Num_Resolucion = ObjColegio.Num_Resolucion;
            Item.Municipio = ObjColegio.Municipio;
            Item.Tipo = ObjColegio.Tipo;
            Item.Categoria = ObjColegio.Categoria;
            Item.Nombre_Rector = ObjColegio.Nombre_Rector;
            Item.Apellidos_Rector = ObjColegio.Apellidos_Rector;
            Item.Telefono_Rector = ObjColegio.Telefono_Rector;
            Item.Correo_Rector = ObjColegio.Correo_Rector;
            Item.Nombre_Coordinador = ObjColegio.Nombre_Coordinador;
            Item.Apellidos_Coordinador = ObjColegio.Apellidos_Coordinador;
            Item.Telefono_Coordinador = ObjColegio.Telefono_Coordinador;
            Item.Correo_Coordinador = ObjColegio.Correo_Coordinador;
            entity.SaveChanges();
        }

        public List<Programa> ConsultarProgramas()
        {
            var Datos = (from i in entity.Programa
                         where i.Area == "MEDIA TÉCNICA"
                         orderby i.NombrePrograma
                         select i).ToList();
            return Datos;
        }

        public void inhabilitarPrograma(int Id)
        {
            var Datos = (from i in entity.Programa_Tecnica
                         where i.Id == Id
                         select i).FirstOrDefault();

            if (Datos.Estado == true)
            {
                Datos.Estado = false;
                entity.SaveChanges();
            }
            else
            {
                Datos.Estado = true;
                entity.SaveChanges();
            }
        }

        public Programa_Tecnica ModificarPrograma(int Id)
        {
            var Datos = (from i in entity.Programa_Tecnica
                         where i.Id == Id
                         select i).FirstOrDefault();
            return Datos;
        }

        public void GuardarEdicionPrograma(Programa_Tecnica ObjProg)
        {
            var Datos = (from i in entity.Programa_Tecnica
                         where i.Id == ObjProg.Id
                         select i).FirstOrDefault();

            if (Datos != null)
            {
                Datos.Codigo_Programa = ObjProg.Codigo_Programa;
                Datos.Red_Tecnologica = ObjProg.Red_Tecnologica;
                Datos.NombrePrograma = ObjProg.NombrePrograma;
                Datos.Version_Programa = ObjProg.Version_Programa;
                entity.SaveChanges();
            }
        }

        public bool GuardarPrograma(Programa_Tecnica ObjProg)
        {
            var Datos = (from i in entity.Programa_Tecnica
                         where i.Codigo_Programa == ObjProg.Codigo_Programa
                         select i).FirstOrDefault();
            if (Datos != null)
            {
                entity.Programa_Tecnica.Add(ObjProg);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool AgregarDetalleProg(int idProg, int idInst)
        {

            var Datos = (from i in entity.Institucion_Programa
                         where i.Id_Programa == idProg && i.Id_Institucion == idInst
                         select i).FirstOrDefault();

            if (Datos == null)
            {
                Institucion_Programa oInstDTO = new Institucion_Programa();
                oInstDTO.Id_Programa = idProg;
                oInstDTO.Id_Institucion = idInst;
                oInstDTO.Estado = true;
                entity.Institucion_Programa.Add(oInstDTO);
                entity.SaveChanges();
                return true;
            }
            else
            {
                var Est = (from i in entity.Institucion_Programa
                           where i.Id_Programa == idProg && i.Id_Institucion == idInst
                           select i.Estado).FirstOrDefault();

                if (Est == false)
                {
                    Datos.Estado = true;
                    entity.SaveChanges();
                    return true;
                }
                else
                {
                    return true;
                }
            }

        }

        public List<Institucion_ProgramaDTO> filtrarProgramas(int IdInst)
        {

            List<Institucion_ProgramaDTO> ListaProg = new List<Institucion_ProgramaDTO>();

            var Datos = (from i in entity.Institucion_Programa
                         where i.Id_Institucion == IdInst
                         select i).ToList();
            foreach (var item in Datos)
            {
                Institucion_ProgramaDTO ObjProg = new Institucion_ProgramaDTO();
                var Datos2 = (from i in entity.Programa_Tecnica
                              where i.Id == item.Id_Programa
                              select i).FirstOrDefault();
                ObjProg.IdInst = IdInst;
                ObjProg.Id_Programa = item.Id_Programa;
                ObjProg.Codigo_Programa = Datos2.Codigo_Programa;
                ObjProg.NombrePrograma = Datos2.NombrePrograma;
                ObjProg.Estado = item.Estado;
                ListaProg.Add(ObjProg);

            }

            return ListaProg;
        }
        /*Función que permite Filtrar los aprendices  Autor: 1000Via*/
        public List<Aprendices_TituladaDTO> FiltrarAprendiz(Aprendices_Tecnica oColegio)
        {

            List<Aprendices_TituladaDTO> oAprendizDto = new List<Aprendices_TituladaDTO>();
            

            var Institucion = Convert.ToInt32(oColegio.Colegios);
            var Ficha = oColegio.Ficha;
            var Estado = oColegio.Estado;
            List<Aprendices_Tecnica> stringArray = new List<Aprendices_Tecnica>();

            if (Institucion != 0 && Ficha == 0 && (Estado == null || Estado == "")) //consulta sólo  por institución
            {
                var Datos = (from i in entity.Aprendices_Tecnica
                             where i.Colegios == Institucion
                             select i).ToList();

                    stringArray = Datos;
                

            }
            else
            {
                if (Ficha != 0 && Institucion == 0 && (Estado == null || Estado == "")) //consulta sólo  ficha
                {
                    var Datos = (from i in entity.Aprendices_Tecnica
                                 where i.Ficha == Ficha
                                 select i).ToList();

                        stringArray = Datos;
                    
                }
                else
                {
                    if ((Estado != null|| Estado != "") && Institucion == 0 && Ficha == 0) //consulta sólo  Estado
                    {

                        var Datos = (from i in entity.Aprendices_Tecnica
                                     where i.Estado == Estado
                                     select i).ToList();

                        
                            stringArray = Datos;
                        
                    }
                    else
                    { 
                        if (Institucion != 0 && Ficha != 0 && (Estado == null || Estado == "")) //consulta por institucion y ficha
                        {
                            var Datos = (from i in entity.Aprendices_Tecnica
                                         where i.Colegios == Institucion && i.Ficha == Ficha
                                         select i).ToList();

                            stringArray = Datos;
                        }
                        else
                        {
                            if (Institucion != 0 && Ficha == 0 && (Estado != null || Estado != "")) //consulta por institucion y Estado
                            {
                                var Datos = (from i in entity.Aprendices_Tecnica
                                             where i.Colegios == Institucion && i.Estado == Estado
                                             select i).ToList();

                                stringArray = Datos;
                            }
                            else
                            {
                                if (Institucion == 0 && (Estado != null || Estado != "") && Ficha != 0) //consulta por Ficha y Estado
                                {
                                    var Datos = (from i in entity.Aprendices_Tecnica
                                                 where i.Ficha == Ficha &&  i.Estado == Estado
                                                 select i).ToList();

                                    stringArray = Datos;
                                }
                                else
                                {
                                    if (Institucion != 0 && Ficha != 0 && (Estado != null || Estado != "")) //consulta por Institución, ficha y estado.
                                    {
                                        var Datos = (from i in entity.Aprendices_Tecnica
                                                     where i.Colegios == Institucion && i.Ficha == Ficha && i.Estado == Estado
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

                var Descripcion = (from e in entity.Novedades_Tecnica
                                   where e.Aprendiz == item.Id
                                   select e.Descripcion).FirstOrDefault();


                var Num_Ficha = (from a in entity.Ficha_Tecnica
                                 where a.Id == item.Ficha
                                 select a.Num_Ficha).FirstOrDefault();

                var Nombre_Colegio = (from x in entity.Colegios
                                      where x.Id == item.Colegios
                                      select x.Nombre_Colegio).FirstOrDefault();

                var id = item.Colegios;

                var colegio = (from e in entity.Colegios
                               where e.Id == id
                               select e.Nombre_Colegio).FirstOrDefault();

                var Fichas = item.Ficha;
                var fichaId = (from x in entity.Ficha_Tecnica
                               where x.Id == Fichas
                               select x.Num_Ficha).FirstOrDefault();

                oAprendiz.Id = item.Id;
                oAprendiz.Documento = item.Documento;
                oAprendiz.Nombre = item.Nombre;
                oAprendiz.Apellido = item.Apellido;
                oAprendiz.Email = item.Email;
                oAprendiz.Telefono = item.Telefono;
                oAprendiz.Estado = item.Estado;
                oAprendiz.NumFicha = fichaId;
                oAprendiz.TipoDocumento = item.TipoDocumento;
                oAprendiz.NomAcudiente = item.NombreAcudiente;
                oAprendiz.TelefonoAcud = item.TelAcudiente; 
                oAprendiz.Direccion = item.Direccion;
                oAprendiz.Nombre_Colegio = colegio;
                oAprendiz.Descripcion = Descripcion;
                oAprendiz.Ficha = Num_Ficha;
                oAprendiz.Institucion = Nombre_Colegio;

                oAprendizDto.Add(oAprendiz);
            }

            return oAprendizDto;

        }



        public void estadoInstProg(int IdProg, int IdInst)
        {
            var Datos = (from i in entity.Institucion_Programa
                         where i.Id_Programa == IdProg && i.Id_Institucion == IdInst
                         select i).FirstOrDefault();
            if (Datos.Estado == false)
            {
                Datos.Estado = true;
                entity.SaveChanges();
            }
            else
            {
                Datos.Estado = false;
                entity.SaveChanges();
            }

        }

        public List<Docente_ParDTO> CargarDocentePar()
        {
            var Datos = (from i in entity.Docente_Par
                         select i).ToList();

            List<Docente_ParDTO> ListDocPar = new List<Docente_ParDTO>();

            foreach (var item in Datos)
            {
                Docente_ParDTO objDocPar = new Docente_ParDTO();
                objDocPar.Id = item.Id;
                objDocPar.Telefono = item.Telefono;
                objDocPar.Nombres = item.Nombres;
                objDocPar.Apellidos = item.Apellidos;
                objDocPar.Email = item.Email;

                var Institucion = (from i in entity.Colegios
                                   where i.Id == item.Id_Institucion
                                   select i.Nombre_Colegio).FirstOrDefault();
                objDocPar.Institucion = Institucion;

                var Programa = (from i in entity.Programa_Tecnica
                                where i.Id == item.Id_Programa
                                select i.NombrePrograma).FirstOrDefault();
                objDocPar.Programa = Programa;
                ListDocPar.Add(objDocPar);
            }
            return ListDocPar;
        }

        public bool GuardarDocentePar(Docente_Par ObjDPar)
        {
            var Datos = (from i in entity.Docente_Par
                         where i.Id == ObjDPar.Id
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Docente_Par.Add(ObjDPar);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Programa_Tecnica> CargarProgramasInst()
        {
            var Datos = (from i in entity.Programa_Tecnica
                         select i).ToList();

            return Datos;
        }

        public Docente_Par Modificar3(Docente_Par ObjDocPar)
        {
            var Datos = (from i in entity.Docente_Par
                         where i.Id == ObjDocPar.Id
                         select i).FirstOrDefault();

            return Datos;

        }

        public void GuardarEdicionDocentePar(Docente_Par ObjDocPar)
        {
            var Datos = (from i in entity.Docente_Par
                         where i.Id == ObjDocPar.Id
                         select i).FirstOrDefault();

            Datos.Telefono = ObjDocPar.Telefono;
            Datos.Nombres = ObjDocPar.Nombres;
            Datos.Apellidos = ObjDocPar.Apellidos;
            Datos.Email = ObjDocPar.Email;
            Datos.Id_Institucion = ObjDocPar.Id_Institucion;
            Datos.Id_Programa = ObjDocPar.Id_Programa;
            entity.SaveChanges();
        }

        public bool GuardarInstructor(List<Instructor_Tecnica> ListInstruc)
        {
            foreach (var item in ListInstruc)
            {
                if (item.Cedula != null && item.Cedula != "CÉDULA")
                {
                    var Datos = (from i in entity.Instructor_Tecnica
                                 where i.Cedula == item.Cedula
                                 select i).FirstOrDefault();
                    if (Datos == null)
                    {
                        entity.Instructor_Tecnica.Add(item);
                        entity.SaveChanges();
                    }
                }
            }
            return true;
        }

        public Instructor_Tecnica ConsultarIntuctorId(int id)
        {
            var Datos = (from i in entity.Instructor_Tecnica
                         where i.Id == id
                         select i).FirstOrDefault();
            return Datos;
        }

        public Instructor_Tecnica Modificar4(int Id)
        {
            var Datos = (from i in entity.Instructor_Tecnica
                         where i.Id == Id
                         select i).FirstOrDefault();
            return Datos;
        }

        public void GuardarEdicionInstructor(Instructor_Tecnica ObjInstruc)
        {
            var Datos = (from i in entity.Instructor_Tecnica
                         where i.Id == ObjInstruc.Id
                         select i).FirstOrDefault();

            Datos.Cedula = ObjInstruc.Cedula;
            Datos.Nombres = ObjInstruc.Nombres;
            Datos.Apellidos = ObjInstruc.Apellidos;
            Datos.Correo_Misena = ObjInstruc.Correo_Misena;
            Datos.Correo_Alternativo = ObjInstruc.Correo_Alternativo;
            Datos.Municipio = ObjInstruc.Municipio;
            Datos.Telefono_Fijo = ObjInstruc.Telefono_Fijo;
            Datos.Celular = ObjInstruc.Celular;
            Datos.Area = ObjInstruc.Area;
            Datos.Profesion = ObjInstruc.Profesion;
            Datos.Programa_Formacion = ObjInstruc.Programa_Formacion;
            entity.SaveChanges();
        }

        public bool GuardarInstructor2(Instructor_Tecnica ObjInst)
        {
            var Datos = (from i in entity.Instructor_Tecnica
                         where i.Cedula == ObjInst.Cedula
                         select i).FirstOrDefault();

            if (Datos == null)
            {
                entity.Instructor_Tecnica.Add(ObjInst);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public void GuardarProgramacion(Media_Tecnica objMT)
        {
            var Datos = (from i in entity.Media_Tecnica
                         where i.Ficha == objMT.Ficha
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Media_Tecnica.Add(objMT);
                entity.SaveChanges();
            }
        }

        public List<Media_Tecnica> ConsultarProgramacion(string nombre)
        {
            //var nom = (from i in entity.Media_Tecnica
            //           select i.Instructor).ToList().Distinct();

            //var ult = "";

            //var result = "";
            //foreach (var item in nom)
            //{
            //    var cadena1 = "";
            //    var cadena2 = "";
            //    for (var i = 0; i<item.Length;i++)
            //    {
            //        string c = item.Substring(i, 1);
            //        if (c.ToUpper().Contains("Á"))
            //        {
            //            c = c.Replace(c, "A");
            //        }
            //        if (c.ToUpper().Contains("É"))
            //        {
            //            c = c.Replace(c, "E");
            //        }
            //        if (c.ToUpper().Contains("Í"))
            //        {
            //            c = c.Replace(c, "I");
            //        }
            //        if (c.ToUpper().Contains("Ó"))
            //        {
            //            c = c.Replace(c, "O");
            //        }
            //        if (c.ToUpper().Contains("Ú"))
            //        {
            //            c = c.Replace(c, "U");
            //        }
            //        cadena1 += c;
            //    }
            //    for (var i2 = 0; i2 < nombre.Length; i2++)
            //    {
            //        string c = nombre.Substring(i2, 1);
            //        if (c.ToUpper().Contains("Á"))
            //        {
            //            c = c.Replace(c, "A");
            //        }
            //        if (c.ToUpper().Contains("É"))
            //        {
            //            c = c.Replace(c, "E");
            //        }
            //        if (c.ToUpper().Contains("Í"))
            //        {
            //            c = c.Replace(c, "I");
            //        }
            //        if (c.ToUpper().Contains("Ó"))
            //        {
            //            c = c.Replace(c, "O");
            //        }
            //        if (c.ToUpper().Contains("Ú"))
            //        {
            //            c = c.Replace(c, "U");
            //        }
            //        cadena2 += c;
            //    }

            //    var part = cadena1.Split(' ');

            //    if (part.Length == 2)
            //    {
            //        var rpt = cadena2.Contains(part[0]);
            //        var rpt2 = cadena2.Contains(part[1]);
            //        if (rpt == true && rpt2 == true)
            //        {
            //            result = "SI";
            //        }else
            //        {
            //            result = "NO";
            //        }
            //    }else
            //    {
            //        var res = cadena2.Contains(part[0]);
            //        var res2 = cadena2.Contains(part[1]);
            //        var res3 = cadena2.Contains(part[2]);
            //        if (res == true && res2 == true && res3 == true)
            //        {
            //            result = "SI";
            //        }
            //        else
            //        {
            //            result = "NO";
            //        }
            //    }

            //    if (result == "SI")
            //    {
            //        ult = item;
            //        break;
            //    }

            //}


            var Datos = (from i in entity.Media_Tecnica
                         where i.Instructor == nombre //ult
                         select i).ToList();

            return Datos;
        }

        public List<Instructor> CargarInstructoresSENA()
        {
            var Datos = (from i in entity.Instructor
                         where i.Estado == true && i.Area == "MEDIA TÉCNICA"
                         orderby i.Nombre
                         select i).ToList();
            return Datos;
        }

        public Media_Tecnica ConsultarProgramacionId(int id)
        {
            var Datos = (from i in entity.Media_Tecnica
                         where i.Id == id
                         select i).FirstOrDefault();
            return Datos;
        }

        public List<string> ConsultarInstructorMedia()
        {
            List<string> ListStr = new List<string>();
            var Datos = (from i in entity.Instructor
                         select i).ToList().Distinct();
            foreach (var item in Datos)
            {
                string Nombre = item.Nombre + " " + item.Apellido;
                ListStr.Add(Nombre);
            }
            return ListStr;
        }

        public void EliminarProgramacion(int id)
        {
            var Datos = (from i in entity.Media_Tecnica
                         where i.Id == id
                         select i).FirstOrDefault();
            entity.Media_Tecnica.Remove(Datos);
            entity.SaveChanges();
        }

        public void GuardarModificacionProgramacion(Media_Tecnica objMedia)
        {
            var Datos = (from i in entity.Media_Tecnica
                         where i.Id == objMedia.Id
                         select i).FirstOrDefault();
         
            Datos.Hora_Inicio = objMedia.Hora_Inicio;
            Datos.Hora_Fin = objMedia.Hora_Fin;
            Datos.Grado = objMedia.Grado;
            Datos.Ficha = objMedia.Ficha;
            Datos.Instructor = objMedia.Instructor;
            Datos.Dias = objMedia.Dias;
            entity.SaveChanges();
        }

        public bool GuardarProgramacion2(Media_Tecnica objMedia)
        {
            var Datos = (from i in entity.Media_Tecnica
                         where i.Ficha == objMedia.Ficha && i.Hora_Inicio == objMedia.Hora_Inicio && i.Instructor == objMedia.Instructor
                         select i).FirstOrDefault();

            if (Datos == null)
            {
                entity.Media_Tecnica.Add(objMedia);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public Instructor_Tecnica ConsultarInstructorNombre(string nombre)
        {
            Instructor_Tecnica obj = new Instructor_Tecnica();
            var Datos = (from i in entity.Instructor_Tecnica
                         select i).ToList();
            foreach (var item in Datos)
            {
                var nom = item.Nombres + " " + item.Apellidos;
                if (nom == nombre)
                {
                    obj = item;
                    break;
                }
            }
            return obj;
        }

        public bool GuardarLista(ListaChequeoTecnica obj)
        {
            var Datos = (from i in entity.ListaChequeoTecnica
                         where i.Institucion == obj.Institucion
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.ListaChequeoTecnica.Add(obj);
                entity.SaveChanges();
                return true;
            }
            else if (Datos.Estado == false)
            {
                return false;
            }
            else
            {
                Datos.Observaciones = obj.Observaciones;
                Datos.Criterio1 = obj.Criterio1;
                Datos.Criterio2 = obj.Criterio2;
                Datos.Criterio3 = obj.Criterio3;
                Datos.Criterio4 = obj.Criterio4;
                Datos.Criterio5 = obj.Criterio5;
                Datos.Criterio6 = obj.Criterio6;
                Datos.Criterio7 = obj.Criterio7;
                Datos.Criterio8 = obj.Criterio8;
                Datos.Criterio9 = obj.Criterio9;
                Datos.Criterio10 = obj.Criterio10;
                Datos.Criterio11 = obj.Criterio11;
                Datos.Criterio12 = obj.Criterio12;
                Datos.Criterio13 = obj.Criterio13;
                Datos.Criterio14 = obj.Criterio14;
                entity.SaveChanges();
                return true;
            }
        }

        public ListaChequeoTecnica ConsultarLista(string Inst)
        {
            var Datos = (from i in entity.ListaChequeoTecnica
                         where i.Institucion == Inst
                         select i).FirstOrDefault();
            return Datos;
        }

        public List<Aprendices_TituladaDTO> ConsultarAprendices()
        {
            List<Aprendices_TituladaDTO> oAprendizPara = new List<Aprendices_TituladaDTO>();
            string[] vector = new string[0];
            var Datos = (from i in entity.Aprendices_Tecnica
                         select i).ToList();

            foreach (var item in Datos)
            {
                Aprendices_TituladaDTO oAprendiz = new Aprendices_TituladaDTO();

                var Descripcion = (from e in entity.Novedades_Tecnica
                                   where e.Aprendiz == item.Id
                                   select e.Descripcion).FirstOrDefault();


                var Num_Ficha = (from a in entity.Ficha_Tecnica
                                 where a.Id == item.Ficha
                                 select a.Num_Ficha).FirstOrDefault();

                var Nombre_Colegio = (from x in entity.Colegios
                                where x.Id == item.Colegios
                                select x.Nombre_Colegio).FirstOrDefault();
                             



                oAprendiz.Id = item.Id;
                oAprendiz.Institucion = Nombre_Colegio;
                //oAprendiz.Colegios = Institucion;
                oAprendiz.TipoDocumento = item.TipoDocumento;
                oAprendiz.Documento = item.Documento;
                oAprendiz.Nombre = item.Nombre;
                oAprendiz.Apellido = item.Apellido;
                oAprendiz.Email = item.Email;
                oAprendiz.Telefono = item.Telefono;
                oAprendiz.Ficha = Num_Ficha;
                oAprendiz.Estado = item.Estado;
                oAprendiz.Descripcion = Descripcion;
                oAprendiz.NomAcudiente = item.NombreAcudiente;
                oAprendiz.Direccion = item.Direccion;
                oAprendiz.TelefonoAcud = item.TelAcudiente;
                oAprendizPara.Add(oAprendiz);

            }

            return oAprendizPara;
        }

        //public void CambiarEstado(Novedades_Tecnica oAprendiz)
        //{
        //    Model1 entity = new Model1();
        //    var Item = (from i in entity.Novedades_Tecnica
        //                where i.Id == oAprendiz.Id
        //                select i).First();
        //    if (Item.Estado == true)
        //    {
        //        Item.Estado = false;
        //        entity.SaveChanges();
        //    }
        //    else
        //    {
        //        Item.Estado = true;
        //        entity.SaveChanges();
        //    }
        //}


        public bool GuardarAprendiz(Aprendices_Tecnica obj)
        {
            var Datos = (from i in entity.Aprendices_Tecnica
                         where i.Documento == obj.Documento
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Aprendices_Tecnica.Add(obj);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        //Subir archivos APRENDIZ  Autor: 1000Via
        public bool  GuardarAprendiz1(Aprendices_TituladaDTO obj)
        {
            //Función para consultar el documento del Aprendiz  Autor: 1000Via
            var Datos = (from i in entity.Aprendices_Tecnica
                         where i.Documento == obj.Documento
                         select i).FirstOrDefault();

            //Función para consultar el  número de la ficha del aprendiz por medio del Id  Autor: 1000Via
            var Numero = Convert.ToInt32(obj.NumeroFicha);

            var NumeroFicha = (from x in entity.Ficha_Tecnica
                               where x.Num_Ficha == Numero
                         select x).FirstOrDefault();

            //Función para consultar el colegio del aprendiz por medio del Id del colegio  Autor: 1000Via
            var Colegio = (from j in entity.Colegios
                           where j.Nombre_Colegio == obj.Colegios
                           select j).FirstOrDefault();

            if (Datos == null)
            {
                Aprendices_Tecnica oAprendiz = new Aprendices_Tecnica();
                oAprendiz.Nombre = obj.Nombre;
                oAprendiz.Apellido = obj.Apellido;
                oAprendiz.TipoDocumento = obj.TipoDocumento;
                oAprendiz.Documento = obj.Documento;
                oAprendiz.Grado = obj.Grado;
                oAprendiz.Email = obj.Email;
                oAprendiz.Telefono = obj.Telefono;
                oAprendiz.Direccion = obj.Direccion;
                oAprendiz.NombreAcudiente = obj.NombreAcudiente;
                oAprendiz.TelAcudiente = obj.TelAcudiente;
                oAprendiz.Ficha = NumeroFicha.Id;
                oAprendiz.Colegios = Colegio.Id;
                oAprendiz.Estado = "";
                entity.Aprendices_Tecnica.Add(oAprendiz);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }

        }

        public bool GuardarAprendizEdit(Aprendices_Tecnica obj)
        {
           


            var Datos = (from i in entity.Aprendices_Tecnica
                         where i.Id == obj.Id
                         select i).FirstOrDefault();

            if (obj.Documento == Datos.Documento)
            {
                Datos.TipoDocumento = obj.TipoDocumento;
                Datos.Ficha = obj.Ficha;
                Datos.Colegios = obj.Colegios;
                Datos.Documento = obj.Documento;
                Datos.Nombre = obj.Nombre;
                Datos.Apellido = obj.Apellido;
                Datos.Email = obj.Email;
                Datos.Telefono = obj.Telefono;
                Datos.NombreAcudiente = obj.NombreAcudiente;
                Datos.TelAcudiente = obj.TelAcudiente;
                Datos.Direccion = obj.Direccion;
                Datos.Estado = obj.Estado;
                
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
                    Datos.TipoDocumento = obj.TipoDocumento;
                    Datos.Ficha = obj.Ficha;
                    Datos.Colegios = obj.Colegios;
                    Datos.Documento = obj.Documento;
                    Datos.Nombre = obj.Nombre;
                    Datos.Apellido = obj.Apellido;
                    Datos.Email = obj.Email;
                    Datos.Telefono = obj.Telefono;
                    Datos.NombreAcudiente = obj.NombreAcudiente;
                    Datos.TelAcudiente = obj.TelAcudiente;
                    Datos.Direccion = obj.Direccion;
                    Datos.Estado = obj.Estado;

                    entity.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public bool GuardarAprendizEstado(int Id, string Estado, string Descrip)
        {
            Model1 entity = new Model1();
            var Item = (from i in entity.Aprendices_Tecnica
                        where i.Id == Id
                        select i).First();

            var Itm1 = (from e in entity.Novedades_Tecnica
                        where e.Aprendiz == Id
                        select e).FirstOrDefault();

            if (Itm1 == null)
            {
                Novedades_Tecnica oNovedadesTecnica = new Novedades_Tecnica();

                oNovedadesTecnica.Ficha = Item.Ficha;
                oNovedadesTecnica.Aprendiz = Id;
                oNovedadesTecnica.Descripcion = Descrip;
                oNovedadesTecnica.Nueva_Ficha = "No Aplica";
                entity.Novedades_Tecnica.Add(oNovedadesTecnica);
                entity.SaveChanges();
                return true;

            }
            else
            {
                if (Item.Estado == Estado)
                {
                    return false;
                }
                else
                {

                    var Itm2 = (from x in entity.Novedades_Tecnica
                                where x.Aprendiz == Id
                                select x).First();

                    Item.Estado = Estado;
                    Itm2.Descripcion = Descrip;
                    entity.SaveChanges();
                    return true;
                }
            }

            
           



            //var Datos = (from i in entity.Aprendices_Tecnica
            //             where i.Id == Id
            //             select i).FirstOrDefault();
            //if (Datos.Estado == Estado)
            //{
            //    return false;
            //}
            //else
            //{
            //    var Datos2 = (from i in entity.Ficha_Tecnica
            //                  where i.Id == Datos.Ficha
            //                  select i).FirstOrDefault();

            //    Novedades_Tecnica objN = new Novedades_Tecnica();
            //    objN.Aprendiz = Id;
            //    objN.Ficha = Datos.Ficha;
            //    objN.Descripcion = Descrip;
            //    objN.Nueva_Ficha = "No Aplica";
            //    Datos.Estado = Estado;
            //    entity.Novedades_Tecnica.Add(objN);
            //    entity.SaveChanges();
            //    return true;
            //}
        }

        public bool GuardarAprendizFicha(int Id, int Ficha, string Descrip)
        {
            var Datos = (from i in entity.Aprendices_Tecnica
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
                Novedades_Tecnica objN = new Novedades_Tecnica();
                objN.Aprendiz = Id;
                objN.Ficha = Datos.Ficha;
                objN.Descripcion = Descrip;
                objN.Nueva_Ficha = Ficha.ToString();
                Datos.Ficha = Ficha;
                entity.Novedades_Tecnica.Add(objN);
                entity.SaveChanges();
                return true;
            }
        }

        public List<Ficha_Tecnica> ConsultarFichas()
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         where i.Estado == "Activa"
                         select i).ToList();
            return Datos;
        }

        public bool GuardarFicha(Ficha_Tecnica obj)
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         where i.Num_Ficha == obj.Num_Ficha
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Ficha_Tecnica.Add(obj);
                entity.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public Ficha_Tecnica ConsultarFichaId(int IdFicha)
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         where i.Id == IdFicha
                         select i).FirstOrDefault();
            return Datos;
        }

        public void GuardarFichaEdit(Ficha_Tecnica obj)
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         where i.Id == obj.Id
                         select i).FirstOrDefault();
            Datos.Fecha_Inicio = obj.Fecha_Inicio;
            Datos.Fecha_Fin = obj.Fecha_Fin;
            Datos.Num_Aprendices = obj.Num_Aprendices;
            Datos.Institucion = obj.Institucion;
            Datos.Programa = obj.Programa;
            entity.SaveChanges();
        }

        public void inhabilitarFicha(int Id)
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         where i.Id == Id
                         select i).FirstOrDefault();
            if (Datos.Estado == "Activa")
            {
                Datos.Estado = "Inactiva";
            }
            else
            {
                Datos.Estado = "Activa";
            }
            entity.SaveChanges();
        }

        public List<Aprendices_Tecnica> verAprendices(int id)
        {
            var Datos = (from i in entity.Aprendices_Tecnica
                         where i.Ficha == id
                         select i).ToList();
            return Datos;
        }

        public bool EstadoFicaAprendiz(int IdFicha)
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         where i.Id == IdFicha
                         select i).FirstOrDefault();
            if (Datos.Estado == "Activa")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Novedades_Tecnica> verNovedades(int IdFicha)
        {
            var Datos = (from i in entity.Novedades_Tecnica
                         where i.Ficha == IdFicha
                         select i).ToList();
            return Datos;
        }

        public List<Novedades_Tecnica> verNovedades2(string IdFicha)
        {
            var Datos = (from i in entity.Novedades_Tecnica
                         where i.Nueva_Ficha == IdFicha
                         select i).ToList();
            return Datos;
        }

        public string NombreAprendiz(int aprendiz)
        {
            var Datos = (from i in entity.Aprendices_Tecnica
                         where i.Id == aprendiz
                         select i).FirstOrDefault();
            var Nombre = Datos.Nombre + " " + Datos.Apellido;
            return Nombre;
        }

        public int FichaNovedad(int id)
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         where i.Id == id
                         select i.Num_Ficha).FirstOrDefault();
            return Datos;
        }

        public int FichaANovedad(int Ficha)
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         where i.Id == Ficha
                         select i.Num_Ficha).FirstOrDefault();
            return Datos;
        }

        public List<Ficha_Tecnica> ConsultarFichasSelect()
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         select i).ToList();
            return Datos;
        }

        public string NombrePrograma(int id)
        {
            var Programa = (from i in entity.Programa_Tecnica
                            where i.Id == id
                            select i.NombrePrograma).FirstOrDefault();
            return Programa;
        }

        public Ficha_Tecnica FichaMedia(int Ficha)
        {
            var Datos = (from i in entity.Ficha_Tecnica
                         where i.Num_Ficha == Ficha
                         select i).FirstOrDefault();

            return Datos;
        }
        //Consulta que permite buscar los colegios por medio del Id.
        public Colegios ConsultarColegiosId(string NombreColegio)
        {
            var Colegio = (from e in entity.Colegios
                           where e.Nombre_Colegio == NombreColegio
                           select e).FirstOrDefault();

            return Colegio;
        }
        //Consulta que permite buscar las fichas por medio del Id.
        public Ficha_Tecnica ConsultarFichaXId(int NumFicha)
        {
            var FichaId = (from e in entity.Ficha_Tecnica
                           where e.Num_Ficha == NumFicha 
                           select e).FirstOrDefault();

            return FichaId;
        }

        //Consultar Aprendices
        public Aprendices_Tecnica AprendizCedula(string cedula)
        {
            var Datos = (from i in entity.Aprendices_Tecnica
                         where i.Documento == cedula
                         select i).FirstOrDefault();
            return Datos;
        }


    }
}
