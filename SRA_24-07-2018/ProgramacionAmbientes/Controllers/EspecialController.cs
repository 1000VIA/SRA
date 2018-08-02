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
    public class EspecialController : ApiController
    {
        [HttpPost]
        public IHttpActionResult GuardarInstructor(instructor_PEspecial oInstructor)
        {
            try
            {
                EspecialBl oInstructorBl = new EspecialBl();
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
        public IHttpActionResult GuardarModificacionInstructor(instructor_PEspecial objI)
        {
            try
            {
                EspecialBl obj = new EspecialBl();
                obj.GuardarModificacionInstructor(objI);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult CambiarEstado(instructor_PEspecial objI)
        {
            try
            {
                EspecialBl obj = new EspecialBl();
                obj.CambiarEstado(objI);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarEmpresa(Empresa oEmpresa)
        {
            try
            {
                EspecialBl oEmpresaBl = new EspecialBl();
                var Empresa = oEmpresaBl.GuardarEmpresa(oEmpresa);
                if (Empresa == true)
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
        public IHttpActionResult CambiarEstadoEmpresa(List<Empresa> oInstructor)
        {
            try
            {
                EspecialBl oInstructorBl = new EspecialBl();
                foreach (var item in oInstructor)
                {
                    oInstructorBl.CambiarEstadoEmpresa(item);
                }
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpPost]
        public IHttpActionResult ModificarEmpresa(Empresa oInstructor)
        {
            try
            {
                EspecialBl oInstructorBl = new EspecialBl();

                var Instructor = oInstructorBl.ConsultarEmpresa1(oInstructor.NIT);

                return Ok(new { success = true, Instructor });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpPost]
        public IHttpActionResult GuardarModificacionEmpresa(Empresa oInstructor)
        {
            try
            {
                EspecialBl oInstructorBl = new EspecialBl();

                oInstructorBl.ActualizarRegistro(oInstructor);

                return Ok(new { success = true });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpPost]
        public IHttpActionResult GuardarModificacionProgramacion(Poblacion_Especial oPEspecial)
        {
            try
            {
                EspecialBl oInstructorBl = new EspecialBl();

                oInstructorBl.ActualizarRegistroProgramacion(oPEspecial);

                return Ok(new { success = true });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpPost]
        public IHttpActionResult GuardarProgramacion(Poblacion_Especial oPEspecial)
        {
            try
            {
                EspecialBl oProgramacionBl = new EspecialBl();
                var mensaje = oProgramacionBl.GuardarProgramacion(oPEspecial);
                if (mensaje)
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
        public IHttpActionResult BorrarProgramacion(ParametrosDTO oParametrosDTO)
        {
            try
            {
                EspecialBl oFichaBl = new EspecialBl();

                    oFichaBl.InHabilitarProgramacion(int.Parse(oParametrosDTO.Parametro1));

                return Ok(new { success = true });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ModificarProgramacion(ParametrosDTO oPEspecial)
        {
            try
            {
                EspecialBl oInstructorBl = new EspecialBl();

                var Programacion = oInstructorBl.ConsultarProgramacionId(int.Parse(oPEspecial.Parametro1));
                ParametrosDTO ds = new ParametrosDTO();
                ds.Parametro15 = Programacion.Dias.Contains("LUNES") ? "true" : "false";
                ds.Parametro16 = Programacion.Dias.Contains("MARTES") ? "true" : "false";
                ds.Parametro17 = Programacion.Dias.Contains("MIÉRCOLES") ? "true" : "false";
                ds.Parametro18 = Programacion.Dias.Contains("JUEVES") ? "true" : "false";
                ds.Parametro19 = Programacion.Dias.Contains("VIERNES") ? "true" : "false";
                ds.Parametro20 = Programacion.Dias.Contains("SÁBADO") ? "true" : "false";
                return Ok(new { success = true, Programacion, ds });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpPost]
        public IHttpActionResult ConsultarProgramacionInstructor(ParametrosDTO objP)
        {
            try
            {
                Model1 entity = new Model1();
                EspecialBl oInstructorBl = new EspecialBl();
                var Datos = oInstructorBl.ConsultarProgramacionInstructor(int.Parse(objP.Parametro1));
                List<ParametrosDTO> oParametros = new List<ParametrosDTO>();
                foreach (var item in Datos)
                {
                    ParametrosDTO oInstructorDTO = new ParametrosDTO();
                    oInstructorDTO.Parametro1 = item.Id.ToString();
                    oInstructorDTO.Parametro2 = item.Hora_Inicio;
                    oInstructorDTO.Parametro3 = item.Hora_Final;
                    var Ficha = (from i in entity.Ficha
                                 where i.IdFicha == item.Num_Ficha
                                 select i.Ficha1).FirstOrDefault();
                    oInstructorDTO.Parametro4 = Ficha;
                    var Nombre = (from i in entity.Instructor
                                  where i.IdInstructor == item.Instructor
                                  select i.Nombre).FirstOrDefault();
                    var Apellido = (from i in entity.Instructor
                                    where i.IdInstructor == item.Instructor
                                    select i.Apellido).FirstOrDefault();
                    oInstructorDTO.Parametro5 = (Nombre + " " + Apellido);
                    var Empresa = (from i in entity.Empresa
                                   where i.NIT == item.Empresa
                                   select i.Nombre).FirstOrDefault();
                    oInstructorDTO.Parametro6 = Empresa;
                    oInstructorDTO.Parametro7 = item.Dias;
                    oInstructorDTO.Parametro8 = item.Fecha_Inicio;
                    oInstructorDTO.Parametro9 = item.Fecha_Final;

                    oParametros.Add(oInstructorDTO);
                }
                return Ok(new { datos = oParametros, success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ConsultarProgramacionInstructor2(ParametrosDTO objP)
        {
            try
            {
                Model1 entity = new Model1();
                EspecialBl oInstructorBl = new EspecialBl();
                var Datos = oInstructorBl.ConsultarProgramacionInstructor(objP.Parametro1);
                List<ParametrosDTO> oParametros = new List<ParametrosDTO>();
                foreach (var item in Datos)
                {
                    ParametrosDTO oInstructorDTO = new ParametrosDTO();
                    oInstructorDTO.Parametro1 = item.Id.ToString();
                    oInstructorDTO.Parametro2 = item.Hora_Inicio;
                    oInstructorDTO.Parametro3 = item.Hora_Final;
                    var Ficha = (from i in entity.Ficha
                                 where i.IdFicha == item.Num_Ficha
                                 select i.Ficha1).FirstOrDefault();
                    oInstructorDTO.Parametro4 = Ficha;
                    var Nombre = (from i in entity.Instructor
                                  where i.IdInstructor == item.Instructor
                                  select i.Nombre).FirstOrDefault();
                    var Apellido = (from i in entity.Instructor
                                    where i.IdInstructor == item.Instructor
                                    select i.Apellido).FirstOrDefault();
                    oInstructorDTO.Parametro5 = (Nombre + " " + Apellido);
                    var Empresa = (from i in entity.Empresa
                                   where i.NIT == item.Empresa
                                   select i.Nombre).FirstOrDefault();
                    oInstructorDTO.Parametro6 = Empresa;
                    oInstructorDTO.Parametro7 = item.Dias;
                    oInstructorDTO.Parametro8 = item.Fecha_Inicio;
                    oInstructorDTO.Parametro9 = item.Fecha_Final;

                    oParametros.Add(oInstructorDTO);
                }
                return Ok(new { datos = oParametros, success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarFicha(Ficha_PEspecial objF)
        {
            try
            {
                EspecialBl obj = new EspecialBl();
                var Datos = obj.GuardarFicha(objF);
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
        public IHttpActionResult GuardarModificacionFicha(Ficha_PEspecial objF)
        {
            try
            {
                EspecialBl obj = new EspecialBl();
                obj.GuardarModificacionFicha(objF);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ModificarFicha(ParametrosDTO objP)
        {
            try
            {
                EspecialBl obj = new EspecialBl();
                var Ficha = obj.ModificarFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Ficha });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult InHabilitarFicha(ParametrosDTO objP)
        {
            try
            {
                EspecialBl obj = new EspecialBl();
                obj.InHabilitarFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult SelectProgramas()
        {
            try
            {
                EspecialBl oProgramaBl = new EspecialBl();
                var Datos = oProgramaBl.ConsultarProgramas();
                return Ok(new { datos = Datos, success = true });

                //return Ok(new { datos = Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarInstructores()
        {
            try
            {
                EspecialBl oInstructorBl = new EspecialBl();
                var Datos = oInstructorBl.ConsultarInstructores();
                return Ok(new { datos = Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarEmpresas()
        {
            try
            {
                EspecialBl oInstructorBl = new EspecialBl();
                var Datos = oInstructorBl.ConsultarEmpresas();
                return Ok(new { datos = Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarProgramacion()
        {
            try
            {
                Model1 entity = new Model1();
                EspecialBl oInstructorBl = new EspecialBl();
                var Datos = oInstructorBl.ConsultarProgramacion();
                List<ParametrosDTO> oParametros = new List<ParametrosDTO>();
                foreach (var item in Datos)
                {
                    ParametrosDTO oInstructorDTO = new ParametrosDTO();
                    oInstructorDTO.Parametro1 = item.Id.ToString();
                    oInstructorDTO.Parametro2 = item.Hora_Inicio;
                    oInstructorDTO.Parametro3 = item.Hora_Final;
                    var Ficha = (from i in entity.Ficha
                                 where i.IdFicha == item.Num_Ficha
                                 select i.Ficha1).FirstOrDefault();
                    oInstructorDTO.Parametro4 = Ficha;
                    var Nombre = (from i in entity.Instructor
                                  where i.Cedula == item.Instructor.ToString()
                                  select i.Nombre).FirstOrDefault();
                    var Apellido = (from i in entity.Instructor
                                  where i.Cedula == item.Instructor.ToString()
                                  select i.Apellido).FirstOrDefault();
                    oInstructorDTO.Parametro5 = (Nombre+" "+Apellido);
                    var Empresa = (from i in entity.Empresa
                                   where i.NIT == item.Empresa
                                   select i.Nombre).FirstOrDefault();
                    oInstructorDTO.Parametro6 = Empresa;
                    oInstructorDTO.Parametro7 = item.Dias;
                    oInstructorDTO.Parametro8 = item.Fecha_Inicio;
                    oInstructorDTO.Parametro9 = item.Fecha_Final;

                    oParametros.Add(oInstructorDTO);
                }
                return Ok(new { datos = oParametros, success = true });
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
                EspecialBl obj = new EspecialBl();
                var Datos = obj.ConsultarProgramas();

                return Ok(new { success = true, datos = Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { syuccess = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarFichas()
        {
            try {
                EspecialBl obj = new EspecialBl();
                var Datos = obj.ConsultarFichas();
                Model1 model = new Model1();
                List<ParametrosDTO> param = new List<ParametrosDTO>();
                foreach(var item in Datos)
                {
                    ParametrosDTO objP = new ParametrosDTO();
                    objP.Parametro1 = item.Id.ToString();
                    objP.Parametro2 = item.Num_Ficha.ToString();
                    var Prog = (from i in model.Programa
                                where i.IdPrograma == item.Programa
                                select i.NombrePrograma).FirstOrDefault();
                    objP.Parametro3 = Prog;
                    objP.Parametro4 = item.Num_Aprendices.ToString();
                    objP.Parametro5 = item.Fecha_Inicio;
                    objP.Parametro6 = item.Fecha_Fin;
                    objP.Parametro7 = item.Caracterizacion;
                    param.Add(objP);
                }
                return Ok(new { success = true, datos = param });
            }
            catch(Exception exc)
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

    }
}
