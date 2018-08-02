using ClosedXML.Excel;
using Datos.DTO;
using Datos.Modelo;
using LogicaNegocio.Enumeraciones;
using LogicaNegocio.Mail;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Web.UI;
using System.Web.UI.HtmlControls;


namespace LogicaNegocio.LogicaNegocio
{
    public class EspecialBl
    {
        Model1 entity = new Model1();

        public bool GuardarInstructor(instructor_PEspecial obj)
        {
            var Datos = (from i in entity.instructor_PEspecial
                         where i.Email == obj.Email
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.instructor_PEspecial.Add(obj);
                entity.SaveChanges();
                return true;
            }else
            {
                return false;
            }
        }

        public void GuardarModificacionInstructor(instructor_PEspecial obj)
        {
            var Datos = (from i in entity.instructor_PEspecial
                         where i.Id == obj.Id
                         select i).FirstOrDefault();
            Datos.Nombre = obj.Nombre;
            Datos.Apellido = obj.Apellido;
            Datos.Email = obj.Email;
            Datos.Celular = obj.Celular;
            entity.SaveChanges();
        }

        public void CambiarEstado(instructor_PEspecial obj)
        {
            var Datos = (from i in entity.instructor_PEspecial
                         where i.Id == obj.Id
                         select i).FirstOrDefault();
            if (Datos.Estado)
            {
                Datos.Estado = false;
            }else
            {
                Datos.Estado = true;
            }
            entity.SaveChanges();
        }

        public List<Programa> ConsultarProgramas()
        {
            var Datos = (from i in entity.Programa
                         where i.Area == "POBLACION ESPECIAL"
                         select i).ToList();
            return Datos;
        }

        public List<Instructor> ConsultarInstructores()
        {
            var Datos = (from i in entity.Instructor
                         where i.Estado == true && i.Area == "POBLACION ESPECIAL"
                         orderby i.Nombre
                         select i).ToList();
            return Datos;
        }

        public List<EmpresaDTO> ConsultarEmpresas()
        {
            var Datos = (from i in entity.Empresa
                         where i.Estado == true
                         select i).ToList();

            List<EmpresaDTO> ListaInstructor = new List<EmpresaDTO>();
            foreach (var item in Datos)
            {
                EmpresaDTO oInstructorDTO = new EmpresaDTO();
                oInstructorDTO.NIT = item.NIT;
                oInstructorDTO.Nombre = item.Nombre;
                oInstructorDTO.Direccion = item.Direccion;
                oInstructorDTO.Email = item.Email;
                oInstructorDTO.Telefono = item.Telefono;
                oInstructorDTO.Encargado = item.Encargado;
                oInstructorDTO.Telefono_Encargado = item.Telefono_Encargado;
                oInstructorDTO.Tipo_Poblacion = item.Tipo_Poblacion;

                ListaInstructor.Add(oInstructorDTO);
            }
            return ListaInstructor;
        }

        public bool GuardarEmpresa(Empresa oEmpresa)
        {

            var Datos = (from i in entity.Empresa
                         where i.NIT == oEmpresa.NIT
                         select i).FirstOrDefault();
            if (Datos == null)
            {
                entity.Database.ExecuteSqlCommand("GuardarEmpresa @nit,@nom,@dir,@email,@tel,@est,@Enc,@tel_E",
                new SqlParameter("@nit", oEmpresa.NIT),
                new SqlParameter("@nom", oEmpresa.Nombre),
                new SqlParameter("@dir", oEmpresa.Direccion),
                new SqlParameter("@email", oEmpresa.Email),
                new SqlParameter("@tel", oEmpresa.Telefono),
                new SqlParameter("@est", 1),
                new SqlParameter("@Enc", oEmpresa.Encargado),
                new SqlParameter("@tel_E", oEmpresa.Telefono_Encargado)
                );
                return true;
            }
            else
            {
                return false;
            }

        }

        public void CambiarEstadoEmpresa(Empresa oInstructor)
        {
            Model1 entity = new Model1();
            var Item = (from i in entity.Empresa
                        where i.NIT == oInstructor.NIT
                        select i).First();
            if (Item.Estado == true)
            {
                Item.Estado = false;
                entity.SaveChanges();
            }
            else
            {
                Item.Estado = true;
                entity.SaveChanges();
            }
        }

        public Empresa ConsultarEmpresa1(int Nit)
        {
            Model1 entity = new Model1();
            var Datos = (from i in entity.Empresa
                         where i.NIT == Nit
                         select i).FirstOrDefault();
            return Datos;

        }

        public void ActualizarRegistro(Empresa oInstructor)
        {
            Model1 entity = new Model1();

            var Item = (from i in entity.Empresa
                        where i.NIT == oInstructor.NIT
                        select i).First();
            Item.NIT = oInstructor.NIT;
            Item.Nombre = oInstructor.Nombre;
            Item.Direccion = oInstructor.Direccion;
            Item.Email = oInstructor.Email;
            Item.Telefono = oInstructor.Telefono;
            Item.Encargado = oInstructor.Encargado;
            Item.Telefono_Encargado = oInstructor.Telefono_Encargado;
            Item.Tipo_Poblacion = oInstructor.Tipo_Poblacion;
            Item.Estado = true;
            entity.SaveChanges();

        }

        public bool GuardarProgramacion(Poblacion_Especial oPEspecial)
        {
            entity.Poblacion_Especial.Add(oPEspecial);
            entity.SaveChanges();
            return true;
        }

        public List<Poblacion_Especial> ConsultarProgramacion()
        {
            var Datos = (from i in entity.Poblacion_Especial
                         where i.Estado == true
                         select i).ToList();

            foreach (var item in Datos)
            {
                var fecha = DateTime.Parse(item.Fecha_Final);

                if (DateTime.Now >= fecha)
                {
                    item.Estado = false;
                    entity.SaveChanges();
                }
            }


            var Datos1 = (from i in entity.Poblacion_Especial
                          where i.Estado == true
                          select i).ToList();

            return Datos1;
        }

        public void InHabilitarProgramacion(int IdProgramacion)
        {
            var Datos = (from i in entity.Poblacion_Especial
                         where i.Id == IdProgramacion
                         select i).FirstOrDefault();

            Datos.Estado = false;
            entity.SaveChanges();
        }

        public Poblacion_Especial ConsultarProgramacionId(int Id)
        {
            Model1 entity = new Model1();
            var Datos = (from i in entity.Poblacion_Especial
                         where i.Id == Id
                         select i).FirstOrDefault();
            return Datos;

        }

        public List<Poblacion_Especial> ConsultarProgramacionInstructor(int Id)
        {
            Model1 entity = new Model1();
            var Datos = (from i in entity.Poblacion_Especial
                         where i.Instructor == Id && i.Estado == true
                         select i).ToList();
            return Datos;

        }

        public List<Poblacion_Especial> ConsultarProgramacionInstructor(string nombre)
        {
            Model1 entity = new Model1();
            var inst = entity.Instructor.Where(w => w.Nombre + " " + w.Apellido == nombre).FirstOrDefault();
            var Datos = (from i in entity.Poblacion_Especial
                         where i.Instructor == inst.IdInstructor && i.Estado == true
                         select i).ToList();
            return Datos;

        }

        public void ActualizarRegistroProgramacion(Poblacion_Especial oInstructor)
        {
            Model1 entity = new Model1();

            var Item = (from i in entity.Poblacion_Especial
                        where i.Id == oInstructor.Id
                        select i).First();
            Item.Id = oInstructor.Id;
            Item.Fecha_Inicio = oInstructor.Fecha_Inicio;
            Item.Fecha_Final = oInstructor.Fecha_Final;
            Item.Hora_Inicio = oInstructor.Hora_Inicio;
            Item.Hora_Final = oInstructor.Hora_Final;
            Item.Num_Ficha = oInstructor.Num_Ficha;
            Item.Instructor = oInstructor.Instructor;
            Item.Empresa = oInstructor.Empresa;
            Item.Dias = oInstructor.Dias;
            Item.Programa = oInstructor.Programa;
            Item.Tipo_Curso = oInstructor.Tipo_Curso;
            Item.Estado = true;
            entity.SaveChanges();

        }

        public List<Ficha_PEspecial> ConsultarFichas()
        {
            var Datos = (from i in entity.Ficha_PEspecial
                         where i.Estado == true
                         select i).ToList();
            return Datos;
        }

        public bool GuardarFicha(Ficha_PEspecial obj)
        {
            var datos = (from i in entity.Ficha_PEspecial
                         where i.Num_Ficha == obj.Num_Ficha
                         select i).FirstOrDefault();

            if(datos == null)
            {
                entity.Ficha_PEspecial.Add(obj);
                entity.SaveChanges();
                return true;
            }else
            {
                return false;
            }
        }

        public void GuardarModificacionFicha(Ficha_PEspecial obj)
        {
            var Datos = (from i in entity.Ficha_PEspecial
                         where i.Id == obj.Id
                         select i).FirstOrDefault();
            Datos.Num_Ficha = obj.Num_Ficha;
            Datos.Programa = obj.Programa;
            Datos.Num_Aprendices = obj.Num_Aprendices;
            Datos.Fecha_Inicio = obj.Fecha_Inicio;
            Datos.Fecha_Fin = obj.Fecha_Fin;
            Datos.Caracterizacion = obj.Caracterizacion;
            entity.SaveChanges();
        }

        public Ficha_PEspecial ModificarFicha(int id)
        {
            var Datos = (from i in entity.Ficha_PEspecial
                         where i.Id == id
                         select i).FirstOrDefault();
            return Datos;
        }

        public void InHabilitarFicha(int id)
        {
            var Datos = (from i in entity.Ficha_PEspecial
                         where i.Id == id
                         select i).FirstOrDefault();
            if (Datos.Estado)
            {
                Datos.Estado = false;
            }else
            {
                Datos.Estado = true;
            }
            entity.SaveChanges();
        }

        public List<ColegioDTO> ConsultarInstituciones()
        {
            var Datos = (from i in entity.Colegios
                         where i.Estado == true
                         orderby i.Nombre_Colegio
                         select i).ToList();

            List<ColegioDTO> ListaInst = new List<ColegioDTO>();
            foreach (var item in Datos)
            {
                ColegioDTO oInstDTO = new ColegioDTO();

                oInstDTO.Id = item.Id;
                oInstDTO.NIT = item.NIT;
                oInstDTO.Codigo_DANE = item.Codigo_DANE;
                oInstDTO.Nombre_Colegio = item.Nombre_Colegio;
                oInstDTO.Direccion = item.Direccion;
                oInstDTO.Correo_Colegio = item.Correo_Colegio;
                oInstDTO.Num_Resolucion = item.Num_Resolucion;
                var Municipio = (from i in entity.Municipio
                                 where i.IdMunicipio == item.Municipio.ToString()
                                 select i.NombreMunicipio).FirstOrDefault();
                oInstDTO.Municipio = Municipio;
                oInstDTO.Tipo = item.Tipo;
                oInstDTO.Categoria = item.Categoria;
                oInstDTO.Nombre_Rector = item.Nombre_Rector;
                oInstDTO.Apellidos_Rector = item.Apellidos_Rector;
                oInstDTO.Telefono_Rector = item.Telefono_Rector;
                oInstDTO.Correo_Rector = item.Correo_Rector;
                oInstDTO.Nombre_Coordinador = item.Nombre_Coordinador;
                oInstDTO.Apellidos_Coordinador = item.Apellidos_Coordinador;
                oInstDTO.Telefono_Coordinador = item.Telefono_Coordinador;
                oInstDTO.Correo_Coordinador = item.Correo_Coordinador;

                ListaInst.Add(oInstDTO);
            }
            return ListaInst;
        }

    }
}
