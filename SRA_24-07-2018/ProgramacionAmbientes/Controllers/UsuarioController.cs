using Datos.Modelo;
using LogicaNegocio.LogicaNegocio;
using ProgramacionAmbientes.Parametros;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net.Mime;
using System.Net.Mail;

namespace ProgramacionAmbientes.Controllers
{
    public class UsuarioController : ApiController
    {
        [HttpPost]
        public IHttpActionResult IniciarSesion(Usuario oUsuario)
        {
            try
            {
                UsuarioBl oUsuarioBl = new UsuarioBl();
                var usuario = oUsuarioBl.IniciarSesion(oUsuario.NombreUsuario, oUsuario.Password);
                if (usuario == null)
                {
                    return Ok(new { success = true, usuario, resp = 1 });
                }
                return Ok(new { success = true, usuario });
            }
            catch (Exception exc)
            {
                return Ok(new { success = false, exc = exc.Message });
            }
        }

        [HttpPost]
        public IHttpActionResult RecuperarPassword(ParametrosDTO oParametrosDTO)
        {
            try
            {
                UsuarioBl oUsuarioBl = new UsuarioBl();
                var Email = oUsuarioBl.RecuperarPassword(oParametrosDTO.Parametro1, oParametrosDTO.Parametro2);
                if (Email != null)
                {
                    return Ok(new { success = true, Email });
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
        public IHttpActionResult CambiarPassword(ParametrosDTO oParametrosDTO)
        {
            try
            {
                UsuarioBl oUsuarioBl = new UsuarioBl();
                var datos = oUsuarioBl.CambiarContrasena(oParametrosDTO.Parametro1, oParametrosDTO.Parametro2,int.Parse(oParametrosDTO.Parametro3));
                if (datos)
                {
                    return Ok(new { success = true });
                }else
                {
                    return Ok(new { success = false });
                }
            }
            catch (Exception exc )
            {

                return Ok(new { success = false, exc.Message });
            }
           
                 

        }

        [HttpPost]
        public IHttpActionResult AsignarUsuario(ParametrosDTO objParam)
        {
            try
            {
                UsuarioBl obj = new UsuarioBl();
                var Datos = obj.AsignarUsuario(objParam.Parametro1, objParam.Parametro2, objParam.Parametro3);
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
    }
}