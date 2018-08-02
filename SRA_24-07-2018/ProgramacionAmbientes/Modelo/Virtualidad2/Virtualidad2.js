ProgramacionApp.controller('Virtualidad2Controller',
    ['$scope', '$rootScope', '$location', 'Virtualidad2Service', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, Virtualidad2Service, $routeParams, $sce) {


            $scope.AbrirEspecial = function () {
                $location.url("/Administracion/Especial");
            };

            $scope.AbrirBasicas = function () {
                $location.url("/Administracion/Basicas");
            };
            $scope.AbrirTecnica = function () {
                $location.url("/Administracion/Tecnica");
            };

            $scope.curPage = 0;
            $scope.pageSize = 6;
            eliminar = 0;

            $scope.filtrarProgramacion = function () {
                n1 = $('#instrucFil').val();
                n2 = $('#fichaFil').val();
                if (n1 == "") {
                    $scope.CargarCalendario2(n2);
                } else if (n2 == "") {
                    $scope.CargarCalendario(n1);
                }
                $('#borrarFiltro').removeAttr("disabled"),
                $('#ModalFiltrarProgramacion').modal('hide');
                setTimeout(function () {
                    $('#instrucFil').val("").trigger("change");
                    $('#fichaFil').val("").trigger("change");
                }, 100);
            };

            Virtualidad2Service.ConsultarInstructores(function (response) {
                $('#Buscar').show();
                $('#Buscar2').hide();
                $('#tab1').show();
                $('#tab2').hide();
                $('#tab3').hide();
                if (response.success == true) {
                    $scope.datalistsI = response.datos;
                    $scope.ListaCompleta = response.datos;
                    $scope.numberOfPages = function () {
                        return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                    };

                }
            });

            Virtualidad2Service.ConsultarAreas(function (response) {
                if (response.success == true) {
                    $scope.Areas = response.datos;
                }
            });

            Virtualidad2Service.ConsultarProgramas(function (response) {
                if (response.success) {
                    $scope.ProgramasT = response.Datos;
                }
            });

            //cambio de tabs
            $('#btn1').click(function () {
                $('#Buscar').show();
                $('#Buscar2').hide();
                $('#tab1').show();
                $('#tab2').hide();
                $('#tab3').hide();
                $scope.cargarInstructor();
                $('#calendar').fullCalendar('destroy');
            });

            $('#btn2').click(function () {
                $('#Buscar2').show();
                $('#Buscar').hide();
                $('#tab1').hide();
                $('#tab2').show();
                $('#tab3').hide();
                $scope.cargarFichas();
                $('#calendar').fullCalendar('destroy');
            });

            $('#btn3').click(function () {
                $scope.LimpiarCalendar();
                $('#Buscar2').hide();
                $('#Buscar').hide();
                $('#tab1').hide();
                $('#tab2').hide();
                $('#tab3').show();
                $scope.calendarioVacio();
                Virtualidad2Service.ConsultarFichasActivas(function (response) {
                    if (response.success) {
                        $scope.PFichas = response.Datos;
                    }
                });
                Virtualidad2Service.ConsultarInstructores(function (response) {
                    if (response.success) {
                        $scope.PInstructor = response.datos;
                    }
                });
                //VirtualidadService.ConsultarFichas(function (response) {
                //    if (response.success) {
                //        $scope.PFichas = response.datos;
                //    }
                //});
                //VirtualidadService.ConsultarInstructores(function (response) {
                //    if (response.success) {
                //        $scope.PInstructor = response.datos;
                //    }
                //});
                $('#borrarFiltro').attr("disabled", true);
            });

            $('#borrarFiltro').click(function () {
                $scope.LimpiarCalendar();
                $scope.calendarioVacio();
                $('#borrarFiltro').attr("disabled", true);
            });

            //Funciones para cargar las tablas
            $scope.cargarInstructor = function () {
                Virtualidad2Service.ConsultarInstructores(function (response) {
                    if (response.success == true) {
                        $scope.datalistsI = response.datos;
                        $scope.ListaCompleta = response.datos;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                        };

                    }
                });
            };

            $scope.cargarFichas = function () {
                Virtualidad2Service.ConsultarFichas(function (response) {
                    if (response.success == true) {
                        $scope.datalistsFic = response.datos;
                        $scope.ListaCompleta = response.datos;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsFic.length / $scope.pageSize);
                        };

                    }
                });
                Virtualidad2Service.ConsultarProgramas(function (response) {
                    if (response.success) {
                        $scope.ProgramasT = response.Datos;
                    }
                });
            };

            //FullCalendar
            $scope.events = [];

            $scope.LimpiarCalendar = function () {
                $('#calendar').fullCalendar('removeEventSource', $scope.events);
                $('#calendar').fullCalendar('refetchEvents');
                $('#calendar').fullCalendar('destroy');
                $scope.events = [];
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

            $scope.CargarCalendario = function (nombre) {
                $scope.LimpiarCalendar();
                Virtualidad2Service.ConsultarProgramacion(nombre, function (response) {
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
                Virtualidad2Service.ConsultarProgramacion2(ficha, function (response) {
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
                                    if (StrDia == "sabado") {
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
                IdArea: "",
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
                Fecha_Inicio: "",
                Fecha_Fin: "",
                Retirados: "",
                Aprobados: "",
                Porc_Certificacion: "",
                Estado: "",
                No_Aprobados: ""
            };

            $scope.GestionFicha = {
                Id: "",
                Num_Ficha: "",
                Num_Aprendices: "",
                Programa: "",
                Retirados: 0,
                Aprobados: 0,
                Porc_Certificacion: "",
                No_Aprobados: 0
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
                Sabado: false
            };

            //Abrir modals
            $scope.agregarRegistro = function () {
                $scope.VaciarCampos();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $('#ModalInstructor').modal('show');
            };

            $scope.CambiarEstadoSeleccionados = function () {

                var InstructorBorrar = $scope.datalistsI.filter(function (item) {
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
                $('#FinLec').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',

                });

                $('#IniLec').on('dp.change', function (e) {
                    var fecha = new Date($('#IniLec').val());
                    $('#FinLec').data("DateTimePicker").minDate(fecha);
                });
                $('#ModalFicha').modal('show');
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

            $scope.VaciarFicha = function () {
                setTimeout(function () {
                    $('#Prog').val("").trigger("change");
                }, 200);
                $scope.Ficha.Id = "";
                $scope.Ficha.Num_Ficha = "";
                $scope.Ficha.Num_Aprendices = "";
                $scope.Ficha.Programa = "";
                $scope.Ficha.Fecha_Inicio = "";
                $scope.Ficha.Fecha_Fin = "";
                $scope.Ficha.Retirados = "";
                $scope.Ficha.Aprobados = "";
                $scope.Ficha.Porc_Certificacion = "";
                $scope.Ficha.No_Aprobados = "";
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
                setTimeout(function () {
                    $('#ficha').val("").trigger("change");
                    $('#instruc').val("").trigger("change");
                }, 100);
            };

            //Gestión Fichas
            $scope.gestionFicha = function (id) {
                $scope.GestionFicha.Retirados = 0;
                $scope.GestionFicha.Aprobados = 0;
                $scope.GestionFicha.Porc_Certificacion = "";
                $scope.GestionFicha.No_Aprobados = 0;
                Virtualidad2Service.gestionFicha(id, function (response) {
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

            $scope.CalcularCerti = function () {
                var num = (($scope.GestionFicha.Num_Aprendices) - ($scope.GestionFicha.Retirados + $scope.GestionFicha.No_Aprobados));
                if (($scope.GestionFicha.Retirados + $scope.GestionFicha.Aprobados + $scope.GestionFicha.No_Aprobados) > $scope.GestionFicha.Num_Aprendices) {
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
                    var num = $scope.GestionFicha.Aprobados;
                    var Cale = String(num).substring(0, (String(num).length - 1));
                    $scope.GestionFicha.Aprobados = parseInt(Cale);
                } else {
                    if ($scope.GestionFicha.Aprobados == null) {
                        $scope.GestionFicha.Porc_Certificacion = "%";
                    } else {
                        var porc = ((parseInt($scope.GestionFicha.Aprobados) * 100));
                        var porc2 = (porc / (parseInt($scope.GestionFicha.Num_Aprendices)));
                        $scope.GestionFicha.Porc_Certificacion = porc2.toFixed(2) + "%";
                    }
                }
            };

            $scope.valReti = function () {
                if (($scope.GestionFicha.Retirados + $scope.GestionFicha.Aprobados + $scope.GestionFicha.No_Aprobados) > $scope.GestionFicha.Num_Aprendices) {
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
                    var num = $scope.GestionFicha.Retirados;
                    var Cale = String(num).substring(0, (String(num).length - 1));
                    $scope.GestionFicha.Retirados = parseInt(Cale);
                }
            };

            $scope.CalcularNoCerti = function () {
                debugger;
                if (($scope.GestionFicha.Retirados + $scope.GestionFicha.Aprobados + $scope.GestionFicha.No_Aprobados) > $scope.GestionFicha.Num_Aprendices) {
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
                    var num = $scope.GestionFicha.No_Aprobados;
                    var Cale = String(num).substring(0, (String(num).length - 1));
                    $scope.GestionFicha.No_Aprobados = parseInt(Cale);
                }
            };

            $scope.GuardarGestionFicha = function () {
                Virtualidad2Service.GuardarGestionFicha($scope.GestionFicha, function (response) {
                    if (response.success) {
                        $('#ModalGestionFicha').modal("hide");
                        $("#ModalVerFicha").modal("hide");
                        $('#btnLimpiarVerFicha').removeAttr("disabled");
                        $('#btnGuardarFicha').attr("disabled", true);
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

            $scope.VerFicha = function (id) {
                Virtualidad2Service.VerFicha(id, function (response) {
                    if (response.success) {
                        $scope.GestionFicha.Id = response.Datos.Id;
                        $scope.GestionFicha.Num_Ficha = response.Datos.Num_Ficha;
                        localStorage.setItem("Num_Ficha", response.Datos.Num_Ficha);
                        localStorage.setItem("Virtualidad", "Complem");
                        $scope.GestionFicha.Num_Aprendices = response.Datos.Num_Aprendices;
                        $scope.GestionFicha.Programa = response.Datos.Programa;
                        $scope.GestionFicha.Retirados = response.Datos.Retirados;
                        $scope.GestionFicha.Aprobados = response.Datos.Aprobados;
                        $scope.GestionFicha.Porc_Certificacion = response.Datos.Porc_Certificacion;
                        $scope.GestionFicha.No_Aprobados = response.Datos.No_Aprobados;

                        $('#smallFichaE').text(response.Datos.Num_Ficha);
                        $('#smallProgE').text(response.Datos.Programa);
                        $('#smallNumAE').text(response.Datos.Num_Aprendices);
                        $('#NumRetiE').attr("disabled", true);
                        $('#NumCertiE').attr("disabled", true);
                        $('#NumNoCertiE').attr("disabled", true);
                        $('#btnLimpiarVerFicha').removeAttr("disabled");

                        $("#ModalVerFicha").modal("show");
                    }
                });
            };

            $('#btnLimpiarVerFicha').click(function () {
                $('#NumRetiE').removeAttr("disabled");
                $('#NumCertiE').removeAttr("disabled");
                $('#NumNoCertiE').removeAttr("disabled");
                $('#btnGuardarFicha').removeAttr("disabled");
                $('#btnLimpiarVerFicha').attr("disabled", true);
            });

            $scope.VerFichasI = function () {
                $scope.datalistsInstFilter = [];
                var IdInst = $('#InstVerFicha').val();
                $('#instrucFic').text($('#' + IdInst).text());
                setTimeout(function () {
                    $('#InstVerFicha').val("").trigger("change");
                }, 200);
                Virtualidad2Service.VerFichasI(IdInst, function (response) {
                    if (response.success) {
                        $.each(response.datos, function (index, value) {
                            $scope.datalistsInstFilter.push({
                                Ficha: value.Num_Ficha,
                                Programa: value.Programa,
                                Fecha: moment(value.Fecha_Fin).lang("es").format('dddd Do [de] MMMM [del] YYYY')
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

            $scope.GenerarReporteFicha = function () {
                $location.url("/ReporteFicha");
            };

            //Funciones para cambair estados
            $scope.inhabilitarInstructor = function () {
                var InstructorBorrar = $scope.datalistsI.filter(function (item) {
                    return item.Seleccionado === true;
                });
                Virtualidad2Service.CambiarEstado(InstructorBorrar, function (response) {
                    if (response.success == true) {
                        Virtualidad2Service.ConsultarInstructores(function (response) {
                            if (response.success == true) {
                                $scope.datalistsI = response.datos;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                                };
                                $scope.Datos = $scope.datalistsI;
                            }
                        });
                    }
                });
            };

            $scope.EliminarProgramacion = function () {
                Virtualidad2Service.EliminarProgramacion(eliminar, function (response) {
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

            //Funciones para registrar
            $scope.GuardarInstructor = function () {
                $scope.Instructor.Estado = true;
                $.each($scope.Contrato, function (index, value) {
                    if (value.Tipo == $scope.Contrato.Tipo) {
                        $scope.Instructor.TipoContrato = value.Tipo
                    }
                });


                $.each($scope.Areas, function (index, value) {
                    if (value.Parametro1 == $scope.Areas.Parametro1) {
                        $scope.Instructor.IdArea = value.Parametro1;
                    }
                });

                if ($scope.Instructor.TipoInstructor == true) {
                    $scope.Instructor.TipoInstructor = 2
                } else {
                    $scope.Instructor.TipoInstructor = 1
                }
                if ($scope.Instructor.Nombre == "" || $scope.Instructor.IdArea == "" || $scope.Instructor.Apellido == "" || $scope.Instructor.Cedula == null || $scope.Instructor.Email == "" || $scope.Instructor.TipoContrato == null) {
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
                    Virtualidad2Service.GuardarInstructor($scope.Instructor, function (response) {
                        if (response.success == true) {
                            $scope.VaciarCampos();

                            $("#ModalInstructor").modal("hide");
                            Virtualidad2Service.ConsultarInstructores(function (response) {
                                if (response.success == true) {
                                    $scope.datalistsI = response.datos;
                                    $scope.ListaCompleta = response.datos;
                                    $scope.Datos = $scope.datalistsI;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsI.length / $scope.pageSize);
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
                var iniProd = $('#FinLec').val();
                if (iniLec == "" || iniProd == "" ) {
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
                    $scope.Ficha.Fecha_Inicio = iniLec;
                    $scope.Ficha.Fecha_Fin = iniProd;
                    Virtualidad2Service.GuardarFicha($scope.Ficha, function (response) {
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

                } else if ($scope.Dias.Lunes == false && $scope.Dias.Martes == false && $scope.Dias.Miercoles == false && $scope.Dias.Jueves == false && $scope.Dias.Viernes == false && $scope.Dias.Sabado == false) {
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
                    D += ($scope.Dias.Miercoles != false) ? "MIÉRCOLES - " : "";
                    D += ($scope.Dias.Jueves != false) ? "JUEVES - " : "";
                    D += ($scope.Dias.Viernes != false) ? "VIERNES - " : "";
                    D += ($scope.Dias.Sabado != false) ? "SÁBADO - " : "";
                    var num = D.length;
                    var Cale = D.substring(0, num - 3);
                    $scope.Programacion.Dias = Cale;
                    Virtualidad2Service.GuardarProgramacion($scope.Programacion, function (response) {
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

            //Funciones para actualizar registros
            $scope.Modificar = function () {

                var InstructorBorrar = $scope.datalistsI.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (InstructorBorrar.length != 1) {
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
                    Virtualidad2Service.ModificarInstructor(InstructorBorrar, function (response) {
                        if (response.success == true) {
                            $scope.Instructor.IdInstructor = response.Instructor.IdInstructor;
                            $scope.Instructor.Nombre = response.Instructor.Nombre;
                            $scope.Instructor.Apellido = response.Instructor.Apellido;
                            $scope.Instructor.Cedula = parseInt(response.Instructor.Cedula);
                            $scope.Instructor.Email = response.Instructor.Email;
                            $scope.Instructor.Telefono = parseInt(response.Instructor.Telefono);
                            $scope.Instructor.IdArea = response.Instructor.IdArea;
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
                            if (response.Instructor.TipoInstructor == 2) {
                                $scope.Instructor.TipoInstructor = true;
                            } else {
                                $scope.Instructor.TipoInstructor = false;
                            }

                            if (response.tipo == 1) {
                                $("#btnVerContrato").show();
                            } else {
                                $("#btnVerContrato").hide();
                            }

                            $scope.Instructor.TipoContrato = response.Instructor.TipoContrato;
                            setTimeout(function () {
                                $('#listas1').val($scope.Instructor.IdArea).trigger("change");
                                $('#listas11').val($scope.Instructor.TipoContrato).trigger("change");
                            }, 100);

                            $("#ModalEditar").modal("show");
                        }
                    });
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
                    $("#btnContratoAdicion").removeAttr("disabled");
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
                    var fecha = new Date($('#').val());
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
                    CancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result) {
                        Virtualidad2Service.ContratoRenovar($scope.Instructor.IdInstructor, function (response) {
                            if (response.success) {
                                $(".adic").removeAttr("disabled");
                                $scope.Instructor.Num_Contrato = "";
                                $scope.Instructor.Inicio_Contrato = "";
                                $scope.Instructor.Fin_Contrato = "";
                                $scope.Instructor.Adicion = "";
                                $("#divAdicion").hide();
                            }
                        });
                    }
                }).catch(swal.noop);
            });

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
                    $scope.Instructor.Inicio_Contrato = InicioC;
                    $scope.Instructor.Fin_Contrato = FinC;
                    $scope.Instructor.Adicion = AdiC;
                    Virtualidad2Service.GuardarEdicionContrato($scope.Instructor, function (response) {
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
            };

            $scope.GuardarEdicionInstructor = function () {
                $.each($scope.Contrato, function (index, value) {
                    if (value.Tipo == $scope.Contrato.Tipo) {
                        $scope.Instructor.TipoContrato = value.Tipo
                    }
                });
                $.each($scope.Estado, function (index, value) {
                    if (value.Id == $scope.Estado.Id) {
                        $scope.Instructor.Estado = value.Id
                    }
                });
                $.each($scope.Areas, function (index, value) {
                    if (value.Parametro1 == $scope.Areas.Parametro1) {
                        $scope.Instructor.IdArea = value.Parametro1;
                    }
                });
                if ($scope.Instructor.TipoInstructor == true) {
                    $scope.Instructor.TipoInstructor = 2
                } else {
                    $scope.Instructor.TipoInstructor = 1
                }
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
                    Virtualidad2Service.GuardarModificacionInstructor($scope.Instructor, function (response) {
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
                            Virtualidad2Service.ConsultarInstructores(function (response) {
                                if (response.success == true) {
                                    $scope.datalistsI = response.datos;
                                    $scope.ListaCompleta = response.datos;
                                    $scope.Datos = $scope.datalistsI;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                                    };
                                }
                            });
                        }
                    });
                }
            };

            $scope.Modificar2 = function () {
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
                    Virtualidad2Service.ModificarFicha(Ficha, function (response) {
                        if (response.success) {
                            $scope.Ficha.Id = response.datos.Id;
                            $scope.Ficha.Num_Ficha = response.datos.Num_Ficha;
                            $scope.Ficha.Num_Aprendices = response.datos.Num_Aprendices;
                            $scope.Ficha.Programa = response.datos.Programa;
                            $scope.Ficha.Fecha_Inicio = response.datos.Fecha_Inicio;
                            $scope.Ficha.Fecha_Fin = response.datos.Fecha_Fin;
                            $scope.Ficha.Fin_Productiva = response.datos.Fin_Productiva;
                            $('.select2').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });
                            $('#IniLecEdit').datetimepicker({
                                useCurrent: false,
                                format: 'YYYY/MM/DD',
                                locale: 'es',

                            });
                            $('#FinLecEdit').datetimepicker({
                                useCurrent: false,
                                format: 'YYYY/MM/DD',
                                locale: 'es',

                            });
                            $('#IniLecEdit').on('dp.change', function (e) {
                                var fecha = new Date($('#IniLecEdit').val());
                                $('#FinLecEdit').data("DateTimePicker").minDate(fecha);
                            });
                            $('#IniLecEdit').val(response.datos.Fecha_Inicio);
                            $('#FinLecEdit').val(response.datos.Fecha_Fin);
                            setTimeout(function () {
                                $('#ProgEdit').val(response.datos.Programa).trigger("change");
                            }, 200);
                            $('#ModalFichaEdit').modal("show");
                        }
                    });
                }
            };

            $scope.GuardarEdicionFicha = function () {
                var iniLec = $('#IniLecEdit').val();
                var iniProd = $('#FinLecEdit').val();
                if (iniLec == "" || iniProd == "") {
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
                    $scope.Ficha.Fecha_Inicio = iniLec;
                    $scope.Ficha.Fecha_Fin = iniProd;
                    Virtualidad2Service.GuardarEdicionFicha($scope.Ficha, function (response) {
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
                Virtualidad2Service.ConsultarProgramacionId(id, function (response) {
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
                var num = D.length;
                var Cale = D.substring(0, num - 3);
                $scope.Programacion.Dias = Cale;
                $scope.Programacion.Fecha_Inicio = $("#FinicioEdit").val();
                $scope.Programacion.Fecha_Fin = $("#FfinalEdit").val();
                $scope.Programacion.Hora_Inicio = $("#inicialEdit").val();
                $scope.Programacion.Hora_Fin = $("#finalEdit").val();
                Virtualidad2Service.GuardarModificacionProgramacion($scope.Programacion, function (response) {
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
                    Virtualidad2Service.ConsultarInstructores(function (response) {
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

            $scope.Filtrar2 = function (e) {
                var Busqueda = $("#Buscar2").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    Virtualidad2Service.ConsultarFichas(function (response) {
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
                    else if (exp.test(item.Estado.toLowerCase()) || exp.test(item.Estado.toUpperCase())) {
                        return item;
                    }




                });
                $scope.datalistsFic = FIcha;
                //Variable para setear la paginación 
                $scope.curPage = 0;
            };

        }]);