using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ProgramacionAmbientes.Reporte
{
    public partial class ReporteListaPDF : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var Nombre = Request.QueryString["nombre"];
            SqlDataSource1.SelectParameters["nombre"].DefaultValue = Nombre;
        }
    }
}