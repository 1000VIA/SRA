using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ProgramacionAmbientes.Reporte
{
    public partial class ReporteEspecialPDF : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var programa = Request.QueryString["programa"];
            var caracterizacion = Request.QueryString["caracterizacion"];
            SqlDataSource2.SelectParameters["programa"].DefaultValue = programa;
            SqlDataSource2.SelectParameters["caracterizacion"].DefaultValue = caracterizacion;
            SqlDataSource1.SelectParameters["programa"].DefaultValue = programa;
            SqlDataSource1.SelectParameters["caracterizacion"].DefaultValue = caracterizacion;
            
        }
    }
}