using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Globalization;
using System.Text;
using System.Net.Mail;
using LogicaNegocio.LogicaNegocio;
using Datos.Modelo;
using ProgramacionAmbientes.Controllers;
using LinqToExcel;
using System.Data.OleDb;
using System.Data;
using Datos.DTO;

namespace CORONA.ValidacionRef.Servicios.Controllers
{
    public class FileController : ApiController
    {
        //Funnciones para la carga de los archivos de excel

        [HttpPost]
        public IHttpActionResult UploadFile()
        {
            Model1 entity = new Model1();
            try
            {
                //                List<LogResponseDTO> lstErrores = new List<LogResponseDTO>();
                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    var fileSavePath = string.Empty;

                    var docfiles = new List<string>();

                    var URLArchivo = "";

                    foreach (string file in httpRequest.Files)
                    {

                        var postedFile = httpRequest.Files[file];
                        //var filePath = HttpContext.Current.Server.MapPath("/UploadedFiles/");
                        var filePath = "C:/UploadedFiles/";

                        var GUID = Guid.NewGuid().ToString();

                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }

                        fileSavePath = Path.Combine(filePath, GUID + "." + postedFile.FileName.Split('.')[1]);



                        postedFile.SaveAs(fileSavePath);

                        docfiles.Add(filePath);

                        URLArchivo = "C:/UploadedFiles/" + GUID + "." + postedFile.FileName.Split('.')[1];


                        string e = Path.GetExtension(URLArchivo);
                        if ((e != ".xlsx") && (e != ".xlsm"))
                        {
                            return Ok(new { success = false, message = "La extencion del archivo no es valida" });
                        }

                    }


                    InstructorBl instructor = new InstructorBl();

                    var book = new ExcelQueryFactory(URLArchivo);

                    var hoja = book.GetWorksheetNames();
                    var resultado = (from i in book.Worksheet(hoja.FirstOrDefault())
                                     select i).ToList();

                    foreach (var values in resultado)
                    {
                        Instructor oInstructor = new Instructor();
                        var cedula = instructor.ConsultarInstructorCedula(values[2]);
                        if (cedula == null)
                        {
                            oInstructor.Nombre = values[0];
                            oInstructor.Apellido = values[1];
                            oInstructor.Cedula = values[2];
                            oInstructor.Email = values[3];
                            oInstructor.Estado = true;
                            oInstructor.Telefono = values[4];

                            var codigo = int.Parse(values[5]);
                            var area = (from i in entity.Area
                                        where i.Codigo == codigo
                                        select i).FirstOrDefault();

                            if (values[6].ToString().ToLower() == "contratista")
                            {
                                oInstructor.TipoContrato = "1";
                            }
                            else
                            {
                                oInstructor.TipoContrato = "2";
                            }
                            //oInstructor.IdCompetencia = int.Parse(values[4]);

                            ProgramaBl oProgramaBl = new ProgramaBl();

                            // oListaInstructor.Add(oInstructor);

                            instructor.GuardarInstructor(oInstructor);
                        }
                    }
                    return Ok(new { success = true, path = URLArchivo, });

                }
                else
                {
                    return Ok(new { success = false, message = "No File" });
                }

            }
            catch (Exception exc)
            {

                return Ok(new { success = false, message = exc.Message });
            }
        }


        public IHttpActionResult UploadFileMedia()
        {
            try
            {
                //                List<LogResponseDTO> lstErrores = new List<LogResponseDTO>();
                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    var fileSavePath = string.Empty;

                    var docfiles = new List<string>();

                    var URLArchivo = "";

                    foreach (string file in httpRequest.Files)
                    {

                        var postedFile = httpRequest.Files[file];
                        //  var filePath = HttpContext.Current.Server.MapPath("C:/UploadedFiles/");
                        var filePath = "C:/UploadedFiles/";

                        var GUID = Guid.NewGuid().ToString();

                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }

                        fileSavePath = Path.Combine(filePath, GUID + "." + postedFile.FileName.Split('.')[1]);



                        postedFile.SaveAs(fileSavePath);

                        docfiles.Add(filePath);

                        // URLArchivo = "~/UploadedFiles/" + GUID + "." + postedFile.FileName.Split('.')[1];
                        URLArchivo = "C:/UploadedFiles/" + GUID + "." + postedFile.FileName.Split('.')[1];


                        string e = Path.GetExtension(URLArchivo);
                        if (e != ".xlsx")
                        {
                            return Ok(new { success = false, message = "La extencion del archivo no es valida" });
                        }

                    }

                    string FilePath = URLArchivo.Split('/')[2];

                    // var reader = new StreamReader(File.OpenRead(HttpContext.Current.Server.MapPath("~/UploadedFiles/") + FilePath), Encoding.GetEncoding(1252));
                    //var reader = new StreamReader(File.OpenRead(("C:/UploadedFiles/") + FilePath), Encoding.GetEncoding(1252));


                    TecnicaBl oTecnicaBl = new TecnicaBl();

                    var book = new ExcelQueryFactory(URLArchivo);

                    var resultado = (from row in book.Worksheet("Base datos Instructores")
                                     let item = new Instructor_Tecnica
                                     {
                                         Cedula = row[1].Cast<string>(),
                                         Nombres = row[2].Cast<string>(),
                                         Apellidos = row[3].Cast<string>(),
                                         Correo_Misena = row[4].Cast<string>(),
                                         Correo_Alternativo = row[5].Cast<string>(),
                                         Municipio = row[6].Cast<string>(),
                                         Telefono_Fijo = row[7].Cast<string>(),
                                         Celular = row[8].Cast<string>(),
                                         Area = row[9].Cast<string>(),
                                         Profesion = row[10].Cast<string>(),
                                         Programa_Formacion = row[11].Cast<string>(),
                                     }
                                     select item).ToList();

                    bool vali = oTecnicaBl.GuardarInstructor(resultado);
                    return Ok(new { success = true, path = URLArchivo });
                }
                else
                {
                    return Ok(new { success = false, message = "No File" });
                }

            }
            catch (Exception exc)
            {

                return Ok(new { success = false, message = exc.Message });
            }
        }

        public IHttpActionResult UploadFileInstructor()
        {
            try
            {
                //                List<LogResponseDTO> lstErrores = new List<LogResponseDTO>();
                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    var fileSavePath = string.Empty;

                    var docfiles = new List<string>();

                    var URLArchivo = "";

                    foreach (string file in httpRequest.Files)
                    {

                        var postedFile = httpRequest.Files[file];
                        //  var filePath = HttpContext.Current.Server.MapPath("C:/UploadedFiles/");
                        var filePath = "C:/UploadedFiles/";

                        var GUID = Guid.NewGuid().ToString();

                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }

                        fileSavePath = Path.Combine(filePath, GUID + "." + postedFile.FileName.Split('.')[1]);



                        postedFile.SaveAs(fileSavePath);

                        docfiles.Add(filePath);

                        // URLArchivo = "~/UploadedFiles/" + GUID + "." + postedFile.FileName.Split('.')[1];
                        URLArchivo = "C:/UploadedFiles/" + GUID + "." + postedFile.FileName.Split('.')[1];


                        string e = Path.GetExtension(URLArchivo);
                        if ((e != ".xlsx") && (e != ".xlsm"))
                        {
                            return Ok(new { success = false, message = "La extencion del archivo no es válida" });
                        }

                    }

                    string FilePath = URLArchivo.Split('/')[1];

                    // var reader = new StreamReader(File.OpenRead(HttpContext.Current.Server.MapPath("~/UploadedFiles/") + FilePath), Encoding.GetEncoding(1252));
                    //var reader = new StreamReader(File.OpenRead(("C:/UploadedFiles/") + FilePath), Encoding.GetEncoding(1252));


                    Instructor oInstructor = new Instructor();
                    VirtualidadBl oVirtualidadBL = new VirtualidadBl();

                    var book = new ExcelQueryFactory(URLArchivo);

                    var resultado = (from row in book.Worksheet("Hoja1")
                                     select row).ToList();

                    foreach (var values in resultado)
                    {
                        if (values[12] != "AREA")
                        {
                            var Inst = oVirtualidadBL.InstructorCedula(values[1]);

                            if (Inst == null)
                            {
                                oInstructor.Numero = values[0];
                                oInstructor.Area = values[12];
                                oInstructor.Cedula = values[1];
                                oInstructor.Nombre = values[2];
                                oInstructor.Apellido = values[3];
                                oInstructor.Email = values[4];
                                oInstructor.EmailAlternativo = values[5];
                                oInstructor.MunicipioVivienda = values[6];
                                oInstructor.Telefono = values[7];
                                oInstructor.Celular = values[8];
                                oInstructor.DiaNacimiento = values[9];
                                oInstructor.MesNacimiento = values[10];
                                oInstructor.AnioNacimiento = values[11];
                                oInstructor.Inicio_Contrato = values[14];
                                oInstructor.Fin_Contrato = values[15];
                                oInstructor.Profesion = values[16];
                                oInstructor.ProgramaFormacion = values[17];
                                oInstructor.TipoContrato = values[18];
                                oInstructor.Estado = true;
                                oInstructor.EnvioCorreo = false;
                                oInstructor.Num_Contrato = "";
                                oInstructor.Adicion = "";

                                oVirtualidadBL.GuardarInstructor(oInstructor);
                            }
                            else
                            {
                                return Ok(new { success = false, message = "No se encontró archivo" });
                            }
                        }


                    }

                    return Ok(new { success = true, path = URLArchivo });


                }
                else
                {
                    return Ok(new { success = false, message = "No File" });
                }

            }
            catch (Exception exc)
            {

                return Ok(new { success = false, message = exc.Message });
            }
        }

        //Subir archivos APRENDIZ  Autor: 1000Via
        public IHttpActionResult UploadFileAprendiz()

        {
            try
            {

                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    var fileSavePath = string.Empty;

                    var docfiles = new List<string>();

                    var URLArchivo = "";

                    foreach (string file in httpRequest.Files)
                    {

                        var postedFile = httpRequest.Files[file];

                        var filePath = "C:/UploadedFiles/";

                        var GUID = Guid.NewGuid().ToString();

                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }

                        fileSavePath = Path.Combine(filePath, GUID + "." + postedFile.FileName.Split('.')[1]);



                        postedFile.SaveAs(fileSavePath);

                        docfiles.Add(filePath);

                        URLArchivo = "C:/UploadedFiles/" + GUID + "." + postedFile.FileName.Split('.')[1];


                        string e = Path.GetExtension(URLArchivo);
                        if ((e != ".xlsx") && (e != ".xlsm")  && (e != ".xls"))
                        {
                            return Ok(new { success = false, message = "La extencion del archivo no es válida" });
                        }

                    }

                    string FilePath = URLArchivo.Split('/')[1];

                    Aprendices_TituladaDTO oAprendiz = new Aprendices_TituladaDTO();
                    //Aprendices_Tecnica oAprendiz = new Aprendices_Tecnica();
                    TecnicaBl otecnicaBL = new TecnicaBl();

                    var book = new ExcelQueryFactory(URLArchivo);

                    var resultado = (from row in book.Worksheet("Hoja1")                                  
                                     select row).ToList();

                    foreach (var values in resultado)
                    {
                        if (values[0] == "")
                        {
                            break;
                        }
                        else
                        {
                            if (values[3] != "Colegios")
                            {
                                var Aprendiz = otecnicaBL.AprendizCedula(values[0]);

                                if (Aprendiz == null)
                                {
                                    oAprendiz.Nombre = values[0];
                                    oAprendiz.Apellido = values[1];
                                    oAprendiz.TipoDocumento = values[2];
                                    oAprendiz.Documento = values[3];
                                    oAprendiz.Grado = values[4];
                                    oAprendiz.Email = values[5];
                                    oAprendiz.Telefono = values[6];
                                    oAprendiz.Direccion = values[7];
                                    oAprendiz.NombreAcudiente = values[8];
                                    oAprendiz.TelAcudiente = values[9];
                                    oAprendiz.NumeroFicha = values[10];
                                    oAprendiz.Colegios = values[11];
                                    oAprendiz.Estado = "";
                                    otecnicaBL.GuardarAprendiz1(oAprendiz);
                                }
                                else
                                {
                                    return Ok(new { success = false, message = "No se encontró archivo" });
                                }
                            }
                        }

                    }

                    return Ok(new { success = true, path = URLArchivo });


                }
                else
                {
                    return Ok(new { success = false, message = "No File" });
                }

            }
            catch (Exception exc)
            {

                return Ok(new { success = false, message = exc.Message });
            }
        }

    }


}

