ProgramacionApp.controller('TecnicaController',
    ['$scope', '$rootScope', '$location', 'TecnicaService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, TecnicaService, $routeParams, $sce) {

            //$scope.curPage = 0;
            //   $scope.pageSize = 35;
            //   $scope.events = [];
            //   $scope.Reporte = [];
            //   var eliminar = 0;
            //   var valInsti;


            //   TecnicaService.ConsultarInstituciones(function (response) {
            //       $('#Buscar').show();
            //       $('#Buscar2').hide(); 
            //       $('#Buscar3').hide();
            //       $('#Buscar4').hide();
            //       $('#BuscarA').hide();
            //       $('#BuscarF').hide();
            //       if (response.success == true) {
            //           $scope.datalistsInst = response.datos;
            //           $scope.ListaCompleta = response.datos;
            //           $scope.numberOfPages = function () {
            //               return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
            //           };
            //       }
            //   });

            //   //Función para consultar la programación


            //   $(".menuInstruc").css("display", "none");

            //   TecnicaService.ConsultarMunicipio(function (response) {
            //       $scope.Municipio = response.Datos;
            //   });

            //   TecnicaService.CargarInstructoresSENA(function (response) {
            //       if (response.success) {
            //           $scope.PInstructor = response.datos;
            //       }
            //   });

            //   $scope.filtrarProgramacion = function () {
            //       var n1 = $('#instrucFil').val();
            //       $scope.CargarCalendario(n1);
            //       $('#borrarFiltro').removeAttr("disabled"),
            //           $('#ModalFiltrarProgramacion').modal('hide');
            //   };

            //   $scope.calendarioVacio = function () {
            //       $('#calendar').fullCalendar({
            //           locale: 'es',
            //           header: {
            //               left: 'title',
            //               center: 'listDay,listWeek,month',
            //               right: 'prev,next today'

            //           },
            //           views: {
            //               listDay: {
            //                   buttonText: 'Día'
            //               },
            //               listWeek: {
            //                   buttonText: 'Semana'
            //               }
            //           },
            //           timeFormat: 'h(:mm) a',
            //           slotLabelFormat: "h(:mm) a",
            //           theme: false,
            //           height: 600,
            //           //events: $scope.events,
            //           //eventClick: function (event) {
            //           //    var inicio = moment(event.FInicio).lang("es").format('dddd Do [de] MMMM [del] YYYY');
            //           //    var fin = moment(event.FFin).lang("es").format('dddd Do [de] MMMM [del] YYYY');
            //           //    $scope.Modificar4(event.Id, inicio, fin);
            //           //}
            //       });
            //   };

            //   $scope.verDetalleInst = function () {
            //       var InstDetalle = $scope.datalistsInst.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (InstDetalle.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar una institución",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.verDetalleInst(InstDetalle, function (response) {
            //               if (response.success == true) {

            //                   $('#titulo').text(response.Colegio[0].Nombre_Colegio);
            //                   $('#nitInst').text(response.Colegio[0].NIT);
            //                   $('#daneInst').text(response.Colegio[0].Codigo_DANE);
            //                   $('#direccionInst').text(response.Colegio[0].Direccion);
            //                   $('#municipioInst').text(response.Colegio[0].Municipio);
            //                   $('#resolucionInst').text(response.Colegio[0].Num_Resolucion);
            //                   $('#tipoInst').text(response.Colegio[0].Tipo);
            //                   $('#CategoriaI').text(response.Colegio[0].Categoria);
            //                   $('#correoInst').text(response.Colegio[0].Correo_Colegio);
            //                   $('#nombreRector').text(response.Colegio[0].Nombre_Rector);
            //                   $('#nombreCoord').text(response.Colegio[0].Nombre_Coordinador);
            //                   $('#apellidosRector').text(response.Colegio[0].Apellidos_Rector);
            //                   $('#apellidosCoord').text(response.Colegio[0].Apellidos_Coordinador);
            //                   $('#telefonoRector').text(response.Colegio[0].Telefono_Rector);
            //                   $('#telefonoCoord').text(response.Colegio[0].Telefono_Coordinador);
            //                   $('#correoRector').text(response.Colegio[0].Correo_Rector);
            //                   $('#correoCoord').text(response.Colegio[0].Correo_Coordinador);

            //                   $("#ModalDetalleInst").modal("show");
            //               }
            //           });
            //       }
            //   };

            //   //abrir modals
            //   $scope.modalRegistrarInstitucion = function () {
            //       $('.select2').select2({
            //           placeholder: "Seleccione una opción...",
            //           allowClear: true
            //       });
            //       $('#titlePanel').text('Información de la Institución');
            //       $('#atras1').hide();
            //       $('#atras2').hide();
            //       $('#siguiente2').hide();
            //       $('#siguiente1').show();
            //       $('#modalPanel1').show();
            //       $('#modalPanel2').hide();
            //       $('#modalPanel3').hide();
            //       $('#bol1').css({ "background-color": "#286090", "color": "white" });
            //       $('#bol2').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol3').css({ "background-color": "white", "color": "#286090" });
            //       $scope.LimpiarInstitucion();
            //       $('#modalRegistrarInstitucion').modal({ backdrop: 'static', keyboard: false });
            //       $('#modalRegistrarInstitucion').modal('show');
            //   };

            //   $scope.CambiarEstado = function () {

            //       var Inst = $scope.datalistsInst.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (Inst.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar un registro",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           $('#modalInhabilitarInstitucion').modal('show');
            //       }
            //   };

            //   $scope.modalRegistrarPrograma = function () {
            //       $scope.LimpiarPrograma();
            //       $('#ModalRegistrarPrograma').modal('show');
            //   };

            //   $scope.CambiarEstado2 = function () {
            //       var Prog = $scope.datalistsProg.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (Prog.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar un registro",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           $('#modalInhabilitarPrograma').modal('show');
            //       }
            //   };

            //   $scope.modalAgregarProgramas = function () {
            //       $('.select2').select2({
            //           placeholder: "Seleccione una opción...",
            //           allowClear: true
            //       });
            //       $('#selectProg').hide();
            //       setTimeout(function () {
            //           $('#InstAddProg').val("").trigger('change');
            //           $('#ProgAddProg').val("").trigger('change');
            //       });
            //       $scope.Ids = [];
            //       $scope.AddProgs = [];
            //       $('#divTabla').hide();
            //       $('#InstAddProg').removeAttr("disabled");
            //       $('#btnLimpiar').attr("disabled", true);
            //       $('#modalAgregarProgramas').modal({ backdrop: 'static', keyboard: false });
            //       $('#modalAgregarProgramas').modal('show');
            //   };

            //   $scope.filltrarProg = function () {
            //       $('#tablaresultadofiltro').hide();
            //       $('.select2').select2({
            //           placeholder: "Seleccione una opción...",
            //           allowClear: true
            //       });
            //       setTimeout(function () {
            //           $('#InstFiltro').val("").trigger("change");
            //       }, 100);
            //       $('#InstFiltro').removeAttr("disabled");
            //       $scope.datalistsInstFilter = [];
            //       $('#btnLimpiarFiltro').attr("disabled", true);
            //       $('#filtrarProgramacion').modal('show');
            //       $('#btnBuscarFiltro').removeAttr("disabled");
            //   };

            //   $scope.modalRegistrarDocentePar = function () {
            //       $('.select2').select2({
            //           placeholder: "Seleccione una opción...",
            //           allowClear: true
            //       });
            //       $scope.LimpiarDocentePar();
            //       $('#ModalRegistrarDocentePar').modal('show');
            //   };

            //   $scope.verTodo = function () {

            //       var id = $scope.datalistsI.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (id.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar un registro",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.ConsultarIntuctorId(id, function (response) {
            //               if (response.success) {
            //                   $('#nombreView').text((response.datos.Nombres + " " + response.datos.Apellidos).toUpperCase());
            //                   $('#cedulaView').text(response.datos.Cedula.toUpperCase());
            //                   $('#misenaView').text(response.datos.Correo_Misena.toUpperCase());
            //                   $('#personalView').text(response.datos.Correo_Alternativo.toUpperCase());
            //                   $('#municipioView').text(response.datos.Municipio.toUpperCase());
            //                   $('#fijoView').text(response.datos.Telefono_Fijo.toUpperCase());
            //                   $('#celView').text(response.datos.Celular.toUpperCase());
            //                   $('#areaView').text(response.datos.Area.toUpperCase());
            //                   $('#profesionView').text(response.datos.Profesion.toUpperCase());
            //                   if (response.datos.Programa_Formacion != null) {
            //                       $('#programaView').text(response.datos.Programa_Formacion.toUpperCase());
            //                   } else {
            //                       $('#programaView').text("");
            //                   }
            //                   $('#modalViewInfo').modal('show');
            //               }
            //           });
            //       }
            //   };

            //   $scope.modalRegistrarInstructor = function () {
            //       $scope.LimpiarInstructorSENA();
            //       $('#ModalRegistrarInstructor').modal('show');
            //   };

            //   $scope.ModalProgramacion = function () {
            //       $scope.LimpiarMediaTecnica();
            //       $scope.InstMedia = [];
            //       TecnicaService.ConsultarInstructorMedia(function (response) {
            //           if (response.success == true) {
            //               $.each(response.Datos, function (index, value) {
            //                   $scope.InstMedia.push({ Instruc: value })
            //               });
            //           }
            //       });
            //       $('.datetimepicker3').datetimepicker({
            //           defaultDate: false,
            //           useCurrent: false,
            //           format: 'LT'
            //       });

            //       $('.select2').select2({
            //           placeholder: "Seleccione una opción...",
            //           allowClear: true
            //       });
            //       $('#modalRegistrarProgramacion').modal('show');
            //   };

            //   $scope.ModalFiltrarProgramacion = function () {
            //       setTimeout(function () {
            //           $('#instrucFil').val("").trigger("change");
            //       }, 100);
            //       $('.select2').select2({
            //           placeholder: "Seleccione una opción...",
            //           allowClear: true
            //       });
            //       $('#ModalFiltrarProgramacion').modal('show');
            //   };

            //   $scope.agregarRegistroA = function () {
            //       $scope.VaciarCamposAprendiz();
            //       $("#ModalAprendiz").modal("show");
            //   };

            //   $scope.agregarRegistroF = function () {
            //       //$scope.VaciarCamposFicha();
            //       $('.select2').select2({
            //           placeholder: "Seleccione una opción...",
            //           allowClear: true
            //       });
            //       $('#FechaIniFich').datetimepicker({
            //           useCurrent: false,
            //           format: 'YYYY/MM/DD',
            //           locale: 'es',

            //       });
            //       $('#FechaFinFicha').datetimepicker({
            //           useCurrent: false,
            //           format: 'YYYY/MM/DD',
            //           locale: 'es',
            //       });
            //       $('#FechaIniFich').on('dp.change', function (e) {
            //           var fecha = new Date($('#FechaIniFich').val());
            //           $('#FechaFinFicha').data("DateTimePicker").minDate(fecha);
            //       });
            //       $scope.VaciarCamposFicha();
            //       TecnicaService.CargarProgramas(function (response) {
            //           if (response.success) {
            //               $scope.selectdatalistsProg = response.datos;
            //           }
            //       });
            //       $("#ModalFicha").modal("show");
            //   };

            //   $scope.cambiarEstadoF = function () {
            //       var Ficha = $scope.datalistsFichas.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });
            //       if (Ficha.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar una Ficha",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           $("#modalInhabilitarFicha").modal("show");
            //       }
            //   };

            //   $scope.cambiarEstadoA = function () {
            //       var Aprendiz = $scope.datalistsApren.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (Aprendiz.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar un aprendiz",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           $scope.Aprendices.Id = Aprendiz[0].Id;
            //           $scope.Aprendices.Documento = parseInt(Aprendiz[0].Documento);
            //           $scope.Aprendices.Nombre = Aprendiz[0].Nombre;
            //           $scope.Aprendices.Apellido = Aprendiz[0].Apellido;
            //           $scope.Aprendices.Email = Aprendiz[0].Email;
            //           $scope.Aprendices.Telefono = parseInt(Aprendiz[0].Telefono);
            //           $scope.Aprendices.Estado = Aprendiz[0].Estado;
            //           $('.select2').select2({
            //               placeholder: "Seleccione una opción...",
            //               allowClear: true
            //           });
            //           setTimeout(function () {
            //               $("#AprenEstado").val($scope.Aprendices.Estado).trigger("change");
            //           }, 100)
            //           $("#ModalAprendizEstado").modal("show");
            //       }
            //   };

            //   $scope.verAprendices = function () {
            //       var FIcha = $scope.datalistsFichas.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (FIcha.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar una ficha",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.verAprendices(FIcha[0].Id, function (response) {
            //               if (response.success) {
            //                   $scope.AprendiceFicha = response.Datos;
            //               } else {
            //                   $("#BodyVerApren").append("<tr id='trNoResult'><td colspan='5' class='text-center'>No se encontraron aprendices asociados a esta ficha</td></tr>");
            //               }
            //           });
            //           $("#TituloVerA").text(FIcha[0].Num_Ficha + " - " + FIcha[0].Programa);
            //           $("#ModalVerAprendices").modal("show");
            //       }
            //   };

            //   $scope.verNovedades = function () {
            //       var FIcha = $scope.datalistsFichas.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (FIcha.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar una ficha",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.verNovedades(FIcha[0].Id, function (response) {
            //               if (response.success) {
            //                   debugger;
            //                   $scope.NovedadesFicha = response.ListNovedades;
            //                   $("#ModalVerNovedades").modal("show");
            //               }
            //           })
            //       }
            //   };

            //   $scope.cambiarFichaA = function () {
            //       var Aprendiz = $scope.datalistsApren.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (Aprendiz.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar un aprendiz",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.EstadoFicaAprendiz(Aprendiz[0].Ficha, function (response) {
            //               if (response.success) {
            //                   $scope.Aprendices.Id = Aprendiz[0].Id;
            //                   $scope.Aprendices.DocumentoDocumento = parseInt(Aprendiz[0].Documento);
            //                   $scope.Aprendices.Nombre = Aprendiz[0].Nombre;
            //                   $scope.Aprendices.Apellido = Aprendiz[0].Apellido;
            //                   $scope.Aprendices.Email = Aprendiz[0].Email;
            //                   $scope.Aprendices.Telefono = parseInt(Aprendiz[0].Telefono);
            //                   $scope.Aprendices.Estado = Aprendiz[0].Estado;
            //                   $scope.Aprendices.Ficha = Aprendiz[0].Ficha;
            //                   $('.select2').select2({
            //                       placeholder: "Seleccione una opción...",
            //                       allowClear: true
            //                   });
            //                   setTimeout(function () {
            //                       $("#fichaAprenEdit").val($scope.Aprendices.Ficha).trigger("change");
            //                   }, 100);
            //                   $scope.Novedades.Descripcion = "";
            //                   $("#ModalAprendizFicha").modal("show");
            //               } else {
            //                   bootbox.dialog({
            //                       title: "Información",
            //                       message: "La ficha actual del aprendiz ya no se encunetra activa",
            //                       buttons: {
            //                           success: {
            //                               label: "Cerrar",
            //                               className: "btn-primary",
            //                           }
            //                       }
            //                   });
            //               }
            //           });
            //       }
            //   };

            //   $("#ModalVerAprendices").on('hidden.bs.modal', function () {
            //       $("#trNoResult").remove();
            //       $scope.AprendiceFicha = null;
            //   });

            //   $('#btnEliminarProg').click(function () {
            //       bootbox.confirm({
            //           title: "Confirmación",
            //           message: "¿Está seguro que desea eliminar el registro?",
            //           buttons: {
            //               cancel: {
            //                   label: 'Cancelar',
            //                   className: 'btn-danger'
            //               },
            //               confirm: {
            //                   label: 'Aceptar',
            //                   className: 'btn-success'
            //               }
            //           },
            //           callback: function (result) {
            //               if (result) {
            //                   $scope.EliminarProgramacion();
            //               }
            //           }
            //       });
            //   });

            //   //Lista de checkeo
            //   $scope.AbrirLista = function () {
            //       $scope.LimpiarListaChequeo();
            //       $('.select2').select2({
            //           placeholder: "Seleccione una opción...",
            //           allowClear: true
            //       });
            //       TecnicaService.ConsultarInstituciones(function (response) {
            //           if (response.success == true) {
            //               debugger;
            //               $scope.Inst = response.datos;
            //           }
            //       });
            //       $("#tblLista").hide();
            //       $("#btnEditList").hide();
            //       $("#btnReporteLista").hide();
            //       $("#btnEditList").addClass("editarL");
            //       $("#btnEditList").text("Editar");
            //       $("#ModalLista").modal("show");
            //   };

            //   $scope.BuscarLista = function () {
            //       $scope.LimpiarListaChequeo();
            //       $('.toggle').bootstrapToggle("off");
            //       $('.toggle').bootstrapToggle("destroy");
            //       var inst = $("#instiList").val();
            //       TecnicaService.ConsultarLista(inst, function (response) {
            //           if (response.success) {
            //               if (response.editar != 1) {
            //                   $scope.ListaC.Institucion = inst;
            //                   $scope.ListaC.Estado = true;
            //                   setTimeout(function () {
            //                       $("#instiList").val("").trigger("change");
            //                   }, 200);
            //                   $('.toggle').bootstrapToggle({
            //                       on: 'SI <i class="glyphicon glyphicon-thumbs-up"></i>',
            //                       off: 'NO <i class="glyphicon glyphicon-thumbs-down"></i>',
            //                       height: 35,
            //                       width: 80,
            //                       offstyle: "warning",
            //                       onstyle: "success"
            //                   });
            //                   $("#TitleLista").text(inst);
            //                   localStorage.setItem("NombreI", inst);
            //                   $("#TextObserv").removeAttr("disabled");
            //                   $("#btnGuardarLista").removeAttr("disabled");
            //                   $("#btnEditList").hide();
            //                   $("#btnReporteLista").hide();
            //                   $("#tblLista").show();
            //                   $("#divTablaLEdit").hide();
            //                   $("#divTablaL").show();
            //               } else {
            //                   var item1 = (response.Datos.Criterio1 == true) ? "Cumple" : "No Cumple";
            //                   var item2 = (response.Datos.Criterio2 == true) ? "Cumple" : "No Cumple";
            //                   var item3 = (response.Datos.Criterio3 == true) ? "Cumple" : "No Cumple";
            //                   var item4 = (response.Datos.Criterio4 == true) ? "Cumple" : "No Cumple";
            //                   var item5 = (response.Datos.Criterio5 == true) ? "Cumple" : "No Cumple";
            //                   var item6 = (response.Datos.Criterio6 == true) ? "Cumple" : "No Cumple";
            //                   var item7 = (response.Datos.Criterio7 == true) ? "Cumple" : "No Cumple";
            //                   var item8 = (response.Datos.Criterio8 == true) ? "Cumple" : "No Cumple";
            //                   var item9 = (response.Datos.Criterio9 == true) ? "Cumple" : "No Cumple";
            //                   var item10 = (response.Datos.Criterio10 == true) ? "Cumple" : "No Cumple";
            //                   var item11 = (response.Datos.Criterio11 == true) ? "Cumple" : "No Cumple";
            //                   var item12 = (response.Datos.Criterio12 == true) ? "Cumple" : "No Cumple";
            //                   var item13 = (response.Datos.Criterio13 == true) ? "Cumple" : "No Cumple";
            //                   var item14 = (response.Datos.Criterio14 == true) ? "Cumple" : "No Cumple";
            //                   $("#item1Edit").text(item1);
            //                   $("#item2Edit").text(item2);
            //                   $("#item3Edit").text(item3);
            //                   $("#item4Edit").text(item4);
            //                   $("#item5Edit").text(item5);
            //                   $("#item6Edit").text(item6);
            //                   $("#item7Edit").text(item7);
            //                   $("#item8Edit").text(item8);
            //                   $("#item9Edit").text(item9);
            //                   $("#item10Edit").text(item10);
            //                   $("#item11Edit").text(item11);
            //                   $("#item12Edit").text(item12);
            //                   $("#item13Edit").text(item13);
            //                   $("#item14Edit").text(item14);
            //                   $scope.ListaC.Id = response.Datos.Id;
            //                   $scope.ListaC.Observaciones = response.Datos.Observaciones;
            //                   $scope.ListaC.Institucion = response.Datos.Institucion;
            //                   $scope.ListaC.Criterio1 = response.Datos.Criterio1;
            //                   $scope.ListaC.Criterio2 = response.Datos.Criterio2;
            //                   $scope.ListaC.Criterio3 = response.Datos.Criterio3;
            //                   $scope.ListaC.Criterio4 = response.Datos.Criterio4;
            //                   $scope.ListaC.Criterio5 = response.Datos.Criterio5;
            //                   $scope.ListaC.Criterio6 = response.Datos.Criterio6;
            //                   $scope.ListaC.Criterio7 = response.Datos.Criterio7;
            //                   $scope.ListaC.Criterio8 = response.Datos.Criterio8;
            //                   $scope.ListaC.Criterio9 = response.Datos.Criterio9;
            //                   $scope.ListaC.Criterio10 = response.Datos.Criterio10;
            //                   $scope.ListaC.Criterio11 = response.Datos.Criterio11;
            //                   $scope.ListaC.Criterio12 = response.Datos.Criterio12;
            //                   $scope.ListaC.Criterio13 = response.Datos.Criterio13;
            //                   $scope.ListaC.Criterio14 = response.Datos.Criterio14;
            //                   $scope.ListaC.Estado = response.Datos.Estado;
            //                   setTimeout(function () {
            //                       $("#instiList").val("").trigger("change");
            //                   }, 200);
            //                   $("#TitleLista").text(inst);
            //                   localStorage.setItem("NombreI", inst);
            //                   $("#TextObserv").attr("disabled", true);
            //                   $("#btnGuardarLista").attr("disabled", true);
            //                   $("#btnEditList").addClass("editarL");
            //                   $("#btnEditList").text("Editar");
            //                   $("#btnReporteLista").show();
            //                   $("#tblLista").show();
            //                   $("#divTablaLEdit").show();
            //                   $("#divTablaL").hide();
            //                   $("#btnEditList").show();
            //               }
            //           }
            //       });
            //   };

            //   $("#btnEditList").click(function () {
            //       if ($("#btnEditList").hasClass("editarL")) {
            //           $("#btnEditList").removeClass("editarL");
            //           $("#btnEditList").text("cancelar");
            //           $("#btnReporteLista").hide();
            //           $("#divTablaLEdit").hide();
            //           $("#divTablaL").show();
            //           $("#TextObserv").removeAttr("disabled");
            //           $('.toggle').bootstrapToggle({
            //               on: 'SI <i class="glyphicon glyphicon-thumbs-up"></i>',
            //               off: 'NO <i class="glyphicon glyphicon-thumbs-down"></i>',
            //               height: 35,
            //               width: 80,
            //               offstyle: "warning",
            //               onstyle: "success"
            //           });
            //           $('#item1').prop('checked', $scope.ListaC.Criterio1).change();
            //           $('#item2').prop('checked', $scope.ListaC.Criterio2).change();
            //           $('#item3').prop('checked', $scope.ListaC.Criterio3).change();
            //           $('#item4').prop('checked', $scope.ListaC.Criterio4).change();
            //           $('#item5').prop('checked', $scope.ListaC.Criterio5).change();
            //           $('#item6').prop('checked', $scope.ListaC.Criterio6).change();
            //           $('#item7').prop('checked', $scope.ListaC.Criterio7).change();
            //           $('#item8').prop('checked', $scope.ListaC.Criterio8).change();
            //           $('#item9').prop('checked', $scope.ListaC.Criterio9).change();
            //           $('#item10').prop('checked', $scope.ListaC.Criterio10).change();
            //           $('#item11').prop('checked', $scope.ListaC.Criterio11).change();
            //           $('#item12').prop('checked', $scope.ListaC.Criterio12).change();
            //           $('#item13').prop('checked', $scope.ListaC.Criterio13).change();
            //           $('#item14').prop('checked', $scope.ListaC.Criterio14).change();
            //           $("#btnGuardarLista").removeAttr("disabled");
            //       } else {
            //           $("#btnEditList").addClass("editarL");
            //           $("#btnEditList").text("Editar");
            //           $("#divTablaLEdit").show();
            //           $("#btnReporteLista").show();
            //           $("#divTablaL").hide();
            //           $("#TextObserv").attr("disabled", true);
            //           $('.toggle').bootstrapToggle("off");
            //           $('.toggle').bootstrapToggle("destroy");
            //           $("#btnGuardarLista").attr("disabled", true);
            //       }

            //   });

            //   $("#btnGuardarLista").click(function () {
            //       var valor = "";
            //       for (var i = 1; i <= 14; i++) {
            //           var string = "Criterio" + i;
            //           valor = $("#item" + i).prop('checked');
            //           $scope.ListaC[string] = valor;
            //       }
            //       if ($scope.ListaC.Observaciones == "") {
            //           swal({
            //               text: "¿Desea guardar la lista de chequeo sin observaciones?",
            //               type: 'warning',
            //               showCancelButton: true,
            //               confirmButtonColor: '#449d44',
            //               cancelButtonColor: '#d58512',
            //               confirmButtonText: 'Si, guardar',
            //               cancelButtonText: 'Cancelar'
            //           }).then((result) => {
            //               if (result) {
            //                   $scope.ListaC.Observaciones = "Ho hay observaciones";
            //                   $scope.GuardarListaC();
            //               }
            //           }).catch(swal.noop)
            //       } else {
            //           $scope.GuardarListaC();
            //       }
            //   });

            //   $scope.GuardarListaC = function () {
            //       TecnicaService.GuardarLista($scope.ListaC, function (response) {
            //           if (response.success) {
            //               $("#ModalLista").modal("hide");
            //               $scope.LimpiarListaChequeo();
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se realizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   //cargar tablas
            //   $scope.CargarInstituciones = function () {
            //       TecnicaService.ConsultarInstituciones(function (response) {
            //           if (response.success == true) {
            //               $scope.datalistsInst = response.datos;
            //               $scope.ListaCompleta = response.datos;
            //               $scope.numberOfPages = function () {
            //                   return Math.ceil($scope.datalistsInst.length / $scope.pageSize);    
            //                   $(".menuInstruc").css("display", "none");
            //               };
            //           }
            //       });
            //   };

            //   $scope.CargarProgramas = function () {
            //       TecnicaService.CargarProgramas(function (response) {
            //           if (response.success) {
            //               $scope.datalistsProg = response.datos;
            //               $scope.ListaCompleta = response.datos;
            //               $scope.numberOfPages = function () {
            //                   return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
            //               };
            //           }
            //       });
            //       TecnicaService.ConsultarInstituciones(function (response) {
            //           if (response.success == true) {
            //               $scope.Inst = response.datos;
            //           }
            //       });
            //   };

            //   $scope.CargarDocentePar = function () {
            //       TecnicaService.CargarDocentePar(function (response) {
            //           if (response.success) {
            //               $scope.datalistsDocPar = response.datos;
            //               $scope.ListaCompleta = response.datos;
            //               $scope.numberOfPages = function () {
            //                   return Math.ceil($scope.datalistsDocPar.length / $scope.pageSize);
            //               };
            //           }
            //       });
            //       TecnicaService.ConsultarInstituciones(function (response) {
            //           if (response.success == true) {
            //               $scope.Inst = response.datos;
            //           }
            //       });
            //   };

            //   $scope.cargarInstructor = function () {
            //       TecnicaService.CargarInstructores(function (response) {
            //           if (response.success == true) {
            //               $scope.datalistsI = response.datos;
            //               $scope.ListaCompleta = response.datos;
            //               $scope.numberOfPages = function () {
            //                   return Math.ceil($scope.datalistsI.length / $scope.pageSize);
            //               };

            //           }
            //       });
            //   };

            //   $scope.cargarAprendices = function () {
            //       TecnicaService.ConsultarAprendices(function (response) {
            //           debugger;
            //           if (response.success == true) {
            //               $scope.datalistsApren = response.Datos;
            //               $scope.ListaCompleta = response.Datos;
            //               $scope.numberOfPages = function () {
            //                   return Math.ceil($scope.datalistsApren.length / $scope.pageSize);
            //               };

            //           }
            //       });
            //       TecnicaService.ConsultarInstituciones(function (response) {
            //           if (response.success == true) {
            //               $scope.Inst = response.datos;
            //           }
            //       });
            //   };

            //   $scope.cargarFichas = function () {
            //       TecnicaService.ConsultarFichas(function (response) {
            //           if (response.success == true) {
            //               $scope.datalistsFichas = response.Datos;
            //               $scope.ListaCompleta = response.Datos;
            //               $scope.numberOfPages = function () {
            //                   return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
            //               };

            //           }
            //       });
            //       TecnicaService.CargarProgramas(function (response) {
            //           if (response.success) {
            //               $scope.datalistsProg = response.datos;
            //           }
            //       });
            //       TecnicaService.ConsultarInstituciones(function (response) {
            //           if (response.success == true) {
            //               $scope.Inst = response.datos;
            //           }
            //       });
            //   };

            //   //cambio paneles tabPanels
            //   $('#btn1').click(function () {
            //       $('#Buscar').show();
            //       $('#Buscar2').hide();
            //       $('#Buscar3').hide();
            //       $('#Buscar4').hide();
            //       $('#BuscarA').hide();
            //       $('#BuscarF').hide();
            //       $('#tabF').hide();
            //       $('#tabInstituciones').show();
            //       $('#tabProgramas').hide();
            //       $('#tabDocentePar').hide();
            //       $('#tabInstructor').hide();
            //       $('#tabProgramacion').hide();
            //       $('#tabA').hide();
            //       $scope.CargarInstituciones();
            //   });

            //   $('#btn2').click(function () {
            //       $('#Buscar2').show();
            //       $('#Buscar').hide();
            //       $('#Buscar3').hide();
            //       $('#Buscar4').hide();
            //       $('#BuscarA').hide();
            //       $('#BuscarF').hide();
            //       $('#tabF').hide();
            //       $('#tabInstituciones').hide();
            //       $('#tabProgramas').show();
            //       $('#tabDocentePar').hide();
            //       $('#tabInstructor').hide();
            //       $('#tabProgramacion').hide();
            //       $('#tabA').hide();
            //       $scope.CargarProgramas();
            //   });

            //   $('#btn3').click(function () {
            //       $('#Buscar2').hide();
            //       $('#Buscar').hide();
            //       $('#Buscar3').show();
            //       $('#Buscar4').hide();
            //       $('#BuscarA').hide();
            //       $('#BuscarF').hide();
            //       $('#tabF').hide();
            //       $('#tabInstituciones').hide();
            //       $('#tabProgramas').hide();
            //       $('#tabInstructor').hide();
            //       $('#tabDocentePar').show();
            //       $('#tabProgramacion').hide();
            //       $('#tabA').hide();
            //       TecnicaService.CargarProgramasInst(function (response) {
            //           if (response.success) {
            //               $scope.Prog = response.datos;
            //           }
            //       });
            //       $scope.CargarDocentePar();
            //   });

            //   $('#btn4').click(function () {
            //       $('#Buscar2').hide();
            //       $('#Buscar').hide();
            //       $('#Buscar3').hide();
            //       $('#Buscar4').show();
            //       $('#BuscarA').hide();
            //       $('#BuscarF').hide();
            //       $('#tabF').hide();
            //       $('#tabInstituciones').hide();
            //       $('#tabProgramas').hide();
            //       $('#tabDocentePar').hide();
            //       $('#tabInstructor').show();
            //       $('#tabProgramacion').hide();
            //       $('#tabA').hide();
            //       $scope.cargarInstructor();
            //   });

            //   $("#btnA").click(function () {
            //       $('#Buscar2').hide();
            //       $('#Buscar').hide();
            //       $('#Buscar3').hide();
            //       $('#Buscar4').hide();
            //       $('#BuscarA').show();
            //       $('#BuscarF').hide();
            //       $('#tabF').hide();
            //       $('#tabInstituciones').hide();
            //       $('#tabProgramas').hide();
            //       $('#tabDocentePar').hide();
            //       $('#tabInstructor').hide();
            //       $('#tabProgramacion').hide();
            //       $('#tabA').show();
            //       TecnicaService.ConsultarFichas(function (response) {
            //           debugger;
            //           if (response.success) {
            //               $scope.Ficha = response.Datos;
            //           }
            //       });
            //       $scope.cargarAprendices();
            //       $('#calendar').fullCalendar('destroy');
            //   });

            //   $("#btnF").click(function () {
            //       $('#Buscar2').hide();
            //       $('#Buscar').hide();
            //       $('#Buscar3').hide();
            //       $('#Buscar4').hide();
            //       $('#BuscarA').hide();
            //       $('#BuscarF').show();
            //       $('#tabInstituciones').hide();
            //       $('#tabProgramas').hide();
            //       $('#tabDocentePar').hide();
            //       $('#tabInstructor').hide();
            //       $('#tabProgramacion').hide();
            //       $('#tabA').hide();
            //       $('#tabF').show();
            //       $scope.cargarFichas();
            //       $('#calendar').fullCalendar('destroy');
            //   });

            //   $('#borrarFiltro').click(function () {
            //       $scope.LimpiarCalendar();
            //       $scope.calendarioVacio();
            //       $('#btnReporte').hide();
            //       $('#borrarFiltro').attr("disabled", true);
            //   });

            //   $scope.GenerarReporte = function () {
            //       $location.url("/Reporte");
            //   };

            //   $scope.GenerarReporteLista = function () {
            //       $location.url("/ReporteLista");
            //   };

            //   $scope.CargarCalendario = function (nombre) {
            //       debugger;
            //       var d = new Date().getFullYear();
            //       $scope.Reporte = [];
            //       $scope.LimpiarCalendar();
            //       TecnicaService.ConsultarProgramacion(nombre, function (response) {
            //           debugger;
            //           if (response.success == true) {
            //               $.each(response.datos, function (index, value) {
            //                   $scope.Reporte.push({
            //                       Nombre: nombre,
            //                       NombreProg: value.Instructor,
            //                       Dias: value.Dias,
            //                       Ficha: value.Ficha,
            //                       Inicio: value.Hora_Inicio,
            //                       Fin: value.Hora_Fin
            //                   });
            //                   var allday = false;
            //                   var hoI = value.Hora_Inicio.substring(0, 5);
            //                   var hoF = value.Hora_Fin.substring(0, 5);
            //                   var HoraInicio = hoI.split(':');
            //                   var HoraFin = hoF.split(':');
            //                   var ampm = value.Hora_Inicio.substring(5, 10);
            //                   var ampm2 = value.Hora_Fin.substring(5, 10);
            //                   var inic = 0;
            //                   var finc = 0;
            //                   if (ampm == "PM") {
            //                       inic = parseInt(HoraInicio[0]) + 12;
            //                   } else {
            //                       inic = HoraInicio[0];
            //                   }
            //                   if (ampm2 == "PM") {
            //                       finc = parseInt(HoraFin[0]) + 12
            //                   } else {
            //                       finc = HoraFin[0];
            //                   }
            //                   var fecha1 = moment(d + "/01/01");
            //                   var fecha2 = moment(d + "/12/30");
            //                   var dias = fecha2.diff(fecha1, 'days');
            //                   var PDIas = value.Dias;
            //                   for (var i = 0; i <= dias; i++) {
            //                       var fecha = $scope.sumaFecha(i, d + "/01/01");
            //                       var fff = fecha.split('/');
            //                       var ff = fff[1] + "/" + fff[0] + "/" + fff[2];
            //                       var fecha2 = new Date(ff);
            //                       var StrDia = moment(fecha2).lang("es").format('dddd');
            //                       $scope.Calendario = function () {
            //                           debugger;
            //                           $scope.events.push({
            //                               tipo: 0,
            //                               id: value.Id,
            //                               grado: value.Grado,
            //                               ficha: value.Ficha,
            //                               dias: value.Dias,
            //                               title: value.Instructor,
            //                               start: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), inic, parseInt(HoraInicio[1])),
            //                               end: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), finc, parseInt(HoraFin[1])),
            //                               allDay: false,
            //                               backgroundColor: "#337ab7",
            //                               borderColor: "blue",
            //                               textColor: "white",
            //                           });
            //                       }

            //                       if (PDIas.indexOf("LUNES") >= 0) {
            //                           if (StrDia == "lunes") {
            //                               $scope.Calendario();
            //                           }
            //                       }
            //                       if (PDIas.indexOf("MARTES") >= 0) {
            //                           if (StrDia == "martes") {
            //                               $scope.Calendario();
            //                           }
            //                       }
            //                       if (PDIas.indexOf("MIERCOLES") >= 0) {
            //                           if (StrDia == "miercoles") {
            //                               $scope.Calendario();
            //                           }
            //                       }
            //                       if (PDIas.indexOf("JUEVES") >= 0) {
            //                           if (StrDia == "jueves") {
            //                               $scope.Calendario();
            //                           }
            //                       }
            //                       if (PDIas.indexOf("VIERNES") >= 0) {
            //                           if (StrDia == "viernes") {
            //                               $scope.Calendario();
            //                           }
            //                       }
            //                       if (PDIas.indexOf("SABADO") >= 0) {
            //                           if (StrDia == "sabado") {
            //                               $scope.Calendario();
            //                           }
            //                       }
            //                       if (PDIas.indexOf("DOMINGO") >= 0) {
            //                           if (StrDia == "Domingo") {
            //                               $scope.Calendario();
            //                           }
            //                       }
            //                   }
            //               });

            //               $('#calendar').fullCalendar({
            //                   locale: 'es',
            //                   header: {
            //                       left: 'title',
            //                       center: 'listDay,listWeek,month',
            //                       right: 'prev,next today'

            //                   },
            //                   eventLimit: true,
            //                   views: {
            //                       listDay: {
            //                           buttonText: 'Día'
            //                       },
            //                       listWeek: {
            //                           buttonText: 'Semana'
            //                       },
            //                       agenda: {
            //                           eventLimit: 4 // adjust to 6 only for agendaWeek/agendaDay
            //                       }
            //                   },
            //                   timeFormat: 'h(:mm) a',
            //                   slotLabelFormat: "h(:mm) a",
            //                   theme: false,
            //                   height: 600,
            //                   events: $scope.events,
            //                   eventClick: function (event) {
            //                       var ini = moment(event.start).format('h:mm a');
            //                       var fin = moment(event.end).format('h:mm a');
            //                       $scope.modificarProgramacion(event.id, event.title, event.grado, event.ficha, ini, fin, event.tipo);
            //                   }
            //               });

            //               $('#btnReporte').show();
            //           }
            //       });
            //       setTimeout(function () {
            //           var nombre = "";
            //           $.each($scope.Reporte, function (index, value) {
            //               nombre = value.Nombre;
            //               //console.log(value.NombreProg);
            //               localStorage.setItem("Nombre", value.NombreProg);
            //               if (nombre != "") {
            //                   return false;
            //               }
            //           });
            //           TecnicaService.ConsultarInstructorNombre(nombre, function (response) {
            //               if (response.success) {
            //                   //$.each($scope.Reporte, function (index, value) {

            //                   //});
            //                   //console.log(response.Datos.Cedula);
            //                   localStorage.setItem("Cedula", response.Datos.Cedula);
            //               }
            //           });
            //       }, 200);
            //   };

            //   $scope.sumaFecha = function (d, fecha) {
            //       var Fecha = new Date();
            //       var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());
            //       var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
            //       var aFecha = sFecha.split(sep);
            //       var fecha = aFecha[1] + '/' + aFecha[2] + '/' + aFecha[0];
            //       fecha = new Date(fecha);
            //       fecha.setDate(fecha.getDate() + parseInt(d));
            //       var ano = fecha.getFullYear();
            //       var mes = fecha.getMonth() + 1;
            //       var dia = fecha.getDate();
            //       mes = (mes < 10) ? ("0" + mes) : mes;
            //       dia = (dia < 10) ? ("0" + dia) : dia;
            //       var fechaFinal = dia + sep + mes + sep + ano;
            //       return (fechaFinal);
            //   };
            //   //cambio de paneles del modal de registro de instituciones
            //   $('#siguiente1').click(function () {
            //       $('#titlePanel').text('Información del Rector');
            //       $('#atras1').show();
            //       $('#atras2').hide();
            //       $('#siguiente2').show();
            //       $('#siguiente1').hide();
            //       $('#modalPanel1').hide();
            //       $('#modalPanel2').show();
            //       $('#modalPanel3').hide();
            //       $('#bol1').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol2').css({ "background-color": "#286090", "color": "white" });
            //       $('#bol3').css({ "background-color": "white", "color": "#286090" });
            //   });

            //   $('#siguiente2').click(function () {
            //       $('#titlePanel').text('Información del Coordinador');
            //       $('#atras1').hide();
            //       $('#atras2').show();
            //       $('#siguiente2').hide();
            //       $('#siguiente1').hide();
            //       $('#modalPanel1').hide();
            //       $('#modalPanel2').hide();
            //       $('#modalPanel3').show();
            //       $('#bol1').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol2').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol3').css({ "background-color": "#286090", "color": "white" });
            //   });

            //   $('#atras1').click(function () {
            //       $('#titlePanel').text('Información de la Institución');
            //       $('#atras1').hide();
            //       $('#atras2').hide();
            //       $('#siguiente2').hide();
            //       $('#siguiente1').show();
            //       $('#modalPanel1').show();
            //       $('#modalPanel2').hide();
            //       $('#modalPanel3').hide();
            //       $('#bol1').css({ "background-color": "#286090", "color": "white" });
            //       $('#bol2').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol3').css({ "background-color": "white", "color": "#286090" });
            //   });

            //   $('#atras2').click(function () {
            //       $('#titlePanel').text('Información del Rector');
            //       $('#atras1').show();
            //       $('#atras2').hide();
            //       $('#siguiente2').show();
            //       $('#siguiente1').hide();
            //       $('#modalPanel1').hide();
            //       $('#modalPanel2').show();
            //       $('#modalPanel3').hide();
            //       $('#bol1').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol2').css({ "background-color": "#286090", "color": "white" });
            //       $('#bol3').css({ "background-color": "white", "color": "#286090" });
            //   });

            //   //cambio de paneles del modal de modificacion de instituciones
            //   $('#siguiente1Edit').click(function () {
            //       $('#titlePanelEdit').text('Información del Rector');
            //       $('#atras1Edit').show();
            //       $('#atras2Edit').hide();
            //       $('#siguiente2Edit').show();
            //       $('#siguiente1Edit').hide();
            //       $('#modalPanel1Edit').hide();
            //       $('#modalPanel2Edit').show();
            //       $('#modalPanel3Edit').hide();
            //       $('#bol1Edit').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol2Edit').css({ "background-color": "#286090", "color": "white" });
            //       $('#bol3Edit').css({ "background-color": "white", "color": "#286090" });
            //   });

            //   $('#siguiente2Edit').click(function () {
            //       $('#titlePanelEdit').text('Información del Coordinador');
            //       $('#atras1Edit').hide();
            //       $('#atras2Edit').show();
            //       $('#siguiente2Edit').hide();
            //       $('#siguiente1Edit').hide();
            //       $('#modalPanel1Edit').hide();
            //       $('#modalPanel2Edit').hide();
            //       $('#modalPanel3Edit').show();
            //       $('#bol1Edit').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol2Edit').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol3Edit').css({ "background-color": "#286090", "color": "white" });
            //   });

            //   $('#atras1Edit').click(function () {
            //       $('#titlePanelEdit').text('Información de la Institución');
            //       $('#atras1Edit').hide();
            //       $('#atras2Edit').hide();
            //       $('#siguiente2Edit').hide();
            //       $('#siguiente1Edit').show();
            //       $('#modalPanel1Edit').show();
            //       $('#modalPanel2Edit').hide();
            //       $('#modalPanel3Edit').hide();
            //       $('#bol1Edit').css({ "background-color": "#286090", "color": "white" });
            //       $('#bol2Edit').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol3Edit').css({ "background-color": "white", "color": "#286090" });
            //   });

            //   $('#atras2Edit').click(function () {
            //       $('#titlePanelEdit').text('Información del Rector');
            //       $('#atras1Edit').show();
            //       $('#atras2Edit').hide();
            //       $('#siguiente2Edit').show();
            //       $('#siguiente1Edit').hide();
            //       $('#modalPanel1Edit').hide();
            //       $('#modalPanel2Edit').show();
            //       $('#modalPanel3Edit').hide();
            //       $('#bol1Edit').css({ "background-color": "white", "color": "#286090" });
            //       $('#bol2Edit').css({ "background-color": "#286090", "color": "white" });
            //       $('#bol3Edit').css({ "background-color": "white", "color": "#286090" });
            //   });


            //   $('#AddSelect').click(function () {
            //       $('#selectProg').show();
            //       $('#InstAddProg').attr("disabled", true);
            //       $('#btnLimpiar').removeAttr("disabled");
            //   });

            //   $('#btnLimpiar').click(function () {
            //       $('#selectProg').hide();
            //       setTimeout(function () {
            //           $('#InstAddProg').val("").trigger('change');
            //           $('#ProgAddProg').val("").trigger('change');
            //       });
            //       $scope.Ids = [];
            //       $scope.AddProgs = [];
            //       $('#InstAddProg').removeAttr("disabled");
            //       $('#btnLimpiar').attr("disabled", true);
            //       $('#divTabla').hide();
            //   });

            //   $('#btnLimpiarFiltro').click(function () {
            //       $('#tablaresultadofiltro').hide();
            //       setTimeout(function () {
            //           $('#InstFiltro').val("").trigger("change");
            //       }, 100);
            //       $('#InstFiltro').removeAttr("disabled");
            //       $scope.datalistsInstFilter = [];
            //       $('#btnLimpiarFiltro').attr("disabled", true);
            //       $('#btnBuscarFiltro').removeAttr("disabled");
            //   });

            //   $scope.addProg = function () {
            //       var id = "." + $scope.Inst.Prog;
            //       var text = $(id).text();
            //       var valid = 1;
            //       $.each($scope.Ids, function (index, value) {
            //           if (value.ProgId == $scope.Inst.Prog) {
            //               valid = 2;
            //               return false;
            //           }
            //       });
            //       if (valid == 2) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Este Programa ya se encuentra en la lista",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           valid = 1;
            //           $scope.Ids.push({ ProgId: $scope.Inst.Prog });
            //           $('#divTabla').show();
            //           $scope.AddProgs.push({
            //               Programa: text,
            //               IdProg: $scope.Inst.Prog
            //           });
            //           setTimeout(function () {
            //               $('#ProgAddProg').val("").trigger('change');
            //           });
            //       }
            //   };

            //   $scope.remove = function (index) {
            //       if ($scope.AddProgs.length == 1) {
            //           $('#divTabla').hide();
            //       }
            //       $scope.AddProgs.splice(index, 1);
            //       $scope.Ids.splice(index, 1);
            //   };

            //   $scope.AddProgs = [];

            //   $scope.Ids = [];

            //   $scope.AddProgramas = function () {
            //       if ($scope.Ids.length != 0) {
            //           $.each($scope.Ids, function (index, value) {
            //               TecnicaService.AgregarDetalleProg(value.ProgId, $scope.Inst.Id, function (response) {

            //               });
            //           });
            //           $('#modalAgregarProgramas').modal('hide');
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "El registro se realizó con éxito",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });

            //           $('#selectProg').hide();
            //           setTimeout(function () {
            //               $('#InstAddProg').val("").trigger('change');
            //               $('#ProgAddProg').val("").trigger('change');
            //           });
            //           $.each($scope.Ids, function (index, value) {
            //               //console.log(value.ProgId + " " + $scope.Inst.Id);
            //               $('.cls' + value.ProgId).remove();
            //           });
            //           $scope.Ids = [];
            //           $('#tableProgs').empty();
            //           $('#InstAddProg').removeAttr("disabled");
            //           $('#btnLimpiar').attr("disabled", true);
            //       } else {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar por lo menos un programa",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       }
            //   };

            //   $scope.datalistsInstFilter = [];

            //   $scope.Hola = function () {
            //       $('#btnBuscarFiltro').attr("disabled", true);
            //       $scope.datalistsInstFilter = [];
            //       var IdInstitucion = $('#InstFiltro').val();
            //       TecnicaService.filtrarProgramas(IdInstitucion, function (response) {
            //           if (response.success) {
            //               $.each(response.datos, function (index, value) {
            //                   var Estado = (value.Estado == true) ? "Activo" : "Inactivo";
            //                   var Clase = (value.Estado == true) ? "btn-success" : "btn-warning";
            //                   $scope.datalistsInstFilter.push({
            //                       Codigo_Programa: value.Codigo_Programa,
            //                       NombrePrograma: value.NombrePrograma,
            //                       Estado: Estado,
            //                       Clase: Clase,
            //                       IdProg: value.Id_Programa,
            //                       IdInst: value.IdInst
            //                   });
            //               });
            //               $('#tablaresultadofiltro').show();
            //               $('#InstFiltro').attr("disabled", true);
            //               $('#btnLimpiarFiltro').removeAttr("disabled");
            //           }
            //       });
            //   };

            //   $('#excelInstProg').click(function () {
            //       $("#excelInstProgI").trigger('click');
            //   });

            //   $('#excelInstProgI').change(function () {
            //       dataweb = new FormData();

            //       var files = $("#excelInstProgI").get(0).files;

            //       var fileExtension = ['xlsx'];
            //       if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            //           bootbox.dialog({
            //               title: "Importar Archivo",
            //               message: "La extencion del archivo no es valida",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //           $("#excelInstProgI").replaceWith($("#excelInstProgI").val('').clone(true));

            //           //waitingDialog.hide();
            //           return false;

            //       }


            //       // Add the uploaded image content to the form data collection
            //       if (files.length > 0) {

            //           readURL(this, "logoweb");

            //           dataweb.append("UploadedImage", files[0]);
            //           if (dataweb != null) {
            //               TecnicaService.SubirArchivoProgramaInst(dataweb, function (response) {
            //                   if (response.success) {

            //                       bootbox.dialog({
            //                           title: "Importar Archivo",
            //                           message: "La importación del archivo se realizó con éxito ",
            //                           buttons: {
            //                               success: {
            //                                   label: "Cerrar",
            //                                   className: "btn-primary",
            //                               }
            //                           }
            //                       });



            //                       $scope.path = response.path;

            //                       $("#excelInstProgI").replaceWith($("#excelInstProgI").val('').clone(true));
            //                       //TecnicaService.CargarInstructores(function (response) {
            //                       //    if (response.success == true) {
            //                       //        console.log(response.datos)
            //                       //        $scope.datalistsI = response.datos;
            //                       //        $scope.ListaCompleta = response.datos;
            //                       //        $scope.numberOfPages = function () {
            //                       //            return Math.ceil($scope.datalistsI.length / $scope.pageSize);
            //                       //        };

            //                       //    }
            //                       //});

            //                       $("#excelInstProgI").replaceWith($("#excelInstProgI").val('').clone(true));
            //                       //waitingDialog.hide();

            //                       return;
            //                   }

            //               });
            //           }

            //       }
            //   });

            //   $scope.estadoInstProg = function (IdProg, IdInst) {
            //       TecnicaService.estadoInstProg(IdProg, IdInst, function (response) {
            //           if (response.success) {
            //               $scope.Hola();
            //           }
            //       });
            //   }

            //   //funciones para limpiar campos
            //   $scope.LimpiarInstitucion = function () {
            //       $scope.Institucion.Id = "";
            //       $scope.Institucion.NIT = "";
            //       $scope.Institucion.Codigo_DANE = "";
            //       $scope.Institucion.Nombre_Colegio = "";
            //       $scope.Institucion.Direccion = "";
            //       $scope.Institucion.Correo_Colegio = "";
            //       $scope.Institucion.Num_Resolucion = "";
            //       $scope.Institucion.Municipio = "";
            //       $scope.Institucion.Tipo = "";
            //       $scope.Institucion.Categoria = "";
            //       $scope.Institucion.Nombre_Rector = "";
            //       $scope.Institucion.Apellidos_Rector = "";
            //       $scope.Institucion.Telefono_Rector = "";
            //       $scope.Institucion.Correo_Rector = "";
            //       $scope.Institucion.Nombre_Coordinador = "";
            //       $scope.Institucion.Apellidos_Coordinador = "";
            //       $scope.Institucion.Telefono_Coordinador = "";
            //       $scope.Institucion.Correo_Coordinador = "";
            //       setTimeout(function () {
            //           $('#categoria').val("").trigger("change");
            //           $('#tipo').val("").trigger("change");
            //           $('#municipio').val("").trigger("change");
            //       }, 100);
            //   };

            //   $scope.LimpiarPrograma = function () {
            //       $scope.Programa.Id = "";
            //       $scope.Programa.Codigo_Programa = "";
            //       $scope.Programa.Red_Tecnologica = "";
            //       $scope.Programa.Version_Programa = "";
            //       $scope.Programa.NombrePrograma = "";
            //   };

            //   $scope.LimpiarDocentePar = function () {
            //       $scope.DocentePar.Id = "";
            //       $scope.DocentePar.Telefono = "";
            //       $scope.DocentePar.Nombres = ""
            //       $scope.DocentePar.Apellidos = "";
            //       $scope.DocentePar.Email = "";
            //       $scope.DocentePar.Institucion = "";
            //       $scope.DocentePar.Programa = "";
            //       setTimeout(function () {
            //           $('#InstDPar').val("").trigger("change");
            //           $('#ProgDPar').val("").trigger("change");
            //       }, 100);
            //   };

            //   $scope.LimpiarInstructorSENA = function () {
            //       $scope.InstructorSENA.Id = "";
            //       $scope.InstructorSENA.Cedula = "";
            //       $scope.InstructorSENA.Nombres = "";
            //       $scope.InstructorSENA.Apellidos = "";
            //       $scope.InstructorSENA.Correo_Misena = "";
            //       $scope.InstructorSENA.Correo_Alternativo = "";
            //       $scope.InstructorSENA.Municipio = "";
            //       $scope.InstructorSENA.Telefono_Fijo = "";
            //       $scope.InstructorSENA.Celular = "";
            //       $scope.InstructorSENA.Area = "";
            //       $scope.InstructorSENA.Profesion = "";
            //       $scope.InstructorSENA.Programa_Formacion = "";
            //   };

            //   $scope.LimpiarCalendar = function () {

            //       $('#calendar').fullCalendar('removeEventSource', $scope.events);
            //       $('#calendar').fullCalendar('refetchEvents');
            //       $('#calendar').fullCalendar('destroy');
            //       $scope.events = [];
            //   };

            //   $scope.LimpiarMediaTecnica = function () {
            //       $scope.MediaTecnica.Id = "";
            //       $scope.MediaTecnica.Hora_Inicio = "";
            //       $scope.MediaTecnica.Hora_Fin = "";
            //       $scope.MediaTecnica.Grado = "";
            //       $scope.MediaTecnica.Ficha = "";
            //       $scope.MediaTecnica.Instructor = "";
            //       $scope.MediaTecnica.Dias = "";
            //       setTimeout(function () {
            //           $('#instruc').val("").trigger("change");
            //           $('#fichaa').val("").trigger("change");
            //       }, 100);
            //       $scope.Dias.Lunes = false;
            //       $scope.Dias.Martes = false;
            //       $scope.Dias.Miercoles = false;
            //       $scope.Dias.Jueves = false;
            //       $scope.Dias.Viernes = false;
            //       $scope.Dias.Sabado = false;
            //       $scope.Dias.Domingo = false;
            //   };

            //   $scope.LimpiarListaChequeo = function () {
            //       $scope.ListaC.Id = "";
            //       $scope.ListaC.Institucion = "";
            //       $scope.ListaC.Observaciones = "";
            //       $scope.ListaC.Criterio1 = false;
            //       $scope.ListaC.Criterio2 = false;
            //       $scope.ListaC.Criterio3 = false;
            //       $scope.ListaC.Criterio4 = false;
            //       $scope.ListaC.Criterio5 = false;
            //       $scope.ListaC.Criterio6 = false;
            //       $scope.ListaC.Criterio7 = false;
            //       $scope.ListaC.Criterio8 = false;
            //       $scope.ListaC.Criterio9 = false;
            //       $scope.ListaC.Criterio10 = false;
            //       $scope.ListaC.Criterio11 = false;
            //       $scope.ListaC.Criterio12 = false;
            //       $scope.ListaC.Criterio13 = false;
            //       $scope.ListaC.Criterio14 = false;
            //   };

            //   $scope.VaciarCamposAprendiz = function () {
            //       $scope.Aprendices.Id = "";
            //       $scope.Aprendices.Colegios = "";
            //       $scope.Aprendices.Documento = "";
            //       $scope.Aprendices.Nombre = "";
            //       $scope.Aprendices.Apellido = "";
            //       $scope.Aprendices.Email = "";
            //       $scope.Aprendices.Telefono = "";
            //       $scope.Aprendices.TipoDocumento = "";
            //       $scope.Aprendices.Direccion = "";
            //       $scope.Aprendices.Estado = "";
            //       $scope.Aprendices.NombreAcudiente = "";
            //       $scope.Aprendices.TelAcudiente = "";
            //       $scope.Aprendices.Ficha = "";
            //       $scope.Aprendices.Institucion = "";
            //       setTimeout(function () {
            //           $("#fichaApren").val("").trigger("change");
            //       }, 100);
            //   };

            //   $scope.VaciarCamposFicha = function () {
            //       $scope.Ficha.Id = "";
            //       $scope.Ficha.Num_Ficha = "";
            //       $scope.Ficha.Fecha_Inicio = "";
            //       $scope.Ficha.Fecha_Fin = "";
            //       $scope.Ficha.Num_Aprendices = "";
            //       $scope.Ficha.Institucion = "";
            //       $scope.Ficha.Programa = "";
            //       $scope.Ficha.Estado = "";
            //       setTimeout(function () {
            //           $("#InstFicha").val("").trigger("change");
            //           $("#ProgFicha").val("").trigger("change");
            //           $("#FechaFinFicha").val("");
            //           $("#FechaIniFich").val("");
            //       }, 100);
            //       $("#numFicEdit").attr("disabled", false);
            //   };

            //   //declaracion de objetos
            //   $scope.Institucion = {
            //       Id: "",
            //       NIT: "",
            //       Codigo_DANE: "",
            //       Nombre_Colegio: "",
            //       Direccion: "",
            //       Correo_Colegio: "",
            //       Num_Resolucion: "",
            //       Municipio: "",
            //       Tipo: "",
            //       Categoria: "",
            //       Nombre_Rector: "",
            //       Apellidos_Rector: "",
            //       Telefono_Rector: "",
            //       Correo_Rector: "",
            //       Nombre_Coordinador: "",
            //       Apellidos_Coordinador: "",
            //       Telefono_Coordinador: "",
            //       Correo_Coordinador: "",
            //       Estado: true
            //   };

            //   $scope.Programa = {
            //       Id: "",
            //       Codigo_Programa: "",
            //       Red_Tecnologica: "",
            //       Version_Programa: "",
            //       NombrePrograma: "",
            //       Estado: true
            //   };

            //   //$scope.Inst = {
            //   //    Id: "",
            //   //    Prog: ""
            //   //};

            //   $scope.DocentePar = {
            //       Id: "",
            //       Telefono: "",
            //       Nombres: "",
            //       Apellidos: "",
            //       Email: "",
            //       Id_Institucion: "",
            //       Id_Programa: ""
            //   }

            //   $scope.InstructorSENA = {
            //       Id: "",
            //       Cedula: "",
            //       Nombres: "",
            //       Apellidos: "",
            //       Correo_Misena: "",
            //       Correo_Alternativo: "",
            //       Municipio: "",
            //       Telefono_Fijo: "",
            //       Celular: "",
            //       Area: "",
            //       Profesion: "",
            //       Programa_Formacion: ""
            //   }

            //   $scope.MediaTecnica = {
            //       Id: "",
            //       Hora_Inicio: "",
            //       Hora_Fin: "",
            //       Grado: "",
            //       Ficha: "",
            //       Instructor: "",
            //       Dias: ""
            //   };

            //   $scope.Dias = {
            //       Lunes: false,
            //       Martes: false,
            //       Miercoles: false,
            //       Jueves: false,
            //       Viernes: false,
            //       Sabado: false,
            //       Domingo: false
            //   };

            //   $scope.ListaC = {
            //       Id: "",
            //       Institucion: "",
            //       Observaciones: "",
            //       Criterio1: false,
            //       Criterio2: false,
            //       Criterio3: false,
            //       Criterio4: false,
            //       Criterio5: false,
            //       Criterio6: false,
            //       Criterio7: false,
            //       Criterio8: false,
            //       Criterio9: false,
            //       Criterio10: false,
            //       Criterio11: false,
            //       Criterio12: false,
            //       Criterio13: false,
            //       Criterio14: false,
            //       Estado: false
            //   };

            //   $scope.Aprendices = {

            //       TipoDocumento: "",
            //       Colegios: "",
            //       Id: "",
            //       Documento: "",
            //       Nombre: "",
            //       Apellido: "",
            //       Email: "",
            //       Telefono: "",
            //       NombreAcudiente: "",
            //       TelAcudiente: "",
            //       Estado: "",
            //       Ficha: "",
            //       Direccion: ""
            //   };

            //   $scope.Ficha = {
            //       Id_ficha_Tecnica: "",
            //       Num_Ficha: "",
            //       Fecha_Inicio: "",
            //       Fecha_Fin: "",
            //       Num_Aprendices: "",
            //       Institucion: "",
            //       Programa: "",
            //       Estado: ""
            //   };

            //   $scope.Novedades = {
            //       Descripcion: ""
            //   };

            //   $scope.Institucion = {
            //       Id_Institucion: "",
            //       Nombre: "",
            //       Direccion: "",
            //       Email: "",
            //       Telefono_Institucion: "",
            //       Encargado: "",
            //       Telefono_Encargado: "",
            //       Estado: ""

            //   }

            //   // funciones para registrar
            //   $scope.GuardarInstitucion = function () {
            //       if ($scope.Institucion.NIT == "" || $scope.Institucion.Codigo_DANE == "" || $scope.Institucion.Nombre_Colegio == "" || $scope.Institucion.Direccion == ""
            //           || $scope.Institucion.Correo_Colegio == "" || $scope.Institucion.Num_Resolucion == "" || $scope.Institucion.Municipio == "" || $scope.Institucion.Tipo == ""
            //           || $scope.Institucion.Nombre_Rector == "" || $scope.Institucion.Apellidos_Rector == "" || $scope.Institucion.Telefono_Rector == ""
            //           || $scope.Institucion.Correo_Rector == "" || $scope.Institucion.Nombre_Coordinador == "" || $scope.Institucion.Apellidos_Coordinador == ""
            //           || $scope.Institucion.Telefono_Coordinador == "" || $scope.Institucion.Correo_Coordinador == "") {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe diligenciar todos los campos",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.GuardarInstitucion($scope.Institucion, function (response) {
            //               if (response.success == true) {
            //                   $("#modalRegistrarInstitucion").modal("hide");
            //                   $scope.LimpiarInstitucion();
            //                   TecnicaService.ConsultarInstituciones(function (response) {
            //                       if (response.success == true) {
            //                           $scope.datalistsInst = response.datos;
            //                           $scope.ListaCompleta = response.datos;
            //                           $scope.Datos = $scope.datalistsInst;
            //                           $scope.numberOfPages = function () {
            //                               return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
            //                           };
            //                           bootbox.dialog({
            //                               title: "Información",
            //                               message: "El registro se realizó con éxito",
            //                               buttons: {
            //                                   success: {
            //                                       label: "Cerrar",
            //                                       className: "btn-primary",
            //                                   }
            //                               }
            //                           });
            //                       }
            //                   });
            //               } else {
            //                   bootbox.dialog({
            //                       title: "Información",
            //                       message: "El NIT de la institución ya se encuentra registrado",
            //                       buttons: {
            //                           success: {
            //                               label: "Cerrar",
            //                               className: "btn-primary",
            //                           }
            //                       }
            //                   });
            //               }
            //           });
            //       }
            //   };

            //   $scope.GuardarPrograma = function () {
            //       $scope.Programa.NombrePrograma = $scope.Programa.NombrePrograma.toUpperCase();
            //       $scope.Programa.Red_Tecnologica = $scope.Programa.Red_Tecnologica.toUpperCase();
            //       $scope.Programa.Estado = true;
            //       TecnicaService.GuardarPrograma($scope.Programa, function (response) {
            //           if (response.success) {
            //               $("#ModalRegistrarPrograma").modal("hide");
            //               $scope.LimpiarPrograma();
            //               TecnicaService.CargarProgramas(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsProg = response.datos;
            //                       $scope.ListaCompleta = response.datos;
            //                       $scope.Datos = $scope.datalistsProg;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
            //                       };
            //                       bootbox.dialog({
            //                           title: "Información",
            //                           message: "El registro se realizó con éxito",
            //                           buttons: {
            //                               success: {
            //                                   label: "Cerrar",
            //                                   className: "btn-primary",
            //                               }
            //                           }
            //                       });
            //                   }
            //               });
            //           } else {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El programa ya se encuentra registrado",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.GuardarDocentePar = function () {
            //       TecnicaService.GuardarDocentePar($scope.DocentePar, function (response) {
            //           if (response.success) {
            //               $("#ModalRegistrarDocentePar").modal("hide");
            //               $scope.LimpiarDocentePar();
            //               TecnicaService.CargarDocentePar(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsDocPar = response.datos;
            //                       $scope.ListaCompleta = response.datos;
            //                       $scope.Datos = $scope.datalistsDocPar;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsDocPar.length / $scope.pageSize);
            //                       };
            //                       bootbox.dialog({
            //                           title: "Información",
            //                           message: "El registro se realizó con éxito",
            //                           buttons: {
            //                               success: {
            //                                   label: "Cerrar",
            //                                   className: "btn-primary",
            //                               }
            //                           }
            //                       });
            //                   }
            //               });
            //           } else {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El Docente ya se encuentra registrado",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.GuardarInstructor = function () {
            //       TecnicaService.GuardarInstructor($scope.InstructorSENA, function (response) {
            //           if (response.success) {
            //               $("#ModalRegistrarInstructor").modal("hide");
            //               $scope.LimpiarInstructorSENA();
            //               TecnicaService.CargarInstructores(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsI = response.datos;
            //                       $scope.ListaCompleta = response.datos;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsI.length / $scope.pageSize);
            //                       };
            //                   }
            //               });
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se realizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           } else {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El Instructor ya se encuentra registrado",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.GuardarProgramacion = function () {

            //       $scope.MediaTecnica.Hora_Inicio = $("#inicialProg").val();
            //       $scope.MediaTecnica.Hora_Fin = $("#finalProg").val();

            //       var D = "";
            //       D += ($scope.Dias.Lunes != false) ? "LUNES - " : "";
            //       D += ($scope.Dias.Martes != false) ? "MARTES - " : "";
            //       D += ($scope.Dias.Miercoles != false) ? "MIERCOLES - " : "";
            //       D += ($scope.Dias.Jueves != false) ? "JUEVES - " : "";
            //       D += ($scope.Dias.Viernes != false) ? "VIERNES - " : "";
            //       D += ($scope.Dias.Sabado != false) ? "SABADO - " : "";
            //       D += ($scope.Dias.Domingo != false) ? "DOMINGO - " : "";
            //       var num = D.length;
            //       var Cale = D.substring(0, num - 3);
            //       $scope.MediaTecnica.Dias = Cale;
            //       $scope.MediaTecnica.Hora_Inicio = $("#inicialProg").val();
            //       $scope.MediaTecnica.Hora_Fin = $("#finalProg").val();
            //       TecnicaService.GuardarProgramacion($scope.MediaTecnica, function (response) {
            //           if (response.success) {
            //               $('#modalRegistrarProgramacion').modal('hide');
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se realizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               $scope.LimpiarCalendar();
            //               $scope.calendarioVacio();
            //               $('#borrarFiltro').attr("disabled", true);
            //           } else {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "La programación no se puede registrar",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   }

            //   $scope.GuardarAprendiz = function () {
            //       $scope.Aprendices.Estado = "Activo";
            //       debugger;
            //       TecnicaService.GuardarAprendiz($scope.Aprendices, function (response) {
            //           if (response.success) {
            //               $("#ModalAprendiz").modal("hide");
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se realizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               $scope.cargarAprendices();
            //           } else {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El documento ya se encuentra registrado",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.GuardarFicha = function () {
            //       var fechaIni = $("#FechaIniFich").val();
            //       var fechaFin = $("#FechaFinFicha").val();
            //       $scope.Ficha.Fecha_Inicio = fechaIni;
            //       $scope.Ficha.Fecha_Fin = fechaFin;
            //       $scope.Ficha.Estado = "Activa";
            //       TecnicaService.GuardarFicha($scope.Ficha, function (response) {
            //           if (response.success) {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se realizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               TecnicaService.ConsultarFichas(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsFichas = response.Datos;
            //                       $scope.ListaCompleta = response.Datos;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
            //                       };

            //                   }
            //               });
            //               $("#ModalFicha").modal("hide");
            //           } else {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "La ficha ya se encuentra registrada",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   //funciones para cambiar de estado
            //   $scope.inhabilitarinstitucion = function () {

            //       var Inst = $scope.datalistsInst.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       TecnicaService.inhabilitarinstitucion(Inst, function (response) {
            //           if (response.success) {
            //               $('#modalInhabilitarInstitucion').modal('hide');
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "La eliminación se realizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               TecnicaService.ConsultarInstituciones(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsInst = response.datos;
            //                       $scope.ListaCompleta = response.datos;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
            //                       };

            //                   }
            //               });
            //           }
            //       });

            //   };

            //   $scope.inhabilitarPrograma = function () {
            //       var Prog = $scope.datalistsProg.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });
            //       TecnicaService.inhabilitarPrograma(Prog, function (response) {
            //           if (response.success) {
            //               $('#modalInhabilitarPrograma').modal('hide');
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "La eliminación se realizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               TecnicaService.CargarProgramas(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsProg = response.datos;
            //                       $scope.ListaCompleta = response.datos;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
            //                       };

            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.EliminarProgramacion = function () {
            //       TecnicaService.EliminarProgramacion(eliminar, function (response) {
            //           if (response.success) {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "La eliminación se realizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               $scope.LimpiarCalendar();
            //               $scope.calendarioVacio();
            //               $('#borrarFiltro').attr("disabled", true);
            //               $('#ModalEditarProgramacion').modal("hide");
            //           }
            //       });
            //   };

            //   $scope.GuardarAprendizEstado = function () {
            //       TecnicaService.GuardarAprendizEstado($scope.Aprendices.Id, $scope.Aprendices.Estado, $scope.Novedades.Descripcion, function (response) {
            //           if (response.success) {
            //               $("#ModalAprendizEstado").modal("hide");
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se actualizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               $scope.cargarAprendices();
            //           } else {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "Debe debe seleccionar un estado diferente al actual",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.GuardarAprendizFicha = function () {
            //       TecnicaService.GuardarAprendizFicha($scope.Aprendices.Id, $scope.Aprendices.Ficha, $scope.Novedades.Descripcion, function (response) {
            //           if (response.success) {
            //               $("#ModalAprendizFicha").modal("hide");
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se actualizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               $scope.cargarAprendices();
            //           } else {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "Debe debe seleccionar una ficha diferente a la actual",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.inhabilitarFicha = function () {
            //       var Ficha = $scope.datalistsFichas.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });
            //       if (Ficha.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar una Ficha",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.inhabilitarFicha(Ficha[0].Id, function (response) {
            //               if (response.success) {
            //                   bootbox.dialog({
            //                       title: "Información",
            //                       message: "El registro se inhabilitó con éxito",
            //                       buttons: {
            //                           success: {
            //                               label: "Cerrar",
            //                               className: "btn-primary",
            //                           }
            //                       }
            //                   });
            //                   TecnicaService.ConsultarFichas(function (response) {
            //                       if (response.success == true) {
            //                           $scope.datalistsFichas = response.Datos;
            //                           $scope.ListaCompleta = response.Datos;
            //                           $scope.numberOfPages = function () {
            //                               return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
            //                           };

            //                       }
            //                   });
            //                   $("#ModalFicha").modal("hide");
            //               }
            //           });
            //       }
            //   };

            //   //funciones para actualizar registros
            //   $scope.Modificar = function () {

            //       var Inst = $scope.datalistsInst.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (Inst.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar un registro",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.Modificar(Inst, function (response) {
            //               if (response.success) {
            //                   $scope.Institucion.Id = response.datos.Id;
            //                   $scope.Institucion.NIT = response.datos.NIT;
            //                   $scope.Institucion.Codigo_DANE = response.datos.Codigo_DANE;
            //                   $scope.Institucion.Nombre_Colegio = response.datos.Nombre_Colegio;
            //                   $scope.Institucion.Direccion = response.datos.Direccion;
            //                   $scope.Institucion.Correo_Colegio = response.datos.Correo_Colegio;
            //                   $scope.Institucion.Num_Resolucion = response.datos.Num_Resolucion;
            //                   $scope.Institucion.Municipio = response.datos.Municipio;
            //                   $scope.Institucion.Tipo = response.datos.Tipo;
            //                   $scope.Institucion.Categoria = response.datos.Categoria;
            //                   $scope.Institucion.Nombre_Rector = response.datos.Nombre_Rector;
            //                   $scope.Institucion.Apellidos_Rector = response.datos.Apellidos_Rector;
            //                   $scope.Institucion.Telefono_Rector = response.datos.Telefono_Rector;
            //                   $scope.Institucion.Correo_Rector = response.datos.Correo_Rector;
            //                   $scope.Institucion.Nombre_Coordinador = response.datos.Nombre_Coordinador;
            //                   $scope.Institucion.Apellidos_Coordinador = response.datos.Apellidos_Coordinador;
            //                   $scope.Institucion.Telefono_Coordinador = response.datos.Telefono_Coordinador;
            //                   $scope.Institucion.Correo_Coordinador = response.datos.Correo_Coordinador;
            //                   $('.select2').select2({
            //                       placeholder: "Seleccione una opción...",
            //                       allowClear: true
            //                   });
            //                   $('#titlePanelEdit').text('Información de la Institución');
            //                   $('#atras1Edit').hide();
            //                   $('#atras2Edit').hide();
            //                   $('#siguiente2Edit').hide();
            //                   $('#siguiente1Edit').show();
            //                   $('#modalPanel1Edit').show();
            //                   $('#modalPanel2Edit').hide();
            //                   $('#modalPanel3Edit').hide();
            //                   $('#bol1Edit').css({ "background-color": "#286090", "color": "white" });
            //                   $('#bol2Edit').css({ "background-color": "white", "color": "#286090" });
            //                   $('#bol3Edit').css({ "background-color": "white", "color": "#286090" });
            //                   setTimeout(function () {
            //                       $('#CategoriaEdit ').val(response.datos.Categoria).trigger("change");
            //                       $('#municipioEdit').val(response.datos.Municipio).trigger("change");
            //                       $('#tipoEdit').val(response.datos.Tipo).trigger("change");
            //                   }, 100);
            //                   $('#modalModificarInstitucion').modal({ backdrop: 'static', keyboard: false });
            //                   $('#modalModificarInstitucion').modal('show');
            //               }
            //           });
            //       }
            //   }

            //   $scope.GuardarModificacion = function () {
            //       if ($scope.Institucion.NIT == "" || $scope.Institucion.Codigo_DANE == "" || $scope.Institucion.Nombre_Colegio == "" || $scope.Institucion.Direccion == ""
            //           || $scope.Institucion.Correo_Colegio == "" || $scope.Institucion.Num_Resolucion == "" || $scope.Institucion.Municipio == "" || $scope.Institucion.Tipo == ""
            //           || $scope.Institucion.Nombre_Rector == "" || $scope.Institucion.Apellidos_Rector == "" || $scope.Institucion.Telefono_Rector == ""
            //           || $scope.Institucion.Correo_Rector == "" || $scope.Institucion.Nombre_Coordinador == "" || $scope.Institucion.Apellidos_Coordinador == ""
            //           || $scope.Institucion.Telefono_Coordinador == "" || $scope.Institucion.Correo_Coordinador == "") {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe diligenciar todos los campos",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.GuardarModificacion($scope.Institucion, function (response) {
            //               if (response.success == true) {
            //                   $("#modalModificarInstitucion").modal("hide");
            //                   $scope.LimpiarInstitucion();
            //                   TecnicaService.ConsultarInstituciones(function (response) {
            //                       if (response.success == true) {
            //                           $scope.datalistsInst = response.datos;
            //                           $scope.ListaCompleta = response.datos;
            //                           $scope.Datos = $scope.datalistsInst;
            //                           $scope.numberOfPages = function () {
            //                               return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
            //                           };
            //                           bootbox.dialog({
            //                               title: "Información",
            //                               message: "El registro se actualizó con éxito",
            //                               buttons: {
            //                                   success: {
            //                                       label: "Cerrar",
            //                                       className: "btn-primary",
            //                                   }
            //                               }
            //                           });
            //                       }
            //                   });
            //               }
            //           });
            //       }
            //   };

            //   $scope.Modificar2 = function () {
            //       debugger;
            //       var Prog = $scope.datalistsProg.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (Prog.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar un registro",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.ModificarPrograma(Prog, function (response) {
            //               if (response.success) {
            //                   $scope.Programa.Id = response.datos.Id;
            //                   $scope.Programa.Codigo_Programa = response.datos.Codigo_Programa;
            //                   $scope.Programa.Red_Tecnologica = response.datos.Red_Tecnologica;
            //                   $scope.Programa.Version_Programa = response.datos.Version_Programa;
            //                   $scope.Programa.NombrePrograma = response.datos.NombrePrograma;
            //                   $scope.Programa.Estado = response.datos.Estado;
            //                   $('#ModalEditarPrograma').modal('show');
            //               }
            //           })
            //       }
            //   };

            //   $scope.GuardarEdicionPrograma = function () {
            //       TecnicaService.GuardarEdicionPrograma($scope.Programa, function (response) {
            //           if (response.success) {
            //               $("#ModalEditarPrograma").modal("hide");
            //               $scope.LimpiarPrograma();
            //               TecnicaService.CargarProgramas(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsProg = response.datos;
            //                       $scope.ListaCompleta = response.datos;
            //                       $scope.Datos = $scope.datalistsProg;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
            //                       };
            //                       bootbox.dialog({
            //                           title: "Información",
            //                           message: "El registro se actualizó con éxito",
            //                           buttons: {
            //                               success: {
            //                                   label: "Cerrar",
            //                                   className: "btn-primary",
            //                               }
            //                           }
            //                       });
            //                   }
            //               });
            //           }
            //       });
            //   }

            //   $scope.Modificar3 = function () {
            //       var DocPar = $scope.datalistsDocPar.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });
            //       if (DocPar.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar un registro",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.Modificar3(DocPar, function (response) {
            //               if (response.success) {
            //                   $scope.DocentePar.Id = response.datos.Id;
            //                   $scope.DocentePar.Telefono = response.datos.Telefono;
            //                   $scope.DocentePar.Nombres = response.datos.Nombres;
            //                   $scope.DocentePar.Apellidos = response.datos.Apellidos;
            //                   $scope.DocentePar.Email = response.datos.Email;
            //                   $scope.DocentePar.Id_Institucion = response.datos.Id_Institucion;
            //                   $scope.DocentePar.Id_Programa = response.datos.Id_Programa;
            //                   $('.select2').select2({
            //                       placeholder: "Seleccione una opción...",
            //                       allowClear: true
            //                   });
            //                   setTimeout(function () {
            //                       $('#InstDParEdit').val(response.datos.Id_Institucion).trigger('change');
            //                   }, 100);
            //                   setTimeout(function () {
            //                       $('#ProgDParEdit').val(response.datos.Id_Programa).trigger('change');
            //                   }, 300);
            //                   $('#ModalEditarDocentePar').modal('show');
            //               }
            //           });
            //       }
            //   };

            //   $scope.GuardarEdicionDocentePar = function () {
            //       TecnicaService.GuardarEdicionDocentePar($scope.DocentePar, function (response) {
            //           if (response.success) {
            //               $("#ModalEditarDocentePar").modal("hide");
            //               $scope.LimpiarDocentePar();
            //               TecnicaService.CargarDocentePar(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsDocPar = response.datos;
            //                       $scope.ListaCompleta = response.datos;
            //                       $scope.Datos = $scope.datalistsDocPar;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsDocPar.length / $scope.pageSize);
            //                       };
            //                       bootbox.dialog({
            //                           title: "Información",
            //                           message: "El registro se actualizó con éxito",
            //                           buttons: {
            //                               success: {
            //                                   label: "Cerrar",
            //                                   className: "btn-primary",
            //                               }
            //                           }
            //                       });
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.Modificar4 = function () {
            //       var Instruc = $scope.datalistsI.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (Instruc.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar un registro",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.Modificar4(Instruc, function (response) {
            //               if (response.success) {
            //                   $scope.InstructorSENA.Id = response.datos.Id;
            //                   $scope.InstructorSENA.Cedula = response.datos.Cedula;
            //                   $scope.InstructorSENA.Nombres = response.datos.Nombres;
            //                   $scope.InstructorSENA.Apellidos = response.datos.Apellidos;
            //                   $scope.InstructorSENA.Correo_Misena = response.datos.Correo_Misena;
            //                   $scope.InstructorSENA.Correo_Alternativo = response.datos.Correo_Alternativo;
            //                   $scope.InstructorSENA.Municipio = response.datos.Municipio;
            //                   $scope.InstructorSENA.Telefono_Fijo = response.datos.Telefono_Fijo;
            //                   $scope.InstructorSENA.Celular = response.datos.Celular;
            //                   $scope.InstructorSENA.Area = response.datos.Area;
            //                   $scope.InstructorSENA.Profesion = response.datos.Profesion;
            //                   $scope.InstructorSENA.Programa_Formacion = response.datos.Programa_Formacion;
            //                   $('#ModalEditarInstructor').modal('show');
            //               }
            //           });
            //       }
            //   };

            //   $scope.GuardarEdicionInstructor = function () {
            //       TecnicaService.GuardarEdicionInstructor($scope.InstructorSENA, function (response) {
            //           if (response.success) {
            //               $('#ModalEditarInstructor').modal('hide');
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se modificó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               TecnicaService.CargarInstructores(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsI = response.datos;
            //                       $scope.ListaCompleta = response.datos;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsI.length / $scope.pageSize);
            //                       };

            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.modificarProgramacion = function (id, instruc, grado, ficha, inicio, fin, tipo) {
            //       eliminar = 0;
            //       $scope.InstMedia = [];
            //       TecnicaService.ConsultarInstructorMedia(function (response) {
            //           if (response.success == true) {
            //               $.each(response.Datos, function (index, value) {
            //                   $scope.InstMedia.push({ Instruc: value })
            //               });
            //           }
            //       });
            //       TecnicaService.ConsultarProgramacionId(id, function (response) {
            //           debugger;
            //           if (response.success) {
            //               eliminar = response.datos.Id;
            //               $scope.MediaTecnica.Id = response.datos.Id;
            //               $scope.MediaTecnica.Hora_Inicio = response.datos.Hora_Inicio;
            //               $scope.MediaTecnica.Hora_Fin = response.datos.Hora_Fin;
            //               $scope.MediaTecnica.Grado = response.datos.Grado;
            //               $scope.MediaTecnica.Ficha = response.datos.Ficha;
            //               $scope.MediaTecnica.Instructor = response.datos.Instructor;
            //               $scope.MediaTecnica.Dias = response.datos.Dias;

            //               if (response.ds.Parametro15 == "true") {
            //                   $("#1Edit").prop('checked', true);
            //                   $scope.Dias.Lunes = true;
            //               } else {
            //                   $("#1Edit").prop('checked', false);
            //                   $scope.Dias.Lunes = false;
            //               }
            //               if (response.ds.Parametro16 == "true") {
            //                   $("#2Edit").prop('checked', true);
            //                   $scope.Dias.Martes = true;
            //               } else {
            //                   $("#2Edit").prop('checked', false);
            //                   $scope.Dias.Martes = false;
            //               }
            //               if (response.ds.Parametro17 == "true") {
            //                   $("#3Edit").prop('checked', true);
            //                   $scope.Dias.Miercoles = true;
            //               } else {
            //                   $("#3Edit").prop('checked', false);
            //                   $scope.Dias.Miercoles = false;
            //               }
            //               if (response.ds.Parametro18 == "true") {
            //                   $("#4Edit").prop('checked', true);
            //                   $scope.Dias.Jueves = true;
            //               } else {
            //                   $("#4Edit").prop('checked', false);
            //                   $scope.Dias.Jueves = false;
            //               }
            //               if (response.ds.Parametro19 == "true") {
            //                   $("#5Edit").prop('checked', true);
            //                   $scope.Dias.Viernes = true;
            //               } else {
            //                   $("#5Edit").prop('checked', false);
            //                   $scope.Dias.Viernes = false;
            //               }
            //               if (response.ds.Parametro20 == "true") {
            //                   $("#6Edit").prop('checked', true);
            //                   $scope.Dias.Sabado = true;
            //               } else {
            //                   $("#6Edit").prop('checked', false);
            //                   $scope.Dias.Sabado = false;
            //               }
            //               if (response.ds.parametro21 == "true") {
            //                   $("#7Edit").prop('checked', true);
            //                   $scope.Dias.Domingo = true;
            //               } else {
            //                   $("#7Edit").prop('checked', false);
            //                   $scope.Dias.Domingo = false;
            //               }

            //               $('.datetimepicker3').datetimepicker({
            //                   defaultDate: false,
            //                   format: 'LT'
            //               });

            //               $('.select2').select2({
            //                   placeholder: "Seleccione una opción...",
            //                   allowClear: true
            //               });

            //               setTimeout(function () {
            //                   $('#instrucEdit').val(response.datos.Instructor).trigger("change");
            //                   $("#fichaaE").val(response.datos.Ficha).trigger("change");
            //               }, 100);

            //               $('#nameInstruc').text(instruc);
            //               $('#TextIni').text(inicio);
            //               $('#TextFin').text(fin);
            //               if (tipo == 0) {
            //                   $('#spnInst').text("Institución: ");
            //               } else {
            //                   $('#spnInst').text("Instructor: ");
            //               }
            //               $('#TextInst').text(response.Lista[0].Institucion);
            //               $('#TextProg').text(response.Lista[0].Programa);
            //               $('#TextFi').text(ficha);
            //               $('#InfoProggra').show();
            //               $('#ProgramacionE').hide();
            //               $('#btnEditarProg').text('Editar');
            //               $('#btnEditarProg').addClass('btnEditarProg');
            //               $('#btnEliminarProg').removeAttr("disabled");
            //               $('#btnGuardarProg').attr("disabled", true);
            //               $("#ModalEditarProgramacion").modal("show");
            //           }
            //       });

            //   };

            //   $scope.GuardarModificacionProgramacion = function () {
            //       $scope.MediaTecnica.Hora_Inicio = $('#inicialEdit').val();
            //       $scope.MediaTecnica.Hora_Fin = $('#finalEdit').val();
            //       var D = "";
            //       D += ($scope.Dias.Lunes != false) ? "LUNES - " : "";
            //       D += ($scope.Dias.Martes != false) ? "MARTES - " : "";
            //       D += ($scope.Dias.Miercoles != false) ? "MIERCOLES - " : "";
            //       D += ($scope.Dias.Jueves != false) ? "JUEVES - " : "";
            //       D += ($scope.Dias.Viernes != false) ? "VIERNES - " : "";
            //       D += ($scope.Dias.Sabado != false) ? "SABADO - " : "";
            //       D += ($scope.Dias.Domingo != false) ? "DOMINGO - " : "";
            //       var num = D.length;
            //       var Cale = D.substring(0, num - 3);
            //       $scope.MediaTecnica.Dias = Cale;
            //       $scope.MediaTecnica.Hora_Inicio = $('#inicialEdit').val();
            //       $scope.MediaTecnica.Hora_Fin = $('#finalEdit').val();
            //       $scope.MediaTecnica.Hora_Inicio = $("#inicialEdit").val();
            //       console.log($("#inicialEdit").val())
            //       TecnicaService.GuardarModificacionProgramacion($scope.MediaTecnica, function (response) {
            //           if (response.success) {
            //               $('#ModalEditarProgramacion').modal('hide');
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se modificó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               $scope.LimpiarCalendar();
            //               $scope.calendarioVacio();
            //               $('#borrarFiltro').attr("disabled", true);
            //           }
            //       });
            //   };

            //   //$scope.ModificarA = function () {
            //   //    var Aprendiz = $scope.datalistsApren.filter(function (item) {
            //   //        return item.Seleccionado === true;
            //   //    });

            //   //    if (Aprendiz.length != 1) {
            //   //        bootbox.dialog({
            //   //            title: "Información",
            //   //            message: "Debe seleccionar un aprendiz",
            //   //            buttons: {
            //   //                success: {
            //   //                    label: "Cerrar",
            //   //                    className: "btn-primary",
            //   //                }
            //   //            }
            //   //        });
            //   //    } else {
            //   //        $scope.Aprendices.Id = Aprendiz[0].Id;
            //   //        $scope.Aprendices.Documento = parseInt(Aprendiz[0].Documento);
            //   //        $scope.Aprendices.Nombre = Aprendiz[0].Nombre;
            //   //        $scope.Aprendices.Apellido = Aprendiz[0].Apellido;
            //   //        $scope.Aprendices.Email = Aprendiz[0].Email;
            //   //        $scope.Aprendices.Telefono = parseInt(Aprendiz[0].Telefono);
            //   //        $scope.Aprendices.Estado = Aprendiz[0].Estado;
            //   //        $scope.Aprendices.Descripcion = Aprendiz[0].Descripcion;
            //   //        $scope.Aprendices.TipoDocumento = Aprendiz[0].TipoDocumento;
            //   //        $scope.Aprendices.NombreAcudiente = Aprendiz[0].NomAcudiente;
            //   //        $scope.Aprendices.TelAcudiente = Aprendiz[0].TelAcudiente;
            //   //        $("#ModalAprendizEdit").modal("show");
            //   //    }
            //   //};

            //   $scope.GuardarAprendizEdit = function () {
            //       TecnicaService.GuardarAprendizEdit($scope.Aprendices, function (response) {
            //           if (response.success) {
            //               $("#ModalAprendizEdit").modal("hide");
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se actualizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               $scope.cargarAprendices();
            //           } else {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El documento ya se encuentra registrado",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //           }
            //       });
            //   };

            //   $scope.ModificarF = function () {
            //       var Ficha = $scope.datalistsFichas.filter(function (item) {
            //           return item.Seleccionado === true;
            //       });

            //       if (Ficha.length != 1) {
            //           bootbox.dialog({
            //               title: "Información",
            //               message: "Debe seleccionar una Ficha",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //       } else {
            //           TecnicaService.ConsultarFichaId(Ficha[0].Id, function (response) {
            //               if (response.success) {
            //                   $("#numFicEdit").attr("disabled", true);
            //                   $scope.Ficha = response.Datos;
            //                   $('.select2').select2({
            //                       placeholder: "Seleccione una opción...",
            //                       allowClear: true
            //                   });
            //                   setTimeout(function () {
            //                       $("#InstFichaEdit").val(response.Datos.Institucion).trigger("change");
            //                       $("#ProgFichaEdit").val(response.Datos.Programa).trigger("change");
            //                   }, 100);
            //                   $('#FechaIniFichEdit').datetimepicker({
            //                       useCurrent: false,
            //                       format: 'YYYY/MM/DD',
            //                       locale: 'es',

            //                   });
            //                   $('#FechaFinFichaEdit').datetimepicker({
            //                       useCurrent: false,
            //                       format: 'YYYY/MM/DD',
            //                       locale: 'es',
            //                   });
            //                   TecnicaService.CargarProgramas(function (response) {
            //                       if (response.success) {
            //                           $scope.selectdatalistsProg = response.datos;
            //                       }
            //                   });
            //                   $("#ModalFichaEdit").modal("show");
            //               }
            //           });
            //       }
            //   };

            //   $scope.GuardarFichaEdit = function () {
            //       var fechaIni = $("#FechaIniFichEdit").val();
            //       var fechaFin = $("#FechaFinFichaEdit").val();
            //       $scope.Ficha.Fecha_Inicio = fechaIni;
            //       $scope.Ficha.Fecha_Fin = fechaFin;
            //       TecnicaService.GuardarFichaEdit($scope.Ficha, function (response) {
            //           if (response.success) {
            //               bootbox.dialog({
            //                   title: "Información",
            //                   message: "El registro se actualizó con éxito",
            //                   buttons: {
            //                       success: {
            //                           label: "Cerrar",
            //                           className: "btn-primary",
            //                       }
            //                   }
            //               });
            //               TecnicaService.ConsultarFichas(function (response) {
            //                   if (response.success == true) {
            //                       $scope.datalistsFichas = response.Datos;
            //                       $scope.ListaCompleta = response.Datos;
            //                       $scope.numberOfPages = function () {
            //                           return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
            //                       };

            //                   }
            //               });
            //               $("#ModalFichaEdit").modal("hide");
            //           }
            //       });
            //   };

            //   //funciones para filtrar las tablas
            //   $scope.Filtrar = function (e) {
            //       var Busqueda = $("#Buscar").val();
            //       var exp = new RegExp(Busqueda);
            //       if (Busqueda == "") {
            //           TecnicaService.ConsultarInstituciones(function (response) {
            //               if (response.success == true) {

            //                   $scope.datalistsInst = response.datos;
            //                   $scope.ListaCompleta = response.datos;
            //                   $scope.numberOfPages = function () {
            //                       return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
            //                   };
            //                   $scope.Datos = $scope.datalistsInst;

            //               }
            //           });
            //       }
            //       var Instructor = [];
            //       $scope.datalistsInst = $scope.ListaCompleta;
            //       Instructor = $scope.datalistsInst.filter(function (item) {

            //           if (exp.test(item.Nombre_Colegio.toLowerCase()) || exp.test(item.Nombre_Colegio.toUpperCase())) {
            //               return item;
            //           }

            //           else if (exp.test(item.Direccion.toLowerCase()) || exp.test(item.Direccion.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.Municipio.toLowerCase()) || exp.test(item.Municipio.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.Tipo.toLowerCase()) || exp.test(item.Tipo.toUpperCase())) {
            //               return item;
            //           }


            //       });
            //       $scope.datalistsInst = Instructor;
            //       //Variable para setear la paginación 
            //       $scope.curPage = 0;
            //   };

            //   $scope.Filtrar2 = function (e) {
            //       var Busqueda = $("#Buscar2").val();
            //       var exp = new RegExp(Busqueda);
            //       if (Busqueda == "") {
            //           TecnicaService.CargarProgramas(function (response) {
            //               if (response.success == true) {

            //                   $scope.datalistsProg = response.datos;
            //                   $scope.ListaCompleta = response.datos;
            //                   $scope.numberOfPages = function () {
            //                       return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
            //                   };
            //                   $scope.Datos = $scope.datalistsProg;

            //               }
            //           });
            //       }
            //       var Programa = [];
            //       $scope.datalistsProg = $scope.ListaCompleta;
            //       Programa = $scope.datalistsProg.filter(function (item) {
            //           if (exp.test(item.NombrePrograma.toLowerCase()) || exp.test(item.NombrePrograma.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.Codigo_Programa) || exp.test(item.Codigo_Programa)) {
            //               return item;
            //           }
            //           else if (exp.test(item.Red_Tecnologica.toLowerCase()) || exp.test(item.Red_Tecnologica.toUpperCase())) {
            //               return item;
            //           }


            //       });
            //       $scope.datalistsProg = Programa;
            //       //Variable para setear la paginación 
            //       $scope.curPage = 0;
            //   };

            //   $scope.Filtrar3 = function (e) {
            //       var Busqueda = $("#Buscar3").val();
            //       var exp = new RegExp(Busqueda);
            //       if (Busqueda == "") {
            //           TecnicaService.CargarDocentePar(function (response) {
            //               if (response.success == true) {

            //                   $scope.datalistsDocPar = response.datos;
            //                   $scope.ListaCompleta = response.datos;
            //                   $scope.numberOfPages = function () {
            //                       return Math.ceil($scope.datalistsDocPar.length / $scope.pageSize);
            //                   };
            //                   $scope.Datos = $scope.datalistsDocPar;

            //               }
            //           });
            //       }
            //       var Programa = [];
            //       $scope.datalistsDocPar = $scope.ListaCompleta;
            //       Programa = $scope.datalistsDocPar.filter(function (item) {
            //           if (exp.test(item.Nombres.toLowerCase()) || exp.test(item.Nombres.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.Apellidos.toLowerCase()) || exp.test(item.Apellidos.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.Institucion.toLowerCase()) || exp.test(item.Institucion.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.Programa.toLowerCase()) || exp.test(item.Programa.toUpperCase())) {
            //               return item;
            //           }


            //       });
            //       $scope.datalistsDocPar = Programa;
            //       //Variable para setear la paginación 
            //       $scope.curPage = 0;
            //   };

            //   $scope.Filtrar4 = function (e) {
            //       var Busqueda = $("#Buscar4").val();
            //       var exp = new RegExp(Busqueda);
            //       if (Busqueda == "") {
            //           TecnicaService.CargarInstructores(function (response) {
            //               if (response.success == true) {

            //                   $scope.datalistsI = response.datos;
            //                   $scope.ListaCompleta = response.datos;
            //                   $scope.numberOfPages = function () {
            //                       return Math.ceil($scope.datalistsI.length / $scope.pageSize);
            //                   };
            //                   $scope.Datos = $scope.datalistsI;

            //               }
            //           });
            //       }
            //       var Programa = [];
            //       $scope.datalistsI = $scope.ListaCompleta;
            //       Programa = $scope.datalistsI.filter(function (item) {

            //           if (exp.test(item.Cedula.toLowerCase()) || exp.test(item.Cedula.toUpperCase())) {

            //               return item;
            //           }

            //           else if (exp.test(item.Nombre.toLowerCase()) || exp.test(item.Nombre.toUpperCase())) {
            //               return item;
            //           }

            //           else if (exp.test(item.Apellido.toLowerCase()) || exp.test(item.Apellido.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.Email.toLowerCase()) || exp.test(item.Email.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.Telefono.toLowerCase()) || exp.test(item.Telefono.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.NombreTipoContrato.toLowerCase()) || exp.test(item.NombreTipoContrato.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.NombreTipoInstructor.toLowerCase()) || exp.test(item.NombreTipoInstructor.toUpperCase())) {
            //               return item;
            //           }

            //       });
            //       $scope.datalistsI = Programa;
            //       //Variable para setear la paginación 
            //       $scope.curPage = 0;
            //   };

            //   $('#btnEditarProg').click(function () {
            //       if ($('#btnEditarProg').hasClass('btnEditarProg')) {
            //           $('#InfoProggra').hide();
            //           $('#ProgramacionE').show();
            //           $('#btnEditarProg').removeClass('btnEditarProg');
            //           $('#btnEditarProg').text('Cancelar');
            //           $('#btnEliminarProg').attr("disabled", true);
            //           $('#btnGuardarProg').removeAttr("disabled");
            //       } else {
            //           $('#InfoProggra').show();
            //           $('#ProgramacionE').hide();
            //           $('#btnEditarProg').text('Editar');
            //           $('#btnEditarProg').addClass('btnEditarProg');
            //           $('#btnEliminarProg').removeAttr("disabled");
            //           $('#btnGuardarProg').attr("disabled", true);
            //       }

            //   });

            //   //Funciones para subir archivos excel
            //   $scope.UploadFileWeb4 = function () {
            //       $("#fileUploadWeb4").trigger('click');
            //   };

            //   $("#fileUploadWeb4").change(function () {
            //       dataweb = new FormData();

            //       var files = $("#fileUploadWeb4").get(0).files;

            //       var fileExtension = ['xlsx'];
            //       if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            //           bootbox.dialog({
            //               title: "Importar Archivo",
            //               message: "La extencion del archivo no es valida",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //           $("#fileUploadWeb4").replaceWith($("#fileUploadWeb4").val('').clone(true));

            //           //waitingDialog.hide();
            //           return false;

            //       }


            //       // Add the uploaded image content to the form data collection
            //       if (files.length > 0) {

            //           readURL(this, "logoweb");

            //           dataweb.append("UploadedImage", files[0]);
            //           if (dataweb != null) {
            //               TecnicaService.SubirArchivo(dataweb, function (response) {
            //                   if (response.success) {

            //                       bootbox.dialog({
            //                           title: "Importar Archivo",
            //                           message: "La importación del archivo se realizó con éxito ",
            //                           buttons: {
            //                               success: {
            //                                   label: "Cerrar",
            //                                   className: "btn-primary",
            //                               }
            //                           }
            //                       });



            //                       $scope.path = response.path;

            //                       $("#fileUploadWeb4").replaceWith($("#fileUploadWeb4").val('').clone(true));
            //                       TecnicaService.CargarInstructores(function (response) {
            //                           if (response.success == true) {
            //                               $scope.datalistsI = response.datos;
            //                               $scope.ListaCompleta = response.datos;
            //                               $scope.numberOfPages = function () {
            //                                   return Math.ceil($scope.datalistsI.length / $scope.pageSize);
            //                               };

            //                           }
            //                       });

            //                       $("#fileUploadWeb4").replaceWith($("#fileUploadWeb4").val('').clone(true));
            //                       //waitingDialog.hide();

            //                       return;
            //                   }

            //               });
            //           }

            //       }

            //   });

            //   function readURL(input, control) {
            //       if (input.files && input.files[0]) {
            //           var reader = new FileReader();

            //           reader.onload = function (e) {
            //               $('#' + control + '').attr('src', e.target.result);
            //           }

            //           reader.readAsDataURL(input.files[0]);
            //       }
            //   };

            //   $('#subirExcelProgramacion').click(function () {
            //       $("#fileUploadWeb5").trigger('click');
            //   });

            //   $("#fileUploadWeb5").change(function () {
            //       $('#modalRegistrarProgramacion').modal('hide');
            //       dataweb = new FormData();

            //       var files = $("#fileUploadWeb5").get(0).files;

            //       var fileExtension = ['xlsx'];
            //       if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            //           bootbox.dialog({
            //               title: "Importar Archivo",
            //               message: "La extencion del archivo no es valida",
            //               buttons: {
            //                   success: {
            //                       label: "Cerrar",
            //                       className: "btn-primary",
            //                   }
            //               }
            //           });
            //           $("#fileUploadWeb5").replaceWith($("#fileUploadWeb5").val('').clone(true));

            //           //waitingDialog.hide();
            //           return false;

            //       }


            //       // Add the uploaded image content to the form data collection
            //       if (files.length > 0) {

            //           readURL(this, "logoweb");

            //           dataweb.append("UploadedImage", files[0]);
            //           if (dataweb != null) {
            //               TecnicaService.SubirArchivoProgramacion(dataweb, function (response) {
            //                   if (response.success) {

            //                       bootbox.dialog({
            //                           title: "Importar Archivo",
            //                           message: "La importación del archivo se realizó con éxito ",
            //                           buttons: {
            //                               success: {
            //                                   label: "Cerrar",
            //                                   className: "btn-primary",
            //                               }
            //                           }
            //                       });



            //                       $scope.path = response.path;

            //                       $("#fileUploadWeb5").replaceWith($("#fileUploadWeb5").val('').clone(true));
            //                       //TecnicaService.CargarInstructores(function (response) {
            //                       //    if (response.success == true) {
            //                       //        console.log(response.datos)
            //                       //        $scope.datalistsI = response.datos;
            //                       //        $scope.ListaCompleta = response.datos;
            //                       //        $scope.numberOfPages = function () {
            //                       //            return Math.ceil($scope.datalistsI.length / $scope.pageSize);
            //                       //        };

            //                       //    }
            //                       //});

            //                       $("#fileUploadWeb5").replaceWith($("#fileUploadWeb5").val('').clone(true));
            //                       //waitingDialog.hide();

            //                       return;
            //                   }

            //               });
            //           }

            //       }

            //   });

            //   $scope.FiltrarA = function (e) {
            //       var Busqueda = $("#BuscarA").val();
            //       var exp = new RegExp(Busqueda);
            //       if (Busqueda == "") {
            //           TecnicaService.ConsultarAprendices(function (response) {
            //               if (response.success == true) {
            //                   $scope.datalistsApren = response.Datos;
            //                   $scope.ListaCompleta = response.Datos;
            //                   $scope.numberOfPages = function () {
            //                       return Math.ceil($scope.datalistsApren.length / $scope.pageSize);
            //                   };

            //               }
            //           });
            //       }
            //       var Aprendiz = [];
            //       $scope.datalistsApren = $scope.ListaCompleta;
            //       Aprendiz = $scope.datalistsApren.filter(function (item) {

            //           if (exp.test(item.Documento) || exp.test(item.Documento)) {

            //               return item;
            //           }
            //           else if (exp.test(item.Nombre.toLowerCase()) || exp.test(item.Nombre.toUpperCase())) {
            //               return item;
            //           }
            //           else if (exp.test(item.Apellido.toLowerCase()) || exp.test(item.Apellido.toUpperCase())) {
            //               return item;
            //           }




            //       });
            //       $scope.datalistsApren = Aprendiz;
            //       //Variable para setear la paginación 
            //       $scope.curPage = 0;
            //   };

            //   $scope.FiltrarF = function (e) {
            //       var Busqueda = $("#BuscarF").val();
            //       var exp = new RegExp(Busqueda);
            //       if (Busqueda == "") {
            //           TecnicaService.ConsultarFichas(function (response) {
            //               if (response.success == true) {
            //                   $scope.datalistsFichas = response.Datos;
            //                   $scope.ListaCompleta = response.Datos;
            //                   $scope.numberOfPages = function () {
            //                       return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
            //                   };

            //               }
            //           });
            //       }
            //       var FIcha = [];
            //       $scope.datalistsFichas = $scope.ListaCompleta;
            //       FIcha = $scope.datalistsFichas.filter(function (item) {

            //           if (exp.test(item.Num_Ficha) || exp.test(item.Num_Ficha)) {

            //               return item;
            //           }
            //           else if (exp.test(item.Programa.toLowerCase()) || exp.test(item.Programa.toUpperCase())) {
            //               return item;
            //           }
            //       });
            //       $scope.datalistsFichas = FIcha;
            //       //Variable para setear la paginación 
            //       $scope.curPage = 0;
            //   };

        }]); ProgramacionApp.controller('TecnicaController',
 ['$scope', '$rootScope', '$location', 'TecnicaService', '$routeParams', '$sce',
     function ($scope, $rootScope, $location, TecnicaService, $routeParams, $sce) {

         $("#LabelAprendices").hide();
       
         $scope.curPage = 0;
         $scope.pageSize = 35;
         $scope.events = [];
         $scope.Reporte = [];
         var eliminar = 0;
         var valInsti;
         TecnicaService.ConsultarInstituciones(function (response) {
             $('#Buscar').hide();
             $('#Buscar2').hide();
             $('#Buscar3').hide();
             $('#Buscar4').hide();
             $('#BuscarA').hide();
             $('#BuscarF').hide();
             if (response.success == true) {
                 $scope.datalistsInst = response.datos;
                 $scope.ListaCompleta = response.datos;
                 $scope.numberOfPages = function () {
                     return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
                 };
             }
         });

         TecnicaService.ConsultarMunicipio(function (response) {
             $scope.Municipio = response.Datos;
         });

         TecnicaService.CargarInstructoresSENA(function (response) {
             if (response.success) {
                 $scope.PInstructor = response.datos;
             }
         });

         $scope.filtrarProgramacion = function () {
             var n1 = $('#instrucFil').val();
             $scope.CargarCalendario(n1);
             $('#borrarFiltro').removeAttr("disabled"),
                 $('#ModalFiltrarProgramacion').modal('hide');
         };

         // $scope.ModalFiltrarAprendices

         $scope.calendarioVacio = function () {
             $('#calendar').fullCalendar({
                 locale: 'es',
                 /*hiddenDays: [0],*/
                 header: {
                     left: 'title',
                     center: 'listDay,listWeek,month',
                     right: 'prev,next today'

                 },
                 views: {
                     listDay: {
                         buttonText: 'Día'
                     },
                     listWeek: {
                         buttonText: 'Semana'
                     }
                 },
                 timeFormat: 'h(:mm) a',
                 slotLabelFormat: "h(:mm) a",
                 theme: false,
                 height: 600,
                 //events: $scope.events,
                 //eventClick: function (event) {
                 //    var inicio = moment(event.FInicio).lang("es").format('dddd Do [de] MMMM [del] YYYY');
                 //    var fin = moment(event.FFin).lang("es").format('dddd Do [de] MMMM [del] YYYY');
                 //    $scope.Modificar4(event.Id, inicio, fin);
                 //}
             });
         };

         $scope.verDetalleInst = function () {
             var InstDetalle = $scope.datalistsInst.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (InstDetalle.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar una institución",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.verDetalleInst(InstDetalle, function (response) {
                     if (response.success == true) {

                         $('#titulo').text(response.Colegio[0].Nombre_Colegio);
                         $('#nitInst').text(response.Colegio[0].NIT);
                         $('#daneInst').text(response.Colegio[0].Codigo_DANE);
                         $('#direccionInst').text(response.Colegio[0].Direccion);
                         $('#municipioInst').text(response.Colegio[0].Municipio);
                         $('#resolucionInst').text(response.Colegio[0].Num_Resolucion);
                         $('#tipoInst').text(response.Colegio[0].Tipo);
                         $('#CategoriaI').text(response.Colegio[0].Categoria);
                         $('#correoInst').text(response.Colegio[0].Correo_Colegio);
                         $('#nombreRector').text(response.Colegio[0].Nombre_Rector);
                         $('#nombreCoord').text(response.Colegio[0].Nombre_Coordinador);
                         $('#apellidosRector').text(response.Colegio[0].Apellidos_Rector);
                         $('#apellidosCoord').text(response.Colegio[0].Apellidos_Coordinador);
                         $('#telefonoRector').text(response.Colegio[0].Telefono_Rector);
                         $('#telefonoCoord').text(response.Colegio[0].Telefono_Coordinador);
                         $('#correoRector').text(response.Colegio[0].Correo_Rector);
                         $('#correoCoord').text(response.Colegio[0].Correo_Coordinador);

                         $("#ModalDetalleInst").modal("show");
                     }
                 });
             }
         };

         //abrir modals
         $scope.modalRegistrarInstitucion = function () {
             $('.select2').select2({
                 placeholder: "Seleccione una opción...",
                 allowClear: true
             });
             $('#titlePanel').text('Información de la Institución');
             $('#atras1').hide();
             $('#atras2').hide();
             $('#siguiente2').hide();
             $('#siguiente1').show();
             $('#modalPanel1').show();
             $('#modalPanel2').hide();
             $('#modalPanel3').hide();
             $('#bol1').css({ "background-color": "#286090", "color": "white" });
             $('#bol2').css({ "background-color": "white", "color": "#286090" });
             $('#bol3').css({ "background-color": "white", "color": "#286090" });
             $scope.LimpiarInstitucion();
             $('#modalRegistrarInstitucion').modal({ backdrop: 'static', keyboard: false });
             $('#modalRegistrarInstitucion').modal('show');
         };

         $scope.CambiarEstado = function () {

             var Inst = $scope.datalistsInst.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (Inst.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un registro",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 $('#modalInhabilitarInstitucion').modal('show');
             }
         };

         $scope.modalRegistrarPrograma = function () {
             $scope.LimpiarPrograma();
             $('#ModalRegistrarPrograma').modal('show');
         };

         $scope.CambiarEstado2 = function () {
             var Prog = $scope.datalistsProg.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (Prog.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un registro",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 $('#modalInhabilitarPrograma').modal('show');
             }
         };

         $scope.modalAgregarProgramas = function () {
             $('.select2').select2({
                 placeholder: "Seleccione una opción...",
                 allowClear: true
             });
             $('#selectProg').hide();
             setTimeout(function () {
                 $('#InstAddProg').val("").trigger('change');
                 $('#ProgAddProg').val("").trigger('change');
             });
             $scope.Ids = [];
             $scope.AddProgs = [];
             $('#divTabla').hide();
             $('#InstAddProg').removeAttr("disabled");
             $('#btnLimpiar').attr("disabled", true);
             $('#modalAgregarProgramas').modal({ backdrop: 'static', keyboard: false });
             $('#modalAgregarProgramas').modal('show');
         };

         $scope.filltrarProg = function () {
             $('#tablaresultadofiltro').hide();
             $('.select2').select2({
                 placeholder: "Seleccione una opción...",
                 allowClear: true
             });
             setTimeout(function () {
                 $('#InstFiltro').val("").trigger("change");
             }, 100);
             $('#InstFiltro').removeAttr("disabled");
             $scope.datalistsInstFilter = [];
             $('#btnLimpiarFiltro').attr("disabled", true);
             $('#filtrarProgramacion').modal('show');
             $('#btnBuscarFiltro').removeAttr("disabled");
         };

         $scope.modalRegistrarDocentePar = function () {
             $('.select2').select2({
                 placeholder: "Seleccione una opción...",
                 allowClear: true
             });
             $scope.LimpiarDocentePar();
             $('#ModalRegistrarDocentePar').modal('show');
         };

         $scope.verTodo = function () {

             var id = $scope.datalistsI.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (id.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un registro",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.ConsultarIntuctorId(id, function (response) {
                     if (response.success) {
                         $('#nombreView').text((response.datos.Nombres + " " + response.datos.Apellidos).toUpperCase());
                         $('#cedulaView').text(response.datos.Cedula.toUpperCase());
                         $('#misenaView').text(response.datos.Correo_Misena.toUpperCase());
                         $('#personalView').text(response.datos.Correo_Alternativo.toUpperCase());
                         $('#municipioView').text(response.datos.Municipio.toUpperCase());
                         $('#fijoView').text(response.datos.Telefono_Fijo.toUpperCase());
                         $('#celView').text(response.datos.Celular.toUpperCase());
                         $('#areaView').text(response.datos.Area.toUpperCase());
                         $('#profesionView').text(response.datos.Profesion.toUpperCase());
                         if (response.datos.Programa_Formacion != null) {
                             $('#programaView').text(response.datos.Programa_Formacion.toUpperCase());
                         } else {
                             $('#programaView').text("");
                         }
                         $('#modalViewInfo').modal('show');
                     }
                 });
             }
         };

         $scope.modalRegistrarInstructor = function () {
             $scope.LimpiarInstructorSENA();
             $('#ModalRegistrarInstructor').modal('show');
         };

         $scope.ModalProgramacion = function () {
             $scope.LimpiarMediaTecnica();
             $scope.InstMedia = [];
             TecnicaService.ConsultarInstructorMedia(function (response) {
                 if (response.success == true) {
                     $.each(response.Datos, function (index, value) {
                         $scope.InstMedia.push({ Instruc: value })
                     });
                 }
             });
             $('.datetimepicker3').datetimepicker({
                 defaultDate: false,
                 useCurrent: false,
                 format: 'LT'
             });

             $('.select2').select2({
                 placeholder: "Seleccione una opción...",
                 allowClear: true
             });
             $('#modalRegistrarProgramacion').modal('show');
         };

         $scope.ModalFiltrarProgramacion = function () {
             setTimeout(function () {
                 $('#instrucFil').val("").trigger("change");
             }, 100);
             $('.select2').select2({
                 placeholder: "Seleccione una opción...",
                 allowClear: true
             });
             $("#ModalFiltrarProgramacion").modal("show");
         };

         //Función que permite filtrar los aprendices 

         $scope.filtrarAprendices = function () {
             debugger;
             var AprendiInstitucion = $('#filInstitucion')
             setTimeout(function () {
                 AprendiInstitucion.val('').trigger('change');
             }, 100);

             $scope.ficha = [];

             $("#BuscarA").hide();
             $("#ModalFiltrarAprendices").modal("show")
         };

         $scope.FiltrarAprendiz = {
             Colegios: "",
             ficha: "",
             Estado: ""

         };


         //Función para consultar las Instituciones

         $scope.FiltrarAprendices = function () {
             debugger;
             if (($scope.FiltrarAprendiz != null || $scope.FiltrarAprendiz != "")) {
                 TecnicaService.FiltrarAprendiz($scope.FiltrarAprendiz, function (response) {
                     if (response.success == true) {
                         $scope.Aprendices = response.datos;
                         $scope.datalistsApren = $scope.Aprendices
                         $scope.datalistsApren = response.datos;
                         // Función que permite mostrar mensaje en caso de que no se encuentren coinicdencias
                         if (response.datos.length > 0) {
                             $('#LabelAprendices').hide();
                         }
                         else {
                             $('#LabelAprendices').show();
                         }
                         $("#ModalFiltrarAprendices").modal("hide")
                     } else {
                         bootbox.dialog({
                             title: "Información",
                             message: "Se ha generado un error al momento de cargar los datos",
                             buttons: {
                                 success: {
                                     label: "Cerrar",
                                     className: "btn-primary",
                                 }
                             }
                         });
                     }
                 });
             } else {
                 bootbox.dialog({
                     title: "¡Cuidado!",
                     message: "Se debe seleccionar por lo menos una opción",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             }
         };

         $scope.BorrarFiltro = function (id) {
             if (id != undefined) {
                 $("#ModalFiltrar").modal('hide');
             }
         };

         $scope.agregarRegistroA = function () {
             $scope.VaciarCamposAprendiz();
             $("#ModalAprendiz").modal("show");
         };

         $scope.agregarRegistroF = function () {
             //$scope.VaciarCamposFicha();
             $('.select2').select2({
                 placeholder: "Seleccione una opción...",
                 allowClear: true
             });
             $('#FechaIniFich').datetimepicker({
                 useCurrent: false,
                 format: 'YYYY/MM/DD',
                 locale: 'es',

             });
             $('#FechaFinFicha').datetimepicker({
                 useCurrent: false,
                 format: 'YYYY/MM/DD',
                 locale: 'es',
             });
             $('#FechaIniFich').on('dp.change', function (e) {
                 var fecha = new Date($('#FechaIniFich').val());
                 $('#FechaFinFicha').data("DateTimePicker").minDate(fecha);
             });
             $scope.VaciarCamposFicha();
             TecnicaService.CargarProgramas(function (response) {
                 if (response.success) {
                     $scope.selectdatalistsProg = response.datos;
                 }
             });
             $("#ModalFicha").modal("show");
         };

         $scope.cambiarEstadoF = function () {
             var Ficha = $scope.datalistsFichas.filter(function (item) {
                 return item.Seleccionado === true;
             });
             if (Ficha.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar una Ficha",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 $("#modalInhabilitarFicha").modal("show");
             }
         };

         $scope.cambiarEstadoA = function () {
             debugger;
             var Aprendiz = $scope.datalistsApren.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (Aprendiz.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un aprendiz",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 $scope.Aprendices.Id = Aprendiz[0].Id;
                 $scope.Aprendices.Documento = Aprendiz[0].Documento;
                 $scope.Aprendices.Nombre = Aprendiz[0].Nombre;
                 $scope.Aprendices.Apellido = Aprendiz[0].Apellido;
                 $scope.Aprendices.Email = Aprendiz[0].Email;
                 $scope.Aprendices.Telefono = parseInt(Aprendiz[0].Telefono);
                 $scope.Aprendices.Estado = Aprendiz[0].Estado;
                 $('.select2').select2({
                     placeholder: "Seleccione una opción...",
                     allowClear: true
                 });
                 setTimeout(function () {
                     $("#AprenEstado").val($scope.Aprendices.Estado).trigger("change");
                 }, 100)
                 $("#ModalAprendizEstado").modal("show");
             }
         };

         $scope.verAprendices = function () {
             var FIcha = $scope.datalistsFichas.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (FIcha.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar una ficha",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.verAprendices(FIcha[0].Id, function (response) {
                     if (response.success) {
                         $scope.AprendiceFicha = response.Datos;
                     } else {
                         $("#BodyVerApren").append("<tr id='trNoResult'><td colspan='5' class='text-center'>No se encontraron aprendices asociados a esta ficha</td></tr>");
                     }
                 });
                 $("#TituloVerA").text(FIcha[0].Num_Ficha + " - " + FIcha[0].Programa);
                 $("#ModalVerAprendices").modal("show");
             }
         };

         $scope.verNovedades = function () {
             var FIcha = $scope.datalistsFichas.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (FIcha.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar una ficha",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.verNovedades(FIcha[0].Id, function (response) {
                     if (response.success) {
                         debugger;
                         $scope.NovedadesFicha = response.ListNovedades;
                         $("#ModalVerNovedades").modal("show");
                     }
                 })
             }
         };

         $scope.cambiarFichaA = function () {
             var Aprendiz = $scope.datalistsApren.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (Aprendiz.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un aprendiz",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.EstadoFicaAprendiz(Aprendiz[0].Ficha, function (response) {
                     if (response.success) {
                         $scope.Aprendices.Id = Aprendiz[0].Id;
                         $scope.Aprendices.DocumentoDocumento = parseInt(Aprendiz[0].Documento);
                         $scope.Aprendices.Nombre = Aprendiz[0].Nombre;
                         $scope.Aprendices.Apellido = Aprendiz[0].Apellido;
                         $scope.Aprendices.Email = Aprendiz[0].Email;
                         $scope.Aprendices.Telefono = parseInt(Aprendiz[0].Telefono);
                         $scope.Aprendices.Estado = Aprendiz[0].Estado;
                         $scope.Aprendices.Ficha = Aprendiz[0].Ficha;
                         $scope.Aprendices.TipoDocumento = Aprendiz[0].TipoDocumento;
                         $scope.Aprendices.NombreAcudiente = Aprendiz[0].NombreAcudiente;
                         $scope.Aprendices.TelAcudiente = Aprendiz[0].TelAcudiente;
                         $scope.Aprendices.Descripcion = Aprendiz[0].Descripcion;
                         $scope.Aprendices.Institucion = Aprendiz[0].Institucion;
                         $('.select2').select2({
                             placeholder: "Seleccione una opción...",
                             allowClear: true
                         });
                         setTimeout(function () {
                             $("#fichaAprenEdit").val($scope.Aprendices.Ficha).trigger("change");
                         }, 100);
                         $scope.Novedades.Descripcion = "";
                         $("#ModalAprendizFicha").modal("show");
                     } else {
                         bootbox.dialog({
                             title: "Información",
                             message: "La ficha actual del aprendiz ya no se encunetra activa",
                             buttons: {
                                 success: {
                                     label: "Cerrar",
                                     className: "btn-primary",
                                 }
                             }
                         });
                     }
                 });
             }
         };

         $("#ModalVerAprendices").on('hidden.bs.modal', function () {
             $("#trNoResult").remove();
             $scope.AprendiceFicha = null;
         });

         $('#btnEliminarProg').click(function () {
             bootbox.confirm({
                 title: "Confirmación",
                 message: "¿Está seguro que desea eliminar el registro?",
                 buttons: {
                     cancel: {
                         label: 'Cancelar',
                         className: 'btn-danger'
                     },
                     confirm: {
                         label: 'Aceptar',
                         className: 'btn-success'
                     }
                 },
                 callback: function (result) {
                     if (result) {
                         $scope.EliminarProgramacion();
                     }
                 }
             });
         });

         //Lista de checkeo
         $scope.AbrirLista = function () {
             $scope.LimpiarListaChequeo();
             $('.select2').select2({
                 placeholder: "Seleccione una opción...",
                 allowClear: true
             });
             TecnicaService.ConsultarInstituciones(function (response) {
                 if (response.success == true) {
                     debugger;
                     $scope.Inst = response.datos;
                 }
             });
             $("#tblLista").hide();
             $("#btnEditList").hide();
             $("#btnReporteLista").hide();
             $("#btnEditList").addClass("editarL");
             $("#btnEditList").text("Editar");
             $("#ModalLista").modal("show");
         };

         $scope.BuscarLista = function () {
             $scope.LimpiarListaChequeo();
             $('.toggle').bootstrapToggle("off");
             $('.toggle').bootstrapToggle("destroy");
             var inst = $("#instiList").val();
             TecnicaService.ConsultarLista(inst, function (response) {
                 if (response.success) {
                     if (response.editar != 1) {
                         $scope.ListaC.Institucion = inst;
                         $scope.ListaC.Estado = true;
                         setTimeout(function () {
                             $("#instiList").val("").trigger("change");
                         }, 200);
                         $('.toggle').bootstrapToggle({
                             on: 'SI <i class="glyphicon glyphicon-thumbs-up"></i>',
                             off: 'NO <i class="glyphicon glyphicon-thumbs-down"></i>',
                             height: 35,
                             width: 80,
                             offstyle: "warning",
                             onstyle: "success"
                         });
                         $("#TitleLista").text(inst);
                         localStorage.setItem("NombreI", inst);
                         $("#TextObserv").removeAttr("disabled");
                         $("#btnGuardarLista").removeAttr("disabled");
                         $("#btnEditList").hide();
                         $("#btnReporteLista").hide();
                         $("#tblLista").show();
                         $("#divTablaLEdit").hide();
                         $("#divTablaL").show();
                     } else {
                         var item1 = (response.Datos.Criterio1 == true) ? "Cumple" : "No Cumple";
                         var item2 = (response.Datos.Criterio2 == true) ? "Cumple" : "No Cumple";
                         var item3 = (response.Datos.Criterio3 == true) ? "Cumple" : "No Cumple";
                         var item4 = (response.Datos.Criterio4 == true) ? "Cumple" : "No Cumple";
                         var item5 = (response.Datos.Criterio5 == true) ? "Cumple" : "No Cumple";
                         var item6 = (response.Datos.Criterio6 == true) ? "Cumple" : "No Cumple";
                         var item7 = (response.Datos.Criterio7 == true) ? "Cumple" : "No Cumple";
                         var item8 = (response.Datos.Criterio8 == true) ? "Cumple" : "No Cumple";
                         var item9 = (response.Datos.Criterio9 == true) ? "Cumple" : "No Cumple";
                         var item10 = (response.Datos.Criterio10 == true) ? "Cumple" : "No Cumple";
                         var item11 = (response.Datos.Criterio11 == true) ? "Cumple" : "No Cumple";
                         var item12 = (response.Datos.Criterio12 == true) ? "Cumple" : "No Cumple";
                         var item13 = (response.Datos.Criterio13 == true) ? "Cumple" : "No Cumple";
                         var item14 = (response.Datos.Criterio14 == true) ? "Cumple" : "No Cumple";
                         $("#item1Edit").text(item1);
                         $("#item2Edit").text(item2);
                         $("#item3Edit").text(item3);
                         $("#item4Edit").text(item4);
                         $("#item5Edit").text(item5);
                         $("#item6Edit").text(item6);
                         $("#item7Edit").text(item7);
                         $("#item8Edit").text(item8);
                         $("#item9Edit").text(item9);
                         $("#item10Edit").text(item10);
                         $("#item11Edit").text(item11);
                         $("#item12Edit").text(item12);
                         $("#item13Edit").text(item13);
                         $("#item14Edit").text(item14);
                         $scope.ListaC.Id = response.Datos.Id;
                         $scope.ListaC.Observaciones = response.Datos.Observaciones;
                         $scope.ListaC.Institucion = response.Datos.Institucion;
                         $scope.ListaC.Criterio1 = response.Datos.Criterio1;
                         $scope.ListaC.Criterio2 = response.Datos.Criterio2;
                         $scope.ListaC.Criterio3 = response.Datos.Criterio3;
                         $scope.ListaC.Criterio4 = response.Datos.Criterio4;
                         $scope.ListaC.Criterio5 = response.Datos.Criterio5;
                         $scope.ListaC.Criterio6 = response.Datos.Criterio6;
                         $scope.ListaC.Criterio7 = response.Datos.Criterio7;
                         $scope.ListaC.Criterio8 = response.Datos.Criterio8;
                         $scope.ListaC.Criterio9 = response.Datos.Criterio9;
                         $scope.ListaC.Criterio10 = response.Datos.Criterio10;
                         $scope.ListaC.Criterio11 = response.Datos.Criterio11;
                         $scope.ListaC.Criterio12 = response.Datos.Criterio12;
                         $scope.ListaC.Criterio13 = response.Datos.Criterio13;
                         $scope.ListaC.Criterio14 = response.Datos.Criterio14;
                         $scope.ListaC.Estado = response.Datos.Estado;
                         setTimeout(function () {
                             $("#instiList").val("").trigger("change");
                         }, 200);
                         $("#TitleLista").text(inst);
                         localStorage.setItem("NombreI", inst);
                         $("#TextObserv").attr("disabled", true);
                         $("#btnGuardarLista").attr("disabled", true);
                         $("#btnEditList").addClass("editarL");
                         $("#btnEditList").text("Editar");
                         $("#btnReporteLista").show();
                         $("#tblLista").show();
                         $("#divTablaLEdit").show();
                         $("#divTablaL").hide();
                         $("#btnEditList").show();
                     }
                 }
             });
         };

         $("#btnEditList").click(function () {
             if ($("#btnEditList").hasClass("editarL")) {
                 $("#btnEditList").removeClass("editarL");
                 $("#btnEditList").text("cancelar");
                 $("#btnReporteLista").hide();
                 $("#divTablaLEdit").hide();
                 $("#divTablaL").show();
                 $("#TextObserv").removeAttr("disabled");
                 $('.toggle').bootstrapToggle({
                     on: 'SI <i class="glyphicon glyphicon-thumbs-up"></i>',
                     off: 'NO <i class="glyphicon glyphicon-thumbs-down"></i>',
                     height: 35,
                     width: 80,
                     offstyle: "warning",
                     onstyle: "success"
                 });
                 $('#item1').prop('checked', $scope.ListaC.Criterio1).change();
                 $('#item2').prop('checked', $scope.ListaC.Criterio2).change();
                 $('#item3').prop('checked', $scope.ListaC.Criterio3).change();
                 $('#item4').prop('checked', $scope.ListaC.Criterio4).change();
                 $('#item5').prop('checked', $scope.ListaC.Criterio5).change();
                 $('#item6').prop('checked', $scope.ListaC.Criterio6).change();
                 $('#item7').prop('checked', $scope.ListaC.Criterio7).change();
                 $('#item8').prop('checked', $scope.ListaC.Criterio8).change();
                 $('#item9').prop('checked', $scope.ListaC.Criterio9).change();
                 $('#item10').prop('checked', $scope.ListaC.Criterio10).change();
                 $('#item11').prop('checked', $scope.ListaC.Criterio11).change();
                 $('#item12').prop('checked', $scope.ListaC.Criterio12).change();
                 $('#item13').prop('checked', $scope.ListaC.Criterio13).change();
                 $('#item14').prop('checked', $scope.ListaC.Criterio14).change();
                 $("#btnGuardarLista").removeAttr("disabled");
             } else {
                 $("#btnEditList").addClass("editarL");
                 $("#btnEditList").text("Editar");
                 $("#divTablaLEdit").show();
                 $("#btnReporteLista").show();
                 $("#divTablaL").hide();
                 $("#TextObserv").attr("disabled", true);
                 $('.toggle').bootstrapToggle("off");
                 $('.toggle').bootstrapToggle("destroy");
                 $("#btnGuardarLista").attr("disabled", true);
             }

         });

         $("#btnGuardarLista").click(function () {
             var valor = "";
             for (var i = 1; i <= 14; i++) {
                 var string = "Criterio" + i;
                 valor = $("#item" + i).prop('checked');
                 $scope.ListaC[string] = valor;
             }
             if ($scope.ListaC.Observaciones == "") {
                 swal({
                     text: "¿Desea guardar la lista de chequeo sin observaciones?",
                     type: 'warning',
                     showCancelButton: true,
                     confirmButtonColor: '#449d44',
                     cancelButtonColor: '#d58512',
                     confirmButtonText: 'Si, guardar',
                     cancelButtonText: 'Cancelar'
                 }).then((result) => {
                     if (result) {
                         $scope.ListaC.Observaciones = "Ho hay observaciones";
                         $scope.GuardarListaC();
                     }
                 }).catch(swal.noop)
             } else {
                 $scope.GuardarListaC();
             }
         });

         $scope.GuardarListaC = function () {
             TecnicaService.GuardarLista($scope.ListaC, function (response) {
                 if (response.success) {
                     $("#ModalLista").modal("hide");
                     $scope.LimpiarListaChequeo();
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se realizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 }
             });
         };

         //cargar tablas
         $scope.CargarInstituciones = function () {
             TecnicaService.ConsultarInstituciones(function (response) {
                 if (response.success == true) {
                     $scope.datalistsInst = response.datos;
                     $scope.ListaCompleta = response.datos;
                     $scope.numberOfPages = function () {
                         return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
                     };
                 }
             });
         };

         $scope.CargarProgramas = function () {
             TecnicaService.CargarProgramas(function (response) {
                 if (response.success) {
                     $scope.datalistsProg = response.datos;
                     $scope.ListaCompleta = response.datos;
                     $scope.numberOfPages = function () {
                         return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
                     };
                 }
             });
             TecnicaService.ConsultarInstituciones(function (response) {
                 if (response.success == true) {
                     $scope.Inst = response.datos;
                 }
             });
         };

         $scope.CargarDocentePar = function () {
             TecnicaService.CargarDocentePar(function (response) {
                 if (response.success) {
                     $scope.datalistsDocPar = response.datos;
                     $scope.ListaCompleta = response.datos;
                     $scope.numberOfPages = function () {
                         return Math.ceil($scope.datalistsDocPar.length / $scope.pageSize);
                     };
                 }
             });
             TecnicaService.ConsultarInstituciones(function (response) {
                 if (response.success == true) {
                     $scope.Inst = response.datos;
                 }
             });
         };

         $scope.cargarInstructor = function () {
             TecnicaService.CargarInstructores(function (response) {
                 if (response.success == true) {
                     $scope.datalistsI = response.datos;
                     $scope.ListaCompleta = response.datos;
                     $scope.numberOfPages = function () {
                         return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                     };

                 }
             });
         };

         $scope.cargarAprendices = function () {
             TecnicaService.ConsultarAprendices(function (response) {
                 if (response.success == true) {
                     $scope.datalistsApren = response.Datos;
                     $scope.ListaCompleta = response.Datos;
                     $scope.numberOfPages = function () {
                         return Math.ceil($scope.datalistsApren.length / $scope.pageSize);
                     };

                 }
             });
             TecnicaService.ConsultarInstituciones(function (response) {
                 if (response.success == true) {
                     $scope.Inst = response.datos;
                 }
             });
         };

         $scope.cargarFichas = function () {
             TecnicaService.ConsultarFichas(function (response) {
                 if (response.success == true) {
                     $scope.datalistsFichas = response.Datos;
                     $scope.ListaCompleta = response.Datos;
                     $scope.numberOfPages = function () {
                         return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
                     };

                 }
             });
             TecnicaService.CargarProgramas(function (response) {
                 if (response.success) {
                     $scope.datalistsProg = response.datos;
                 }
             });
             TecnicaService.ConsultarInstituciones(function (response) {
                 if (response.success == true) {
                     $scope.Inst = response.datos;
                 }
             });
         };

         //cambio paneles tabPanels
         //Oculta Instituciones Educativas
         $('#btn1').click(function () {
             $('#Buscar').show();
             $('#Buscar2').hide();
             $('#Buscar3').hide();
             $('#Buscar4').hide();
             $('#BuscarA').hide();
             $('#BuscarF').hide();
             $('#tabF').hide();
             $('#tabInstituciones').show();
             $('#tabProgramas').hide();
             $('#tabDocentePar').hide();
             $('#tabInstructor').hide();
             $('#tabProgramacion').hide();
             $('#tabA').hide();
             $scope.CargarInstituciones();

             //debugger;
             //var id = $rootScope.globals.currentUser.tipousuario;
             //if (id == 3) {
             //    $(".menuInstruc").css("display", "none");
             //}
         });

         $('#btn2').click(function () {
             $('#Buscar2').show();
             $('#Buscar').hide();
             $('#Buscar3').hide();
             $('#Buscar4').hide();
             $('#BuscarA').hide();
             $('#BuscarF').hide();
             $('#tabF').hide();
             $('#tabInstituciones').hide();
             $('#tabProgramas').show();
             $('#tabDocentePar').hide();
             $('#tabInstructor').hide();
             $('#tabProgramacion').hide();
             $('#tabA').hide();
             $scope.CargarProgramas();
         });

         $('#btn3').click(function () {
             $('#Buscar2').hide();
             $('#Buscar').hide();
             $('#Buscar3').show();
             $('#Buscar4').hide();
             $('#BuscarA').hide();
             $('#BuscarF').hide();
             $('#tabF').hide();
             $('#tabInstituciones').hide();
             $('#tabProgramas').hide();
             $('#tabInstructor').hide();
             $('#tabDocentePar').show();
             $('#tabProgramacion').hide();
             $('#tabA').hide();
             TecnicaService.CargarProgramasInst(function (response) {
                 if (response.success) {
                     $scope.Prog = response.datos;
                 }
             });
             $scope.CargarDocentePar();
         });

         $('#btn4').click(function () {
             $('#Buscar2').hide();
             $('#Buscar').hide();
             $('#Buscar3').hide();
             $('#Buscar4').show();
             $('#BuscarA').hide();
             $('#BuscarF').hide();
             $('#tabF').hide();
             $('#tabInstituciones').hide();
             $('#tabProgramas').hide();
             $('#tabDocentePar').hide();
             $('#tabInstructor').show();
             $('#tabProgramacion').hide();
             $('#tabA').hide();
             $scope.cargarInstructor();
         });

         $('#btn5').click(function () {
             $scope.LimpiarCalendar();
             $('#Buscar2').hide();
             $('#Buscar').hide();
             $('#Buscar3').hide();
             $('#Buscar4').hide();
             $('#BuscarA').hide();
             $('#BuscarF').hide();
             $('#tabF').hide();
             $('#btnReporte').hide();
             $('#tabInstituciones').hide();
             $('#tabProgramas').hide();
             $('#tabDocentePar').hide();
             $('#tabInstructor').hide();
             $('#tabProgramacion').show();
             $('#tabA').hide();
             $('#borrarFiltro').attr("disa bled", true);
             $scope.calendarioVacio();
             TecnicaService.ConsultarFichasSelect(function (response) {
                 debugger;
                 if (response.success) {
                     $scope.FichaMedia = response.Datos;
                 }
             });
         });


         $("#btnA").click(function () {
             $('#Buscar2').hide();
             $('#Buscar').hide();
             $('#Buscar3').hide();
             $('#Buscar4').hide();
             $('#BuscarA').show();
             $('#BuscarF').hide();
             $('#tabF').hide();
             $('#tabInstituciones').hide();
             $('#tabProgramas').hide();
             $('#tabDocentePar').hide();
             $('#tabInstructor').hide();
             $('#tabProgramacion').hide();
             $('#tabA').show();
             $('#LabelAprendices').hide();
             TecnicaService.ConsultarFichas(function (response) {
                 if (response.success) {
                     $scope.Ficha = response.Datos;
                 }
             });
             $scope.cargarAprendices();
             $('#calendar').fullCalendar('destroy');
         });

         $("#btnF").click(function () {
             $('#Buscar2').hide();
             $('#Buscar').hide();
             $('#Buscar3').hide();
             $('#Buscar4').hide();
             $('#BuscarA').hide();
             $('#BuscarF').show();
             $('#tabInstituciones').hide();
             $('#tabProgramas').hide();
             $('#tabDocentePar').hide();
             $('#tabInstructor').hide();
             $('#tabProgramacion').hide();
             $('#tabA').hide();
             $('#tabF').show();
             $scope.cargarFichas();
             $('#calendar').fullCalendar('destroy');
         });

         $('#borrarFiltro').click(function () {
             $scope.LimpiarCalendar();
             $scope.calendarioVacio();
             $('#btnReporte').hide();
             $('#borrarFiltro').attr("disabled", true);
         });

         $scope.GenerarReporte = function () {
             $location.url("/Reporte");
         };

         $scope.GenerarReporteLista = function () {
             $location.url("/ReporteLista");
         };

         $scope.CargarCalendario = function (nombre) {
             debugger;
             var d = new Date().getFullYear();
             $scope.Reporte = [];
             $scope.LimpiarCalendar();
             TecnicaService.ConsultarProgramacion(nombre, function (response) {
                 debugger;
                 if (response.success == true) {
                     $.each(response.datos, function (index, value) {
                         $scope.Reporte.push({
                             Nombre: nombre,
                             NombreProg: value.Instructor,
                             Dias: value.Dias,
                             Ficha: value.Ficha,
                             Inicio: value.Hora_Inicio,
                             Fin: value.Hora_Fin
                         });
                         var allday = false;
                         var hoI = value.Hora_Inicio.substring(0, 5);
                         var hoF = value.Hora_Fin.substring(0, 5);
                         var HoraInicio = hoI.split(':');
                         var HoraFin = hoF.split(':');
                         var ampm = value.Hora_Inicio.substring(5, 10);
                         var ampm2 = value.Hora_Fin.substring(5, 10);
                         var inic = 0;
                         var finc = 0;
                         if (ampm == "PM") {
                             inic = parseInt(HoraInicio[0]) + 12;
                         } else {
                             inic = HoraInicio[0];
                         }
                         if (ampm2 == "PM") {
                             finc = parseInt(HoraFin[0]) + 12
                         } else {
                             finc = HoraFin[0];
                         }
                         var fecha1 = moment(d + "/01/01");
                         var fecha2 = moment(d + "/12/30");
                         var dias = fecha2.diff(fecha1, 'days');
                         var PDIas = value.Dias;
                         for (var i = 0; i <= dias; i++) {
                             var fecha = $scope.sumaFecha(i, d + "/01/01");
                             var fff = fecha.split('/');
                             var ff = fff[1] + "/" + fff[0] + "/" + fff[2];
                             var fecha2 = new Date(ff);
                             var StrDia = moment(fecha2).lang("es").format('dddd');
                             $scope.Calendario = function () {
                                 debugger;
                                 $scope.events.push({
                                     tipo: 0,
                                     id: value.Id,
                                     grado: value.Grado,
                                     ficha: value.Ficha,
                                     dias: value.Dias,
                                     title: value.Instructor,
                                     start: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), inic, parseInt(HoraInicio[1])),
                                     end: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), finc, parseInt(HoraFin[1])),
                                     allDay: false,
                                     backgroundColor: "#337ab7",
                                     borderColor: "blue",
                                     textColor: "white",
                                 });
                             }

                             if (PDIas.indexOf("LUNES") >= 0) {
                                 if (StrDia == "lunes") {
                                     $scope.Calendario();
                                 }
                             }
                             if (PDIas.indexOf("MARTES") >= 0) {
                                 if (StrDia == "martes") {
                                     $scope.Calendario();
                                 }
                             }
                             if (PDIas.indexOf("MIÉRCOLES") >= 0) {
                                 if (StrDia == "miércoles") {
                                     $scope.Calendario();
                                 }
                             }
                             if (PDIas.indexOf("JUEVES") >= 0) {
                                 if (StrDia == "jueves") {
                                     $scope.Calendario();
                                 }
                             }
                             if (PDIas.indexOf("VIERNES") >= 0) {
                                 if (StrDia == "viernes") {
                                     $scope.Calendario();
                                 }
                             }
                             debugger
                             if (PDIas.indexOf("SÁBADO") >= 0) {
                                 if (StrDia == "sábado") {
                                     $scope.Calendario();
                                 }
                             }
                             if (PDIas.indexOf("DOMINGO") >= 0) {
                                 if (StrDia == "domingo") {
                                     $scope.Calendario();
                                 }
                             }
                         }
                     });

                     $('#calendar').fullCalendar({
                         locale: 'es',
                         header: {
                             left: 'title',
                             center: 'listDay,listWeek,month',
                             right: 'prev,next today'

                         },
                         eventLimit: true,
                         views: {
                             listDay: {
                                 buttonText: 'Día'
                             },
                             listWeek: {
                                 buttonText: 'Semana'
                             },
                             agenda: {
                                 eventLimit: 4 // adjust to 6 only for agendaWeek/agendaDay
                             }
                         },
                         timeFormat: 'h(:mm) a',
                         slotLabelFormat: "h(:mm) a",
                         theme: false,
                         height: 600,
                         events: $scope.events,
                         eventClick: function (event) {
                             var ini = moment(event.start).format('h:mm a');
                             var fin = moment(event.end).format('h:mm a');
                             $scope.modificarProgramacion(event.id, event.title, event.grado, event.ficha, ini, fin, event.tipo);
                         }
                     });

                     $('#btnReporte').show();
                 }
             });
             setTimeout(function () {
                 var nombre = "";
                 $.each($scope.Reporte, function (index, value) {
                     nombre = value.Nombre;
                     //console.log(value.NombreProg);
                     localStorage.setItem("Nombre", value.NombreProg);
                     if (nombre != "") {
                         return false;
                     }
                 });
                 TecnicaService.ConsultarInstructorNombre(nombre, function (response) {
                     if (response.success) {
                         //$.each($scope.Reporte, function (index, value) {

                         //});
                         //console.log(response.Datos.Cedula);
                         localStorage.setItem("Cedula", response.Datos.Cedula);
                     }
                 });
             }, 200);
         };

         $scope.sumaFecha = function (d, fecha) {
             var Fecha = new Date();
             var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());
             var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
             var aFecha = sFecha.split(sep);
             var fecha = aFecha[1] + '/' + aFecha[2] + '/' + aFecha[0];
             fecha = new Date(fecha);
             fecha.setDate(fecha.getDate() + parseInt(d));
             var ano = fecha.getFullYear();
             var mes = fecha.getMonth() + 1;
             var dia = fecha.getDate();
             mes = (mes < 10) ? ("0" + mes) : mes;
             dia = (dia < 10) ? ("0" + dia) : dia;
             var fechaFinal = dia + sep + mes + sep + ano;
             return (fechaFinal);
         };
         //cambio de paneles del modal de registro de instituciones
         $('#siguiente1').click(function () {
             $('#titlePanel').text('Información del Rector');
             $('#atras1').show();
             $('#atras2').hide();
             $('#siguiente2').show();
             $('#siguiente1').hide();
             $('#modalPanel1').hide();
             $('#modalPanel2').show();
             $('#modalPanel3').hide();
             $('#bol1').css({ "background-color": "white", "color": "#286090" });
             $('#bol2').css({ "background-color": "#286090", "color": "white" });
             $('#bol3').css({ "background-color": "white", "color": "#286090" });
         });

         $('#siguiente2').click(function () {
             $('#titlePanel').text('Información del Coordinador');
             $('#atras1').hide();
             $('#atras2').show();
             $('#siguiente2').hide();
             $('#siguiente1').hide();
             $('#modalPanel1').hide();
             $('#modalPanel2').hide();
             $('#modalPanel3').show();
             $('#bol1').css({ "background-color": "white", "color": "#286090" });
             $('#bol2').css({ "background-color": "white", "color": "#286090" });
             $('#bol3').css({ "background-color": "#286090", "color": "white" });
         });

         $('#atras1').click(function () {
             $('#titlePanel').text('Información de la Institución');
             $('#atras1').hide();
             $('#atras2').hide();
             $('#siguiente2').hide();
             $('#siguiente1').show();
             $('#modalPanel1').show();
             $('#modalPanel2').hide();
             $('#modalPanel3').hide();
             $('#bol1').css({ "background-color": "#286090", "color": "white" });
             $('#bol2').css({ "background-color": "white", "color": "#286090" });
             $('#bol3').css({ "background-color": "white", "color": "#286090" });
         });

         $('#atras2').click(function () {
             $('#titlePanel').text('Información del Rector');
             $('#atras1').show();
             $('#atras2').hide();
             $('#siguiente2').show();
             $('#siguiente1').hide();
             $('#modalPanel1').hide();
             $('#modalPanel2').show();
             $('#modalPanel3').hide();
             $('#bol1').css({ "background-color": "white", "color": "#286090" });
             $('#bol2').css({ "background-color": "#286090", "color": "white" });
             $('#bol3').css({ "background-color": "white", "color": "#286090" });
         });

         //cambio de paneles del modal de modificacion de instituciones
         $('#siguiente1Edit').click(function () {
             $('#titlePanelEdit').text('Información del Rector');
             $('#atras1Edit').show();
             $('#atras2Edit').hide();
             $('#siguiente2Edit').show();
             $('#siguiente1Edit').hide();
             $('#modalPanel1Edit').hide();
             $('#modalPanel2Edit').show();
             $('#modalPanel3Edit').hide();
             $('#bol1Edit').css({ "background-color": "white", "color": "#286090" });
             $('#bol2Edit').css({ "background-color": "#286090", "color": "white" });
             $('#bol3Edit').css({ "background-color": "white", "color": "#286090" });
         });

         $('#siguiente2Edit').click(function () {
             $('#titlePanelEdit').text('Información del Coordinador');
             $('#atras1Edit').hide();
             $('#atras2Edit').show();
             $('#siguiente2Edit').hide();
             $('#siguiente1Edit').hide();
             $('#modalPanel1Edit').hide();
             $('#modalPanel2Edit').hide();
             $('#modalPanel3Edit').show();
             $('#bol1Edit').css({ "background-color": "white", "color": "#286090" });
             $('#bol2Edit').css({ "background-color": "white", "color": "#286090" });
             $('#bol3Edit').css({ "background-color": "#286090", "color": "white" });
         });

         $('#atras1Edit').click(function () {
             $('#titlePanelEdit').text('Información de la Institución');
             $('#atras1Edit').hide();
             $('#atras2Edit').hide();
             $('#siguiente2Edit').hide();
             $('#siguiente1Edit').show();
             $('#modalPanel1Edit').show();
             $('#modalPanel2Edit').hide();
             $('#modalPanel3Edit').hide();
             $('#bol1Edit').css({ "background-color": "#286090", "color": "white" });
             $('#bol2Edit').css({ "background-color": "white", "color": "#286090" });
             $('#bol3Edit').css({ "background-color": "white", "color": "#286090" });
         });

         $('#atras2Edit').click(function () {
             $('#titlePanelEdit').text('Información del Rector');
             $('#atras1Edit').show();
             $('#atras2Edit').hide();
             $('#siguiente2Edit').show();
             $('#siguiente1Edit').hide();
             $('#modalPanel1Edit').hide();
             $('#modalPanel2Edit').show();
             $('#modalPanel3Edit').hide();
             $('#bol1Edit').css({ "background-color": "white", "color": "#286090" });
             $('#bol2Edit').css({ "background-color": "#286090", "color": "white" });
             $('#bol3Edit').css({ "background-color": "white", "color": "#286090" });
         });


         $('#AddSelect').click(function () {
             $('#selectProg').show();
             $('#InstAddProg').attr("disabled", true);
             $('#btnLimpiar').removeAttr("disabled");
         });

         $('#btnLimpiar').click(function () {
             $('#selectProg').hide();
             setTimeout(function () {
                 $('#InstAddProg').val("").trigger('change');
                 $('#ProgAddProg').val("").trigger('change');
             });
             $scope.Ids = [];
             $scope.AddProgs = [];
             $('#InstAddProg').removeAttr("disabled");
             $('#btnLimpiar').attr("disabled", true);
             $('#divTabla').hide();
         });

         $('#btnLimpiarFiltro').click(function () {
             $('#tablaresultadofiltro').hide();
             setTimeout(function () {
                 $('#InstFiltro').val("").trigger("change");
             }, 100);
             $('#InstFiltro').removeAttr("disabled");
             $scope.datalistsInstFilter = [];
             $('#btnLimpiarFiltro').attr("disabled", true);
             $('#btnBuscarFiltro').removeAttr("disabled");
         });

         $scope.addProg = function () {
             var id = "." + $scope.Inst.Prog;
             var text = $(id).text();
             var valid = 1;
             $.each($scope.Ids, function (index, value) {
                 if (value.ProgId == $scope.Inst.Prog) {
                     valid = 2;
                     return false;
                 }
             });
             if (valid == 2) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Este Programa ya se encuentra en la lista",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 valid = 1;
                 $scope.Ids.push({ ProgId: $scope.Inst.Prog });
                 $('#divTabla').show();
                 $scope.AddProgs.push({
                     Programa: text,
                     IdProg: $scope.Inst.Prog
                 });
                 setTimeout(function () {
                     $('#ProgAddProg').val("").trigger('change');
                 });
             }
         };

         $scope.remove = function (index) {
             if ($scope.AddProgs.length == 1) {
                 $('#divTabla').hide();
             }
             $scope.AddProgs.splice(index, 1);
             $scope.Ids.splice(index, 1);
         };

         $scope.AddProgs = [];

         $scope.Ids = [];

         $scope.AddProgramas = function () {
             if ($scope.Ids.length != 0) {
                 $.each($scope.Ids, function (index, value) {
                     TecnicaService.AgregarDetalleProg(value.ProgId, $scope.Inst.Id, function (response) {

                     });
                 });
                 $('#modalAgregarProgramas').modal('hide');
                 bootbox.dialog({
                     title: "Información",
                     message: "El registro se realizó con éxito",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });

                 $('#selectProg').hide();
                 setTimeout(function () {
                     $('#InstAddProg').val("").trigger('change');
                     $('#ProgAddProg').val("").trigger('change');
                 });
                 $.each($scope.Ids, function (index, value) {
                     //console.log(value.ProgId + " " + $scope.Inst.Id);
                     $('.cls' + value.ProgId).remove();
                 });
                 $scope.Ids = [];
                 $('#tableProgs').empty();
                 $('#InstAddProg').removeAttr("disabled");
                 $('#btnLimpiar').attr("disabled", true);
             } else {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar por lo menos un programa",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             }
         };

         $scope.datalistsInstFilter = [];

         $scope.Hola = function () {
             $('#btnBuscarFiltro').attr("disabled", true);
             $scope.datalistsInstFilter = [];
             var IdInstitucion = $('#InstFiltro').val();
             TecnicaService.filtrarProgramas(IdInstitucion, function (response) {
                 if (response.success) {
                     $.each(response.datos, function (index, value) {
                         var Estado = (value.Estado == true) ? "Activo" : "Inactivo";
                         var Clase = (value.Estado == true) ? "btn-success" : "btn-warning";
                         $scope.datalistsInstFilter.push({
                             Codigo_Programa: value.Codigo_Programa,
                             NombrePrograma: value.NombrePrograma,
                             Estado: Estado,
                             Clase: Clase,
                             IdProg: value.Id_Programa,
                             IdInst: value.IdInst
                         });
                     });
                     $('#tablaresultadofiltro').show();
                     $('#InstFiltro').attr("disabled", true);
                     $('#btnLimpiarFiltro').removeAttr("disabled");
                 }
             });
         };

         $('#excelInstProg').click(function () {
             $("#excelInstProgI").trigger('click');
         });

         $('#excelInstProgI').change(function () {
             dataweb = new FormData();

             var files = $("#excelInstProgI").get(0).files;

             var fileExtension = ['xlsx'];
             if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
                 bootbox.dialog({
                     title: "Importar Archivo",
                     message: "La extencion del archivo no es valida",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
                 $("#excelInstProgI").replaceWith($("#excelInstProgI").val('').clone(true));

                 //waitingDialog.hide();
                 return false;

             }


             // Add the uploaded image content to the form data collection
             if (files.length > 0) {

                 readURL(this, "logoweb");

                 dataweb.append("UploadedImage", files[0]);
                 if (dataweb != null) {
                     TecnicaService.SubirArchivoProgramaInst(dataweb, function (response) {
                         if (response.success) {

                             bootbox.dialog({
                                 title: "Importar Archivo",
                                 message: "La importación del archivo se realizó con éxito ",
                                 buttons: {
                                     success: {
                                         label: "Cerrar",
                                         className: "btn-primary",
                                     }
                                 }
                             });



                             $scope.path = response.path;

                             $("#excelInstProgI").replaceWith($("#excelInstProgI").val('').clone(true));
                             //TecnicaService.CargarInstructores(function (response) {
                             //    if (response.success == true) {
                             //        console.log(response.datos)
                             //        $scope.datalistsI = response.datos;
                             //        $scope.ListaCompleta = response.datos;
                             //        $scope.numberOfPages = function () {
                             //            return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                             //        };

                             //    }
                             //});

                             $("#excelInstProgI").replaceWith($("#excelInstProgI").val('').clone(true));
                             //waitingDialog.hide();

                             return;
                         }

                     });
                 }

             }
         });

         $scope.estadoInstProg = function (IdProg, IdInst) {
             TecnicaService.estadoInstProg(IdProg, IdInst, function (response) {
                 if (response.success) {
                     $scope.Hola();
                 }
             });
         }

         //funciones para limpiar campos
         $scope.LimpiarInstitucion = function () {
             $scope.Institucion.Id = "";
             $scope.Institucion.NIT = "";
             $scope.Institucion.Codigo_DANE = "";
             $scope.Institucion.Nombre_Colegio = "";
             $scope.Institucion.Direccion = "";
             $scope.Institucion.Correo_Colegio = "";
             $scope.Institucion.Num_Resolucion = "";
             $scope.Institucion.Municipio = "";
             $scope.Institucion.Tipo = "";
             $scope.Institucion.Categoria = "";
             $scope.Institucion.Nombre_Rector = "";
             $scope.Institucion.Apellidos_Rector = "";
             $scope.Institucion.Telefono_Rector = "";
             $scope.Institucion.Correo_Rector = "";
             $scope.Institucion.Nombre_Coordinador = "";
             $scope.Institucion.Apellidos_Coordinador = "";
             $scope.Institucion.Telefono_Coordinador = "";
             $scope.Institucion.Correo_Coordinador = "";
             setTimeout(function () {
                 $('#categoria').val("").trigger("change");
                 $('#tipo').val("").trigger("change");
                 $('#municipio').val("").trigger("change");
             }, 100);
         };

         $scope.LimpiarPrograma = function () {
             $scope.Programa.Id = "";
             $scope.Programa.Codigo_Programa = "";
             $scope.Programa.Red_Tecnologica = "";
             $scope.Programa.Version_Programa = "";
             $scope.Programa.NombrePrograma = "";
         };

         $scope.LimpiarDocentePar = function () {
             $scope.DocentePar.Id = "";
             $scope.DocentePar.Telefono = "";
             $scope.DocentePar.Nombres = ""
             $scope.DocentePar.Apellidos = "";
             $scope.DocentePar.Email = "";
             $scope.DocentePar.Institucion = "";
             $scope.DocentePar.Programa = "";
             setTimeout(function () {
                 $('#InstDPar').val("").trigger("change");
                 $('#ProgDPar').val("").trigger("change");
             }, 100);
         };

         $scope.LimpiarInstructorSENA = function () {
             $scope.InstructorSENA.Id = "";
             $scope.InstructorSENA.Cedula = "";
             $scope.InstructorSENA.Nombres = "";
             $scope.InstructorSENA.Apellidos = "";
             $scope.InstructorSENA.Correo_Misena = "";
             $scope.InstructorSENA.Correo_Alternativo = "";
             $scope.InstructorSENA.Municipio = "";
             $scope.InstructorSENA.Telefono_Fijo = "";
             $scope.InstructorSENA.Celular = "";
             $scope.InstructorSENA.Area = "";
             $scope.InstructorSENA.Profesion = "";
             $scope.InstructorSENA.Programa_Formacion = "";
         };

         $scope.LimpiarCalendar = function () {

             $('#calendar').fullCalendar('removeEventSource', $scope.events);
             $('#calendar').fullCalendar('refetchEvents');
             $('#calendar').fullCalendar('destroy');
             $scope.events = [];
         };

         $scope.LimpiarMediaTecnica = function () {
             $scope.MediaTecnica.Id = "";
             $scope.MediaTecnica.Hora_Inicio = "";
             $scope.MediaTecnica.Hora_Fin = "";
             $scope.MediaTecnica.Grado = "";
             $scope.MediaTecnica.Ficha = "";
             $scope.MediaTecnica.Instructor = "";
             $scope.MediaTecnica.Dias = "";
             setTimeout(function () {
                 $('#instruc').val("").trigger("change");
                 $('#fichaa').val("").trigger("change");
             }, 100);
             $scope.Dias.Lunes = false;
             $scope.Dias.Martes = false;
             $scope.Dias.Miercoles = false;
             $scope.Dias.Jueves = false;
             $scope.Dias.Viernes = false;
             $scope.Dias.Sabado = false;
             $scope.Dias.Domingo = false;
         };

         $scope.LimpiarListaChequeo = function () {
             $scope.ListaC.Id = "";
             $scope.ListaC.Institucion = "";
             $scope.ListaC.Observaciones = "";
             $scope.ListaC.Criterio1 = false;
             $scope.ListaC.Criterio2 = false;
             $scope.ListaC.Criterio3 = false;
             $scope.ListaC.Criterio4 = false;
             $scope.ListaC.Criterio5 = false;
             $scope.ListaC.Criterio6 = false;
             $scope.ListaC.Criterio7 = false;
             $scope.ListaC.Criterio8 = false;
             $scope.ListaC.Criterio9 = false;
             $scope.ListaC.Criterio10 = false;
             $scope.ListaC.Criterio11 = false;
             $scope.ListaC.Criterio12 = false;
             $scope.ListaC.Criterio13 = false;
             $scope.ListaC.Criterio14 = false;
         };

         $scope.VaciarCamposAprendiz = function () {
             $scope.Aprendices.Id = "";
             $scope.Aprendices.Documento = "";
             $scope.Aprendices.Nombre = "";
             $scope.Aprendices.Apellido = "";
             $scope.Aprendices.Email = "";
             $scope.Aprendices.Telefono = "";
             $scope.Aprendices.TipoDocumento = "";
             $scope.Aprendices.Direccion = "";
             $scope.Aprendices.Estado = "";
             $scope.Aprendices.NombreAcudiente = "";
             $scope.Aprendices.TelAcudiente = "";
             $scope.Aprendices.Ficha = "";
             $scope.Aprendices.Institucion = "";
             setTimeout(function () {
                 $("#fichaApren").val("").trigger("change");
             }, 100);
         };

         $scope.VaciarCamposFicha = function () {
             $scope.Ficha.Id = "";
             $scope.Ficha.Num_Ficha = "";
             $scope.Ficha.Fecha_Inicio = "";
             $scope.Ficha.Fecha_Fin = "";
             $scope.Ficha.Num_Aprendices = "";
             $scope.Ficha.Institucion = "";
             $scope.Ficha.Programa = "";
             $scope.Ficha.Estado = "";
             setTimeout(function () {
                 $("#InstFicha").val("").trigger("change");
                 $("#ProgFicha").val("").trigger("change");
                 $("#FechaFinFicha").val("");
                 $("#FechaIniFich").val("");
             }, 100);
             $("#numFicEdit").attr("disabled", false);
         };

         //declaracion de objetos
         $scope.Institucion = {
             Id: "",
             NIT: "",
             Codigo_DANE: "",
             Nombre_Colegio: "",
             Direccion: "",
             Correo_Colegio: "",
             Num_Resolucion: "",
             Municipio: "",
             Tipo: "",
             Categoria: "",
             Nombre_Rector: "",
             Apellidos_Rector: "",
             Telefono_Rector: "",
             Correo_Rector: "",
             Nombre_Coordinador: "",
             Apellidos_Coordinador: "",
             Telefono_Coordinador: "",
             Correo_Coordinador: "",
             Estado: true
         };

         $scope.Programa = {
             Id: "",
             Codigo_Programa: "",
             Red_Tecnologica: "",
             Version_Programa: "",
             NombrePrograma: "",
             Estado: true
         };

         //$scope.Inst = {
         //    Id: "",
         //    Prog: ""
         //};

         $scope.DocentePar = {
             Id: "",
             Telefono: "",
             Nombres: "",
             Apellidos: "",
             Email: "",
             Id_Institucion: "",
             Id_Programa: ""
         }

         $scope.InstructorSENA = {
             Id: "",
             Cedula: "",
             Nombres: "",
             Apellidos: "",
             Correo_Misena: "",
             Correo_Alternativo: "",
             Municipio: "",
             Telefono_Fijo: "",
             Celular: "",
             Area: "",
             Profesion: "",
             Programa_Formacion: ""
         }

         $scope.MediaTecnica = {
             Id: "",
             Hora_Inicio: "",
             Hora_Fin: "",
             Grado: "",
             Ficha: "",
             Instructor: "",
             Dias: ""
         };

         $scope.Dias = {
             Lunes: false,
             Martes: false,
             Miercoles: false,
             Jueves: false,
             Viernes: false,
             Sabado: false,
             Domingo: false
         };

         $scope.ListaC = {
             Id: "",
             Institucion: "",
             Observaciones: "",
             Criterio1: false,
             Criterio2: false,
             Criterio3: false,
             Criterio4: false,
             Criterio5: false,
             Criterio6: false,
             Criterio7: false,
             Criterio8: false,
             Criterio9: false,
             Criterio10: false,
             Criterio11: false,
             Criterio12: false,
             Criterio13: false,
             Criterio14: false,
             Estado: false
         };

         $scope.Aprendices = {
             TipoDocumento: "",
             Colegios: "",
             Id: "",
             Documento: "",
             Nombre: "",
             Apellido: "",
             Email: "",
             Telefono: "",
             NombreAcudiente: "",
             TelAcudiente: "",
             Estado: "",
             Ficha: "",
             Direccion: ""
         };

         $scope.Ficha = {
             Id_ficha_Tecnica: "",
             Num_Ficha: "",
             Fecha_Inicio: "",
             Fecha_Fin: "",
             Num_Aprendices: "",
             Institucion: "",
             Programa: "",
             Estado: "",
             Direccion: ""
         };

         $scope.Novedades = {
             Descripcion: ""
         };

         $scope.Institucion = {
             Id_Institucion: "",
             Nombre: "",
             Direccion: "",
             Email: "",
             Telefono_Institucion: "",
             Encargado: "",
             Telefono_Encargado: "",
             Estado: ""

         }

         $scope.Colegios = {
             Id: "",
             NIT: "",
             Codigo_DANE: "",
             Nombre_Colegio: "",
             Direccion: "",
             Correo_Colegio: "",
             Num_Resolucion: "",
             Municipio: "",
             Tipo: "",
             Categoria: "",
             Nombre_Rector: "",
             Apellidos_Rector: "",
             Telefono_Rector: "",
             Correo_Rector: "",
             Nombre_Coordinador: "",
             Apellidos_Coordinador: "",
             Telefono_Coordinador: "",
             Correo_Coordinador: "",
             Estado: true
         };

         // funciones para registrar
         $scope.GuardarInstitucion = function () {
             if ($scope.Institucion.NIT == "" || $scope.Institucion.Codigo_DANE == "" || $scope.Institucion.Nombre_Colegio == "" || $scope.Institucion.Direccion == ""
                 || $scope.Institucion.Correo_Colegio == "" || $scope.Institucion.Num_Resolucion == "" || $scope.Institucion.Municipio == "" || $scope.Institucion.Tipo == ""
                 || $scope.Institucion.Nombre_Rector == "" || $scope.Institucion.Apellidos_Rector == "" || $scope.Institucion.Telefono_Rector == ""
                 || $scope.Institucion.Correo_Rector == "" || $scope.Institucion.Nombre_Coordinador == "" || $scope.Institucion.Apellidos_Coordinador == ""
                 || $scope.Institucion.Telefono_Coordinador == "" || $scope.Institucion.Correo_Coordinador == "") {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe diligenciar todos los campos",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.GuardarInstitucion($scope.Institucion, function (response) {
                     if (response.success == true) {
                         $("#modalRegistrarInstitucion").modal("hide");
                         $scope.LimpiarInstitucion();
                         TecnicaService.ConsultarInstituciones(function (response) {
                             if (response.success == true) {
                                 $scope.datalistsInst = response.datos;
                                 $scope.ListaCompleta = response.datos;
                                 $scope.Datos = $scope.datalistsInst;
                                 $scope.numberOfPages = function () {
                                     return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
                                 };
                                 bootbox.dialog({
                                     title: "Información",
                                     message: "El registro se realizó con éxito",
                                     buttons: {
                                         success: {
                                             label: "Cerrar",
                                             className: "btn-primary",
                                         }
                                     }
                                 });
                             }
                         });
                     } else {
                         bootbox.dialog({
                             title: "Información",
                             message: "El NIT de la institución ya se encuentra registrado",
                             buttons: {
                                 success: {
                                     label: "Cerrar",
                                     className: "btn-primary",
                                 }
                             }
                         });
                     }
                 });
             }
         };

         $scope.GuardarPrograma = function () {
             debugger;
             $scope.Programa.NombrePrograma = $scope.Programa.NombrePrograma.toUpperCase();
             $scope.Programa.Red_Tecnologica = $scope.Programa.Red_Tecnologica.toUpperCase();
             $scope.Programa.Estado = true;
             TecnicaService.GuardarPrograma($scope.Programa, function (response) {
                 if (response.success) {
                     $("#ModalRegistrarPrograma").modal("hide");
                     $scope.LimpiarPrograma();
                     TecnicaService.CargarProgramas(function (response) {
                         if (response.success == true) {
                             $scope.datalistsProg = response.datos;
                             $scope.ListaCompleta = response.datos;
                             $scope.Datos = $scope.datalistsProg;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
                             };
                             bootbox.dialog({
                                 title: "Información",
                                 message: "El registro se realizó con éxito",
                                 buttons: {
                                     success: {
                                         label: "Cerrar",
                                         className: "btn-primary",
                                     }
                                 }
                             });
                         }
                     });
                 } else {
                     bootbox.dialog({
                         title: "Información",
                         message: "El programa ya se encuentra registrado",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 }
             });
         };

         $scope.GuardarDocentePar = function () { //DocentePar.Telefono
             debugger;
             TecnicaService.GuardarDocentePar($scope.DocentePar, function (response) {
                 if (response.success) {
                     $("#ModalRegistrarDocentePar").modal("hide");
                     $scope.LimpiarDocentePar();
                     TecnicaService.CargarDocentePar(function (response) {
                         if (response.success == true) {
                             $scope.datalistsDocPar = response.datos;
                             $scope.ListaCompleta = response.datos;
                             $scope.Datos = $scope.datalistsDocPar;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsDocPar.length / $scope.pageSize);
                             };
                             bootbox.dialog({
                                 title: "Información",
                                 message: "El registro se realizó con éxito",
                                 buttons: {
                                     success: {
                                         label: "Cerrar",
                                         className: "btn-primary",
                                     }
                                 }
                             });
                         }
                     });
                 } else {
                     bootbox.dialog({
                         title: "Información",
                         message: "El Docente ya se encuentra registrado",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 }
             });
         };

         $scope.GuardarInstructor = function () {
             TecnicaService.GuardarInstructor($scope.InstructorSENA, function (response) {
                 if (response.success) {
                     $("#ModalRegistrarInstructor").modal("hide");
                     $scope.LimpiarInstructorSENA();
                     TecnicaService.CargarInstructores(function (response) {
                         if (response.success == true) {
                             $scope.datalistsI = response.datos;
                             $scope.ListaCompleta = response.datos;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                             };
                         }
                     });
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se realizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 } else {
                     bootbox.dialog({
                         title: "Información",
                         message: "El Instructor ya se encuentra registrado",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 }
             });
         };

         $scope.GuardarProgramacion = function () {
             debugger;
             $scope.MediaTecnica.Hora_Inicio = $("#inicialProg").val();
             $scope.MediaTecnica.Hora_Fin = $("#finalProg").val();

             var D = "";
             D += ($scope.Dias.Lunes != false) ? "LUNES - " : "";
             D += ($scope.Dias.Martes != false) ? "MARTES - " : "";
             D += ($scope.Dias.Miercoles != false) ? "MIÉRCOLES - " : "";
             D += ($scope.Dias.Jueves != false) ? "JUEVES - " : "";
             D += ($scope.Dias.Viernes != false) ? "VIERNES - " : "";
             D += ($scope.Dias.Sabado != false) ? "SÁBADO - " : "";
             D += ($scope.Dias.Domingo != false) ? "DOMINGO - " : "";
             var num = D.length;
             var Cale = D.substring(0, num - 3);
             $scope.MediaTecnica.Dias = Cale;
             TecnicaService.GuardarProgramacion($scope.MediaTecnica, function (response) {
                 if (response.success) {
                     $('#modalRegistrarProgramacion').modal('hide');
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se realizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     $scope.LimpiarCalendar();
                     $scope.calendarioVacio();
                     $('#borrarFiltro').attr("disabled", true);
                 } else {
                     bootbox.dialog({
                         title: "Información",
                         message: "La programación no se puede registrar",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 }
             });
         }

         $scope.GuardarAprendiz = function () {
             $scope.Aprendices.Estado = "Activo";
             debugger;
             TecnicaService.GuardarAprendiz($scope.Aprendices, function (response) {
                 debugger;
                 if (response.success) {
                     $("#ModalAprendiz").modal("hide");
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se realizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     $scope.cargarAprendices();
                 } else {
                     bootbox.dialog({
                         title: "Información",
                         message: "El documento ya se encuentra registrado",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 }
             });
         };

         $scope.GuardarFicha = function () {
             var fechaIni = $("#FechaIniFich").val();
             var fechaFin = $("#FechaFinFicha").val();
             $scope.Ficha.Fecha_Inicio = fechaIni;
             $scope.Ficha.Fecha_Fin = fechaFin;
             $scope.Ficha.Estado = "Activa";
             TecnicaService.GuardarFicha($scope.Ficha, function (response) {
                 if (response.success) {
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se realizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     TecnicaService.ConsultarFichas(function (response) {
                         if (response.success == true) {
                             $scope.datalistsFichas = response.Datos;
                             $scope.ListaCompleta = response.Datos;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
                             };

                         }
                     });
                     $("#ModalFicha").modal("hide");
                 } else {
                     bootbox.dialog({
                         title: "Información",
                         message: "La ficha ya se encuentra registrada",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 }
             });
         };

         //funciones para cambiar de estado
         $scope.inhabilitarinstitucion = function () {

             var Inst = $scope.datalistsInst.filter(function (item) {
                 return item.Seleccionado === true;
             });

             TecnicaService.inhabilitarinstitucion(Inst, function (response) {
                 if (response.success) {
                     $('#modalInhabilitarInstitucion').modal('hide');
                     bootbox.dialog({
                         title: "Información",
                         message: "La eliminación se realizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     TecnicaService.ConsultarInstituciones(function (response) {
                         if (response.success == true) {
                             $scope.datalistsInst = response.datos;
                             $scope.ListaCompleta = response.datos;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
                             };

                         }
                     });
                 }
             });

         };

         $scope.inhabilitarPrograma = function () {
             var Prog = $scope.datalistsProg.filter(function (item) {
                 return item.Seleccionado === true;
             });
             TecnicaService.inhabilitarPrograma(Prog, function (response) {
                 if (response.success) {
                     $('#modalInhabilitarPrograma').modal('hide');
                     bootbox.dialog({
                         title: "Información",
                         message: "La eliminación se realizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     TecnicaService.CargarProgramas(function (response) {
                         if (response.success == true) {
                             $scope.datalistsProg = response.datos;
                             $scope.ListaCompleta = response.datos;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
                             };

                         }
                     });
                 }
             });
         };

         $scope.EliminarProgramacion = function () {
             TecnicaService.EliminarProgramacion(eliminar, function (response) {
                 if (response.success) {
                     bootbox.dialog({
                         title: "Información",
                         message: "La eliminación se realizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     $scope.LimpiarCalendar();
                     $scope.calendarioVacio();
                     $('#borrarFiltro').attr("disabled", true);
                     $('#ModalEditarProgramacion').modal("hide");
                 }
             });
         };

         $scope.GuardarAprendizEstado = function () {
             TecnicaService.GuardarAprendizEstado($scope.Aprendices.Id, $scope.Aprendices.Estado, $scope.Novedades.Descripcion, function (response) {
                 if (response.success) {
                     $("#ModalAprendizEstado").modal("hide");
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se actualizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     $scope.cargarAprendices();
                 } else {
                     bootbox.dialog({
                         title: "Información",
                         message: "Debe debe seleccionar un estado diferente al actual",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 }
             });
         };

         $scope.GuardarAprendizFicha = function () {
             TecnicaService.GuardarAprendizFicha($scope.Aprendices.Id, $scope.Aprendices.Ficha, $scope.Novedades.Descripcion, function (response) {
                 if (response.success) {
                     $("#ModalAprendizFicha").modal("hide");
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se actualizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     $scope.cargarAprendices();
                 } else {
                     bootbox.dialog({
                         title: "Información",
                         message: "Debe debe seleccionar una ficha diferente a la actual",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                 }
             });
         };

         $scope.inhabilitarFicha = function () {
             var Ficha = $scope.datalistsFichas.filter(function (item) {
                 return item.Seleccionado === true;
             });
             if (Ficha.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar una Ficha",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.inhabilitarFicha(Ficha[0].Id, function (response) {
                     if (response.success) {
                         bootbox.dialog({
                             title: "Información",
                             message: "El registro se inhabilitó con éxito",
                             buttons: {
                                 success: {
                                     label: "Cerrar",
                                     className: "btn-primary",
                                 }
                             }
                         });
                         TecnicaService.ConsultarFichas(function (response) {
                             if (response.success == true) {
                                 $scope.datalistsFichas = response.Datos;
                                 $scope.ListaCompleta = response.Datos;
                                 $scope.numberOfPages = function () {
                                     return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
                                 };

                             }
                         });
                         $("#ModalFicha").modal("hide");
                     }
                 });
             }
         };

         //funciones para actualizar registros
         $scope.Modificar = function () {

             var Inst = $scope.datalistsInst.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (Inst.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un registro",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.Modificar(Inst, function (response) {
                     if (response.success) {
                         $scope.Institucion.Id = response.datos.Id;
                         $scope.Institucion.NIT = response.datos.NIT;
                         $scope.Institucion.Codigo_DANE = response.datos.Codigo_DANE;
                         $scope.Institucion.Nombre_Colegio = response.datos.Nombre_Colegio;
                         $scope.Institucion.Direccion = response.datos.Direccion;
                         $scope.Institucion.Correo_Colegio = response.datos.Correo_Colegio;
                         $scope.Institucion.Num_Resolucion = response.datos.Num_Resolucion;
                         $scope.Institucion.Municipio = response.datos.Municipio;
                         $scope.Institucion.Tipo = response.datos.Tipo;
                         $scope.Institucion.Categoria = response.datos.Categoria;
                         $scope.Institucion.Nombre_Rector = response.datos.Nombre_Rector;
                         $scope.Institucion.Apellidos_Rector = response.datos.Apellidos_Rector;
                         $scope.Institucion.Telefono_Rector = response.datos.Telefono_Rector;
                         $scope.Institucion.Correo_Rector = response.datos.Correo_Rector;
                         $scope.Institucion.Nombre_Coordinador = response.datos.Nombre_Coordinador;
                         $scope.Institucion.Apellidos_Coordinador = response.datos.Apellidos_Coordinador;
                         $scope.Institucion.Telefono_Coordinador = response.datos.Telefono_Coordinador;
                         $scope.Institucion.Correo_Coordinador = response.datos.Correo_Coordinador;
                         $('.select2').select2({
                             placeholder: "Seleccione una opción...",
                             allowClear: true
                         });
                         $('#titlePanelEdit').text('Información de la Institución');
                         $('#atras1Edit').hide();
                         $('#atras2Edit').hide();
                         $('#siguiente2Edit').hide();
                         $('#siguiente1Edit').show();
                         $('#modalPanel1Edit').show();
                         $('#modalPanel2Edit').hide();
                         $('#modalPanel3Edit').hide();
                         $('#bol1Edit').css({ "background-color": "#286090", "color": "white" });
                         $('#bol2Edit').css({ "background-color": "white", "color": "#286090" });
                         $('#bol3Edit').css({ "background-color": "white", "color": "#286090" });
                         setTimeout(function () {
                             $('#CategoriaEdit ').val(response.datos.Categoria).trigger("change");
                             $('#municipioEdit').val(response.datos.Municipio).trigger("change");
                             $('#tipoEdit').val(response.datos.Tipo).trigger("change");
                         }, 100);
                         $('#modalModificarInstitucion').modal({ backdrop: 'static', keyboard: false });
                         $('#modalModificarInstitucion').modal('show');
                     }
                 });
             }
         }

         $scope.GuardarModificacion = function () {
             if ($scope.Institucion.NIT == "" || $scope.Institucion.Codigo_DANE == "" || $scope.Institucion.Nombre_Colegio == "" || $scope.Institucion.Direccion == ""
                 || $scope.Institucion.Correo_Colegio == "" || $scope.Institucion.Num_Resolucion == "" || $scope.Institucion.Municipio == "" || $scope.Institucion.Tipo == ""
                 || $scope.Institucion.Nombre_Rector == "" || $scope.Institucion.Apellidos_Rector == "" || $scope.Institucion.Telefono_Rector == ""
                 || $scope.Institucion.Correo_Rector == "" || $scope.Institucion.Nombre_Coordinador == "" || $scope.Institucion.Apellidos_Coordinador == ""
                 || $scope.Institucion.Telefono_Coordinador == "" || $scope.Institucion.Correo_Coordinador == "") {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe diligenciar todos los campos",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.GuardarModificacion($scope.Institucion, function (response) {
                     if (response.success == true) {
                         $("#modalModificarInstitucion").modal("hide");
                         $scope.LimpiarInstitucion();
                         TecnicaService.ConsultarInstituciones(function (response) {
                             if (response.success == true) {
                                 $scope.datalistsInst = response.datos;
                                 $scope.ListaCompleta = response.datos;
                                 $scope.Datos = $scope.datalistsInst;
                                 $scope.numberOfPages = function () {
                                     return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
                                 };
                                 bootbox.dialog({
                                     title: "Información",
                                     message: "El registro se actualizó con éxito",
                                     buttons: {
                                         success: {
                                             label: "Cerrar",
                                             className: "btn-primary",
                                         }
                                     }
                                 });
                             }
                         });
                     }
                 });
             }
         };

         $scope.Modificar2 = function () {
             var Prog = $scope.datalistsProg.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (Prog.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un registro",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.ModificarPrograma(Prog, function (response) {
                     if (response.success) {
                         $scope.Programa.Id = response.datos.Id;
                         $scope.Programa.Codigo_Programa = response.datos.Codigo_Programa;
                         $scope.Programa.Red_Tecnologica = response.datos.Red_Tecnologica;
                         $scope.Programa.Version_Programa = response.datos.Version_Programa;
                         $scope.Programa.NombrePrograma = response.datos.NombrePrograma;
                         $scope.Programa.Estado = response.datos.Estado;
                         $('#ModalEditarPrograma').modal('show');
                     }
                 })
             }
         };

         $scope.GuardarEdicionPrograma = function () {
             TecnicaService.GuardarEdicionPrograma($scope.Programa, function (response) {
                 if (response.success) {
                     $("#ModalEditarPrograma").modal("hide");
                     $scope.LimpiarPrograma();
                     TecnicaService.CargarProgramas(function (response) {
                         if (response.success == true) {
                             $scope.datalistsProg = response.datos;
                             $scope.ListaCompleta = response.datos;
                             $scope.Datos = $scope.datalistsProg;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
                             };
                             bootbox.dialog({
                                 title: "Información",
                                 message: "El registro se actualizó con éxito",
                                 buttons: {
                                     success: {
                                         label: "Cerrar",
                                         className: "btn-primary",
                                     }
                                 }
                             });
                         }
                     });
                 }
             });
         }

         $scope.Modificar3 = function () {
             var DocPar = $scope.datalistsDocPar.filter(function (item) {
                 return item.Seleccionado === true;
             });
             if (DocPar.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un registro",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.Modificar3(DocPar, function (response) {
                     if (response.success) {
                         $scope.DocentePar.Id = response.datos.Id;
                         $scope.DocentePar.Telefono = response.datos.Telefono;
                         $scope.DocentePar.Nombres = response.datos.Nombres;
                         $scope.DocentePar.Apellidos = response.datos.Apellidos;
                         $scope.DocentePar.Email = response.datos.Email;
                         $scope.DocentePar.Id_Institucion = response.datos.Id_Institucion;
                         $scope.DocentePar.Id_Programa = response.datos.Id_Programa;
                         $('.select2').select2({
                             placeholder: "Seleccione una opción...",
                             allowClear: true
                         });
                         setTimeout(function () {
                             $('#InstDParEdit').val(response.datos.Id_Institucion).trigger('change');
                         }, 100);
                         setTimeout(function () {
                             $('#ProgDParEdit').val(response.datos.Id_Programa).trigger('change');
                         }, 300);
                         $('#ModalEditarDocentePar').modal('show');
                     }
                 });
             }
         };

         $scope.GuardarEdicionDocentePar = function () {
             TecnicaService.GuardarEdicionDocentePar($scope.DocentePar, function (response) {
                 if (response.success) {
                     $("#ModalEditarDocentePar").modal("hide");
                     $scope.LimpiarDocentePar();
                     TecnicaService.CargarDocentePar(function (response) {
                         if (response.success == true) {
                             $scope.datalistsDocPar = response.datos;
                             $scope.ListaCompleta = response.datos;
                             $scope.Datos = $scope.datalistsDocPar;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsDocPar.length / $scope.pageSize);
                             };
                             bootbox.dialog({
                                 title: "Información",
                                 message: "El registro se actualizó con éxito",
                                 buttons: {
                                     success: {
                                         label: "Cerrar",
                                         className: "btn-primary",
                                     }
                                 }
                             });
                         }
                     });
                 }
             });
         };

         $scope.Modificar4 = function () {
             var Instruc = $scope.datalistsI.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (Instruc.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un registro",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.Modificar4(Instruc, function (response) {
                     if (response.success) {
                         $scope.InstructorSENA.Id = response.datos.Id;
                         $scope.InstructorSENA.Cedula = response.datos.Cedula;
                         $scope.InstructorSENA.Nombres = response.datos.Nombres;
                         $scope.InstructorSENA.Apellidos = response.datos.Apellidos;
                         $scope.InstructorSENA.Correo_Misena = response.datos.Correo_Misena;
                         $scope.InstructorSENA.Correo_Alternativo = response.datos.Correo_Alternativo;
                         $scope.InstructorSENA.Municipio = response.datos.Municipio;
                         $scope.InstructorSENA.Telefono_Fijo = response.datos.Telefono_Fijo;
                         $scope.InstructorSENA.Celular = response.datos.Celular;
                         $scope.InstructorSENA.Area = response.datos.Area;
                         $scope.InstructorSENA.Profesion = response.datos.Profesion;
                         $scope.InstructorSENA.Programa_Formacion = response.datos.Programa_Formacion;
                         $('#ModalEditarInstructor').modal('show');
                     }
                 });
             }
         };

         $scope.GuardarEdicionInstructor = function () {
             TecnicaService.GuardarEdicionInstructor($scope.InstructorSENA, function (response) {
                 if (response.success) {
                     $('#ModalEditarInstructor').modal('hide');
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se modificó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     TecnicaService.CargarInstructores(function (response) {
                         if (response.success == true) {
                             $scope.datalistsI = response.datos;
                             $scope.ListaCompleta = response.datos;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                             };

                         }
                     });
                 }
             });
         };

         $scope.modificarProgramacion = function (id, instruc, grado, ficha, inicio, fin, tipo) {
             eliminar = 0;
             $scope.InstMedia = [];
             TecnicaService.ConsultarInstructorMedia(function (response) {
                 if (response.success == true) {
                     $.each(response.Datos, function (index, value) {
                         $scope.InstMedia.push({ Instruc: value })
                     });
                 }
             });
             TecnicaService.ConsultarProgramacionId(id, function (response) {
                 debugger;

                 if ($rootScope.globals.currentUser.tipousuario == 3) {
                     $('#btn5').click(function () {
                         $("#ModalEditarProgramacion").modal("hide");
                     });
                 } else {
                     if (response.success) {
                         eliminar = response.datos.Id;
                         $scope.MediaTecnica.Id = response.datos.Id;
                         $scope.MediaTecnica.Hora_Inicio = response.datos.Hora_Inicio;
                         $scope.MediaTecnica.Hora_Fin = response.datos.Hora_Fin;
                         $scope.MediaTecnica.Grado = response.datos.Grado;
                         $scope.MediaTecnica.Ficha = response.datos.Ficha;
                         $scope.MediaTecnica.Instructor = response.datos.Instructor;
                         $scope.MediaTecnica.Dias = response.datos.Dias;

                         if (response.ds.Parametro15 == "true") {
                             $("#1Edit").prop('checked', true);
                             $scope.Dias.Lunes = true;
                         } else {
                             $("#1Edit").prop('checked', false);
                             $scope.Dias.Lunes = false;
                         }
                         if (response.ds.Parametro16 == "true") {
                             $("#2Edit").prop('checked', true);
                             $scope.Dias.Martes = true;
                         } else {
                             $("#2Edit").prop('checked', false);
                             $scope.Dias.Martes = false;
                         }
                         if (response.ds.Parametro16 == "true") {
                             $("#3Edit").prop('checked', true);
                             $scope.Dias.Miercoles = true;
                         } else {
                             $("#3Edit").prop('checked', false);
                             $scope.Dias.Miercoles = false;
                         }
                         if (response.ds.Parametro18 == "true") {
                             $("#4Edit").prop('checked', true);
                             $scope.Dias.Jueves = true;
                         } else {
                             $("#4Edit").prop('checked', false);
                             $scope.Dias.Jueves = false;
                         }
                         if (response.ds.Parametro19 == "true") {
                             $("#5Edit").prop('checked', true);
                             $scope.Dias.Viernes = true;
                         } else {
                             $("#5Edit").prop('checked', false);
                             $scope.Dias.Viernes = false;
                         }
                         if (response.ds.parametro20 == "true") {
                             $("#6Edit").prop('checked', true);
                             $scope.Dias.Sabado = true;
                         } else {
                             $("#6Edit").prop('checked', false);
                             $scope.Dias.Sabad = false;
                         }
                         if (response.ds.parametro21 == "true") {
                             $("#7Edit").prop('checked', true);
                             $scope.Dias.Domingo = true;
                         } else {
                             $("#7Edit").prop('checked', false);
                             $scope.Dias.Domingo = false;
                         }

                         $('.datetimepicker3').datetimepicker({
                             defaultDate: false,
                             format: 'LT'
                         });

                         $('.select2').select2({
                             placeholder: "Seleccione una opción...",
                             allowClear: true
                         });

                         setTimeout(function () {
                             $('#instrucEdit').val(response.datos.Instructor).trigger("change");
                             $("#fichaaE").val(response.datos.Ficha).trigger("change");
                         }, 100);

                         $('#nameInstruc').text(instruc);
                         $('#TextIni').text(inicio);
                         $('#TextFin').text(fin);
                         if (tipo == 0) {
                             $('#spnInst').text("Institución: ");
                         } else {
                             $('#spnInst').text("Instructor: ");
                         }
                         $('#TextInst').text(response.Lista[0].Institucion);
                         $('#TextProg').text(response.Lista[0].Programa);
                         $('#TextFi').text(ficha);
                         $('#InfoProggra').show();
                         $('#ProgramacionE').hide();
                         $('#btnEditarProg').text('Editar');
                         $('#btnEditarProg').addClass('btnEditarProg');
                         $('#btnEliminarProg').removeAttr("disabled");
                         $('#btnGuardarProg').attr("disabled", true);
                         $("#ModalEditarProgramacion").modal("show");
                     }
                 }


             });

         };

         $scope.GuardarModificacionProgramacion = function () {
             debugger;
             var D = "";
             D += ($scope.Dias.Lunes != false) ? "LUNES - " : "";
             D += ($scope.Dias.Martes != false) ? "MARTES - " : "";
             D += ($scope.Dias.Miercoles != false) ? "MIÉRCOLES - " : "";
             D += ($scope.Dias.Jueves != false) ? "JUEVES - " : "";
             D += ($scope.Dias.Viernes != false) ? "VIERNES - " : "";
             D += ($scope.Dias.Sabado != false) ? "SÁBADO - " : "";
             D += ($scope.Dias.Domingo != false) ? "DOMINGO - " : "";
             var num = D.length;
             var Cale = D.substring(0, num - 3);
             $scope.MediaTecnica.Dias = Cale;
             $scope.MediaTecnica.Hora_Inicio = $("#inicialEdit").val();
             $scope.MediaTecnica.Hora_Fin = $("#finalEdit").val();
             TecnicaService.GuardarModificacionProgramacion($scope.MediaTecnica, function (response) {
                 debugger;
                 if (response.success) {
                     $('#ModalEditarProgramacion').modal('hide');
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se modificó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     $scope.LimpiarCalendar();
                     $scope.calendarioVacio();
                     $('#borrarFiltro').attr("disabled", true);
                 }
             });
         };


         //Permite ver todos los registros en el modal Editar aprendicesTecnica 
         $scope.ModificarA = function () {
             debugger;
             var Aprendiz1 = $scope.datalistsApren.filter(function (item) {
                 return item.Seleccionado === true;
             });
             console.log(Aprendiz1);
             if (Aprendiz1.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar un aprendiz",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 // Función para consultar el Número de la ficha
                 TecnicaService.ConsultarFichas(function (response) {
                     debugger;
                     if (response.success == true) {
                         $scope.Ficha = response[0].Datos;
                     }
                 });
                 //Función para consultar  el colegio por el Id
                 TecnicaService.ConsultarColegiosId(Aprendiz1[0].Id, function (response) {
                     debugger;
                     if (response.success == true) {
                         $scope.Colegios = response.Datos;
                     }
                 });

                 //Función para consultar  la Ficha por medio del Id
                 TecnicaService.ConsultarFichaXId(Aprendiz1[0].Id, function (response) {
                     debugger;
                     if (response.success == true) {
                         $scope.Ficha == response.Datos;

                     }
                 })
                 $scope.Aprendices.Id = Aprendiz1[0].Id;
                 $scope.Aprendices.Documento = parseInt(Aprendiz1[0].Documento);
                 $scope.Aprendices.Nombre = Aprendiz1[0].Nombre;
                 $scope.Aprendices.Apellido = Aprendiz1[0].Apellido;
                 $scope.Aprendices.Email = Aprendiz1[0].Email;
                 $scope.Aprendices.Telefono = parseInt(Aprendiz1[0].Telefono);
                 $scope.Aprendices.Estado = Aprendiz1[0].Estado;
                 $scope.Aprendices.Descripcion = Aprendiz1[0].Descripcion;
                 $scope.Aprendices.TipoDocumento = Aprendiz1[0].TipoDocumento;
                 $scope.Aprendices.NombreAcudiente = Aprendiz1[0].NomAcudiente;
                 $scope.Aprendices.TelAcudiente = Aprendiz1[0].TelefonoAcud;
                 $scope.Aprendices.Direccion = Aprendiz1[0].Direccion;
                 $scope.Ficha.Num_Ficha = Aprendiz1[0].Ficha;
                 $scope.Aprendices.Colegios = Aprendiz1[0].Institucion;

                 setTimeout(function () {
                     $('#ListaFichas').val($scope.Ficha.Num_Ficha).trigger("change");
                     //$("#ListaFichas > option [value='" + Aprendiz[0].Ficha + "']").attr('selected','selected');
                     $("#ModalAprendizEdit").modal("show");
                 }, 200);
             }
         };

         $scope.GuardarAprendizEdit = function () {
             debugger;
             //Función para consultar  el colegio por el Id
             TecnicaService.ConsultarColegiosId($scope.Aprendices.Colegios, function (response) {
                 debugger;
                 if (response.success == true) {
                     $scope.Aprendices.Colegios = response.Datos.Id;

                     //Función para consultar  la Ficha por medio del Id
                     TecnicaService.ConsultarFichaXId($scope.Aprendices.Ficha, function (response) {
                         debugger;
                         if (response.success == true) {
                             $scope.Aprendices.Ficha = response.Datos.Id;
                             TecnicaService.GuardarAprendizEdit($scope.Aprendices, function (response) {
                                 if (response.success) {
                                     $("#ModalAprendizEdit").modal("hide");
                                     bootbox.dialog({
                                         title: "Información",
                                         message: "El registro se actualizó con éxito",
                                         buttons: {
                                             success: {
                                                 label: "Cerrar",
                                                 className: "btn-primary",
                                             }
                                         }
                                     });
                                     $scope.cargarAprendices();
                                 } else {
                                     bootbox.dialog({
                                         title: "Información",
                                         message: "El documento ya se encuentra registrado",
                                         buttons: {
                                             success: {
                                                 label: "Cerrar",
                                                 className: "btn-primary",
                                             }
                                         }
                                     });
                                 }
                             });
                         } else {

                         };
                     });

                 } else {

                 };
             });
         };

         $scope.ModificarF = function () {
             var Ficha = $scope.datalistsFichas.filter(function (item) {
                 return item.Seleccionado === true;
             });

             if (Ficha.length != 1) {
                 bootbox.dialog({
                     title: "Información",
                     message: "Debe seleccionar una Ficha",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
             } else {
                 TecnicaService.ConsultarFichaId(Ficha[0].Id, function (response) {
                     if (response.success) {
                         $("#numFicEdit").attr("disabled", true);
                         $scope.Ficha = response.Datos;
                         $('.select2').select2({
                             placeholder: "Seleccione una opción...",
                             allowClear: true
                         });
                         setTimeout(function () {
                             $("#InstFichaEdit").val(response.Datos.Institucion).trigger("change");
                             $("#ProgFichaEdit").val(response.Datos.Programa).trigger("change");
                         }, 100);
                         $('#FechaIniFichEdit').datetimepicker({
                             useCurrent: false,
                             format: 'YYYY/MM/DD',
                             locale: 'es',

                         });
                         $('#FechaFinFichaEdit').datetimepicker({
                             useCurrent: false,
                             format: 'YYYY/MM/DD',
                             locale: 'es',
                         });
                         TecnicaService.CargarProgramas(function (response) {
                             if (response.success) {
                                 $scope.selectdatalistsProg = response.datos;
                             }
                         });
                         $("#ModalFichaEdit").modal("show");
                     }
                 });
             }
         };

         $scope.GuardarFichaEdit = function () {
             var fechaIni = $("#FechaIniFichEdit").val();
             var fechaFin = $("#FechaFinFichaEdit").val();
             $scope.Ficha.Fecha_Inicio = fechaIni;
             $scope.Ficha.Fecha_Fin = fechaFin;
             TecnicaService.GuardarFichaEdit($scope.Ficha, function (response) {
                 if (response.success) {
                     bootbox.dialog({
                         title: "Información",
                         message: "El registro se actualizó con éxito",
                         buttons: {
                             success: {
                                 label: "Cerrar",
                                 className: "btn-primary",
                             }
                         }
                     });
                     TecnicaService.ConsultarFichas(function (response) {
                         if (response.success == true) {
                             $scope.datalistsFichas = response.Datos;
                             $scope.ListaCompleta = response.Datos;
                             $scope.numberOfPages = function () {
                                 return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
                             };

                         }
                     });
                     $("#ModalFichaEdit").modal("hide");
                 }
             });
         };

         //funciones para filtrar las tablas
         $scope.Filtrar = function (e) {
             var Busqueda = $("#Buscar").val();
             var exp = new RegExp(Busqueda);
             if (Busqueda == "") {
                 TecnicaService.ConsultarInstituciones(function (response) {
                     if (response.success == true) {

                         $scope.datalistsInst = response.datos;
                         $scope.ListaCompleta = response.datos;
                         $scope.numberOfPages = function () {
                             return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
                         };
                         $scope.Datos = $scope.datalistsInst;

                     }
                 });
             }
             var Instructor = [];
             $scope.datalistsInst = $scope.ListaCompleta;
             Instructor = $scope.datalistsInst.filter(function (item) {

                 if (exp.test(item.Nombre_Colegio.toLowerCase()) || exp.test(item.Nombre_Colegio.toUpperCase())) {
                     return item;
                 }

                 else if (exp.test(item.Direccion.toLowerCase()) || exp.test(item.Direccion.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.Municipio.toLowerCase()) || exp.test(item.Municipio.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.Tipo.toLowerCase()) || exp.test(item.Tipo.toUpperCase())) {
                     return item;
                 }


             });
             $scope.datalistsInst = Instructor;
             //Variable para setear la paginación 
             $scope.curPage = 0;
         };

         $scope.Filtrar2 = function (e) {
             var Busqueda = $("#Buscar2").val();
             var exp = new RegExp(Busqueda);
             if (Busqueda == "") {
                 TecnicaService.CargarProgramas(function (response) {
                     if (response.success == true) {

                         $scope.datalistsProg = response.datos;
                         $scope.ListaCompleta = response.datos;
                         $scope.numberOfPages = function () {
                             return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
                         };
                         $scope.Datos = $scope.datalistsProg;

                     }
                 });
             }
             var Programa = [];
             $scope.datalistsProg = $scope.ListaCompleta;
             Programa = $scope.datalistsProg.filter(function (item) {
                 if (exp.test(item.NombrePrograma.toLowerCase()) || exp.test(item.NombrePrograma.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.Codigo_Programa) || exp.test(item.Codigo_Programa)) {
                     return item;
                 }
                 else if (exp.test(item.Red_Tecnologica.toLowerCase()) || exp.test(item.Red_Tecnologica.toUpperCase())) {
                     return item;
                 }


             });
             $scope.datalistsProg = Programa;
             //Variable para setear la paginación 
             $scope.curPage = 0;
         };

         $scope.Filtrar3 = function (e) {
             var Busqueda = $("#Buscar3").val();
             var exp = new RegExp(Busqueda);
             if (Busqueda == "") {
                 TecnicaService.CargarDocentePar(function (response) {
                     if (response.success == true) {

                         $scope.datalistsDocPar = response.datos;
                         $scope.ListaCompleta = response.datos;
                         $scope.numberOfPages = function () {
                             return Math.ceil($scope.datalistsDocPar.length / $scope.pageSize);
                         };
                         $scope.Datos = $scope.datalistsDocPar;

                     }
                 });
             }
             var Programa = [];
             $scope.datalistsDocPar = $scope.ListaCompleta;
             Programa = $scope.datalistsDocPar.filter(function (item) {
                 if (exp.test(item.Nombres.toLowerCase()) || exp.test(item.Nombres.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.Apellidos.toLowerCase()) || exp.test(item.Apellidos.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.Institucion.toLowerCase()) || exp.test(item.Institucion.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.Programa.toLowerCase()) || exp.test(item.Programa.toUpperCase())) {
                     return item;
                 }


             });
             $scope.datalistsDocPar = Programa;
             //Variable para setear la paginación 
             $scope.curPage = 0;
         };

         $scope.Filtrar4 = function (e) {
             var Busqueda = $("#Buscar4").val();
             var exp = new RegExp(Busqueda);
             if (Busqueda == "") {
                 TecnicaService.CargarInstructores(function (response) {
                     if (response.success == true) {

                         $scope.datalistsI = response.datos;
                         $scope.ListaCompleta = response.datos;
                         $scope.numberOfPages = function () {
                             return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                         };
                         $scope.Datos = $scope.datalistsI;

                     }
                 });
             }
             var Programa = [];
             $scope.datalistsI = $scope.ListaCompleta;
             Programa = $scope.datalistsI.filter(function (item) {

                 if (exp.test(item.Cedula.toLowerCase()) || exp.test(item.Cedula.toUpperCase())) {

                     return item;
                 }

                 else if (exp.test(item.Nombre.toLowerCase()) || exp.test(item.Nombre.toUpperCase())) {
                     return item;
                 }

                 else if (exp.test(item.Apellido.toLowerCase()) || exp.test(item.Apellido.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.Email.toLowerCase()) || exp.test(item.Email.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.Telefono.toLowerCase()) || exp.test(item.Telefono.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.NombreTipoContrato.toLowerCase()) || exp.test(item.NombreTipoContrato.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.NombreTipoInstructor.toLowerCase()) || exp.test(item.NombreTipoInstructor.toUpperCase())) {
                     return item;
                 }

             });
             $scope.datalistsI = Programa;
             //Variable para setear la paginación 
             $scope.curPage = 0;
         };

         $('#btnEditarProg').click(function () {
             if ($('#btnEditarProg').hasClass('btnEditarProg')) {
                 $('#InfoProggra').hide();
                 $('#ProgramacionE').show();
                 $('#btnEditarProg').removeClass('btnEditarProg');
                 $('#btnEditarProg').text('Cancelar');
                 $('#btnEliminarProg').attr("disabled", true);
                 $('#btnGuardarProg').removeAttr("disabled");
             } else {
                 $('#InfoProggra').show();
                 $('#ProgramacionE').hide();
                 $('#btnEditarProg').text('Editar');
                 $('#btnEditarProg').addClass('btnEditarProg');
                 $('#btnEliminarProg').removeAttr("disabled");
                 $('#btnGuardarProg').attr("disabled", true);
             }

         });

         //Funciones para subir archivos excel
         $scope.UploadFileWeb4 = function () {
             $("#fileUploadWeb4").trigger('click');
         };

         $("#fileUploadWeb4").change(function () {
             dataweb = new FormData();

             var files = $("#fileUploadWeb4").get(0).files;

             var fileExtension = ['xlsx'];
             if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
                 bootbox.dialog({
                     title: "Importar Archivo",
                     message: "La extencion del archivo no es valida",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
                 $("#fileUploadWeb4").replaceWith($("#fileUploadWeb4").val('').clone(true));

                 //waitingDialog.hide();
                 return false;

             }


             // Add the uploaded image content to the form data collection
             if (files.length > 0) {

                 readURL(this, "logoweb");

                 dataweb.append("UploadedImage", files[0]);
                 if (dataweb != null) {
                     TecnicaService.SubirArchivo(dataweb, function (response) {
                         if (response.success) {

                             bootbox.dialog({
                                 title: "Importar Archivo",
                                 message: "La importación del archivo se realizó con éxito ",
                                 buttons: {
                                     success: {
                                         label: "Cerrar",
                                         className: "btn-primary",
                                     }
                                 }
                             });
                             $scope.path = response.path;

                             $("#fileUploadWeb4").replaceWith($("#fileUploadWeb4").val('').clone(true));
                             TecnicaService.CargarInstructores(function (response) {
                                 if (response.success == true) {
                                     $scope.datalistsI = response.datos;
                                     $scope.ListaCompleta = response.datos;
                                     $scope.numberOfPages = function () {
                                         return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                                     };

                                 }
                             });

                             $("#fileUploadWeb4").replaceWith($("#fileUploadWeb4").val('').clone(true));
                             //waitingDialog.hide();

                             return;
                         }

                     });
                 }

             }

         });

         function readURL(input, control) {
             if (input.files && input.files[0]) {
                 var reader = new FileReader();

                 reader.onload = function (e) {
                     $('#' + control + '').attr('src', e.target.result);
                 }

                 reader.readAsDataURL(input.files[0]);
             }
         };

         $('#subirExcelProgramacion').click(function () {
             $("#fileUploadWeb5").trigger('click');
         });

         $("#fileUploadWeb5").change(function () {
             $('#modalRegistrarProgramacion').modal('hide');
             dataweb = new FormData();

             var files = $("#fileUploadWeb5").get(0).files;

             var fileExtension = ['xlsx'];
             if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
                 bootbox.dialog({
                     title: "Importar Archivo",
                     message: "La extencion del archivo no es valida",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
                 $("#fileUploadWeb5").replaceWith($("#fileUploadWeb5").val('').clone(true));

                 //waitingDialog.hide();
                 return false;

             }


             // Add the uploaded image content to the form data collection
             if (files.length > 0) {

                 readURL(this, "logoweb");

                 dataweb.append("UploadedImage", files[0]);
                 if (dataweb != null) {
                     TecnicaService.SubirArchivoProgramacion(dataweb, function (response) {
                         if (response.success) {

                             bootbox.dialog({
                                 title: "Importar Archivo",
                                 message: "La importación del archivo se realizó con éxito ",
                                 buttons: {
                                     success: {
                                         label: "Cerrar",
                                         className: "btn-primary",
                                     }
                                 }
                             });



                             $scope.path = response.path;

                             $("#fileUploadWeb5").replaceWith($("#fileUploadWeb5").val('').clone(true));
                             //TecnicaService.CargarInstructores(function (response) {
                             //    if (response.success == true) {
                             //        console.log(response.datos)
                             //        $scope.datalistsI = response.datos;
                             //        $scope.ListaCompleta = response.datos;
                             //        $scope.numberOfPages = function () {
                             //            return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                             //        };

                             //    }
                             //});

                             $("#fileUploadWeb5").replaceWith($("#fileUploadWeb5").val('').clone(true));
                             //waitingDialog.hide();

                             return;
                         }

                     });
                 }

             }

         });

         $scope.FiltrarA = function (e) {
             var Busqueda = $("#BuscarA").val();
             var exp = new RegExp(Busqueda);
             if (Busqueda == "") {
                 TecnicaService.ConsultarAprendices(function (response) {
                     if (response.success == true) {
                         $scope.datalistsApren = response.Datos;
                         $scope.ListaCompleta = response.Datos;
                         $scope.numberOfPages = function () {
                             return Math.ceil($scope.datalistsApren.length / $scope.pageSize);
                         };

                     }
                 });
             }
             var Aprendiz = [];
             $scope.datalistsApren = $scope.ListaCompleta;
             Aprendiz = $scope.datalistsApren.filter(function (item) {

                 if (exp.test(item.Documento) || exp.test(item.Documento)) {

                     return item;
                 }
                 else if (exp.test(item.Nombre.toLowerCase()) || exp.test(item.Nombre.toUpperCase())) {
                     return item;
                 }
                 else if (exp.test(item.Apellido.toLowerCase()) || exp.test(item.Apellido.toUpperCase())) {
                     return item;
                 }




             });
             $scope.datalistsApren = Aprendiz;
             //Variable para setear la paginación 
             $scope.curPage = 0;
         };

         $scope.FiltrarF = function (e) {
             var Busqueda = $("#BuscarF").val();
             var exp = new RegExp(Busqueda);
             if (Busqueda == "") {
                 TecnicaService.ConsultarFichas(function (response) {
                     if (response.success == true) {
                         $scope.datalistsFichas = response.Datos;
                         $scope.ListaCompleta = response.Datos;
                         $scope.numberOfPages = function () {
                             return Math.ceil($scope.datalistsFichas.length / $scope.pageSize);
                         };

                     }
                 });
             }
             var FIcha = [];
             $scope.datalistsFichas = $scope.ListaCompleta;
             FIcha = $scope.datalistsFichas.filter(function (item) {

                 if (exp.test(item.Num_Ficha) || exp.test(item.Num_Ficha)) {

                     return item;
                 }
                 else if (exp.test(item.Programa.toLowerCase()) || exp.test(item.Programa.toUpperCase())) {
                     return item;
                 }
             });
             $scope.datalistsFichas = FIcha;
             //Variable para setear la paginación 
             $scope.curPage = 0;
         };

         //funció para consultar Programación del istructor 
         if ($rootScope.globals.currentUser.tipousuario == 3) {
             debugger;
             $(".menuInstruc").css("display", "none");
             $(".RegistrarProgramacion").css("display", "none");
             $(".GenerarReporte").css("display", "none");
             $("#btnReporte1").css("display", "none");
             $(".ModalFiltrarProgramacion").css("display", "none");
             $(".tabOcult").css("display", "none");
             $("#tabProgramacion").css("display", "block");
             $('#borrarFiltro').attr("disabled", true);
             $scope.LimpiarCalendar();
             $scope.calendarioVacio();
             var Nombre = $rootScope.globals.currentUser.nombre;
             var Apellidos = $rootScope.globals.currentUser.apellido;
             var NombreCompleto = Nombre + ' ' + Apellidos;
             $scope.CargarCalendario(NombreCompleto);


             $('#btn5').click(function () {
                 $scope.CargarCalendario(NombreCompleto);
             });

             TecnicaService.ConsultarInstituciones($rootScope.globals.tipousuario, function (response) {
                 debugger;
                 if (response.success == true) {
                     $scope.datalists = response.datos;
                     $scope.Datos = $scope.datalists;
                     $scope.ListaCompleta = response.datos;
                     $scope.numberOfPages = function () {
                         return Math.ceil($scope.datalists.length / $scope.pageSize);
                     };
                 }
             });
         } else {
             TecnicaService.ConsultarInstituciones(function (response) {
                 if (response.success == true) {
                     $scope.datalists = response.datos;
                     $scope.ListaCompleta = response.datos;
                     $scope.Datos = $scope.datalists;
                     $scope.numberOfPages = function () {
                         return Math.ceil($scope.datalists.length / $scope.pageSize);
                     }
                 }
             });
         }


         //SUBIR ARCHIVO  Autor:1000
         $scope.UploadFileWebAprendiz = function () {
             $("#fileUploadWebAprendiz").trigger('click');
         };

         function readURL(input, control) {
             if (input.files && input.files[0]) {
                 var reader = new FileReader();

                 reader.onload = function (e) {
                     $('#' + control + '').attr('src', e.target.result);
                 }

                 reader.readAsDataURL(input.files[0]);
             }
         };

         $("#fileUploadWebAprendiz").change(function () {
             dataweb = new FormData();

             var files = $("#fileUploadWebAprendiz").get(0).files;

             //
             var fileExtension = ['xlsx'];
             if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
                 bootbox.dialog({
                     title: "Importar Archivo",
                     message: "La extencion del archivo no es valida",
                     buttons: {
                         success: {
                             label: "Cerrar",
                             className: "btn-primary",
                         }
                     }
                 });
                 $("#fileUploadWebAprendiz").replaceWith($("#fileUploadWebAprendiz").val('').clone(true));
                 return false;
             }
             // Add the uploaded image content to the form data collection
             if (files.length > 0) {

                 readURL(this, "logoweb");

                 dataweb.append("UploadedImage", files[0]);
                 if (dataweb != null) {
                     TecnicaService.SubirArchivo(dataweb, function (response) {
                         if (response.success) {

                             bootbox.dialog({
                                 title: "Importar Archivo",
                                 message: "La importación del archivo se realizó con éxito ",
                                 buttons: {
                                     success: {
                                         label: "Cerrar",
                                         className: "btn-primary",
                                     }
                                 }
                             });

                             $scope.path = response.path;

                             $("#fileUploadWebAprendiz").replaceWith($("#fileUploadWebAprendiz").val('').clone(true));
                             TecnicaService.ConsultarAprendicesTodos(function (response) {
                                 if (response.success == true) {
                                     $scope.datalistsITodos = response.datos;
                                     $scope.ListaCompleta = response.datos;
                                     $scope.numberOfPages = function () {
                                         return Math.ceil($scope.datalistsITodos.length / $scope.pageSize);
                                     };
                                 }
                             });

                             $("#fileUploadWebAprendiz").replaceWith($("#fileUploadWebAprendiz").val('').clone(true));
                             return;
                         }

                     });
                 }

             }

         });

     }]);