using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using LogicaNegocio.LogicaNegocio;
using Datos.Modelo;
using ProgramacionAmbientes.Parametros;

namespace ProgramacionAmbientes.Controllers
{
    public class FichasInstructorController : ApiController
    {
        [HttpPost]
        public IHttpActionResult CargarFichasInstructor(ParametrosDTO objP)
        {
            try
            {
                FichasInstructorBl obj = new FichasInstructorBl();
                var Datos = obj.CargarFichasInstructor(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
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
                FichasInstructorBl obj = new FichasInstructorBl();
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
        public IHttpActionResult GuardarAlternativa(Alternativa_Practicas objA)
        {
            try
            {
                FichasInstructorBl obj = new FichasInstructorBl();
                var Datos = obj.GuardarAlternativa(objA);
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
        public IHttpActionResult validarAlternativa(ParametrosDTO objP)
        {
            try
            {
                FichasInstructorBl obj = new FichasInstructorBl();
                var Datos = obj.validarAlternativa(int.Parse(objP.Parametro1));
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
        public IHttpActionResult ConsultarAlternativa(ParametrosDTO objP)
        {
            try
            {
                FichasInstructorBl obj = new FichasInstructorBl();
                var Datos = obj.ConsultarAlternativa(int.Parse(objP.Parametro1));
                return Ok(new { success = true, Datos });
            }
            catch(Exception exc)
            {
                return Ok(new { succes = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult GuardarAlternativaEdit(Alternativa_Practicas objA) {
            try
            {
                FichasInstructorBl obj = new FichasInstructorBl();
                obj.GuardarAlternativaEdit(objA);
                return Ok(new { success = true });
            }
            catch(Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

    }
}
