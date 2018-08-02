using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ProgramacionAmbientes.Reporte
{
    public partial class ReporteFichaPDF : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var Num_Ficha = Request.QueryString["Num_Ficha"];
            SqlDataSource1.SelectParameters["Num_Ficha"].DefaultValue = Num_Ficha;
        }
    }
}