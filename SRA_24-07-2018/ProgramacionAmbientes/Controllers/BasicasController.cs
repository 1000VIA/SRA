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
    public class BasicasController : ApiController
    {

        [HttpPost]
        public IHttpActionResult GuardarInstructor(Instructor oInstructor)
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();
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
        public IHttpActionResult GuardarEmpresa(Empresa oEmpresa)
        {
            try
            {
                BasicasBl oEmpresaBl = new BasicasBl();
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
        public IHttpActionResult ModificarEmpresa(Empresa oInstructor)
        {
            try
            {
                BasicasBl oInstructorBl = new BasicasBl();

                var Instructor = oInstructorBl.ConsultarEmpresa1(oInstructor.NIT);

                return Ok(new { success = true, Instructor });
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
                BasicasBl oInstructorBl = new BasicasBl();
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
        public IHttpActionResult GuardarModificacionEmpresa(Empresa oInstructor)
        {
            try
            {
                BasicasBl oInstructorBl = new BasicasBl();

                oInstructorBl.ActualizarRegistro(oInstructor);

                return Ok(new { success = true });
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
                BasicasBl oInstructorBl = new BasicasBl();
                var Datos = oInstructorBl.ConsultarInstructores();
                return Ok(new { datos = Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult SelectProgramas()
        {
            try
            {
                BasicasBl oProgramaBl = new BasicasBl();
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
        public IHttpActionResult ConsultarProgramas()
        {
            try
            {
                BasicasBl oProgramaBl = new BasicasBl();
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
        public IHttpActionResult ConsultarProgramacion()
        {
            try
            {
                Model1 entity = new Model1();
                BasicasBl oInstructorBl = new BasicasBl();
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
                    oInstructorDTO.Parametro5 = (Nombre + " " + Apellido);
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
        public IHttpActionResult GuardarProgramacion(Competencias_Basicas oCBasicas)
        {
            try
            {
                BasicasBl oProgramacionBl = new BasicasBl();
                var mensaje = oProgramacionBl.GuardarProgramacion(oCBasicas);
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
        public IHttpActionResult ModificarProgramacion(ParametrosDTO oPEspecial)
        {
            try
            {
                BasicasBl oInstructorBl = new BasicasBl();

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
                BasicasBl oInstructorBl = new BasicasBl();
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
                                  where i.Cedula == item.Instructor.ToString()
                                  select i.Nombre).FirstOrDefault();
                    var Apellido = (from i in entity.Instructor
                                    where i.Cedula == item.Instructor.ToString()
                                    select i.Apellido).FirstOrDefault();
                    oInstructorDTO.Parametro5 = (Nombre + " " + Apellido);
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
        public IHttpActionResult GuardarModificacionProgramacion(Competencias_Basicas oPEspecial)
        {
            try
            {
                BasicasBl oInstructorBl = new BasicasBl();

                oInstructorBl.ActualizarRegistroProgramacion(oPEspecial);

                return Ok(new { success = true });
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
                BasicasBl oFichaBl = new BasicasBl();
                oFichaBl.InHabilitarProgramacion(int.Parse(oParametrosDTO.Parametro1));

                return Ok(new { success = true });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarInstitucion(Instituciones objInsti) {
            try {
                BasicasBl obj = new BasicasBl();
                var Datos = obj.GuardarInstitucion(objInsti);
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

        [HttpGet]
        public IHttpActionResult ConsultarInstituciones()
        {
            try
            {
                BasicasBl obj = new BasicasBl();
                var Datos = obj.ConsultarInstituciones();
                return Ok(new { success = true, datos = Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarModificacionInstitucion(Instituciones objInst)
        {
            try
            {
                BasicasBl obj = new BasicasBl();
                obj.GuardarModificacionInstitucion(objInst);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult inhabilitarInsti(ParametrosDTO objP)
        {
            try
            {
                BasicasBl obj = new BasicasBl();
                obj.inhabilitarInsti(int.Parse(objP.Parametro1));
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarFichas()
        {
            try
            {
                BasicasBl obj = new BasicasBl();
                var Datos = obj.ConsultarFichas();
                Model1 model = new Model1();
                List<ParametrosDTO> param = new List<ParametrosDTO>();
                foreach (var item in Datos)
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
                    param.Add(objP);
                }
                return Ok(new { success = true, datos = param });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarFicha(Ficha_CBasicas objF)
        {
            try
            {
                BasicasBl obj = new BasicasBl();
                var Datos = obj.GuardarFicha(objF);
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
        public IHttpActionResult GuardarModificacionFicha(Ficha_CBasicas objF)
        {
            try
            {
                BasicasBl obj = new BasicasBl();
                obj.GuardarModificacionFicha(objF);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ModificarFicha(ParametrosDTO objP)
        {
            try
            {
                BasicasBl obj = new BasicasBl();
                var Ficha = obj.ModificarFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Ficha });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult InHabilitarFicha(ParametrosDTO objP)
        {
            try
            {
                BasicasBl obj = new BasicasBl();
                obj.InHabilitarFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

    }
}
