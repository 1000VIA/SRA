ProgramacionApp.controller('VirtualidadController',
    ['$scope', '$rootScope', '$location', 'VirtualidadService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, VirtualidadService, $routeParams, $sce) {

            $("#LabelAprendices").hide();  //me permite ocultar el mensaje "No hay Coincidencia de Datos"

            $scope.AbrirEspecial = function () {
                $location.url("/Administracion/Especial");
            };

            $scope.AbrirBasicas = function () {
                $location.url("/Administracion/Basicas");
            };
            $scope.AbrirTecnica = function () {
                $location.url("/Administracion/Tecnica");
            };
            $("#labelInstructor").hide();
            $scope.curPage = 0;
            $scope.pageSize = 35;
            eliminar = 0;
            $scope.columGestion = false;

            $scope.filtrarProgramacion = function () {
                n1 = $('#instrucFil').val();
                n2 = $('#fichaFil').val();
                if (n1 == "") {
                    $scope.CargarCalendario2(n2);
                } else if (n2 == "") {
                    $scope.CargarCalendario(n1);
                }
                $('#borrarFiltro').removeAttr("disabled");
                $('#ModalFiltrarProgramacion').modal('hide');
                setTimeout(function () {
                    $('#instrucFil').val("").trigger("change");
                    $('#fichaFil').val("").trigger("change");
                }, 100);
            };

            //cambio de tabs
            $('#btn1').click(function () {
                $('#Buscar').show();
                $('#Buscar2').hide();
                $('#Buscar3').hide();
                $('#tabA').hide();
                $('#tab1').show();
                $('#tab2').hide();
                $('#tab3').hide();
                $scope.cargarInstructor();
                $('#calendar').fullCalendar('destroy');
            });

            $('#btn2').click(function () {
                $('#Buscar2').show();
                $('#Buscar').hide();
                $('#Buscar3').hide();
                $('#tabA').hide();
                $('#tab1').hide();
                $('#tab2').show();
                $('#tab3').hide();
                $scope.cargarFichas();
                $('#calendar').fullCalendar('destroy');
                setTimeout(function () {
                    debugger;
                    VirtualidadService.ConsultarInstructores(function (response) {
                        if (response.success == true) {
                            $scope.InstructoresFicha = response.datos;
                        }
                    });
                }, 200);
            });

            $('#btn3').click(function () {
                $scope.LimpiarCalendar();
                $('#Buscar2').hide();
                $('#Buscar').hide();
                $('#Buscar3').hide();
                $('#tabA').hide();
                $('#tab1').hide();
                $('#tab2').hide();
                $('#tab3').show();
                $scope.calendarioVacio();
                VirtualidadService.ConsultarFichasNoF(function (response) {
                    if (response.success) {
                        $scope.PFichas = response.datos;
                    }
                });
                VirtualidadService.ConsultarInstructores(function (response) {
                    if (response.success) {
                        $scope.PInstructor = response.datos;
                    }
                });
                $('#borrarFiltro').attr("disabled", true);
            });

            $("#btnA").click(function () {
                $('#Buscar').hide();
                $('#Buscar2').hide();
                $('#Buscar3').show();
                $('#tabA').show();
                $('#tab1').hide();
                $('#tab2').hide();
                $('#tab3').hide();
                $('#LabelAprendices').hide();
                VirtualidadService.ConsultarFichasNoF(function (response) {
                    debugger;
                    if (response.success) {
                        $scope.PFichas = response.datos;
                    }
                });               
                $scope.VaciarCampos();
                $scope.cargarAprendices();
                
                $('#calendar').fullCalendar('destroy');
            });

            $('#borrarFiltro').click(function () {
                $scope.LimpiarCalendar();
                $scope.calendarioVacio();
                $('#borrarFiltro').attr("disabled", true);
            });

            VirtualidadService.ConsultarInstructores(function (response) {
                $('#Buscar2').hide();
                $('#Buscar').show();
                $('#Buscar3').hide();
                debugger;
                if (response.success == true) {
                    $scope.datalistsI = response.datos;
                    if (response.datos.length > 0) {
                        $("#labelInstructor").hide();
                    } else {
                        $("#labelInstructor").show();
                    }
                    $scope.ListaCompleta = response.datos;
                    $scope.numberOfPages = function () {
                        return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                    };

                }
            });

            VirtualidadService.ConsultarInstructoresTodos(function (response) {
                $('#Buscar2').hide();
                $('#Buscar').show();
                $('#Buscar3').hide();
                if (response.success == true) {
                    $scope.datalistsITodos = response.datos;
                    $scope.ListaCompleta = response.datos;
                    $scope.numberOfPages = function () {
                        return Math.ceil($scope.datalistsITodos.length / $scope.pageSize);
                    };

                }
            });

            VirtualidadService.ConsultarProgramas(function (response) {
                if (response.success) {
                    $scope.ProgramasT = response.Datos;
                }
            });

            VirtualidadService.ConsultarFichasLectiva(function (response) {
                if (response.success) {
                    $scope.FichasLectiva = response.Datos;
                }
            });

            //fullcalendar
            $scope.events = [];

            $scope.LimpiarCalendar = function () {
                $('#calendar').fullCalendar('removeEventSource', $scope.events);
                $('#calendar').fullCalendar('refetchEvents');
                $('#calendar').fullCalendar('destroy');
                $scope.events = [];
            };

            $scope.CargarCalendario = function (nombre) {
                $scope.LimpiarCalendar();
                VirtualidadService.ConsultarProgramacion(nombre, function (response) {
                    if (response.success == true) {
                        $.each(response.datos, function (index, value) {
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
                            if (value.Hora_Inicio == "TODO EL DIA") {
                                allday = true;
                            }
                            var fecha1 = moment(value.Fecha_Inicio);
                            var fecha2 = moment(value.Fecha_Fin);
                            var dias = fecha2.diff(fecha1, 'days');
                            var PDIas = value.Dias;
                            for (var i = 0; i <= dias; i++) {
                                var fecha = $scope.sumaFecha(i, value.Fecha_Inicio);
                                var fff = fecha.split('/');
                                var ff = fff[1] + "/" + fff[0] + "/" + fff[2];
                                var fecha2 = new Date(ff);
                                var StrDia = moment(fecha2).lang("es").format('dddd');

                                $scope.Calendario = function () {
                                    $scope.events.push({
                                        tipo: 0,
                                        id: value.Id,
                                        ficha: value.Ficha,
                                        dias: value.Dias,
                                        title: value.Instructor,
                                        start: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), inic, parseInt(HoraInicio[1])),
                                        end: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), finc, parseInt(HoraFin[1])),
                                        allDay: allday,
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
                                if (PDIas.indexOf("SABADO") >= 0) {
                                    if (StrDia == "sábado") {
                                        $scope.Calendario();
                                    }
                                }
                                if (PDIas.indexOf("DOMINGO") >= 0) {
                                    if (StrDia == "Domingo") {
                                        $scope.Calendario();
                                    }
                                }
                            }
                        });

                        $('#calendar').fullCalendar({
                            locale: 'es',
                            /*hiddenDays: [0],*/
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
                                $scope.modificarProgramacion(event.id, event.title, event.ficha, ini, fin, event.tipo);
                            }
                        });
                    }
                });
            };

            $scope.CargarCalendario2 = function (ficha) {
                $scope.LimpiarCalendar();
                VirtualidadService.ConsultarProgramacion2(ficha, function (response) {
                    if (response.success == true) {
                        $.each(response.datos, function (index, value) {
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
                            if (value.Hora_Inicio == "TODO EL DIA") {
                                allday = true;
                            }
                            var fecha1 = moment(value.Fecha_Inicio);
                            var fecha2 = moment(value.Fecha_Fin);
                            var dias = fecha2.diff(fecha1, 'days');
                            var PDIas = value.Dias;
                            for (var i = 0; i <= dias; i++) {
                                var fecha = $scope.sumaFecha(i, value.Fecha_Inicio);
                                var fff = fecha.split('/');
                                var ff = fff[1] + "/" + fff[0] + "/" + fff[2];
                                var fecha2 = new Date(ff);
                                var StrDia = moment(fecha2).lang("es").format('dddd');
                                $scope.Calendario = function () {
                                    $scope.events.push({
                                        tipo: 1,
                                        id: value.Id,
                                        instruc: value.Instructor,
                                        dias: value.Dias,
                                        title: value.Ficha,
                                        start: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), inic, parseInt(HoraInicio[1])),
                                        end: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), finc, parseInt(HoraFin[1])),
                                        allDay: allday,
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
                                if (PDIas.indexOf("MIERCOLES") >= 0) {
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
                                if (PDIas.indexOf("SABADO") >= 0) {
                                    if (StrDia == "sábado") {
                                        $scope.Calendario();
                                    }
                                }
                                if (PDIas.indexOf("DOMINGO") >= 0) {
                                    if (StrDia == "Domingo") {
                                        $scope.Calendario();
                                    }
                                }
                            }
                        });

                        $('#calendar').fullCalendar({
                            locale: 'es',
                            /*hiddenDays: [0],*/
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
                                    eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
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
                                $scope.modificarProgramacion(event.id, event.title, event.instruc, ini, fin, event.tipo);
                            }
                        });
                    }
                });
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

            //Funciòn para consultar las areas
            VirtualidadService.ConsultarAreas(function (response) {
                if (response.success == true) {
                    $scope.Areas = response.datos;
                }
            });

            //Abrir modals
            $scope.agregarRegistro = function () {
                $scope.VaciarCampos();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $('#ModalInstructor').modal('show');
            };

            $scope.CambiarEstadoSeleccionadosInstructor = function () {
                var InstructorBorrar = $scope.datalistsITodos.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (InstructorBorrar.length == 0) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Debes seleccionar por lo menos un registro",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                } else {
                    $('#modalInhabilitarInstructor').modal('show');
                }
            };

            $scope.agregarRegistro2 = function () {
                $scope.VaciarFicha();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $('#IniLec').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',

                });
                $('#IniProd').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',

                });
                $('#FinProd').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',

                });
                $('#IniLec').on('dp.change', function (e) {
                    var fecha = new Date($('#IniLec').val());
                    $('#IniProd').data("DateTimePicker").minDate(fecha);
                });
                $('#IniProd').on('dp.change', function (e) {
                    var fecha = new Date($('#IniProd').val());
                    $('#FinProd').data("DateTimePicker").minDate(fecha);
                });
                $('#ModalFicha').modal('show');
            };

            $scope.modalAgregarFichas = function () {
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
                $('#modalAgregarFichas').modal('show');
            };

            $scope.verFichasInstruc = function () {
                $('#tablaresultadofiltro').hide();
                $('#instrucFic').text("");
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
                $('#VerFichasInstruc').modal('show');
                //$('#btnBuscarFiltro').removeAttr("disabled");
            };

            $scope.ModalProgramacion = function () {

                $scope.VaciarCamposProgramacion();

                $('.datetimepicker3').datetimepicker({
                    useCurrent: false,
                    defaultDate: false,
                    format: 'LT'
                });

                $('.datetimepickerF').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',

                });

                $('.datetimepickerFF').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',
                });

                $('.datetimepickerF').on('dp.change', function (e) {
                    var fecha = new Date($('.datetimepickerF').val());
                    $('.datetimepickerFF').data("DateTimePicker").minDate(fecha);
                });
                //$scope.VaciarCamposProgramacion();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });

                $('#ModalProgramacion').modal('show');
            };

            $scope.ModalFiltrarProgramacion = function () {
                $('#divInputInstruc').show();
                $('#divInputProg').hide();
                $('#btnInstrucFiltro').attr("disabled", true);
                $('#btnProgFiltro').removeAttr("disabled");
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                setTimeout(function () {
                    $('#instrucFil').val("").trigger("change");
                    $('#fichaFil').val("").trigger("change");
                }, 200);
                $('#ModalFiltrarProgramacion').modal('show');
            };

            //Función que permite filtrar los aprendices 

            $scope.filtrarAprendices = function () {
                debugger;
                var AprendizTipoDocumento = $('#TipoDoc')
                setTimeout(function () {
                    AprendizTipoDocumento.val('').trigger('change');
                }, 100);

                $scope.ficha = [];

                $("#Buscar3").hide();
                $("#ModalFiltrarAprendices").modal("show")
            };

            $scope.FiltrarAprendiz = {
                TipoDocumento: "",
                ficha: "",
                Estado: ""

            };

            //Funcion para consultar aprendices 

            $scope.FiltrarAprendices = function () {
                debugger;
                if (($scope.FiltrarAprendiz != null || $scope.FiltrarAprendiz != "")) {
                    VirtualidadService.FiltrarAprendiz($scope.FiltrarAprendiz, function (response) {
                        if (response.success == true) {
                            $scope.Aprendices = response.Datos;
                            $scope.datalistsApren = $scope.Aprendices
                            $scope.datalistsApren = response.Datos;
                            // Funció que permite mostrar mensaje en caso de que no se encuentren coincidencia de datos
                            if (response.Datos.length > 0) {
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

            $scope.verHorasInstruc = function () {
                $('#tblHoras').hide();
                $('#bodyTblHoras').empty();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                setTimeout(function () {
                    $('#InstVerHoras').val("").trigger("change");
                }, 200);
                $('#VerHorasInstruc').modal("show");
            };

            $scope.agregarRegistroA = function () {
                $scope.VaciarCamposAprendiz();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $("#ModalAprendiz").modal("show");
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
                    $scope.Aprendices.Documento = parseInt(Aprendiz[0].Documento);
                    $scope.Aprendices.Nombre = Aprendiz[0].Nombre;
                    $scope.Aprendices.Apellido = Aprendiz[0].Apellido;
                    $scope.Aprendices.Email = Aprendiz[0].Email;
                    $scope.Aprendices.Telefono = parseInt(Aprendiz[0].Telefono);
                    $scope.Aprendices.Estado = Aprendiz[0].Estado;
                    $scope.Aprendices.FIcha = Aprendiz[0].Ficha;
                    $scope.Novedades.Descripcion = Aprendiz[0].Descripcion;                   
                    setTimeout(function () {
                        $("#AprenEstado").val($scope.Aprendices.Estado).trigger("change");
                        $("#ModalAprendizEstado").modal("show");
                    });
                }
            };

            $scope.verAprendices = function () {
                var FIcha = $scope.datalistsFic.filter(function (item) {
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
                    VirtualidadService.verAprendices(FIcha[0].Id, function (response) {
                        if (FIcha[0].Etapa == "Productiva") {
                            $("#thgestion").show();
                            $scope.columGestion = true;
                        } else {
                            $("#thgestion").hide();
                            $scope.columGestion = false;
                        }
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
                    VirtualidadService.EstadoFicaAprendiz(Aprendiz[0].Ficha, function (response) {
                        if (response.success) {
                            $scope.Aprendices.Id = Aprendiz[0].Id;
                            $scope.Aprendices.Documento = parseInt(Aprendiz[0].Documento);
                            $scope.Aprendices.Nombre = Aprendiz[0].Nombre;
                            $scope.Aprendices.Apellido = Aprendiz[0].Apellido;
                            $scope.Aprendices.Email = Aprendiz[0].Email;
                            $scope.Aprendices.Telefono = parseInt(Aprendiz[0].Telefono);
                            $scope.Aprendices.Estado = Aprendiz[0].Estado;
                            $scope.Aprendices.Ficha = Aprendiz[0].Ficha;
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
                                message: "El aprendiz ya no se encuentra en etapa lectiva",
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

            $scope.verNovedades = function () {
                var FIcha = $scope.datalistsFic.filter(function (item) {
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
                    VirtualidadService.verNovedades(FIcha[0].Id, function (response) {
                        if (response.success) {
                            debugger;
                            $scope.NovedadesFicha = response.ListNovedades;
                            $("#ModalVerNovedades").modal("show");
                        }
                    })
                }
            };

            $("#ModalVerAprendices").on('hidden.bs.modal', function () {
                $("#trNoResult").remove();
                $scope.AprendiceFicha = null;
            });

            $('#btnProgFiltro').click(function () {
                setTimeout(function () {
                    $('#instrucFil').val("").trigger("change");
                    $('#fichaFil').val("").trigger("change");
                }, 100);
                $('#divInputInstruc').hide();
                $('#divInputProg').show();
                $('#btnInstrucFiltro').removeAttr("disabled");
                $('#btnProgFiltro').attr("disabled", true);
            });

            $('#btnInstrucFiltro').click(function () {
                setTimeout(function () {
                    $('#instrucFil').val("").trigger("change");
                    $('#fichaFil').val("").trigger("change");
                }, 100);
                $('#divInputInstruc').show();
                $('#divInputProg').hide();
                $('#btnProgFiltro').removeAttr("disabled");
                $('#btnInstrucFiltro').attr("disabled", true);
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

            $scope.VerInstructoresFicha = function () {
                var Ficha = $scope.datalistsFic.filter(function (item) {
                    return item.Seleccionado === true;
                });
                if (Ficha.length != 1) {
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
                    $scope.VerInstructoresF();
                    setTimeout(function () {
                        for (var i = 1; i <= 10; i++) {
                            $("#spanF" + i).hide();
                        }
                        $("#smallFichaInstruc").text(Ficha[0].Num_Ficha);
                        $("#smallProgInstruc").text(Ficha[0].Programa);
                        $('.select2').select2({
                            placeholder: "Seleccione una opción...",
                            allowClear: true
                        });
                        $("#ModalInstructoresFicha").modal("show");
                    }, 100);
                    setTimeout(function () {
                        for (var i = 1; i <= 10; i++) {
                            $("#selectInstF" + i).val("").trigger("change");
                        }
                    }, 100);
                }
            };

            $scope.VerInstructoresF = function () {
                var Ficha = $scope.datalistsFic.filter(function (item) {
                    return item.Seleccionado === true;
                });
                VirtualidadService.InstructoresFicha(Ficha[0].Num_Ficha, function (response) {
                    if (response.success) {
                        if (response.Datos == null) {
                            $scope.val.Lider = false;
                            $scope.val.Tecnico = false;
                            $scope.val.Empren = false;
                            $scope.val.Ocupa = false;
                            $scope.val.Fisica = false;
                            $scope.val.MedioA = false;
                            $scope.val.Etica = false;
                            $scope.val.Comuni = false;
                            $scope.val.Ingles = false;
                            $scope.val.TIC = false;
                        } else {
                            $scope.val.Lider = (response.Datos.Lider != "") ? true : false;
                            $scope.val.Tecnico = (response.Datos.Tecnico != "") ? true : false;
                            $scope.val.Empren = (response.Datos.Emprendimiento != "") ? true : false;
                            $scope.val.Ocupa = (response.Datos.Salud_Ocupacional != "") ? true : false;
                            $scope.val.Fisica = (response.Datos.Cultura_Fisica != "") ? true : false;
                            $scope.val.MedioA = (response.Datos.Medio_Ambiente != "") ? true : false;
                            $scope.val.Etica = (response.Datos.Etica != "") ? true : false;
                            $scope.val.Comuni = (response.Datos.Comunicacion != "") ? true : false;
                            $scope.val.Ingles = (response.Datos.Ingles != "") ? true : false;
                            $scope.val.TIC = (response.Datos.TIC != "") ? true : false;
                            $scope.Instructores_F.Lider = response.Datos.Lider;
                            $scope.Instructores_F.Tecnico = response.Datos.Tecnico;
                            $scope.Instructores_F.Emprendimiento = response.Datos.Emprendimiento;
                            $scope.Instructores_F.Salud_Ocupacional = response.Datos.Salud_Ocupacional;
                            $scope.Instructores_F.Cultura_Fisica = response.Datos.Cultura_Fisica;
                            $scope.Instructores_F.Medio_Ambiente = response.Datos.Medio_Ambiente;
                            $scope.Instructores_F.Etica = response.Datos.Etica;
                            $scope.Instructores_F.Comunicacion = response.Datos.Comunicacion;
                            $scope.Instructores_F.Ingles = response.Datos.Ingles;
                            $scope.Instructores_F.TIC = response.Datos.TIC;
                            setTimeout(function () {
                                $("#h1Instruc1").text($("#" + response.Datos.Lider).text());
                                $("#h1Instruc2").text($("#" + response.Datos.Tecnico).text());
                                $("#h1Instruc3").text($("#" + response.Datos.Emprendimiento).text());
                                $("#h1Instruc4").text($("#" + response.Datos.Salud_Ocupacional).text());
                                $("#h1Instruc5").text($("#" + response.Datos.Cultura_Fisica).text());
                                $("#h1Instruc6").text($("#" + response.Datos.Medio_Ambiente).text());
                                $("#h1Instruc7").text($("#" + response.Datos.Etica).text());
                                $("#h1Instruc8").text($("#" + response.Datos.Comunicacion).text());
                                $("#h1Instruc9").text($("#" + response.Datos.Ingles).text());
                                $("#h1Instruc10").text($("#" + response.Datos.TIC).text());
                            }, 100);
                        }
                    }
                });
            };

            $scope.GuardarInstructoresFicha = function () {
                var Ficha = $scope.datalistsFic.filter(function (item) {
                    return item.Seleccionado === true;
                });


                $scope.Instructores_F.Id_Ficha = Ficha[0].Num_Ficha;
                if ($("#selectInstF1").val() != undefined) {
                    if ($scope.Instructores_F.Lider == 0 && $("#selectInstF1").val() == "") {
                        $scope.Instructores_F.Lider = "";
                    } else if ($("#selectInstF1").val() == "" && $scope.Instructores_F.Lider != 0) {
                        $scope.Instructores_F.Lider = $scope.Instructores_F.Lider;
                    } else {
                        $scope.Instructores_F.Lider = $("#selectInstF1").val();
                    }
                }

                if ($("#selectInstF2").val() != undefined) {
                    if ($scope.Instructores_F.Tecnico == 0 && $("#selectInstF2").val() == "") {
                        $scope.Instructores_F.Tecnico = "";
                    } else if ($("#selectInstF2").val() != "" && $scope.Instructores_F.Tecnico != 0) {
                        $scope.Instructores_F.Tecnico = $("#selectInstF2").val();
                    } else {
                        $scope.Instructores_F.Tecnico = $("#selectInstF2").val();
                    }
                }

                if ($("#selectInstF3").val() != undefined) {
                    if ($scope.Instructores_F.Emprendimiento == 0 && $("#selectInstF3").val() == "") {
                        $scope.Instructores_F.Emprendimiento = "";
                    } else if ($("#selectInstF3").val() != "" && $scope.Instructores_F.Emprendimiento != 0) {
                        $scope.Instructores_F.Emprendimiento = $("#selectInstF3").val();
                    } else {
                        $scope.Instructores_F.Emprendimiento = $("#selectInstF3").val();
                    }
                }

                if ($("#selectInstF4").val() != undefined) {
                    if ($scope.Instructores_F.Salud_Ocupacional == 0 && $("#selectInstF4").val() == "") {
                        $scope.Instructores_F.Salud_Ocupacional = "";
                    } else if ($("#selectInstF4").val() != "" && $scope.Instructores_F.Salud_Ocupacional != 0) {
                        $scope.Instructores_F.Salud_Ocupacional = $("#selectInstF4").val();
                    } else {
                        $scope.Instructores_F.Salud_Ocupacional = $("#selectInstF4").val();
                    }
                }

                if ($("#selectInstF5").val() != undefined) {
                    if ($scope.Instructores_F.Cultura_Fisica == 0 && $("#selectInstF5").val() == "") {
                        $scope.Instructores_F.Cultura_Fisica = "";
                    } else if ($("#selectInstF5").val() != "" && $scope.Instructores_F.Cultura_Fisica != 0) {
                        $scope.Instructores_F.Cultura_Fisica = $("#selectInstF5").val();
                    } else {
                        $scope.Instructores_F.Cultura_Fisica = $("#selectInstF5").val();
                    }
                }

                if ($("#selectInstF6").val() != undefined) {
                    if ($scope.Instructores_F.Medio_Ambiente == 0 && $("#selectInstF6").val() == "") {
                        $scope.Instructores_F.Medio_Ambiente = "";
                    } else if ($("#selectInstF6").val() != "" && $scope.Instructores_F.Medio_Ambiente != 0) {
                        $scope.Instructores_F.Medio_Ambiente = $("#selectInstF6").val();
                    } else {
                        $scope.Instructores_F.Medio_Ambiente = $("#selectInstF6").val();
                    }
                }

                if ($("#selectInstF7").val() != undefined) {
                    if ($scope.Instructores_F.Etica == 0 && $("#selectInstF7").val() == "") {
                        $scope.Instructores_F.Etica = "";
                    } else if ($("#selectInstF7").val() != "" && $scope.Instructores_F.Etica != 0) {
                        $scope.Instructores_F.Etica = $("#selectInstF7").val();
                    } else {
                        $scope.Instructores_F.Etica = $("#selectInstF7").val();
                    }
                }

                if ($("#selectInstF8").val() != undefined) {
                    if ($scope.Instructores_F.Comunicacion == 0 && $("#selectInstF8").val() == "") {
                        $scope.Instructores_F.Comunicacion = "";
                    } else if ($("#selectInstF8").val() != "" && $scope.Instructores_F.Comunicacion != 0) {
                        $scope.Instructores_F.Comunicacion = $("#selectInstF8").val();
                    } else {
                        $scope.Instructores_F.Comunicacion = $("#selectInstF8").val();
                    }
                }

                if ($("#selectInstF9").val() != undefined) {
                    if ($scope.Instructores_F.Ingles == 0 && $("#selectInstF9").val() == "") {
                        $scope.Instructores_F.Ingles = "";
                    } else if ($("#selectInstF9").val() != "" && $scope.Instructores_F.Ingles != 0) {
                        $scope.Instructores_F.Ingles = $("#selectInstF9").val();
                    } else {
                        $scope.Instructores_F.Ingles = $("#selectInstF9").val();
                    }
                }

                if ($("#selectInstF10").val() != undefined) {
                    if ($scope.Instructores_F.TIC == 0 && $("#selectInstF10").val() == "") {
                        $scope.Instructores_F.TIC = "";
                    } else if ($("#selectInstF10").val() != "" && $scope.Instructores_F.TIC != 0) {
                        $scope.Instructores_F.TIC = $("#selectInstF10").val();
                    } else {
                        $scope.Instructores_F.TIC = $("#selectInstF10").val();
                    }
                }

                VirtualidadService.GuardarInstructoresFicha($scope.Instructores_F, function (response) {
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
                        $scope.VerInstructoresF();
                        setTimeout(function () {
                            for (var i = 1; i <= 10; i++) {
                                $("#spanF" + i).hide();
                            }
                            $('.select2').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });
                            for (var i = 1; i <= 10; i++) {
                                $("#selectInstF" + i).val("").trigger("change");
                            }
                        }, 100);
                    }
                });

            };

            $scope.btn1 = function () {
                setTimeout(function () {
                    $('#selectInstF1').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF1").val($scope.Instructores_F.Lider).trigger("change");
                }, 100);
                $scope.val.Lider = false;
                $("#spanF1").show();
            };

            $scope.btn2 = function () {
                setTimeout(function () {
                    $('#selectInstF2').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF2").val($scope.Instructores_F.Tecnico).trigger("change");
                }, 100);
                $scope.val.Tecnico = false;
                $("#spanF2").show();
            };

            $scope.btn3 = function () {
                setTimeout(function () {
                    $('#selectInstF3').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF3").val($scope.Instructores_F.Emprendimiento).trigger("change");
                }, 100);
                $scope.val.Empren = false;
                $("#spanF3").show();
            };

            $scope.btn4 = function () {
                setTimeout(function () {
                    $('#selectInstF4').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF4").val($scope.Instructores_F.Salud_Ocupacional).trigger("change");
                }, 100);
                $scope.val.Ocupa = false;
                $("#spanF4").show();
            };

            $scope.btn5 = function () {
                setTimeout(function () {
                    $('#selectInstF5').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF5").val($scope.Instructores_F.Cultura_Fisica).trigger("change");
                }, 100);
                $scope.val.Fisica = false;
                $("#spanF5").show();
            };

            $scope.btn6 = function () {
                setTimeout(function () {
                    $('#selectInstF6').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF6").val($scope.Instructores_F.Medio_Ambiente).trigger("change");
                }, 100);
                $scope.val.MedioA = false;
                $("#spanF6").show();
            };

            $scope.btn7 = function () {
                setTimeout(function () {
                    $('#selectInstF7').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF7").val($scope.Instructores_F.Etica).trigger("change");
                }, 100);
                $scope.val.Etica = false;
                $("#spanF7").show();
            };

            $scope.btn8 = function () {
                setTimeout(function () {
                    $('#selectInstF8').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF8").val($scope.Instructores_F.Comunicacion).trigger("change");
                }, 100);
                $scope.val.Comuni = false;
                $("#spanF8").show();
            };

            $scope.btn9 = function () {
                setTimeout(function () {
                    $('#selectInstF9').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF9").val($scope.Instructores_F.Ingles).trigger("change");
                }, 100);
                $scope.val.Ingles = false;
                $("#spanF9").show();
            };

            $scope.btn10 = function () {
                setTimeout(function () {
                    $('#selectInstF10').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $("#selectInstF10").val($scope.Instructores_F.TIC).trigger("change");
                }, 100);
                $scope.val.TIC = false;
                $("#spanF10").show();
            };

            $scope.span1 = function () {
                $scope.val.Lider = true;
                $("#spanF1").hide();
                setTimeout(function () {
                    $("#h1Instruc1").text($("#" + $scope.Instructores_F.Lider).text());
                }, 100);
            };

            $scope.span2 = function () {
                $scope.val.Tecnico = true;
                $("#spanF2").hide();
                setTimeout(function () {
                    $("#h1Instruc2").text($("#" + $scope.Instructores_F.Tecnico).text());
                }, 100);
            };

            $scope.span3 = function () {
                $scope.val.Empren = true;
                $("#spanF3").hide();
                setTimeout(function () {
                    $("#h1Instruc3").text($("#" + $scope.Instructores_F.Emprendimiento).text());
                }, 100);
            };

            $scope.span4 = function () {
                $scope.val.Ocupa = true;
                $("#spanF4").hide();
                setTimeout(function () {
                    $("#h1Instruc4").text($("#" + $scope.Instructores_F.Salud_Ocupacional).text());
                }, 100);
            };

            $scope.span5 = function () {
                $scope.val.Fisica = true;
                $("#spanF5").hide();
                setTimeout(function () {
                    $("#h1Instruc5").text($("#" + $scope.Instructores_F.Cultura_Fisica).text());
                }, 100);
            };

            $scope.span6 = function () {
                $scope.val.MedioA = true;
                $("#spanF6").hide();
                setTimeout(function () {
                    $("#h1Instruc6").text($("#" + $scope.Instructores_F.Medio_Ambiente).text());
                }, 100);
            };

            $scope.span7 = function () {
                $scope.val.Etica = true;
                $("#spanF7").hide();
                setTimeout(function () {
                    $("#h1Instruc7").text($("#" + $scope.Instructores_F.Etica).text());
                }, 100);
            };

            $scope.span8 = function () {
                $scope.val.Comuni = true;
                $("#spanF8").hide();
                setTimeout(function () {
                    $("#h1Instruc8").text($("#" + $scope.Instructores_F.Comunicacion).text());
                }, 100);
            };

            $scope.span9 = function () {
                $scope.val.Ingles = true;
                $("#spanF9").hide();
                setTimeout(function () {
                    $("#h1Instruc9").text($("#" + $scope.Instructores_F.Ingles).text());
                }, 100);
            };

            $scope.span10 = function () {
                $scope.val.TIC = true;
                $("#spanF10").hide();
                setTimeout(function () {
                    $("#h1Instruc10").text($("#" + $scope.Instructores_F.TIC).text());
                }, 100);
            };

            //Asociar Fichas a un Instructor
            $scope.Ids = [];
            $scope.AddProgs = [];
            $scope.datalistsInstFilter = [];

            $scope.Inst = {
                Id: "",
                Prog: ""
            };

            $('#AddSelect').click(function () {
                $('#selectProg').show();
                $('#InstAddProg').attr("disabled", true);
                $('#btnLimpiar').removeAttr("disabled");
            });

            $scope.addProg = function () {
                var id = "." + $scope.Inst.Prog;
                var text = $(id).text();
                var valid = 1;
                $.each($scope.Ids, function (index, value) {
                    if (value.ProgId == text) {
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
                    $scope.Ids.push({ ProgId: text });
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

            $scope.AddProgramas = function () {
                if ($scope.Ids.length != 0) {
                    $.each($scope.Ids, function (index, value) {
                        VirtualidadService.AgregarDetalleFichas(value.ProgId, $scope.Inst.Id, function (response) {

                        });
                    });
                    $('#modalAgregarFichas').modal('hide');
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

            $scope.remove = function (index) {
                if ($scope.AddProgs.length == 1) {
                    $('#divTabla').hide();
                }
                $scope.AddProgs.splice(index, 1);
                $scope.Ids.splice(index, 1);
            };

            $scope.VerFichasI = function () {
                $scope.datalistsInstFilter = [];
                var IdInst = $('#InstVerFicha').val();
                $('#instrucFic').text($('#' + IdInst).text());
                setTimeout(function () {
                    $('#InstVerFicha').val("").trigger("change");
                }, 200);
                VirtualidadService.VerFichasI(IdInst, function (response) {
                    if (response.success) {
                        $.each(response.datos, function (index, value) {
                            var FechaE = "";
                            if (value.Etapa == "Lectiva") {
                                FechaE = value.Inicio_Productiva;
                            } else {
                                FechaE = value.Fin_Productiva;
                            }
                            $scope.datalistsInstFilter.push({
                                Ficha: value.Num_Ficha,
                                Programa: value.Programa,
                                Etapa: value.Etapa,
                                Fecha: moment(FechaE).lang("es").format('dddd Do [de] MMMM [del] YYYY')
                            });
                        });
                        $('#tablaresultadofiltro').show();
                        $('#btnLimpiarFiltro').removeAttr("disabled");
                    }
                });
            };

            $('#btnLimpiarFiltro').click(function () {
                $('#tablaresultadofiltro').hide();
                $('#instrucFic').text("");
                setTimeout(function () {
                    $('#InstFiltro').val("").trigger("change");
                }, 100);
                $scope.datalistsInstFilter = [];
                $('#btnLimpiarFiltro').attr("disabled", true);
            });

            $scope.VerHorasI = function () {
                $('#bodyTblHoras').empty();

                $('#bodyTblHoras2').empty();
                var meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var cedula = $('#InstVerHoras').val();
                VirtualidadService.VerHorasI(cedula, function (response) {
                    if (response.success) {
                        $.each(response.Datos, function (index, value) {
                            var fecha1 = moment(value.Fecha_Inicio);
                            var fecha2 = moment(value.Fecha_Fin);
                            var dias = fecha2.diff(fecha1, 'days');
                            var PDIas = value.Dias;
                            for (var i = 0; i <= dias; i++) {
                                var fecha = $scope.sumaFecha(i, value.Fecha_Inicio);
                                var fff = fecha.split('/');
                                var ff = fff[1] + "/" + fff[0] + "/" + fff[2];
                                var fecha2 = new Date(ff);
                                var StrDia = moment(fecha2).lang("es").format('dddd');
                                var StrMes = moment(fecha2).lang("es").format('MMMM');
                                $scope.sumarHoras = function () {
                                    var difHora = 0;
                                    var ini = value.Hora_Inicio.split(' ');
                                    var fin = value.Hora_Fin.split(' ');
                                    var horaI = ini[0].split(':');
                                    var horaF = fin[0].split(':');
                                    if (horaF[1] == 00 && horaI[1] == 00) {
                                        if (ini[1] == "PM") {
                                            if (horaI[0] == 12) {
                                                difHora = ((parseInt(horaF[0]) + 12) - (parseInt(horaI[0])));
                                            } else {
                                                difHora = ((parseInt(horaF[0]) + 12) - (parseInt(horaI[0]) + 12));
                                            }
                                        } else {
                                            if (fin[1] == "PM") {
                                                if (horaF[0] == 12) {
                                                    difHora = (parseInt(horaF[0]) - parseInt(horaI[0]));
                                                } else {
                                                    difHora = ((parseInt(horaF[0]) + 12) - parseInt(horaI[0]));
                                                }
                                            } else {
                                                difHora = (parseInt(horaF[0]) - parseInt(horaI[0]));
                                            }
                                        }
                                    }
                                    else if (horaF[1] != 00 && horaI[1] == 00) {
                                        if (ini[1] == "PM") {
                                            if (horaI[0] == 12) {
                                                difHora = ((parseInt(horaF[0]) + 12) - (parseInt(horaI[0])));
                                                var min = (difHora * 60) + parseInt(horaF[1]);
                                                difHora = min / 60;
                                            } else {
                                                difHora = ((parseInt(horaF[0]) + 12) - (parseInt(horaI[0]) + 12));
                                                var min = (difHora * 60) + parseInt(horaF[1]);
                                                difHora = min / 60;
                                            }
                                        } else {
                                            if (fin[1] == "PM") {
                                                if (horaF[0] == 12) {
                                                    difHora = (parseInt(horaF[0]) - parseInt(horaI[0]));
                                                    var min = (difHora * 60) + parseInt(horaF[1]);
                                                    difHora = min / 60;
                                                } else {
                                                    difHora = ((parseInt(horaF[0]) + 12) - parseInt(horaI[0]));
                                                    var min = (difHora * 60) + parseInt(horaF[1]);
                                                    difHora = min / 60;
                                                }
                                            } else {
                                                difHora = (parseInt(horaF[0]) - parseInt(horaI[0]));
                                                var min = (difHora * 60) + parseInt(horaF[1]);
                                                difHora = min / 60;
                                            }
                                        }
                                    }
                                    else {
                                        if (parseInt(horaI[1]) < parseInt(horaF[1])) {
                                            if (ini[1] == "PM") {
                                                if (horaI[0] == 12) {
                                                    difHora = ((parseInt(horaF[0]) + 12) - (parseInt(horaI[0])));
                                                    var min = (difHora * 60) + (parseInt(horaF[1]) - parseInt(horaI[1]));
                                                    difHora = min / 60;
                                                } else {
                                                    difHora = ((parseInt(horaF[0]) + 12) - (parseInt(horaI[0]) + 12));
                                                    var min = (difHora * 60) + (parseInt(horaF[1]) - parseInt(horaI[1]));
                                                    difHora = min / 60;
                                                }
                                            } else {
                                                if (fin[1] == "PM") {
                                                    if (horaF[0] == 12) {
                                                        difHora = (parseInt(horaF[0]) - parseInt(horaI[0]));
                                                        var min = (difHora * 60) + (parseInt(horaF[1]) - parseInt(horaI[1]));
                                                        difHora = min / 60;
                                                    } else {
                                                        difHora = ((parseInt(horaF[0]) + 12) - parseInt(horaI[0]));
                                                        var min = (difHora * 60) + (parseInt(horaF[1]) - parseInt(horaI[1]));
                                                        difHora = min / 60;
                                                    }
                                                } else {
                                                    difHora = (parseInt(horaF[0]) - parseInt(horaI[0]));
                                                    var min = (difHora * 60) + (parseInt(horaF[1]) - parseInt(horaI[1]));
                                                    difHora = min / 60;
                                                }
                                            }
                                        } else {
                                            if (ini[1] == "PM") {
                                                if (horaI[0] == 12) {
                                                    difHora = ((parseInt(horaF[0]) + 12) - (parseInt(horaI[0])));
                                                    var min = (difHora * 60) - (parseInt(horaI[1]) - parseInt(horaF[1]));
                                                    difHora = min / 60;
                                                } else {
                                                    difHora = ((parseInt(horaF[0]) + 12) - (parseInt(horaI[0]) + 12));
                                                    var min = (difHora * 60) - (parseInt(horaI[1]) - parseInt(horaF[1]));
                                                    difHora = min / 60;
                                                }
                                            } else {
                                                if (fin[1] == "PM") {
                                                    if (horaF[0] == 12) {
                                                        difHora = (parseInt(horaF[0]) - parseInt(horaI[0]));
                                                        var min = (difHora * 60) - (parseInt(horaI[1]) - parseInt(horaF[1]));
                                                        difHora = min / 60;
                                                    } else {
                                                        difHora = ((parseInt(horaF[0]) + 12) - parseInt(horaI[0]));
                                                        var min = (difHora * 60) - (parseInt(horaI[1]) - parseInt(horaF[1]));
                                                        difHora = min / 60;
                                                    }
                                                } else {
                                                    difHora = (parseInt(horaF[0]) - parseInt(horaI[0]));
                                                    var min = (difHora * 60) - (parseInt(horaI[1]) - parseInt(horaF[1]));
                                                    difHora = min / 60;
                                                }
                                            }
                                        }
                                    }
                                    return difHora;
                                }

                                if (StrMes == "enero") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[0] = meses[0] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[0] = meses[0] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miércoles") {
                                            meses[0] = meses[0] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[0] = meses[0] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[0] = meses[0] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[0] = meses[0] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[0] = meses[0] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "febrero") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[1] = meses[1] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[1] = meses[1] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miércoles") {
                                            meses[1] = meses[1] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[1] = meses[1] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[1] = meses[1] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[1] = meses[1] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[1] = meses[1] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "marzo") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[2] = meses[2] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[2] = meses[2] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miercoles") {
                                            meses[2] = meses[2] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[2] = meses[2] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[2] = meses[2] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[2] = meses[2] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[2] = meses[2] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "abril") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[3] = meses[3] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[3] = meses[3] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miercoles") {
                                            meses[3] = meses[3] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[3] = meses[3] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[3] = meses[3] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[3] = meses[3] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[3] = meses[3] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "mayo") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[4] = meses[4] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[4] = meses[4] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miercoles") {
                                            meses[4] = meses[4] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[4] = meses[4] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[4] = meses[4] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[4] = meses[4] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[4] = meses[4] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "junio") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[5] = meses[5] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[5] = meses[5] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miercoles") {
                                            meses[5] = meses[5] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[5] = meses[5] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[5] = meses[5] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[5] = meses[5] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[5] = meses[5] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "julio") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[6] = meses[6] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[6] = meses[6] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miercoles") {
                                            meses[6] = meses[6] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[6] = meses[6] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[6] = meses[6] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[6] = meses[6] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[6] = meses[6] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "agosto") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[7] = meses[7] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[7] = meses[7] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miercoles") {
                                            meses[7] = meses[7] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[7] = meses[7] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[7] = meses[7] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[7] = meses[7] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[7] = meses[7] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "septiembre") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[8] = meses[8] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[8] = meses[8] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIÉRCOLES") >= 0) {
                                        if (StrDia == "miércoles") {
                                            meses[8] = meses[8] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[8] = meses[8] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[8] = meses[8] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[8] = meses[8] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[8] = meses[8] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "octubre") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[9] = meses[9] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[9] = meses[9] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIÉRCOLES") >= 0) {
                                        if (StrDia == "miércoles") {
                                            meses[9] = meses[9] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[9] = meses[9] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[9] = meses[9] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[9] = meses[9] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[9] = meses[9] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "noviembre") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[10] = meses[10] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[10] = meses[10] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miercoles") {
                                            meses[10] = meses[10] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[10] = meses[10] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[10] = meses[10] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[10] = meses[10] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[10] = meses[10] + $scope.sumarHoras();
                                        }
                                    }
                                }
                                if (StrMes == "diciembre") {
                                    if (PDIas.indexOf("LUNES") >= 0) {
                                        if (StrDia == "lunes") {
                                            meses[11] = meses[11] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MARTES") >= 0) {
                                        if (StrDia == "martes") {
                                            meses[11] = meses[11] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("MIERCOLES") >= 0) {
                                        if (StrDia == "miercoles") {
                                            meses[11] = meses[11] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("JUEVES") >= 0) {
                                        if (StrDia == "jueves") {
                                            meses[11] = meses[11] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("VIERNES") >= 0) {
                                        if (StrDia == "viernes") {
                                            meses[11] = meses[11] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("SABADO") >= 0) {
                                        if (StrDia == "sabado") {
                                            meses[11] = meses[11] + $scope.sumarHoras();
                                        }
                                    }
                                    if (PDIas.indexOf("DOMINGO") >= 0) {
                                        if (StrDia == "domingo") {
                                            meses[11] = meses[11] + $scope.sumarHoras();
                                        }
                                    }
                                }
                            }
                        });
                        setTimeout(function () {
                            $('#InstVerHoras').val("").trigger("change");
                        }, 100);
                        $("#h4InsHoras").text($("#" + cedula).text());
                    }
                });
                setTimeout(function () {
                    var colum = "";
                    var colum2 = "";
                    for (var i = 0; i < 6; i++) {
                        var decimal = String(meses[i]).split('.');
                        if (decimal.length == 2) {
                            var min = ((parseInt(decimal[1]) * 60) / 100);
                            var hf = decimal[0] + " h " + min + " min";
                            colum += '<td>' + hf + '</td>';
                        } else {
                            colum += '<td>' + meses[i] + ' h</td>';
                        }
                    }
                    for (var i = 6; i < 12; i++) {
                        var decimal = String(meses[i]).split('.');
                        if (decimal.length == 2) {
                            var min = ((parseInt(decimal[1]) * 60) / 100);
                            var hf = decimal[0] + " h " + min + " min";
                            colum2 += '<td>' + hf + '</td>';
                        } else {
                            colum2 += '<td>' + meses[i] + ' h</td>';
                        }
                    }
                    $('#bodyTblHoras').append('<tr>' +
                        colum
                        + '</tr>');
                    $('#bodyTblHoras2').append('<tr>' +
                        colum2
                        + '</tr>');
                    $('#tblHoras').show();
                }, 200);
            }

            //Funciones para cargar las tablas
            $scope.cargarInstructor = function () {
                VirtualidadService.ConsultarInstructores(function (response) {
                    debugger;
                    if (response.success == true) {
                        $scope.datalistsI = response.datos;
                        $scope.ListaCompleta = response.datos;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                        };

                    }
                });

                VirtualidadService.ConsultarFichasLectiva(function (response) {
                    if (response.success) {
                        $scope.FichasLectiva = response.Datos;
                    }
                });
            };

            $scope.cargarFichas = function () {
                debugger;
                VirtualidadService.ConsultarFichas(function (response) {
                    if (response.success == true) {
                        $scope.datalistsFic = response.datos;
                        $scope.ListaCompleta = response.datos;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsFic.length / $scope.pageSize);
                        };

                    }
                });
                VirtualidadService.ConsultarProgramas(function (response) {
                    if (response.success) {
                        $scope.ProgramasT = response.Datos;
                    }
                });
            };

            $scope.cargarAprendices = function () {               
                VirtualidadService.ConsultarAprendices(function (response) {
                    debugger;
                    if (response.success == true) {
                        $scope.datalistsApren = response.Datos;
                        $scope.ListaCompleta = response.Datos;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsApren.length / $scope.pageSize);
                        };

                    }
                });
            };

            //declaracion de objetos
            $scope.Contrato = [
                { Tipo: 1, Nombre: "Contratista" }, { Tipo: 2, Nombre: "Planta" }
            ];

            $scope.Instructor = {
                IdInstructor: "",
                Nombre: "",
                Apellido: "",
                Cedula: "",
                Email: "",
                Estado: "",
                TipoContrato: "",
                Telefono: "",
                Area: "",
                TipoInstructor: "",
                Num_Contrato: "",
                Inicio_Contrato: "",
                Fin_Contrato: "",
                Adicion: ""
            };

            $scope.Ficha = {
                Id: "",
                Num_Ficha: "",
                Num_Aprendices: "",
                Programa: "",
                Inicio_Lectiva: "",
                Inicio_Productiva: "",
                Fin_Productiva: "",
                Num_Retirados: 0,
                Num_Certificados: 0,
                Num_Cancelados: 0,
                Porc_Certificacion: "",
                Cambio_Ficha: 0
            };

            $scope.GestionFicha = {
                Id: "",
                Num_Ficha: "",
                Num_Aprendices: "",
                Num_Cancelados: 0,
                Programa: "",
                Num_Retirados: 0,
                Num_Certificados: 0,
                Porc_Certificacion: "",
                Cambio_Ficha: 0
            };

            $scope.Programacion = {
                Id: "",
                Fecha_Inicio: "",
                Fecha_Fin: "",
                Hora_Inicio: "",
                Hora_Fin: "",
                Instructor: "",
                Ficha: "",
                Dias: "",
                Estado: true
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

            $scope.val = {
                Lider: false,
                Tecnico: false,
                Empren: false,
                Ocupa: false,
                Fisica: false,
                MedioA: false,
                Etica: false,
                Comuni: false,
                Ingles: false,
                TIC: false
            };

            $scope.Aprendices = {
                Id: "",
                TipoDocumento: "",
                Documento: "",
                Nombre: "",
                Apellido: "",
                Email: "",
                Telefono: "",
                Estado: "",
                Ficha: "",
                Descripcion: ""            
            };

            $scope.Novedades = {
                Descripcion: "" 
            };

            $scope.Instructores_F = {
                Id: "",
                Id_Ficha: "",
                Lider: "",
                Tecnico: "",
                Emprendimiento: "",
                Salud_Ocupacional: "",
                Cultura_Fisica: "",
                Medio_Ambiente: "",
                Etica: "",
                Comunicacion: "",
                Ingles: "",
                TIC: ""
            };

            $scope.Novedades = {
                Descripcion: ""
            };

            $scope.VaciarCampos = {
                Estado: "",
                Descripcion: ""
            };

            //Alternativa de Practicas

            $scope.alternaticaPractica = function (Aprendiz) {
                VirtualidadService.validarAlternativa(Aprendiz.Id, function (response) {
                    if (response.success == false) {
                        $scope.LimpiarCamposAlternativa();
                        setTimeout(function () {
                            $("#alternativa").val("").trigger("change");
                        }, 100);
                        $("#tituloAlternativa").text(Aprendiz.Nombre + " " + Aprendiz.Apellido);
                        $('.select2').select2({
                            placeholder: "Seleccione una opción...",
                            allowClear: true
                        });
                        $scope.Alternativa.Aprendiz = Aprendiz.Id;
                        $("#idFicha").val(Aprendiz.Ficha);
                        $("#ModalAlternativaPracticas").modal("show");
                    } else {
                        VirtualidadService.ConsultarAlternativa(Aprendiz.Id, function (response) {
                            if (response.success) {
                                $scope.Alternativa.Id = response.Datos.Id;
                                $scope.Alternativa.Aprendiz = response.Datos.Aprendiz;
                                $scope.Alternativa.Alternativa = response.Datos.Alternativa;
                                $scope.Alternativa.Descripcion = response.Datos.Descripcion;
                                $('.select2').select2({
                                    placeholder: "Seleccione una opción...",
                                    allowClear: true
                                });
                                setTimeout(function () {
                                    $("#alternativaEdit").val(response.Datos.Alternativa).trigger("change");
                                }, 100);
                                $("#alternativaEdit").attr("disabled", true);
                                $("#descripcionEdit").attr("disabled", true);
                                $("#btnEditarAlternativa").removeAttr("disabled");
                                $("#btnGuardarAlternativaEdit").hide();
                                $("#tituloAlternativaEdit").text(Aprendiz.Nombre + " " + Aprendiz.Apellido);
                                $("#ModalAlternativaPracticasEdit").modal("show");
                            }
                        });
                    }
                });
            };

            $scope.GuardarAlternativa = function () {
                var IdFIcha = $("#idFicha").val();
                VirtualidadService.GuardarAlternativa($scope.Alternativa, function (response) {
                    if (response.success) {
                        $("#ModalAlternativaPracticas").modal("hide");
                        bootbox.dialog({
                            title: "Información",
                            message: "Alternativa del aprendiz registrada con éxito",
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

            $("#btnEditarAlternativa").click(function () {
                $("#alternativaEdit").removeAttr("disabled");
                $("#descripcionEdit").removeAttr("disabled");
                $("#btnGuardarAlternativaEdit").show();
                $("#btnEditarAlternativa").attr("disabled", true);
            });

            $scope.GuardarAlternativaEdit = function () {
                VirtualidadService.GuardarAlternativaEdit($scope.Alternativa, function (response) {
                    if (response.success) {
                        $("#ModalAlternativaPracticasEdit").modal("hide");
                        bootbox.dialog({
                            title: "Información",
                            message: "Alternativa del aprendiz actualizada con éxito",
                            buttons: {
                                success: {
                                    label: "Cerrar",
                                    className: "btn-primary",
                                }
                            }
                        });
                        $scope.LimpiarCamposAlternativa();
                    }
                });
            };

            $scope.LimpiarCamposAlternativa = function () {
                $scope.Alternativa.Id = "";
                $scope.Alternativa.Aprendiz = "";
                $scope.Alternativa.Alternativa = "";
                $scope.Alternativa.Descripcion = "";
            };

            $scope.Alternativa = {
                Id: "",
                Aprendiz: "",
                Alternativa: "",
                Descripcion: ""
            };

            //Gestión Fichas
            $scope.gestionFicha = function (id) {
                $scope.GestionFicha.Num_Retirados = 0;
                $scope.GestionFicha.Num_Certificados = 0;
                $scope.GestionFicha.Porc_Certificacion = "";
                $scope.GestionFicha.Num_Cancelados = 0;
                $scope.GestionFicha.Cambio_Ficha = 0;
                VirtualidadService.gestionFicha(id, function (response) {
                    if (response.success) {
                        $scope.GestionFicha.Id = response.Datos.Id;
                        $scope.GestionFicha.Num_Ficha = response.Datos.Num_Ficha;
                        $scope.GestionFicha.Num_Aprendices = response.Datos.Num_Aprendices;
                        $scope.GestionFicha.Programa = response.Datos.Programa
                        $scope.GestionFicha.Porc_Certificacion = "%";

                        $('#smallFicha').text(response.Datos.Num_Ficha);
                        $('#smallProg').text(response.Datos.Programa);
                        $('#smallNumA').text(response.Datos.Num_Aprendices);

                        $('#ModalGestionFicha').modal("show");
                    }
                });
            };

            $scope.VerFicha = function (id) {
                VirtualidadService.VerFicha(id, function (response) {
                    if (response.success) {
                        $scope.GestionFicha.Id = response.Datos.Id;
                        $scope.GestionFicha.Num_Ficha = response.Datos.Num_Ficha;
                        localStorage.setItem("Num_Ficha", response.Datos.Num_Ficha);
                        localStorage.setItem("Virtualidad", "Titulada");
                        $scope.GestionFicha.Num_Aprendices = response.Datos.Num_Aprendices;
                        $scope.GestionFicha.Programa = response.Datos.Programa;
                        $scope.GestionFicha.Num_Retirados = response.Datos.Num_Retirados;
                        $scope.GestionFicha.Num_Cancelados = response.Datos.Num_Cancelados;
                        $scope.GestionFicha.Num_Certificados = response.Datos.Num_Certificados;
                        $scope.GestionFicha.Porc_Certificacion = response.Datos.Porc_Certificacion;
                        $scope.GestionFicha.Cambio_Ficha = response.Datos.Cambio_Ficha;

                        $('#smallFichaE').text(response.Datos.Num_Ficha);
                        $('#smallProgE').text(response.Datos.Programa);
                        $('#smallNumAE').text(response.Datos.Num_Aprendices);
                        $('#NumRetiE').attr("disabled", true);
                        $('#NumCertiE').attr("disabled", true);
                        $('#NumCanceE').attr("disabled", true);
                        $('#CamFicE').attr("disabled", true);
                        $('#btnLimpiarVerFicha').removeAttr("disabled");
                        $("#btnReporteFichas").removeAttr("disabled");
                        $("#ModalVerFicha").modal("show");
                    }
                });
            };

            $scope.CalcularCerti = function () {
                var num = (($scope.GestionFicha.Num_Retirados) + ($scope.GestionFicha.Num_Cancelados) + ($scope.GestionFicha.Num_Certificados) + ($scope.GestionFicha.Cambio_Ficha));
                if ($scope.GestionFicha.Num_Aprendices < num) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Valor no válido",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                    var num = $scope.GestionFicha.Num_Certificados;
                    var Cale = String(num).substring(0, (String(num).length - 1));
                    $scope.GestionFicha.Num_Certificados = parseInt(Cale);
                } else {
                    if ($scope.GestionFicha.Num_Certificados == null) {
                        $scope.GestionFicha.Porc_Certificacion = "%";
                    } else {
                        var porc = ((parseInt($scope.GestionFicha.Num_Certificados) * 100));
                        var porc2 = (porc / (parseInt($scope.GestionFicha.Num_Aprendices)));
                        $scope.GestionFicha.Porc_Certificacion = porc2.toFixed(2) + "%";
                    }
                }
            };

            $scope.valCance = function () {
                var num = (($scope.GestionFicha.Num_Retirados) + ($scope.GestionFicha.Num_Cancelados) + ($scope.GestionFicha.Num_Certificados) + ($scope.GestionFicha.Cambio_Ficha));
                if (num > $scope.GestionFicha.Num_Aprendices) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Valor no válido",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                    var num = $scope.GestionFicha.Num_Cancelados;
                    var Cale = String(num).substring(0, (String(num).length - 1));
                    $scope.GestionFicha.Num_Cancelados = parseInt(Cale);
                }
            };

            $scope.valReti = function () {
                var num = (($scope.GestionFicha.Num_Retirados) + ($scope.GestionFicha.Num_Cancelados) + ($scope.GestionFicha.Num_Certificados) + ($scope.GestionFicha.Cambio_Ficha));
                if (num > $scope.GestionFicha.Num_Aprendices) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Valor no válido",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                    var num = $scope.GestionFicha.Num_Retirados;
                    var Cale = String(num).substring(0, (String(num).length - 1));
                    $scope.GestionFicha.Num_Retirados = parseInt(Cale);
                }
            };

            $scope.CamFich = function () {
                var num = (($scope.GestionFicha.Num_Retirados) + ($scope.GestionFicha.Num_Cancelados) + ($scope.GestionFicha.Num_Certificados) + ($scope.GestionFicha.Cambio_Ficha));
                if (num > $scope.GestionFicha.Num_Aprendices) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Valor no válido",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                    var num = $scope.GestionFicha.Cambio_Ficha;
                    var Cale = String(num).substring(0, (String(num).length - 1));
                    $scope.GestionFicha.Cambio_Ficha = parseInt(Cale);
                }
            };

            $scope.GuardarGestionFicha = function () {
                VirtualidadService.GuardarGestionFicha($scope.GestionFicha, function (response) {
                    if (response.success) {
                        $('#ModalGestionFicha').modal("hide");
                        $("#ModalVerFicha").modal("hide");
                        $('#btnLimpiarVerFicha').removeAttr("disabled");
                        $('#btnGuardarFicha').attr("disabled", true);
                        $("#btnReporteFichas").removeAttr("disabled");
                        $scope.cargarFichas();
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

            $('#btnLimpiarVerFicha').click(function () {
                $('#NumRetiE').removeAttr("disabled");
                $('#NumCertiE').removeAttr("disabled");
                $('#NumCanceE').removeAttr("disabled");
                $('#CamFicE').removeAttr("disabled");
                $("#btnReporteFichas").attr("disabled", true);
                $('#btnGuardarFicha').removeAttr("disabled");
                $('#btnLimpiarVerFicha').attr("disabled", true);
            });

            $scope.GenerarReporteFicha = function () {
                $location.url("/ReporteFicha");
            };

            //Funciones para limpiar campos
            $scope.VaciarCampos = function () {
                $scope.Instructor.Nombre = "";
                $scope.Instructor.Apellido = "";
                $scope.Instructor.Cedula = "";
                $scope.Instructor.Email = "";
                $scope.Instructor.Telefono = "";
                $scope.Instructor.IdInstructor = "";
                $scope.Instructor.Estado = "";
                $scope.Instructor.TipoContrato = "";
                $scope.Instructor.IdArea = "";
                $scope.Instructor.TipoInstructor = "";
                $scope.Instructor.Num_Contrato = "";
                $scope.Instructor.Inicio_Contrato = "";
                $scope.Instructor.Fin_Contrato = "";
                setTimeout(function () {
                    $('#listas').val("").trigger("change");
                    $('#1listas').val("").trigger("change");
                }, 100);
            };

            $scope.VaciarCamposProgramacion = function () {
                $scope.Programacion.Fecha_Inicio = "";
                $scope.Programacion.Fecha_Fin = "";
                $scope.Programacion.Hora_Inicio = "";
                $scope.Programacion.Hora_Fin = "";
                $scope.Programacion.Num_Ficha = "";
                $scope.Programacion.Instructor = "";
                $scope.Programacion.Empresa = "";
                $scope.Programacion.Dias = "";
                $scope.Dias.Lunes = false;
                $scope.Dias.Martes = false;
                $scope.Dias.Miercoles = false;
                $scope.Dias.Jueves = false;
                $scope.Dias.Viernes = false;
                $scope.Dias.Sabado = false;
                $scope.Dias.Domingo = false;
                setTimeout(function () {
                    $('#ficha').val("").trigger("change");
                    $('#instruc').val("").trigger("change");
                }, 100);
            };

            $scope.VaciarFicha = function () {
                setTimeout(function () {
                    $('#Prog').val("").trigger("change");
                }, 200);
                $scope.Ficha.Id = "";
                $scope.Ficha.Num_Ficha = "";
                $scope.Ficha.Num_Aprendices = "";
                $scope.Ficha.Programa = "";
                $scope.Ficha.Inicio_Lectiva = "";
                $scope.Ficha.Inicio_Productiva = "";
                $scope.Ficha.Fin_Productiva = "";
                $scope.Ficha.Num_Retirados = "";
                $scope.Ficha.Num_Cancelados = "";
                $scope.Ficha.Num_Certificados = "";
                $scope.Ficha.Porc_Certificacion = "";
            };

            $scope.VaciarCamposAprendiz = function () {
                $scope.Aprendices.Id = "";
                $scope.Aprendices.Documento = "";
                $scope.Aprendices.Nombre = "";
                $scope.Aprendices.Apellido = "";
                $scope.Aprendices.Email = "";
                $scope.Aprendices.Telefono = "";
                $scope.Aprendices.Estado = "";
                $scope.Aprendices.Ficha = "";
                $scope.Aprendices.TipoDocumento = "";
                setTimeout(function () {
                    $("#fichaApren").val("").trigger("change");
                }, 100);
            };

            //Funciones para registrar
            $scope.GuardarInstructor = function () {
                $scope.Instructor.Estado = true;


                if ($scope.Instructor.Nombre == "" || $scope.Instructor.Area == "" || $scope.Instructor.Apellido == "" || $scope.Instructor.Cedula == null || $scope.Instructor.Email == "" || $scope.Instructor.TipoContrato == null) {
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
                    VirtualidadService.GuardarInstructor($scope.Instructor, function (response) {
                        debugger;
                        if (response.success == true) {
                            $scope.VaciarCampos();
                            $("#ModalInstructor").modal("hide");
                            VirtualidadService.ConsultarInstructoresTodos(function (response) {
                                if (response.success == true) {
                                    $scope.datalistsITodos = response.datos;
                                    $scope.ListaCompleta = response.datos;
                                    $scope.Datos = $scope.datalistsITodos;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsITodos.length / $scope.pageSize);
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
                                message: "La cédula del instructor ya se encuentra registrada",
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

            $scope.GuardarFicha = function () {
                var iniLec = $('#IniLec').val();
                var iniProd = $('#IniProd').val();
                var finProd = $('#FinProd').val();
                if (iniLec == "" || iniProd == "" || finProd == "") {
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
                    $scope.Ficha.Inicio_Lectiva = iniLec;
                    $scope.Ficha.Inicio_Productiva = iniProd;
                    $scope.Ficha.Fin_Productiva = finProd;
                    VirtualidadService.GuardarFicha($scope.Ficha, function (response) {
                        if (response.success) {
                            $('#ModalFicha').modal('hide');
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
                            $scope.cargarFichas();
                        }
                    });
                }
            };

            $scope.GuardarProgramacion = function () {
                $scope.Programacion.Estado = true;
                $scope.Programacion.Fecha_Inicio = $('#Finicio').val();
                $scope.Programacion.Fecha_Fin = $('#Ffinal').val();
                $scope.Programacion.Hora_Inicio = $('#inicial').val();
                $scope.Programacion.Hora_Fin = $('#final').val();


                if ($scope.Programacion.Fecha_Inicio == null || $scope.Programacion.Fecha_Fin == null || $scope.Programacion.Hora_Inicio == null || $scope.Programacion.Hora_Fin == null || $scope.Programacion.Ficha == null || $scope.Programacion.Instructor == null) {
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

                } else if ($scope.Dias.Lunes == false && $scope.Dias.Martes == false && $scope.Dias.Miercoles == false && $scope.Dias.Jueves == false && $scope.Dias.Viernes == false && $scope.Dias.Sabado == false && $scope.Domingo == false) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Debe seleccionar por lo menos un día",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                }
                else {
                    var D = "";
                    D += ($scope.Dias.Lunes != false) ? "LUNES - " : "";
                    D += ($scope.Dias.Martes != false) ? "MARTES - " : "";
                    D += ($scope.Dias.Miercoles != false) ? "MIERCOLES - " : "";
                    D += ($scope.Dias.Jueves != false) ? "JUEVES - " : "";
                    D += ($scope.Dias.Viernes != false) ? "VIERNES - " : "";
                    D += ($scope.Dias.Sabado != false) ? "SABADO - " : "";
                    D += ($scope.Dias.Domingo != false) ? "DOMINGO - " : "";
                    var num = D.length;
                    var Cale = D.substring(0, num - 3);
                    $scope.Programacion.Dias = Cale;

                    VirtualidadService.GuardarProgramacion($scope.Programacion, function (response) {
                        if (response.success == true) {
                            $('#ModalProgramacion').modal('hide')
                            $scope.VaciarCamposProgramacion();
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
                }
            };

            $scope.GuardarAprendiz = function () {
                $scope.Aprendices.Estado = "Activo";
                VirtualidadService.GuardarAprendiz($scope.Aprendices, function (response) {
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

            //Funciones para cambair estados

            $scope.CambiarEstadoSeleccionados = function () {
                var InstructorBorrar = $scope.datalistsProg.filter(function (item) {
                    return item.Seleccionado === true;
                });
                if (InstructorBorrar.length != 1) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Debe seleccionar un Instructor",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                } else {
                    $("#modalInhabilitarPrograma").modal("show");
                }
            };

            $scope.inhabilitarInstructor = function () {
                var InstructorBorrar = $scope.datalistsITodos.filter(function (item) {
                    return item.Seleccionado === true;
                });
                VirtualidadService.CambiarEstado(InstructorBorrar, function (response) {
                    if (response.success == true) {
                        VirtualidadService.ConsultarInstructoresTodos(function (response) {
                            if (response.success == true) {
                                $scope.datalistsITodos = response.datos;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalistsITodos.length / $scope.pageSize);
                                };
                                $scope.Datos = $scope.datalistsITodos;
                            }
                        });
                    }
                });
            };

            $scope.Inhabilitados = function () {
                var Estado = $('#Inhabilitados').hasClass("glyphicon glyphicon-arrow-left");
                if (!Estado) {
                    VirtualidadService.Inhabilitados(function (response) {
                        debugger;
                        if (response.success == true) {
                            debugger;
                            $scope.datalistsITodos = response.datos;
                        } else {

                        }
                    });
                    $("#1").hide();
                    $("#5").hide();
                    $("#3").hide();
                    $("#Inhabilitados").removeClass("glyphicon glyphicon-ban-circle");
                    $("#Inhabilitados").addClass("glyphicon glyphicon-arrow-left");
                    $("#cambiarestado").removeClass("glyphicon glyphicon-trash");
                    $("#cambiarestado").addclass("glyphicon glyphicon-ok-circle");
                    $("#cambiarestado").css("color", "green");
                    $("#Inhabilitados").css("color", "gray");
                } else {
                    $scope.Consultar();
                    $("#1").show();
                    $("#5").show();
                    $("#3").show()
                    $("#Inhabilitados").removeClass("glyphicon glyphicon-arrow-left");
                    $("#Inhabilitados").addClass("glyphicon glyphicon-ban-circle");
                    $("#cambiarestado").removeClass("glyphicon glyphicon-ok-circle");
                    $("#cambiarestado").addClass("glyphicon glyphicon-trash");
                    $("#cambiarestado").css("color", "red");
                    $("#Inhabilitados").css("color", "red");
                }
            };

            $scope.ConsultarInstructoresInhabilitados = function () {
                var Estado = $('#ConsultarInhabilitados').hasClass("glyphicon glyphicon-arrow-left");
                if (!Estado) {
                    VirtualidadService.ConsultarInstructoresInhabilitados().then(function (response) {
                        if (response.datos.success) {
                            debugger;
                            $scope.datalists = response.datos;
                            $("#labelInstructor").hide();
                        } else {
                            $("#labelInstructor").show();
                        }
                    })
                    $("#1").hide();
                    $("#5").hide();
                    $("#3").hide();
                    $("#ConsultarInhabilitados").removeclass("glyphicon glyphicon-ban-circle");
                    $("#ConsultarInhabilitados").addclass("glyphicon glyphicon-arrow-left");
                    $("#cambiarestado").removeclass("glyphicon glyphicon-trash");
                    $("#cambiarestado").addclass("glyphicon glyphicon-ok-circle");
                    $("#cambiarestado").css("color", "green");
                    $("#Inactivos").css("color", "gray");
                } else {
                    $scope.Consultar();
                    $("#1").show();
                    $("#5").show();
                    $("#3").show()
                    $("#Inactivos").removeclass("glyphicon glyphicon-arrow-left");
                    $("#Inactivos").addclass("glyphicon glyphicon-ban-circle");
                    $("#cambiarestado").removeclass("glyphicon glyphicon-ok-circle");
                    $("#cambiarestado").addclass("glyphicon glyphicon-trash");
                    $("#cambiarestado").css("color", "red");
                    $("#Inactivos").css("color", "red");
                }
            }



            $scope.EliminarProgramacion = function () {
                VirtualidadService.EliminarProgramacion(eliminar, function (response) {
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

            //Funciones para actualizar registros
            $scope.Modificar = function () {

                var InstructorBorrar = $scope.datalistsITodos.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (InstructorBorrar.length != 1) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Debe seleccionar un instructor",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                } else {
                    VirtualidadService.ModificarInstructor(InstructorBorrar, function (response) {
                        if (response.success == true) {
                            debugger;
                            $scope.Instructor.IdInstructor = response.Instructor.IdInstructor;
                            $scope.Instructor.Nombre = response.Instructor.Nombre;
                            $scope.Instructor.Apellido = response.Instructor.Apellido;
                            $scope.Instructor.Cedula = parseInt(response.Instructor.Cedula);
                            $scope.Instructor.Email = response.Instructor.Email;
                            $scope.Instructor.Telefono = parseInt(response.Instructor.Telefono);
                            $scope.Instructor.Area = response.Instructor.Area;
                            $scope.Instructor.Num_Contrato = response.Instructor.Num_Contrato;
                            $scope.Instructor.Inicio_Contrato = response.Instructor.Inicio_Contrato;
                            $scope.Instructor.Fin_Contrato = response.Instructor.Fin_Contrato;
                            $scope.Instructor.Adicion = response.Instructor.Adicion;
                            $("#iniContr").val(response.Instructor.Inicio_Contrato);
                            $("#FinContr").val(response.Instructor.Fin_Contrato);
                            $('.select2').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });

                            if (response.tipo == 1) {
                                $("#btnVerContrato").show();
                            } else {
                                $("#btnVerContrato").hide();
                            }

                            $scope.Instructor.TipoContrato = response.Instructor.TipoContrato;
                            setTimeout(function () {
                                $('#listas1').val($scope.Instructor.Area).trigger("change");
                                $('#listas11').val($scope.Instructor.TipoContrato).trigger("change");
                            }, 100);

                            $("#ModalEditar").modal("show");
                        }
                    });
                }
            };
            //Permite ver todos los registros en el modal Editar aprendicesVirtualidad
            $scope.ModificarA = function () {
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
                    $scope.Aprendices.Documento = parseInt(Aprendiz[0].Documento);
                    $scope.Aprendices.Nombre = Aprendiz[0].Nombre;
                    $scope.Aprendices.Apellido = Aprendiz[0].Apellido;
                    $scope.Aprendices.Email = Aprendiz[0].Email;
                    $scope.Aprendices.Telefono = parseInt(Aprendiz[0].Telefono);
                    $scope.Aprendices.Estado = Aprendiz[0].Estado;
                    $scope.Aprendices.Ficha = Aprendiz[0].Ficha;
                    $scope.Aprendices.TipoDocumento = Aprendiz[0].TipoDocumento;
                    setTimeout(function () {
                        $("#fichaAprenEdit").val(Aprendiz[0].Ficha).trigger("change");
                    }, 100);
                    $("#ModalAprendizEdit").modal("show");
                }
            };

            $("#btnVerContrato").click(function () {
                if ($scope.Instructor.Num_Contrato == "" && $scope.Instructor.Inicio_Contrato == "" && $scope.Instructor.Fin_Contrato == "") {
                    $(".adic").attr("disabled", false);
                    $("#btnContratoRenovar").attr("disabled", true);
                } else {
                    $(".adic").attr("disabled", true);
                    $("#btnContratoRenovar").removeAttr("disabled");
                }
                if ($scope.Instructor.Adicion == "") {
                    $("#divAdicion").hide();
                    if ($scope.Instructor.Num_Contrato == "") {
                        $("#btnContratoAdicion").attr("disabled", true);
                    } else {
                        $("#btnContratoAdicion").removeAttr("disabled");
                    }
                } else {
                    $("#divAdicion").show();
                    $("#btnContratoAdicion").attr("disabled", true);
                }
                $('#iniContr').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',

                });

                $('#FinContr').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',
                });

                $('#iniContr').on('dp.change', function (e) {
                    var fecha = new Date($('#iniContr').val());
                    $('#FinContr').data("DateTimePicker").minDate(fecha);
                });

                $("#ModalContrato").modal("show");
            });

            $("#btnContratoAdicion").click(function () {
                $('#AdiContr').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',
                });
                $("#divAdicion").show();
            });

            $("#btnContratoRenovar").click(function () {
                swal({
                    title: 'Confirmación',
                    text: "¿Está seguro que desea renovar el contrato del instructor?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#286090',
                    cancelButtonColor: '#ec971f',
                    confirmButtonText: 'Si, renovar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result) {
                        VirtualidadService.GuardarHistorial($scope.Instructor, function (response) {
                            if (response.success) {
                                VirtualidadService.ContratoRenovar($scope.Instructor.IdInstructor, function (response) {
                                    if (response.success) {
                                        $(".adic").removeAttr("disabled");
                                        $scope.Instructor.Num_Contrato = "";
                                        $scope.Instructor.Inicio_Contrato = "";
                                        $scope.Instructor.Fin_Contrato = "";
                                        $scope.Instructor.Adicion = "";
                                        $("#btnContratoRenovar").attr("disabled", true);
                                        $("#divAdicion").hide();
                                    }
                                });
                            }
                        });
                    }
                }).catch(swal.noop);
            });

            $scope.HistorialContratos = function () {
                var Instruc = $scope.datalistsITodos.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (Instruc.length != 1) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Debes seleccionar un instructor",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                } else {
                    if (Instruc[0].TipoContrato == "CONTRATISTA") {
                        VirtualidadService.verHistorialContratos(Instruc[0], function (response) {
                            if (response.success) {
                                $("#bodyTblHistorial").empty();
                                $("#h4HistorTitulo").text(Instruc[0].Nombre + " " + Instruc[0].Apellido);
                                $.each(response.Datos, function (index, value) {
                                    var adicion = (value.Adicion == "") ? "No Aplica" : value.Adicion;
                                    $("#bodyTblHistorial").append("<tr>" +
                                        "<td>" + value.Num_Contrato + "</td>" +
                                        "<td>" + value.Inicio_Contrato + "</td>" +
                                        "<td>" + value.Fin_Contrato + "</td>" +
                                        "<td>" + adicion + "</td>" +
                                        "</tr>");
                                });
                                $("#ModalHistorialContratos").modal("show");
                            }
                        });
                    } else {
                        bootbox.dialog({
                            title: "Información",
                            message: "El Instructor " + Instruc[0].Nombre + " " + Instruc[0].Apellido + " es de planta",
                            buttons: {
                                success: {
                                    label: "Cerrar",
                                    className: "btn-primary",
                                }
                            }
                        });
                    }
                }
            };

            $scope.GuardarEdicionContrato = function () {
                var InicioC = $("#iniContr").val();
                var FinC = $("#FinContr").val();
                var AdiC = $("#AdiContr").val();
                if (InicioC == "" && FinC == "" && $scope.Instructor.Num_Contrato == "") {
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
                    debugger;
                    VirtualidadService.ConsultarNumeroContrato($scope.Instructor.Num_Contrato, function (response) {
                        debugger;
                        if (response.success == true) {
                            bootbox.dialog({
                                title: "Información",
                                message: "El número de contrato ya existe",
                                buttons: {
                                    success: {
                                        label: "Cerrar",
                                        className: "btn-primary",
                                    }
                                }
                            });
                        } else {
                            $scope.Instructor.Inicio_Contrato = InicioC;
                            $scope.Instructor.Fin_Contrato = FinC;
                            $scope.Instructor.Adicion = AdiC;
                            VirtualidadService.GuardarEdicionContrato($scope.Instructor, function (response) {
                                if (response.success) {
                                    $("#ModalContrato").modal("hide");
                                    $("#ModalEditar").modal("hide");
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

            $scope.GuardarEdicionInstructor = function () {

                if ($scope.Instructor.Nombre == "" || $scope.Instructor.Apellido == "" || $scope.Instructor.IdArea == "" || $scope.Instructor.Cedula == "" || $scope.Instructor.Email == "" || $scope.Instructor.TipoContrato == "") {
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
                    VirtualidadService.GuardarModificacionInstructor($scope.Instructor, function (response) {
                        if (response.success == true) {
                            bootbox.dialog({
                                title: "Información",
                                message: "La modificación se realizó con éxito",
                                buttons: {
                                    success: {
                                        label: "Cerrar",
                                        className: "btn-primary",
                                    }
                                }
                            });
                            $("#ModalEditar").modal("hide");
                            $scope.VaciarCampos();
                            VirtualidadService.ConsultarInstructoresTodos(function (response) {
                                if (response.success == true) {
                                    $scope.datalistsITodos = response.datos;
                                    $scope.ListaCompleta = response.datos;
                                    $scope.Datos = $scope.datalistsITodos;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsITodos.length / $scope.pageSize);
                                    };
                                }
                            });
                        }
                    });
                }
            };

            $scope.Modificar2 = function () {
                debugger;
                var Ficha = $scope.datalistsFic.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (Ficha.length != 1) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Debes seleccionar una ficha",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                } else {
                    VirtualidadService.ModificarFicha(Ficha, function (response) {
                        if (response.success) {
                            $scope.Ficha.Id = response.datos.Id;
                            $scope.Ficha.Num_Ficha = response.datos.Num_Ficha;
                            $scope.Ficha.Num_Aprendices = response.datos.Num_Aprendices;
                            $scope.Ficha.Programa = response.datos.Programa;
                            $scope.Ficha.Inicio_Lectiva = response.datos.Inicio_Lectiva;
                            $scope.Ficha.Inicio_Productiva = response.datos.Inicio_Productiva;
                            $scope.Ficha.Fin_Productiva = response.datos.Fin_Productiva;
                            $scope.Ficha.nombreP = response.datos.Fin_Productiva;
                            //$('.select2').select2({
                            //    placeholder: "Seleccione una opción...",
                            //    allowClear: true
                            //});
                            $('#IniLecEdit').datetimepicker({
                                useCurrent: false,
                                format: 'YYYY/MM/DD',
                                locale: 'es',

                            });
                            $('#IniProdEdit').datetimepicker({
                                useCurrent: false,
                                format: 'YYYY/MM/DD',
                                locale: 'es',

                            });
                            $('#FinProdEdit').datetimepicker({
                                useCurrent: false,
                                format: 'YYYY/MM/DD',
                                locale: 'es',

                            });
                            $('#IniLecEdit').on('dp.change', function (e) {
                                var fecha = new Date($('#IniLecEdit').val());
                                $('#IniProdEdit').data("DateTimePicker").minDate(fecha);
                            });
                            $('#IniProdEdit').on('dp.change', function (e) {
                                var fecha = new Date($('#IniProdEdit').val());
                                $('#FinProdEdit').data("DateTimePicker").minDate(fecha);
                            });
                            $('#IniLecEdit').val(response.datos.Inicio_Lectiva);
                            $('#IniProdEdit').val(response.datos.Inicio_Productiva);
                            $('#FinProdEdit').val(response.datos.Fin_Productiva);
                            setTimeout(function () {
                                $('#ProgEdit').val(response.datos.Programa).trigger("change");
                            }, 200);
                            $('#ModalFichaEdit').modal("show");
                        }
                    });
                }
            };

            $scope.GuardarAprendizEdit = function () {
                debugger;
                VirtualidadService.GuardarAprendizEdit($scope.Aprendices, function (response) {
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
            };

            $scope.GuardarAprendizEstado = function () {
                debugger;
                VirtualidadService.GuardarAprendizEstado($scope.Aprendices.Id, $scope.Aprendices.Estado, $scope.Novedades.Descripcion, function (response) {
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
                        debugger;
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
                VirtualidadService.GuardarAprendizFicha($scope.Aprendices.Id, $scope.Aprendices.Ficha, $scope.Novedades.Descripcion, function (response) {
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

            $scope.GuardarEdicionFicha = function () {
                var iniLec = $('#IniLecEdit').val();
                var iniProd = $('#IniProdEdit').val();
                var finProd = $('#FinProdEdit').val();
                if (iniLec == "" || iniProd == "" || finProd == "") {
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
                    $scope.Ficha.Inicio_Lectiva = iniLec;
                    $scope.Ficha.Inicio_Productiva = iniProd;
                    $scope.Ficha.Fin_Productiva = finProd;
                    VirtualidadService.GuardarEdicionFicha($scope.Ficha, function (response) {
                        if (response.success) {
                            $('#ModalFicha').modal('hide');
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
                            $('#ModalFichaEdit').modal("hide");
                            $scope.cargarFichas();
                        }
                    });
                }
            };

            $scope.modificarProgramacion = function (id, title, par3, inicio, fin, tipo) {
                eliminar = 0;
                VirtualidadService.ConsultarProgramacionId(id, function (response) {
                    if (response.success) {
                        eliminar = response.datos.Id;
                        $scope.Programacion.Id = response.datos.Id;
                        $scope.Programacion.Fecha_Inicio = response.datos.Fecha_Inicio;
                        $scope.Programacion.Fecha_Fin = response.datos.Fecha_Fin;
                        $scope.Programacion.Hora_Inicio = response.datos.Hora_Inicio;
                        $scope.Programacion.Hora_Fin = response.datos.Hora_Fin;
                        $scope.Programacion.Instructor = response.datos.Instructor;
                        $scope.Programacion.Ficha = response.datos.Ficha;
                        $scope.Programacion.Dias = response.datos.Dias;

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
                        if (response.ds.Parametro17 == "true") {
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
                            $scope.Dias.Sabado = false;
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

                        $('.datetimepickerF').datetimepicker({
                            useCurrent: false,
                            format: 'YYYY/MM/DD',
                            locale: 'es',

                        });

                        $('.datetimepickerFF').datetimepicker({
                            useCurrent: false,
                            format: 'YYYY/MM/DD',
                            locale: 'es',
                        });

                        $('.select2').select2({
                            placeholder: "Seleccione una opción...",
                            allowClear: true
                        });

                        setTimeout(function () {
                            $('#fichaEdit').val(response.datos.Ficha).trigger("change");
                            $('#instrucEdit').val(response.datos.Instructor).trigger("change");
                        }, 100);

                        $('#nameInstruc').text(title);
                        var FI = moment(response.datos.Fecha_Inicio).locale('es').format('dddd D [de] MMMM [del] YYYY');
                        var FF = moment(response.datos.Fecha_Fin).locale('es').format('dddd D [de] MMMM [del] YYYY');
                        $('#TextIni').text(FI);
                        $('#TextFin').text(FF);
                        $('#TextHIni').text(inicio);
                        $('#TextHFin').text(fin);
                        if (tipo == 1) {
                            $('#spnInst').text("Instructor: ");
                        } else {
                            $('#spnInst').text("Ficha: ");
                        }
                        $('#TextFi').text(par3)
                        $('#InfoProg').show();
                        $('#ProgramacionE').hide();
                        $('#btnEditarProg').text('Editar');
                        $('#btnEditarProg').addClass('btnEditarProg');
                        $('#btnEliminarProg').removeAttr("disabled");
                        $('#btnGuardarProg').attr("disabled", true);
                        $("#ModalEditarProgramacion").modal("show");
                    }
                });

            };

            $scope.GuardarModificacionProgramacion = function () {
                $scope.Programacion.Fecha_Inicio = $('#FinicioEdit').val();
                $scope.Programacion.Fecha_Fin = $('#FfinalEdit').val();
                $scope.Programacion.Hora_Inicio = $('#inicialEdit').val();
                $scope.Programacion.Hora_Fin = $('#finalEdit').val();
                var D = "";
                D += ($scope.Dias.Lunes != false) ? "LUNES - " : "";
                D += ($scope.Dias.Martes != false) ? "MARTES - " : "";
                D += ($scope.Dias.Miercoles != false) ? "MIÉRCOLES - " : "";
                D += ($scope.Dias.Jueves != false) ? "JUEVES - " : "";
                D += ($scope.Dias.Viernes != false) ? "VIERNES - " : "";
                D += ($scope.Dias.Sabado != false) ? "SABADO - " : "";
                D += ($scope.Dias.Domingo != false) ? "DOMINGO - " : "";
                var num = D.length;
                var Cale = D.substring(0, num - 3);
                $scope.Programacion.Dias = Cale;
                $scope.Programacion.Fecha_Inicio = $("#FinicioEdit").val();
                $scope.Programacion.Fecha_Fin = $("#FfinalEdit").val();
                $scope.Programacion.Hora_Inicio = $("#inicialEdit").val();
                $scope.Programacion.Hora_Fin = $("#finalEdit").val();
                VirtualidadService.GuardarModificacionProgramacion($scope.Programacion, function (response) {
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
                        setTimeout(function () {
                            $('#instrucFil').val("").trigger("change");
                            $('#fichaFil').val("").trigger("change");
                        }, 100);
                        $scope.LimpiarCalendar();
                        $scope.calendarioVacio();
                        $('#borrarFiltro').attr("disabled", true);
                    }
                });
            };

            $('#btnEditarProg').click(function () {
                if ($('#btnEditarProg').hasClass('btnEditarProg')) {
                    $('#InfoProg').hide();
                    $('#ProgramacionE').show();
                    $('#btnEditarProg').removeClass('btnEditarProg');
                    $('#btnEditarProg').text('Cancelar');
                    $('#btnEliminarProg').attr("disabled", true);
                    $('#btnGuardarProg').removeAttr("disabled");
                } else {
                    $('#InfoProg').show();
                    $('#ProgramacionE').hide();
                    $('#btnEditarProg').text('Editar');
                    $('#btnEditarProg').addClass('btnEditarProg');
                    $('#btnEliminarProg').removeAttr("disabled");
                    $('#btnGuardarProg').attr("disabled", true);
                }

            });

            //Funciones para filtrar las tablas
            $scope.Filtrar = function (e) {
                var Busqueda = $("#Buscar").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    VirtualidadService.ConsultarInstructores(function (response) {
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
                var Instructor = [];
                $scope.datalistsI = $scope.ListaCompleta;
                Instructor = $scope.datalistsI.filter(function (item) {

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
                $scope.datalistsI = Instructor;
                //Variable para setear la paginación 
                $scope.curPage = 0;
            };

            //Funciones para filtrar las tablas
            $scope.FiltrarT = function (e) {
                var Busqueda = $("#BuscarT").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    VirtualidadService.ConsultarInstructoresTodos(function (response) {
                        if (response.success == true) {

                            $scope.datalistsITodos = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.numberOfPages = function () {
                                return Math.ceil($scope.datalistsITodos.length / $scope.pageSize);
                            };
                            $scope.Datos = $scope.datalistsITodos;

                        }
                    });
                }
                var Instructor = [];
                $scope.datalistsITodos = $scope.ListaCompleta;
                Instructor = $scope.datalistsITodos.filter(function (item) {

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
                $scope.datalistsITodos = Instructor;
                //Variable para setear la paginación 
                $scope.curPage = 0;
            };

            $scope.Filtrar2 = function (e) {
                var Busqueda = $("#Buscar2").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    VirtualidadService.ConsultarFichas(function (response) {
                        if (response.success == true) {
                            $scope.datalistsFic = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.numberOfPages = function () {
                                return Math.ceil($scope.datalistsFic.length / $scope.pageSize);
                            };

                        }
                    });
                }
                var FIcha = [];
                $scope.datalistsFic = $scope.ListaCompleta;
                FIcha = $scope.datalistsFic.filter(function (item) {

                    if (exp.test(item.Num_Ficha) || exp.test(item.Num_Ficha)) {

                        return item;
                    }
                    else if (exp.test(item.Programa.toLowerCase()) || exp.test(item.Programa.toUpperCase())) {
                        return item;
                    }
                    else if (exp.test(item.Etapa.toLowerCase()) || exp.test(item.Etapa.toUpperCase())) {
                        return item;
                    }




                });
                $scope.datalistsFic = FIcha;
                //Variable para setear la paginación 
                $scope.curPage = 0;
            };

            $scope.Filtrar3 = function (e) {
                var Busqueda = $("#Buscar3").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    VirtualidadService.ConsultarAprendices(function (response) {
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

            //subir archivo
            $scope.UploadFileWebIns = function () {
                $("#fileUploadWebIns").trigger('click');
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

            $("#fileUploadWebIns").change(function () {
                dataweb = new FormData();

                var files = $("#fileUploadWebIns").get(0).files;

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
                    $("#fileUploadWebIns").replaceWith($("#fileUploadWebIns").val('').clone(true));

                    //waitingDialog.hide();
                    return false;

                }


                // Add the uploaded image content to the form data collection
                if (files.length > 0) {

                    readURL(this, "logoweb");

                    dataweb.append("UploadedImage", files[0]);
                    if (dataweb != null) {
                        VirtualidadService.SubirArchivo(dataweb, function (response) {
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

                                $("#fileUploadWebIns").replaceWith($("#fileUploadWebIns").val('').clone(true));
                                VirtualidadService.ConsultarInstructoresTodos(function (response) {
                                    if (response.success == true) {
                                        $scope.datalistsITodos = response.datos;
                                        $scope.ListaCompleta = response.datos;
                                        $scope.numberOfPages = function () {
                                            return Math.ceil($scope.datalistsITodos.length / $scope.pageSize);
                                        };
                                    }
                                });

                                $("#fileUploadWebIns").replaceWith($("#fileUploadWebIns").val('').clone(true));
                                //waitingDialog.hide();

                                return;
                            }

                        });
                    }

                }

            });
        }]);