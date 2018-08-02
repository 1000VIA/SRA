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
    public class ProgramaController : ApiController
    {

        [HttpPost]
        public IHttpActionResult GuardarPrograma(Programa oPrograma)
        {
            try
            {
                ProgramaBl oProgramaBl = new ProgramaBl();
                return Ok(new { success = oProgramaBl.GuardarPrograma(oPrograma) });
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
                var Datos = oProgramaBl.ConsultarProgramas();

                return Ok(new { datos = Datos, success = true });

                //return Ok(new { datos = Datos, success = true });

            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]

        public IHttpActionResult CambiarEstado(Programa oParametros)
        {
            try
            {
                ProgramaBl oProgramaBl = new ProgramaBl();
                oProgramaBl.EliminarPrograma(oParametros.IdPrograma);
                return Ok(new { success = true, });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }




        [HttpPost]

        public IHttpActionResult GuardarEdicionPrograma(Programa oPrograma)
        {
            try
            {
                ProgramaBl oProgramaBl = new ProgramaBl();
                oProgramaBl.ActualizarRegistro(oPrograma);

                return Ok(new { success = true });
            }
            catch (Exception exc)
            {

                return Ok(new { success = false, exc = exc.Message });
            }

        }      
      

    }
}