using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LogicaNegocio.LogicaNegocio;
using Datos.Modelo;
using Datos.DTO;
using ProgramacionAmbientes.Parametros;

namespace ProgramacionAmbientes.Controllers
{
    public class VirtualidadController : ApiController
    {
        Model1 entity = new Model1();        

        [HttpPost]
        public IHttpActionResult GuardarInstructor(Instructor oInstructor)
        {
            try
            {
                VirtualidadBl oInstructorBl = new VirtualidadBl();
                var Instructor = oInstructorBl.GuardarInstructor(oInstructor);
                if (Instructor == true)
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
        public IHttpActionResult GuardarFicha(Ficha_VTitulada objFichaT)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.GuardarFicha(objFichaT);
                if (Datos)
                {
                    return Ok(new { success = true });
                }else
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
        public IHttpActionResult ModificarFicha(Ficha_VTitulada objFichaT)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ModificarFicha(objFichaT.Id);
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarEdicionFicha(Ficha_VTitulada objFichaT) {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                obj.GuardarEdicionFicha(objFichaT);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult AgregarDetalleFichas(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.AgregarDetalleFichas(int.Parse(objP.Parametro1), int.Parse(objP.Parametro2));
                if (Datos)
                {
                    return Ok(new { success = true });
                }else
                {
                    return Ok(new { success = false });
                }
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult VerFichasI(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var datos = obj.VerFichasI(int.Parse(objP.Parametro1));
                return Ok(new { success = true, datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult gestionFicha(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.gestionFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarGestionFicha(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                obj.GuardarGestionFicha(int.Parse(objP.Parametro1), int.Parse(objP.Parametro2), int.Parse(objP.Parametro5), int.Parse(objP.Parametro3), int.Parse(objP.Parametro6), objP.Parametro4);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult VerFicha(ParametrosDTO objP)
        {
            try {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.VerFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult FiltrarAprendiz(Aprendices_Titulada objTipoDocumento)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.FiltrarAprendiz(objTipoDocumento);
                if (Datos != null)
                {
                    return Ok(new { success = true, Datos = Datos});
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
        public IHttpActionResult GuardarProgramacion(Virtualidad_Titulada objVT)
        {
            try {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.GuardarProgramacion(objVT);
                if (Datos)
                {
                    return Ok(new { success = true });
                }else
                {
                    return Ok(new { success = false });
                }
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ConsultarProgramacion(ParametrosDTO objParam)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarProgramacion(int.Parse(objParam.Parametro1));

                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ConsultarProgramacion2(ParametrosDTO objParam)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarProgramacion2(objParam.Parametro1);
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
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarProgramacionId(int.Parse(objParam.Parametro1));
                ParametrosDTO ds = new ParametrosDTO();
                ds.Parametro15 = Datos.Dias.Contains("LUNES") ? "true" : "false";
                ds.Parametro16 = Datos.Dias.Contains("MARTES") ? "true" : "false";
                ds.Parametro17 = Datos.Dias.Contains("MIÉRCOLES") ? "true" : "false";
                ds.Parametro18 = Datos.Dias.Contains("JUEVES") ? "true" : "false";
                ds.Parametro19 = Datos.Dias.Contains("VIERNES") ? "true" : "false";
                ds.Parametro20 = Datos.Dias.Contains("SABADO") ? "true" : "false";
                ds.Parametro21 = Datos.Dias.Contains("DOMINGO") ? "true" : "false";
                return Ok(new { success = true, datos = Datos, ds });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult EliminarProgramacion(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                obj.EliminarProgramacion(int.Parse(objP.Parametro1));
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarModificacionProgramacion(Virtualidad_Titulada objVT)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                obj.GuardarModificacionProgramacion(objVT);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult VerHorasI(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.VerHorasI(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarEdicionContrato(Instructor objI)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                obj.GuardarEdicionContrato(objI);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ContratoRenovar(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                obj.ContratoRenovar(int.Parse(objP.Parametro1));
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult InstructoresFicha(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.InstructoresFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarInstructoresFicha(Instructores_Ficha objIF)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                obj.GuardarInstructoresFicha(objIF);
                return Ok(new { success = true });
            } catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message});
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarHistorial(Instructor objI)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                Historial_Contratos DTO = new Historial_Contratos();
                DTO.Nombre = objI.Nombre;
                DTO.Apellido = objI.Apellido;
                DTO.Num_Contrato = int.Parse(objI.Num_Contrato);
                DTO.Inicio_Contrato = objI.Inicio_Contrato;
                DTO.Fin_Contrato = objI.Fin_Contrato;
                DTO.Adicion = objI.Adicion;
                bool Datos = obj.GuardarHistorial(DTO);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult verHistorialContratos(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.verHistorialContratos(objP.Parametro1, objP.Parametro2);
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAprendiz(Aprendices_Titulada objA)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.GuardarAprendiz(objA);
                if (Datos)
                {
                    return Ok(new { success = true });
                }else
                {
                    return Ok(new { success = false });
                }
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAprendizEdit(Aprendices_Titulada objA)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var datos = obj.GuardarAprendizEdit(objA);
                if (datos)
                {
                    return Ok(new { success = true });
                }else
                {
                    return Ok(new { success = false });
                }
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAprendizEstado(ParametrosDTO objA)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.GuardarAprendizEstado(int.Parse(objA.Parametro1), objA.Parametro2, objA.Parametro3);
                if (Datos)
                {
                    return Ok(new { success = true });
                }else
                {
                    return Ok(new { success = false });
                }
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAprendizFicha(ParametrosDTO objA)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
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

        [HttpPost]
        public IHttpActionResult verAprendices(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.verAprendices(int.Parse(objP.Parametro1));
                if(Datos.Count == 0)
                {
                    return Ok(new { success = false });
                }else
                {
                    return Ok(new { success = true, Datos });
                }
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarInstructores()
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarInstructores();
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpGet]
        public IHttpActionResult ConsultarInstructoresTodos()
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarInstructoresTodos();
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpGet]
        public IHttpActionResult ConsultarFichas()
        {
            try {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarFichas();
                return Ok(new { success = true, datos = Datos });
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
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarProgramas();
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarFichasLectiva()
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarFichasLectiva();
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarFichasNoF()
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var datos = obj.ConsultarFichasNoF();
                return Ok(new { success = true, datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message});
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarAprendices()
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Dat = obj.ConsultarAprendices();
                List<Aprendices_TituladaDTO> Datos = new List<Aprendices_TituladaDTO>();
                foreach (var item in Dat)
                {
                    Aprendices_TituladaDTO objAprend = new Aprendices_TituladaDTO();
                    var Ficha = obj.NumFicha(item.Ficha);
                    var Descripcion = obj.Descripcion(item.Id);
                    objAprend.TipoDocumento = item.TipoDocumento;
                    objAprend.Id = item.Id;
                    objAprend.Documento = item.Documento;
                    objAprend.Nombre = item.Nombre;
                    objAprend.Apellido = item.Apellido;
                    objAprend.Email = item.Email;
                    objAprend.Telefono = item.Telefono;
                    objAprend.Estado = item.Estado;
                    objAprend.Ficha = item.Ficha;
                    objAprend.NumFicha = Ficha;
                    objAprend.Descripcion = Descripcion;
                    Datos.Add(objAprend);
                }
                return Ok(new { success = true, Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAlternativa(Alternativa_Practicas objA)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.GuardarAlternativa(objA);
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
        public IHttpActionResult validarAlternativa(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.validarAlternativa(int.Parse(objP.Parametro1));
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
        public IHttpActionResult ConsultarAlternativa(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarAlternativa(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { succes = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAlternativaEdit(Alternativa_Practicas objA)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                obj.GuardarAlternativaEdit(objA);
                return Ok(new { success = true });
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
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.EstadoFicaAprendiz(int.Parse(objP.Parametro1));
                if (Datos)
                {
                    return Ok(new { success = true });
                }else
                {
                    return Ok(new { success = false });
                }
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult verNovedades(ParametrosDTO objP)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.verNovedades(int.Parse(objP.Parametro1));
                var Datos2 = obj.verNovedades2(objP.Parametro1);
                List<NovedadesDTO> ListNovedades = new List<NovedadesDTO>();
                foreach (var item in Datos)
                {
                    NovedadesDTO objNov = new NovedadesDTO();
                    string nombre = obj.NombreAprendiz(item.Aprendiz);
                    if(item.Nueva_Ficha == "No Aplica")
                    {
                        objNov.NuevaFicha = "";
                    }else
                    {
                        int ficha = obj.FichaNovedad(int.Parse(item.Nueva_Ficha));
                        objNov.NuevaFicha = ", transferido a la ficha "+ficha.ToString();
                    }
                    objNov.Aprendiz = nombre;
                    objNov.Descripcion = item.Descripcion;
                    ListNovedades.Add(objNov);
                }
                if(Datos2.Count > 0)
                {
                    foreach (var item in Datos2)
                    {
                        NovedadesDTO objNov = new NovedadesDTO();
                        string nombre = obj.NombreAprendiz(item.Aprendiz);
                        int ficha = obj.FichaANovedad(item.Ficha);
                        objNov.NuevaFicha = ", recibido de la ficha "+ficha.ToString();
                        objNov.Aprendiz = nombre;
                        objNov.Descripcion = item.Descripcion;
                        ListNovedades.Add(objNov);
                    }
                }
                return Ok(new { success = true, ListNovedades });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }




        [HttpPost]
        public IHttpActionResult ConsultarNumeroContrato(ParametrosDTO objParam)
        {
            try
            {
                VirtualidadBl obj = new VirtualidadBl();
                var Datos = obj.ConsultarNumeroContrato(objParam.Parametro1);
                
                if (Datos != null)
                {
                    return Ok(new { success = true, datos = Datos });
                }else
                {
                    return Ok(new { success = false});
                }
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

    }
}
