using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LogicaNegocio.LogicaNegocio;
using Datos.Modelo;
using ProgramacionAmbientes.Parametros;

namespace ProgramacionAmbientes.Controllers
{
    public class Virtualidad2Controller : ApiController
    {
        [HttpPost]
        public IHttpActionResult GuardarInstructor(Instructor oInstructor)
        {
            try
            {
                Virtualidad2Bl oInstructorBl = new Virtualidad2Bl();
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
        public IHttpActionResult GuardarFicha(Ficha_VComplementaria objFichaT)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.GuardarFicha(objFichaT);
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
        public IHttpActionResult ModificarFicha(Ficha_VComplementaria objFichaT)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.ModificarFicha(objFichaT.Id);
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarEdicionFicha(Ficha_VComplementaria objFichaT)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                obj.GuardarEdicionFicha(objFichaT);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult gestionFicha(ParametrosDTO objP)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.gestionFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarGestionFicha(ParametrosDTO objP)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                obj.GuardarGestionFicha(int.Parse(objP.Parametro1), int.Parse(objP.Parametro2), int.Parse(objP.Parametro3), int.Parse(objP.Parametro4), objP.Parametro5);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult VerFicha(ParametrosDTO objP)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.VerFicha(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarProgramacion(Virtualidad_Complementaria objVT)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.GuardarProgramacion(objVT);
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
        public IHttpActionResult ConsultarProgramacion(ParametrosDTO objParam)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
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
                Virtualidad2Bl obj = new Virtualidad2Bl();
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
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.ConsultarProgramacionId(int.Parse(objParam.Parametro1));
                ParametrosDTO ds = new ParametrosDTO();
                ds.Parametro15 = Datos.Dias.Contains("LUNES") ? "true" : "false";
                ds.Parametro16 = Datos.Dias.Contains("MARTES") ? "true" : "false";
                ds.Parametro17 = Datos.Dias.Contains("MIÉRCOLES") ? "true" : "false";
                ds.Parametro18 = Datos.Dias.Contains("JUEVES") ? "true" : "false";
                ds.Parametro19 = Datos.Dias.Contains("VIERNES") ? "true" : "false";
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
                Virtualidad2Bl obj = new Virtualidad2Bl();
                obj.EliminarProgramacion(int.Parse(objP.Parametro1));
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarModificacionProgramacion(Virtualidad_Complementaria objVT)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                obj.GuardarModificacionProgramacion(objVT);
                return Ok(new { success = true });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult VerFichasI(ParametrosDTO objP)
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var datos = obj.VerFichasI(int.Parse(objP.Parametro1));
                return Ok(new { success = true, datos });
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
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.ConsultarInstructores();
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
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.ConsultarProgramas();
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
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.ConsultarFichas();
                return Ok(new { success = true, datos = Datos });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpGet]
        public IHttpActionResult ConsultarFichasActivas()
        {
            try
            {
                Virtualidad2Bl obj = new Virtualidad2Bl();
                var Datos = obj.ConsultarFichasActivas();
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }
    }
}
