using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LogicaNegocio.LogicaNegocio;
using Datos.Modelo;
using ProgramacionAmbientes.Parametros;
using Datos.DTO;

namespace ProgramacionAmbientes.Controllers
{
    public class TecnicaController : ApiController
    {
        Model1 entity = new Model1();

        [HttpPost]
        public IHttpActionResult verDetalleInst(Colegios oCOlegios)
        {
            try
            {
                TecnicaBl oColegioBl = new TecnicaBl();

                var Colegio = oColegioBl.ConsultarColegioId(oCOlegios.Id);

                return Ok(new { success = true, Colegio });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpGet]
        public IHttpActionResult ConsultarInstituciones()
        {
            try
            {
                TecnicaBl oInstructorBl = new TecnicaBl();
                var Datos = oInstructorBl.ConsultarInstituciones();
                return Ok(new { datos = Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarMunicipio()
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ConsultarMunicipios();
                return Ok(new { Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarProgramas()
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ConsultarProgramas();
                return Ok(new { success = true, datos = Datos });
            } catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult CargarProgramasInst()
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.CargarProgramasInst();
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarInstitucion(Colegios ObjColegio)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var datos = obj.GuardarInstitucion(ObjColegio);
                if (datos)
                {
                    return Ok(new { success = true });
                } else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult inhabilitarinstitucion(Colegios ObjColegios)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.inhabilitarinstitucion(ObjColegios.Id);
                return Ok(new { success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult Modificar(Colegios ObjColegio)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.Modificar(ObjColegio.Id);
                if (Datos != null)
                {
                    return Ok(new { success = true, datos = Datos });
                } else
                {
                    return Ok(new { success = false });
                }


            } catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarModificacion(Colegios ObjColegio)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.GuardarModificacion(ObjColegio);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult inhabilitarPrograma(Programa_Tecnica ObjProg)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.inhabilitarPrograma(ObjProg.Id);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ModificarPrograma(Programa_Tecnica ObjProg)
        {
            try {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ModificarPrograma(ObjProg.Id);
                if (Datos != null)
                {
                    return Ok(new { success = true, datos = Datos });
                } else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarEdicionPrograma(Programa_Tecnica ObjProg)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.GuardarEdicionPrograma(ObjProg);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarPrograma(Programa_Tecnica ObjProg)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.GuardarPrograma(ObjProg);
                if (Datos)
                {
                    return Ok(new { success = true });
                } else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult AgregarDetalleProg(ParametrosDTO objParam)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.AgregarDetalleProg(int.Parse(objParam.Parametro1), int.Parse(objParam.Parametro2));
                if (Datos)
                {
                    return Ok(new { success = true });
                } else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult filtrarProgramas(ParametrosDTO objParam)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.filtrarProgramas(int.Parse(objParam.Parametro1));
                if (Datos != null)
                {
                    return Ok(new { success = true, datos = Datos });
                }
                else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult estadoInstProg(ParametrosDTO objPar)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.estadoInstProg(int.Parse(objPar.Parametro1), int.Parse(objPar.Parametro2));
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult CargarDocentePar()
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.CargarDocentePar();
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarDocentePar(Docente_Par ObjDPar)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.GuardarDocentePar(ObjDPar);
                if (Datos)
                {
                    return Ok(new { success = true });
                } else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult FiltrarAprendiz(Aprendices_Tecnica ObjColegio)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.FiltrarAprendiz(ObjColegio);
                if (Datos != null)
                {
                    return Ok(new {success = true, datos = Datos });
                }
                else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }


        [HttpPost]
        public IHttpActionResult Modificar3(Docente_Par ObjDocPar)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.Modificar3(ObjDocPar);
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarEdicionDocentePar(Docente_Par ObjDocPar)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.GuardarEdicionDocentePar(ObjDocPar);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = true, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarInstructores()
        {
            try
            {
                TecnicaBl oInstructorBl = new TecnicaBl();
                var Datos = oInstructorBl.ConsultarInstructores();
                return Ok(new { datos = Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ConsultarIntuctorId(ParametrosDTO ObjParam)
        {
            try {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ConsultarIntuctorId(int.Parse(ObjParam.Parametro1));
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult Modifcar4(Instructor_Tecnica ObjInstruc)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.Modificar4(ObjInstruc.Id);
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarEdicionInstructor(Instructor_Tecnica ObjInstruc)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.GuardarEdicionInstructor(ObjInstruc);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarInstructor(Instructor_Tecnica ObjInst)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.GuardarInstructor2(ObjInst);
                if (Datos)
                {
                    return Ok(new { success = true });
                } else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false });
            }
        }

        [HttpGet]
        public IHttpActionResult CargarInstructoresSENA()
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.CargarInstructoresSENA();
                return Ok(new { success = true, datos = Datos });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ConsultarProgramacion(ParametrosDTO objParam)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ConsultarProgramacion(objParam.Parametro1);
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ConsultarProgramacionId(ParametrosDTO objParam)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                List<MediaTecnicaDTO> ListMedia = new List<MediaTecnicaDTO>();
                var Datos = obj.ConsultarProgramacionId(int.Parse(objParam.Parametro1));

                    MediaTecnicaDTO objM = new MediaTecnicaDTO();
                    var Ficha = obj.FichaMedia(Datos.Ficha);
                    objM.NumAprendices = Ficha.Num_Aprendices;
                    objM.Institucion = (from i in entity.Colegios where i.Id == Ficha.Institucion select i.Nombre_Colegio).FirstOrDefault();
                    objM.Programa = (from i in entity.Programa_Tecnica where i.Id == Ficha.Programa select i.NombrePrograma).FirstOrDefault();
                    ListMedia.Add(objM);
                
                ParametrosDTO ds = new ParametrosDTO();
                ds.Parametro15 = Datos.Dias.Contains("LUNES") ? "true" : "false";
                ds.Parametro16 = Datos.Dias.Contains("MARTES") ? "true" : "false";
                ds.Parametro17 = Datos.Dias.Contains("MIÉRCOLES") ? "true" : "false";
                ds.Parametro18 = Datos.Dias.Contains("JUEVES") ? "true" : "false";
                ds.Parametro19 = Datos.Dias.Contains("VIERNES") ? "true" : "false";
                ds.Parametro20 = Datos.Dias.Contains("SABADO") ? "true" : "false";
                ds.Parametro21 = Datos.Dias.Contains("DOMINGO") ? "true" : "false";
                return Ok(new { success = true, datos = Datos, ds, Lista = ListMedia });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarInstructorMedia()
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ConsultarInstructorMedia();
                return Ok(new { success = true, Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult EliminarProgramacion(ParametrosDTO objParam)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.EliminarProgramacion(int.Parse(objParam.Parametro1));
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarModificacionProgramacion(Media_Tecnica objMedia)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.GuardarModificacionProgramacion(objMedia);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarProgramacion(Media_Tecnica objMedia)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.GuardarProgramacion2(objMedia);
                if (Datos)
                {
                    return Ok(new { success = true });
                } else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ConsultarInstructorNombre(ParametrosDTO objP)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ConsultarInstructorNombre(objP.Parametro1);
                return Ok(new { success = true, Datos });
            }
            catch (Exception exc) {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarLista(ListaChequeoTecnica objL)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.GuardarLista(objL);
                if (Datos) {
                    return Ok(new { success = true });
                } else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ConsultarLista(ParametrosDTO objP)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ConsultarLista(objP.Parametro1);
                if (Datos == null)
                {
                    return Ok(new { success = true, editar = 0 });
                }
                else if (Datos.Estado)
                {
                    return Ok(new { success = true, Datos, editar = 1 });
                }
                else
                {
                    return Ok(new { success = true, Datos, editar = 2 });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAprendiz(Aprendices_Tecnica objA)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.GuardarAprendiz(objA);
                if (Datos)
                {
                    return Ok(new { success = true });
                }
                else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAprendizEdit(Aprendices_Tecnica objA)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var datos = obj.GuardarAprendizEdit(objA);
                if (datos)
                {
                    return Ok(new { success = true });
                }
                else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAprendizEstado(ParametrosDTO objA)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.GuardarAprendizEstado(int.Parse(objA.Parametro1), objA.Parametro2, objA.Parametro3);
                if (Datos)
                {
                    return Ok(new { success = true });
                }
                else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAprendizFicha(ParametrosDTO objA)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.GuardarAprendizFicha(int.Parse(objA.Parametro1), int.Parse(objA.Parametro2), objA.Parametro3);
                if (Datos)
                {
                    return Ok(new { success = true });
                }
                else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarAprendices()
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ConsultarAprendices();
                return Ok(new { success = true, Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarFichas()
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Dat = obj.ConsultarFichas();
                List<Ficha_TecnicaDTO> ListFicha = new List<Ficha_TecnicaDTO>();
                foreach (var item in Dat)
                {
                    Ficha_TecnicaDTO objFT = new Ficha_TecnicaDTO();
                    objFT.Id = item.Id;
                    objFT.Num_Ficha = item.Num_Ficha;
                    objFT.Fecha_Inicio = item.Fecha_Inicio;
                    objFT.Fecha_Fin = item.Fecha_Fin;
                    objFT.Num_Aprendices = item.Num_Aprendices;
                    var Institucion = (from i in entity.Colegios where i.Id == item.Institucion select i.Nombre_Colegio).FirstOrDefault();
                    objFT.Institucion = Institucion;
                    var Programa = (from i in entity.Programa_Tecnica where i.Id == item.Programa select i.NombrePrograma).FirstOrDefault();
                    objFT.Programa = Programa;
                    objFT.Estado = item.Estado;
                    ListFicha.Add(objFT);
                }
                return Ok(new { success = true, Datos = ListFicha });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarFicha(Ficha_Tecnica objT)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.GuardarFicha(objT);
                if (Datos)
                {
                    return Ok(new { success = true });
                } else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ConsultarFichaId(ParametrosDTO objP)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.ConsultarFichaId(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarFichaEdit(Ficha_Tecnica objFT)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.GuardarFichaEdit(objFT);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult inhabilitarFicha(ParametrosDTO objP)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                obj.inhabilitarFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult verAprendices(ParametrosDTO objP)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.verAprendices(int.Parse(objP.Parametro1));
                if (Datos.Count == 0)
                {
                    return Ok(new { success = false });
                }
                else
                {
                    return Ok(new { success = true, Datos });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult EstadoFicaAprendiz(ParametrosDTO objP)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.EstadoFicaAprendiz(int.Parse(objP.Parametro1));
                if (Datos)
                {
                    return Ok(new { success = true });
                }
                else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult verNovedades(ParametrosDTO objP)
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Datos = obj.verNovedades(int.Parse(objP.Parametro1));
                var Datos2 = obj.verNovedades2(objP.Parametro1);
                List<NovedadesDTO> ListNovedades = new List<NovedadesDTO>();
                foreach (var item in Datos)
                {
                    NovedadesDTO objNov = new NovedadesDTO();
                    string nombre = obj.NombreAprendiz(item.Aprendiz);
                    if (item.Nueva_Ficha == "No Aplica")
                    {
                        objNov.NuevaFicha = "";
                    }
                    else
                    {
                        int ficha = obj.FichaNovedad(int.Parse(item.Nueva_Ficha));
                        objNov.NuevaFicha = ", transferido a la ficha " + ficha.ToString();
                    }
                    objNov.Aprendiz = nombre;
                    objNov.Descripcion = item.Descripcion;
                    ListNovedades.Add(objNov);
                }
                if (Datos2.Count > 0)
                {
                    foreach (var item in Datos2)
                    {
                        NovedadesDTO objNov = new NovedadesDTO();
                        string nombre = obj.NombreAprendiz(item.Aprendiz);
                        int ficha = obj.FichaANovedad(item.Ficha);
                        objNov.NuevaFicha = ", recibido de la ficha " + ficha.ToString();
                        objNov.Aprendiz = nombre;
                        objNov.Descripcion = item.Descripcion;
                        ListNovedades.Add(objNov);
                    }
                }
                return Ok(new { success = true, ListNovedades });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarFichasSelect()
        {
            try
            {
                TecnicaBl obj = new TecnicaBl();
                var Dat = obj.ConsultarFichasSelect();
                List<SelectFichaTecnicaDTO> Datos = new List<SelectFichaTecnicaDTO>();
                foreach(var item in Dat)
                {
                    SelectFichaTecnicaDTO objS = new SelectFichaTecnicaDTO();
                    var Programa = obj.NombrePrograma(item.Programa);
                    objS.Id = item.Id;
                    objS.Num_Ficha = item.Num_Ficha;
                    objS.Programa = Programa;
                    Datos.Add(objS);
                }
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        //Función para consultar  el colegio por medio del Id
        [HttpPost]
        public IHttpActionResult ConsultarColegiosId(ParametrosDTO oParametros)
        {
            try
            {
                TecnicaBl objConsultarColegioBl = new TecnicaBl();

                var Datos = objConsultarColegioBl.ConsultarColegiosId(oParametros.Parametro1);

                ColegioDTO Colegios = new ColegioDTO();

                if (Datos != null)
                {
                    return Ok(new { success = true, Datos = Datos });
                }else
                {
                    return Ok(new { success = false, Datos = Datos });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        //Función para consultar  la Ficha por medio del Id
        [HttpPost]
        public IHttpActionResult ConsultarFichaXId(ParametrosDTO oParametros)
        {
            try
            {
                TecnicaBl objConsultarFichaBl = new TecnicaBl();

                var Datos = objConsultarFichaBl.ConsultarFichaXId(Convert.ToInt32(oParametros.Parametro1));

                ColegioDTO Colegios = new ColegioDTO();

                if (Datos != null)
                {
                    return Ok(new { success = true, Datos = Datos });
                }
                else
                {
                    return Ok(new { success = false, Datos = Datos });
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }
    }
}
