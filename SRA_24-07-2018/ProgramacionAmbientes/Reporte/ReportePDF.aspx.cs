using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ProgramacionAmbientes.Reporte
{
    public partial class ReportePDF : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var Nombre = Request.QueryString["nombre"];
            var Cedula = Request.QueryString["cedula"];
            SqlDataSource1.SelectParameters["nombre"].DefaultValue = Nombre;
            SqlDataSource2.SelectParameters["cedula"].DefaultValue = Cedula;
        }

    }
}