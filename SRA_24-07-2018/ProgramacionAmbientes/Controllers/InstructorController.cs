namespace ProgramacionAmbientes.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Http;
    using LogicaNegocio.LogicaNegocio;
    using Datos.Modelo;
    using ProgramacionAmbientes.Parametros;

    public class InstructorController : ApiController
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
        public IHttpActionResult ConsultarInstructores()
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();
                var Datos = oInstructorBl.ConsultarInstructores();
                return Ok(new { datos = Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarInhabilitados()
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();
                var Datos = oInstructorBl.ConsultarInhabilitados();
                return Ok(new { datos = Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult CambiarEstado(List<Instructor> oInstructor)
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();
                foreach (var item in oInstructor)
                {
                    oInstructorBl.CambiarEstado(item);
                }
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }

        public IHttpActionResult HabilitarInstructor(List<Instructor> oInstructor)
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();
                foreach (var item in oInstructor)
                {
                    oInstructorBl.CambiarEstado(item);
                }
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpPost]

        public IHttpActionResult consultarCedula(string cedula)
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();

                oInstructorBl.ConsultarInstructorCedula(cedula);

                return Ok(new { success = true });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }

        [HttpPost]

        public IHttpActionResult ModificarInstructor(Instructor oInstructor)
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();
                int tipo = 0;
                var Instructor = oInstructorBl.ConsultarInstructorCedula1(oInstructor.Cedula);

                if (Instructor.TipoContrato == "CONTRATISTA")
                {
                    tipo = 1;
                }

                return Ok(new { success = true, Instructor, tipo });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }


        [HttpPost]

        public IHttpActionResult GuardarModificacionInstructor(Instructor oInstructor)
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();

                oInstructorBl.ActualizarRegistro(oInstructor);

                return Ok(new { success = true });
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
                ProgramaBl oProgramaBl = new ProgramaBl();
                var Programas = oProgramaBl.ConsultarProgramas();
                return Ok(new { success = true, datos = Programas });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult ReporteDeProgramacionInstructores(ParametrosDTO oParametrosDTO)
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();
                var Datos = oInstructorBl.ReporteDeProgramacionInstructores(int.Parse(oParametrosDTO.Parametro1), DateTime.Parse(oParametrosDTO.Parametro2), DateTime.Parse(oParametrosDTO.Parametro3));
                var Horas = oInstructorBl.ReporteHorasInstructores(int.Parse(oParametrosDTO.Parametro1), DateTime.Parse(oParametrosDTO.Parametro2), DateTime.Parse(oParametrosDTO.Parametro3));
                return Ok(new { success = true, datos = Datos, Horas });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }
        }

 


        [HttpPost]
        public IHttpActionResult EnviarProgramacionInstructor(ParametrosDTO oParametrosDTO)
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();
                var Programacion = oInstructorBl.EnviarProgramacionInstructor(DateTime.Parse(oParametrosDTO.Parametro1), DateTime.Parse(oParametrosDTO.Parametro2), int.Parse(oParametrosDTO.Parametro3));
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult EnviarCorreoInstructor()
        {
            try
            {
                InstructorBl oInstructorBl = new InstructorBl();
                oInstructorBl.EnviarCorreoInstructor();
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false });
            }
        }
    }
}