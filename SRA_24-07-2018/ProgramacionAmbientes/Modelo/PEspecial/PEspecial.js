ProgramacionApp.controller('EspecialController',
    ['$scope', '$rootScope', '$location', 'EspecialService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, EspecialService, $routeParams, $sce) {

            var nav = $("#navbar").hasClass("gn-menu-wrapper gn-open-all");

            if (nav == true) {
                $(".Principal").css("width", "80%");

            } else {
                $(".Principal").css("width", "95%");
            }

            //Limpia los datos del fullcalenar----------------------------------------------------------------------
            $scope.LimpiarCalendar = function (ambiente) {

                $('#calendar').fullCalendar('removeEventSource', $scope.events);
                $('#calendar').fullCalendar('refetchEvents');
                $('#calendar').fullCalendar('destroy');
                $scope.events = [];
            };

            //-------------Inicialización del calendario------------------------------------------------------------ 
            $scope.events = [];

            //navegacion del tab-Panes
            $('#btn1').click(function () {
                $('#tabInstructores').show();
                $('#tabEmpresas').hide();
                $('#tabPrograma').hide();
                $('#tabProgramacion').hide();
                $('#tabFichas').hide();
                $('#calendar').fullCalendar('destroy');
                $scope.cargarInstructor();
                $scope.curPage = 0;
            });

            $('#btn2').click(function () {
                $scope.cargarEmpresa();
                $('#tabInstructores').hide();
                $('#tabPrograma').hide();
                $('#tabEmpresas').show();
                $('#tabProgramacion').hide();
                $('#tabFichas').hide();
                $('#calendar').fullCalendar('destroy');
                $scope.curPage = 0;
            });

            $('#btn3').click(function () {
                $scope.cargarPrograma();
                $('#tabInstructores').hide();
                $('#tabPrograma').show();
                $('#tabEmpresas').hide();
                $('#tabProgramacion').hide();
                $('#tabFichas').hide();
                $('#calendar').fullCalendar('destroy');
                $scope.curPage = 0;
            });

            $('#btn4').click(function () {
                $scope.cargarFichas();
                $('#tabInstructores').hide();
                $('#tabPrograma').hide();
                $('#tabEmpresas').hide();
                $('#tabProgramacion').hide();
                $('#tabFichas').show();
                $('#calendar').fullCalendar('destroy');
                $scope.curPage = 0;
            });

            $('#btn5').click(function () {
                $scope.LimpiarCalendar();
                $('#tabInstructores').hide();
                $('#tabPrograma').hide();
                $('#tabEmpresas').hide();
                $('#tabFichas').hide();
                $('#tabProgramacion').show();
                $('#Buscar2').hide();
                $('#Buscar').hide();
                $('#Buscar3').hide();
                $('#Buscar4').hide();
                $scope.curPage = 0;
                $('#borrarFiltro').attr("disabled", true);
                $scope.CalendarioVacio();               
            });

            $scope.CalendarioVacio = function () {
                $('#calendar').fullCalendar({
                    locale: 'es',
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

                setTimeout(function () {
                    EspecialService.ConsultarFichas(function (response) {
                        if (response.success == true) {
                            $scope.PFichas = response.datos;
                        }
                    });
                    EspecialService.ConsultarInstructores(function (response) {
                        if (response.success == true) {
                            $scope.PInstructor = response.datos;
                        }
                    });
                    EspecialService.ConsultarEmpresas(function (response) {
                        if (response.success == true) {
                            $scope.PEmpresa = response.datos;
                        }
                    });
                    EspecialService.ConsultarProgramas(function (response) {
                        if (response.success == true) {
                            $scope.PPrograma = response.datos;
                        }
                    });
                }, 500);
            };



            $scope.CargarCalendario = function (nombre) {
                debugger;
                EspecialService.ConsultarProgramacion(nombre, function (response) {
                    debugger;
                    if (response.success == true) {
                        $.each(response.datos, function (index, value) {
                            var Inicio = value.Parametro8.split('/');
                            var Fin = value.Parametro9.split('/');
                            var HoraInicio = value.Parametro2.split(':');
                            var HoraFin = value.Parametro3.split(':');
                            var fecha1 = moment(value.Parametro8);
                            var fecha2 = moment(value.Parametro9);
                            var dias = fecha2.diff(fecha1, 'days');
                            var PDIas = value.Parametro7;
                            for (var i = 0; i <= dias; i++) {
                                var fecha = $scope.sumaFecha(i, value.Parametro8);
                                var fff = fecha.split('/');
                                var ff = fff[1] + "/" + fff[0] + "/" + fff[2];
                                var fecha2 = new Date(ff);
                                var StrDia = moment(fecha2).lang("es").format('dddd');

                                $scope.Calendario = function () {
                                    $scope.events.push({
                                        Id: value.Parametro1,
                                        title: value.Parametro5,
                                        start: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), parseInt(HoraInicio[0]), parseInt(HoraInicio[1])),
                                        end: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), parseInt(HoraFin[0]), parseInt(HoraFin[1])),
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
                            events: $scope.events,
                            eventClick: function (event) {
                                var inicio = moment(event.FInicio).lang("es").format('dddd D [de] MMMM [del] YYYY');
                                var fin = moment(event.FFin).lang("es").format('dddd D [de] MMMM [del] YYYY');
                                $scope.Modificar4(event.Id, inicio, fin);
                            }
                        });
                    }
                });
                setTimeout(function () {
                    EspecialService.ConsultarFichas(function (response) {
                        if (response.success == true) {
                            $scope.PFichas = response.datos;
                        }
                    });
                    EspecialService.ConsultarInstructores(function (response) {
                        if (response.success == true) {
                            $scope.PInstructor = response.datos;
                        }
                    });
                    EspecialService.ConsultarEmpresas(function (response) {
                        if (response.success == true) {
                            $scope.PEmpresa = response.datos;
                        }
                    });
                }, 500);
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
            }

            $('.datetimepicker3').datetimepicker({
                useCurrent: false,
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

            //enrutamiento
            $scope.AbrirEspecial = function () {
                $location.url("/Administracion/Especial");
            };

            $scope.AbrirBasicas = function () {
                $location.url("/Administracion/Basicas");
            };

            $scope.AbrirTecnica = function () {
                $location.url("/Administracion/Tecnica");
            };

            //declaracion de objetos
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
                TipoInstructor: ""
            };

            $scope.Empresa = {
                NIT: "",
                Nombre: "",
                Direccion: "",
                Email: "",
                Telefono: "",
                Encargado: "",
                Telefono_Encargado: "",
                Tipo_Poblacion: ""
            };

            $scope.Programacion = {
                Id: "",
                Fecha_Inicio: "",
                Fecha_Final: "",
                Hora_Inicio: "",
                Hora_Final: "",
                Num_Ficha: "",
                Instructor: "",
                Empresa: "",
                Estado: true,
                Dias: "",
                Programa: "",
                Tipo_Curso: ""
            };

            $scope.Dias = {
                Lunes: false,
                Martes: false,
                Miercoles: false,
                Jueves: false,
                Viernes: false,
                Sabado: false,
                Domingo: false
            }

            $scope.Contrato = [
                { Tipo: 1, Nombre: "Contratista" }, { Tipo: 2, Nombre: "Planta" }
            ];

            $scope.Ficha = {
                Id: "",
                Programa: "",
                Num_Ficha: "",
                Num_Aprendices: "",
                Fecha_Inicio: "",
                Fecha_Fin: "",
                Caracterizacion: "",
                Estado: false
            };

            $scope.Estado = [
                { Id: 1, Nombre: "Activo" }, { Id: 0, Nombre: "Inactivo" }
            ];

            $scope.Programa = {
                IdPrograma: "",
                CodigoPrograma: "",
                Nivel: "",
                LineaTecnologica: "",
                Red_Tecnologica: "",
                Perfil_Instructor: "",
                Version_Programa: "",
                IdArea: "",
                NombrePrograma: ""
            };

            //inicializacion de la paginacion
            $scope.curPage = 0;
            $scope.pageSize = 6;
            var eliminar;

            $scope.ObjReporte = {
                Programa: "",
                Caracterizacion: ""
            };

            $scope.GenerarReporte = function () {
                $scope.ObjReporte.Programa = "";
                $scope.ObjReporte.Caracterizacion = "";
                setTimeout(function () {
                    $("#RselectPrograma").val("").trigger("change");
                    $("#Rcaracterizacion").val("").trigger("change");
                }, 100);
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $("#ModalReporte").modal("show");
            };

            $scope.GenerarR = function () {
                localStorage.setItem("Rprograma", $scope.ObjReporte.Programa);
                localStorage.setItem("Rcaracterizacion", $scope.ObjReporte.Caracterizacion);
                $location.url("/ReporteEspecial");
            };

            //abrir modals de registros
            $scope.agregarRegistro = function () {
                $scope.VaciarCampos();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $('#ModalInstructor').modal('show');
            };

            $scope.agregarRegistro2 = function () {
                $scope.VaciarCamposEmpresa();
                $('.select2').select2();
                $('#ModalEmpresa').modal('show');
            };

            $scope.agregarRegistro3 = function () {
                $scope.VaciarCamposFicha();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $('#ModalFicha').modal('show');
                EspecialService.SelectProgramas(function (response) {
                    if (response.success == true) {
                        if (response.success == true) {
                            $scope.Programa = response.datos;
                        }
                    }
                });
                $('#inicioF').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',

                });

                $('#finF').datetimepicker({
                    useCurrent: false,
                    format: 'YYYY/MM/DD',
                    locale: 'es',
                });

                $('#inicioF').on('dp.change', function (e) {
                    var fecha = new Date($('#inicioF').val());
                    $('#finF').data("DateTimePicker").minDate(fecha);
                });
            };

            $scope.ModalProgramacion = function () {
                $scope.VaciarCamposProgramacion()
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                EspecialService.SelectProgramas(function (response) {
                    debugger;
                    if (response.success == true) {
                        if (response.success == true) {
                            $scope.Programa = response.datos;
                        }
                    }
                });

                $('#ModalProgramacion').modal('show');
            };

            $scope.ModalFiltrarProgramacion = function () {

                $('#instrucFil').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $('#ModalFiltrarProgramacion').modal('show');
            }

            //funciones para limpiar los campos
            $scope.VaciarCampos = function () {

                $scope.Instructor.Nombre = "";
                $scope.Instructor.Apellido = "";
                $scope.Instructor.Email = "";
                $scope.Instructor.Celular = "";
            };

            $scope.VaciarCamposEmpresa = function () {

                $scope.Empresa.NIT = "";
                $scope.Empresa.Nombre = "";
                $scope.Empresa.Direccion = "";
                $scope.Empresa.Email = "";
                $scope.Empresa.Telefono = "";
                $scope.Empresa.Encargado = "";
                $scope.Empresa.Telefono_Encargado = "";
            };

            $scope.VaciarCamposFicha = function () {
                $scope.Ficha.Id = "";
                $scope.Ficha.Num_Ficha = "";
                $scope.Ficha.Num_Aprendices = "";
                $scope.Ficha.Programa = "";
                $scope.Ficha.Fecha_Inicio = "";
                $scope.Ficha.Fecha_Fin = "";
                $('#inicioF').val("");
                $('#finF').val("");
                setTimeout(function () {
                    $('#Fprograma').val("").trigger("change");
                    $('#caracterizacion').val("").trigger("change");
                }, 100);
            };

            $scope.VaciarCamposProgramacion = function () {
                $scope.Programacion.Fecha_Inicio = "";
                $scope.Programacion.Fecha_Final = "";
                $scope.Programacion.Hora_Inicio = "";
                $scope.Programacion.Hora_Final = "";
                $scope.Programacion.Num_Ficha = "";
                $scope.Programacion.Instructor = "";
                $scope.Programacion.Empresa = "";
                $scope.Programacion.Dias = "";
                $scope.Programacion.Programa = "";
                $scope.Programacion.Tipo_Curso = "";
                $scope.Dias.Lunes = false;
                $scope.Dias.Martes = false;
                $scope.Dias.Miercoles = false;
                $scope.Dias.Jueves = false;
                $scope.Dias.Viernes = false;
                $scope.Dias.Sabado = false;
                setTimeout(function () {
                    $('#ficha').val("").trigger("change");
                    $('#instruc').val("").trigger("change");
                    $('#empresa').val("").trigger("change");
                    $('#selectPrograma').val("").trigger("change");
                    $('#tipoC').val("").trigger("change");
                }, 500);
            };

            //Funciòn para consultar las areas
            EspecialService.ConsultarAreas(function (response) {
                if (response.success == true) {
                    $scope.Areas = response.datos;
                }
            });

            //funciones para cargar las tablas0'
            $scope.cargarEmpresa = function () {
                $('#Buscar2').show();
                $('#Buscar').hide();
                $('#Buscar3').hide();
                $('#Buscar4').hide();
                EspecialService.ConsultarEmpresas(function (response) {
                    if (response.success == true) {

                        $scope.datalistsE = response.datos;
                        $scope.ListaCompleta = response.datos;
                        $scope.Datos = $scope.datalistsE;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsE.length / $scope.pageSize);
                        };

                    }
                });
            };

            $scope.cargarPrograma = function () {
                $('#Buscar2').hide();
                $('#Buscar').hide();
                $('#Buscar3').show();
                $('#Buscar4').hide();
                EspecialService.ConsultarProgramas(function (response) {
                    if (response.success == true) {
                        $scope.datalistsProg = response.datos;
                        $scope.ListaCompleta = response.datos;
                        $scope.Datos = $scope.datalistsProg;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
                        };

                    }
                });
            };

            $scope.cargarInstructor = function () {
                EspecialService.ConsultarInstructores(function (response) {
                    $('#Buscar2').hide();
                    $('#Buscar').show();
                    $('#Buscar3').hide();
                    $('#Buscar4').hide();
                    if (response.success == true) {
                        $scope.datalistsInst = response.datos;
                        $scope.ListaCompleta = response.datos;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
                        };

                    }
                });
            };

            $scope.cargarFichas = function () {
                EspecialService.ConsultarFichas(function (response) {
                    $('#Buscar2').hide();
                    $('#Buscar').hide();
                    $('#Buscar3').hide();
                    $('#Buscar4').show();
                    if (response.success == true) {
                        $scope.datalists = response.datos;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalists.length / $scope.pageSize);
                        };
                    }
                });
            };

            //Función para consultar todos los instructores activos 
            EspecialService.ConsultarInstructores(function (response) {
                $('#Buscar2').hide();
                $('#Buscar').show();
                $('#Buscar3').hide();
                $('#Buscar4').hide();
                if (response.success == true) {
                    $scope.datalistsI = response.datos;
                    $scope.ListaCompleta = response.datos;
                    $scope.numberOfPages = function () {
                        return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                    };
                }
            });

            //Función para registrar un instructor
            $scope.Guardar = function () {
                $scope.Instructor.Estado = true;

                if ($scope.Instructor.Nombre == "" || $scope.Instructor.Apellido == "" || $scope.Instructor.Celular == null || $scope.Instructor.Email == "") {
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
                    EspecialService.GuardarInstructor($scope.Instructor, function (response) {
                        debugger;
                        if (response.success == true) {
                            $scope.VaciarCampos();
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
                            $("#ModalInstructor").modal("hide");
                            EspecialService.ConsultarInstructores(function (response) {
                                if (response.success == true) {

                                    $scope.datalistsInst = response.datos;
                                    $scope.ListaCompleta = response.datos;
                                    $scope.Datos = $scope.datalistsInst;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
                                    };

                                }
                            });
                        } else {
                            bootbox.dialog({
                                title: "Información",
                                message: "El Email ya se encuentra registrado",
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

            // Función para registrar una Empresa
            $scope.GuardarEmpresa = function () {
                if ($scope.Empresa.NIT == "" || $scope.Empresa.Nombre == "" || $scope.Empresa.Direccion == "" || $scope.Empresa.Email == null || $scope.Empresa.Telefono == "") {
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
                    EspecialService.GuardarEmpresa($scope.Empresa, function (response) {
                        if (response.success == true) {
                            $scope.VaciarCamposEmpresa();
                            $("#ModalEmpresa").modal("hide");
                            EspecialService.ConsultarEmpresas(function (response) {
                                if (response.success == true) {

                                    $scope.datalistsE = response.datos;
                                    $scope.ListaCompleta = response.datos;
                                    $scope.Datos = $scope.datalistsE;
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
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsE.length / $scope.pageSize);
                                    };

                                }
                            });
                        } else {
                            bootbox.dialog({
                                title: "Información",
                                message: "El NIT de la empresa ya se encuentra registrado",
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

            //Función para para el cambio del estado del instructor de activo a inactivo
            $scope.CambiarEstadoSeleccionados = function () {

                var InstructorBorrar = $scope.datalistsInst.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (InstructorBorrar.length == 0) {
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
                    $("#modalInhabilitarInstructor").modal("show");
                }
            };

            //Función para para el cambio del estado del instructor de activo a inactivo
            $scope.CambiarEstadoSeleccionados2 = function () {

                var EmpresaBorrar = $scope.datalistsE.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (EmpresaBorrar.length == 0) {
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
                    $('#modalInhabilitarEmpresa').modal('show');
                }
            };

            //Función para para el editar un instructor
            $scope.Modificar = function () {

                var InstructorBorrar = $scope.datalistsInst.filter(function (item) {
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

                    $scope.Instructor.Id = InstructorBorrar[0].Id;
                    $scope.Instructor.Nombre = InstructorBorrar[0].Nombre;
                    $scope.Instructor.Apellido = InstructorBorrar[0].Apellido;
                    $scope.Instructor.Email = InstructorBorrar[0].Email;
                    $scope.Instructor.Celular = parseInt(InstructorBorrar[0].Celular);

                    $("#ModalEditar").modal("show");

                }
            };

            //Función para para el editar una Empresa
            $scope.Modificar2 = function () {
                var EmpresaBorrar = $scope.datalistsE.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (EmpresaBorrar.length != 1) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Debes seleccionar una Empresa",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                } else {
                    EspecialService.ModificarEmpresa(EmpresaBorrar, function (response) {
                        if (response.success == true) {
                            $(".select2").select2();
                            $scope.Empresa.NIT = response.Instructor.NIT;
                            $scope.Empresa.Nombre = response.Instructor.Nombre;
                            $scope.Empresa.Direccion = response.Instructor.Direccion;
                            $scope.Empresa.Email = response.Instructor.Email;
                            $scope.Empresa.Telefono = parseInt(response.Instructor.Telefono);
                            $scope.Empresa.Encargado = response.Instructor.Encargado;
                            $scope.Empresa.Telefono_Encargado = parseInt(response.Instructor.Telefono_Encargado);
                            $scope.Empresa.Tipo_Poblacion = response.Instructor.Tipo_Poblacion;
                            var tipo = response.Instructor.Tipo_Poblacion.split(' - ');
                            setTimeout(function () {
                                $("#TipoPoblacionE").val(tipo).trigger("change");
                            }, 200);
                            $("#ModalEditarEmpresa").modal("show");
                        }
                    });
                }
            };

            //Función para guardar la modificación sobre un registro de un instructor
            $scope.GuardarEdicionInstructor = function () {

                if ($scope.Instructor.Nombre == "" || $scope.Instructor.Apellido == "" || $scope.Instructor.Cedula == "" || $scope.Instructor.Email == "") {
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
                    EspecialService.GuardarModificacionInstructor($scope.Instructor, function (response) {
                        if (response.success == true) {
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
                            $("#ModalEditar").modal("hide");
                            $scope.VaciarCampos();
                            EspecialService.ConsultarInstructores(function (response) {
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
                    });
                }
            }

            //Función para guardar la modificación sobre un registro de una empresa
            $scope.GuardarEdicionEmpresa = function () {
                if ($scope.Empresa.NIT == null || $scope.Empresa.Nombre == null || $scope.Empresa.Direccion == null || $scope.Empresa.Email == null || $scope.Empresa.Telefono == null) {
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
                    var tipo = $("#TipoPoblacion").val();
                    var TPobla = "";
                    $.each(tipo, function (index, value) {
                        TPobla += value + " - ";
                    });
                    var num = TPobla.length;
                    var pobla = TPobla.substring(0, num - 3);
                    $scope.Empresa.Tipo_Poblacion = pobla;
                    EspecialService.GuardarModificacionEmpresa($scope.Empresa, function (response) {
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
                            $("#ModalEditarEmpresa").modal("hide");
                            $scope.VaciarCampos();
                            EspecialService.ConsultarEmpresas(function (response) {
                                if (response.success == true) {
                                    $scope.datalistsE = response.datos;
                                    $scope.ListaCompleta = response.datos;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsE.length / $scope.pageSize);
                                    };
                                    $scope.Datos = $scope.datalistsE;
                                }
                            });
                        }
                    });
                }
            }

            //Función para realizar el filtro sobre la tabla
            $scope.Filtrar = function (e) {
                var Busqueda = $("#Buscar").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    EspecialService.ConsultarInstructores(function (response) {
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


                    if (exp.test(item.Nombre.toLowerCase()) || exp.test(item.Nombre.toUpperCase())) {
                        return item;
                    }

                    else if (exp.test(item.Apellido.toLowerCase()) || exp.test(item.Apellido.toUpperCase())) {
                        return item;
                    }
                    else if (exp.test(item.Email.toLowerCase()) || exp.test(item.Email.toUpperCase())) {
                        return item;
                    }



                });
                $scope.datalistsInst = Instructor;
                //Variable para setear la paginación 
                $scope.curPage = 0;
            };

            //Función para realizar el filtro sobre la tabla empresa
            $scope.Filtrar2 = function (e) {
                var Busqueda = $("#Buscar2").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    EspecialService.ConsultarEmpresas(function (response) {
                        if (response.success == true) {

                            $scope.datalists = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.numberOfPages = function () {
                                return Math.ceil($scope.datalists.length / $scope.pageSize);
                            };
                            $scope.Datos = $scope.datalists;

                        }
                    });
                }
                var EMpresa = [];
                $scope.datalists = $scope.ListaCompleta;
                EMpresa = $scope.datalists.filter(function (item) {


                    if (exp.test(item.NIT) || exp.test(item.NIT)) {

                        return item;
                    }

                    else if (exp.test(item.Nombre.toLowerCase()) || exp.test(item.Nombre.toUpperCase())) {
                        return item;
                    }


                });
                $scope.datalists = EMpresa;
                //Variable para setear la paginación 
                $scope.curPage = 0;
            };

            //Función  para filtrar la tabla Programas
            $scope.Filtrar3 = function (e) {
                var Busqueda = $("#Buscar3").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    EspecialService.ConsultarProgramas(function (response) {
                        if (response.success == true) {
                            $scope.datalistsProg = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.Datos = $scope.datalistsProg;
                            $scope.numberOfPages = function () {
                                return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
                            };
                        }
                    });
                }
                var Programa = [];
                $scope.datalistsProg = $scope.ListaCompleta;
                Programa = $scope.datalistsProg.filter(function (item) {

                    if (exp.test(item.Parametro2) || exp.test(item.Parametro2)) {

                        return item;
                    }
                    else if (exp.test(item.Parametro9.toLowerCase()) || exp.test(item.Parametro9.toUpperCase())) {

                        return item;
                    }

                    else if (exp.test(item.Parametro5.toLowerCase()) || exp.test(item.Parametro5.toUpperCase())) {

                        return item;
                    }
                    else if (exp.test(item.Parametro3.toLowerCase()) || exp.test(item.Parametro3.toUpperCase())) {

                        return item;
                    }
                    else if (exp.test(item.Parametro8.toLowerCase()) || exp.test(item.Parametro8.toUpperCase())) {

                        return item;
                    }

                });
                $scope.datalistsProg = Programa;
                //Variable para setear la paginación 
                $scope.curPage = 0;


            };

            //Función  para filtrar la tabla Fichas
            $scope.Filtrar4 = function (e) {
                var Busqueda = $("#Buscar4").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    EspecialService.ConsultarFichas(function (response) {
                        if (response.success == true) {
                            $scope.datalists = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.Datos = $scope.datalists;
                            $scope.numberOfPages = function () {
                                return Math.ceil($scope.datalists.length / $scope.pageSize);
                            };
                        }
                    });
                }
                var Programa = [];
                $scope.datalists = $scope.ListaCompleta;
                Programa = $scope.datalists.filter(function (item) {

                    if (exp.test(item.Parametro2.toLowerCase()) || exp.test(item.Parametro2.toLowerCase())) {

                        return item;
                    }
                    else if (exp.test(item.Parametro3.toLowerCase()) || exp.test(item.Parametro3.toUpperCase())) {

                        return item;
                    }

                    else if (exp.test(item.Parametro7.toLowerCase()) || exp.test(item.Parametro7.toUpperCase())) {

                        return item;
                    }


                });
                $scope.datalists = Programa;
                //Variable para setear la paginación 
                $scope.curPage = 0;


            };

            //Función  para filtrar la tabla Programaciones
            $scope.Filtrar5 = function (e) {
                var Busqueda = $("#Buscar5").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    EspecialService.ConsultarProgramacion(function (response) {
                        if (response.success == true) {
                            $scope.datalistsP = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.Datos = $scope.datalistsP;
                            $scope.numberOfPages = function () {
                                return Math.ceil($scope.datalistsP.length / $scope.pageSize);
                            };
                        }
                    });
                }
                var Programa = [];
                $scope.datalistsP = $scope.ListaCompleta;
                Programa = $scope.datalistsP.filter(function (item) {

                    if (exp.test(item.Parametro6.toLowerCase()) || exp.test(item.Parametro6.toLowerCase())) {

                        return item;
                    }
                    else if (exp.test(item.Parametro5.toLowerCase()) || exp.test(item.Parametro5.toUpperCase())) {

                        return item;
                    }

                    else if (exp.test(item.Parametro4.toLowerCase()) || exp.test(item.Parametro4.toUpperCase())) {

                        return item;
                    }

                });
                $scope.datalistsP = Programa;
                //Variable para setear la paginación 
                $scope.curPage = 0;


            };

            //funcion para registrar una ficha
            $scope.GuardarFicha = function () {

                var x = $("#inicioF").val().split('/');
                var y = $("#finF").val().split('/');
                $scope.Ficha.Fecha_Inicio = $("#inicioF").val();
                $scope.Ficha.Fecha_Fin = $("#finF").val();
                $scope.Ficha.Estado = true;
                var StartDate = x[1] + "-" + x[2] + "-" + x[0];
                var EndDate = y[1] + "-" + y[2] + "-" + y[0];
                if (Date.parse(StartDate) >= Date.parse(EndDate)) {
                    bootbox.dialog({
                        title: "Información",
                        message: "La fecha final debe ser mayor a la fecha inicial",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                    return;
                }
                EspecialService.GuardarFicha($scope.Ficha, function (response) {
                    if (response.success) {
                        $("#ModalFicha").modal("hide");
                        $scope.VaciarCamposFicha();
                        EspecialService.ConsultarFichas(function (response) {
                            if (response.success) {
                                if (response.success == true) {
                                    $scope.datalists = response.datos;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalists.length / $scope.pageSize);
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
                                } else {
                                    bootbox.dialog({
                                        title: "Registro",
                                        message: "La ficha ya se encuentra registrada",
                                        buttons: {
                                            success: {
                                                label: "Cerrar",
                                                className: "btn-primary",
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            };

            //funcion para cambiar el estado de las fichas
            $scope.CambiarEstadoSeleccionados3 = function () {
                var UsariosBorrar = $scope.datalists.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (UsariosBorrar.length != 1) {

                    bootbox.dialog({
                        title: "Inhabilitar",
                        message: "Debe seleccionar una ficha",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                } else {
                    $("#modalInhabilitar").modal("show");
                }
            };

            //funcion para in habilitar una ficha
            $scope.inhabilitar = function () {

                var FichaBorrar = $scope.datalists.filter(function (item) {
                    return item.Seleccionado === true;
                });
                EspecialService.BorrarFicha(FichaBorrar, function (response) {

                    if (response.success == true) {
                        EspecialService.ConsultarFichas(function (response) {
                            if (response.success == true) {
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
                                $scope.datalists = response.datos;
                                $scope.ListaCompleta = response.datos;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalists.length / $scope.pageSize);
                                };
                            }
                        });
                    }

                });

            };

            //funcion para modificar una ficha
            $scope.Modificar3 = function () {

                EspecialService.SelectProgramas(function (response) {
                    if (response.success == true) {
                        if (response.success == true) {
                            $scope.Programa = response.datos;
                        }
                    }
                });

                var FichaModificar = $scope.datalists.filter(function (item) {
                    return item.Seleccionado === true;

                });

                if (FichaModificar.length == 1) {

                    EspecialService.ModificarFicha(FichaModificar, function (response) {

                        if (response.success == true) {

                            $scope.Ficha.Id = response.Ficha.Id;
                            $scope.Ficha.Num_Ficha = parseInt(response.Ficha.Num_Ficha);
                            $scope.Ficha.Programa = response.Ficha.Programa;
                            $scope.Ficha.Num_Aprendices = parseInt(response.Ficha.Num_Aprendices);
                            $scope.Ficha.Fecha_Inicio = response.Ficha.Fecha_Inicio;
                            $scope.Ficha.Fecha_Fin = response.Ficha.Fecha_Fin;
                            $scope.Ficha.Caracterizacion = response.Ficha.Caracterizacion;
                            $('.select2').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });
                            setTimeout(function () {
                                $('#ListaProgramas1').val($scope.Ficha.Programa).trigger("change");
                                $('#caracterizacionE').val($scope.Ficha.Caracterizacion).trigger("change");
                            }, 200);
                            $("#ModalEditarFicha").modal("show");
                            $('#inicioFE').datetimepicker({
                                useCurrent: false,
                                format: 'YYYY/MM/DD',
                                locale: 'es',

                            });

                            $('#finFE').datetimepicker({
                                useCurrent: false,
                                format: 'YYYY/MM/DD',
                                locale: 'es',
                            });

                            $('#inicioFE').on('dp.change', function (e) {
                                var fecha = new Date($('#inicioFE').val());
                                $('#finFE').data("DateTimePicker").minDate(fecha);
                            });
                        }
                    });
                } else {

                    bootbox.dialog({
                        title: "Editar",
                        message: "Debe seleccionar una ficha",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                }
            };

            //funcion para modificar una ficha
            $scope.GuardarMoficicacionFicha = function () {

                var x = $("#inicioFE").val().split('/');
                var y = $("#finFE").val().split('/');

                $scope.Ficha.Fecha_Inicio = $("#inicioFE").val();
                $scope.Ficha.Fecha_Fin = $("#finFE").val();
                $scope.Ficha.Estado = true;

                var StartDate = x[1] + "-" + x[2] + "-" + x[0];
                var EndDate = y[1] + "-" + y[2] + "-" + y[0];
                if (Date.parse(StartDate) >= Date.parse(EndDate)) {
                    bootbox.dialog({
                        title: "Información",
                        message: "La fecha final debe ser mayor a la fecha inicial",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                    return;
                }

                EspecialService.GuardarModificacionFicha($scope.Ficha, function (response) {
                    if (response.success == true) {
                        $("#ModalEditarFicha").modal("hide");
                        $scope.VaciarCamposFicha();
                        EspecialService.ConsultarFichas(function (response) {

                            if (response.success == true) {

                                if (response.success == true) {
                                    $scope.datalists = response.datos;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalists.length / $scope.pageSize);
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
                            }
                        });
                    }
                });

            };

            //-----------Función que filtra las programaciones por jornadas--------------------------------- 
            $scope.FiltroAmbiente = function (ambiente) {
                if (ambiente == "" || $scope.RangoHoras.Jornada == null) {

                    bootbox.dialog({
                        title: "Información",
                        message: "Seleccione un ambiente y un rango horario",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                } else {

                    EspecialService.FiltrarAmbiente(ambiente.IdAmbiente, $scope.RangoHoras.Jornada, function (response) {
                        $scope.Limpiar();
                        $.each(response.programacion, function (index, value) {
                            var Inicio = value.FechaInicio.split('-');
                            var Fin = value.FechaFin.split('-');
                            var HoraInicio = value.HoraInicio.split(':');
                            var HoraFin = value.HoraFin.split(':');
                            $scope.events.push({
                                title: ' Ficha:' + value.Ficha,
                                start: new Date(parseInt(Inicio[0]), parseInt(Inicio[1]) - 1, parseInt(Inicio[2].substring(0, 2)), parseInt(HoraInicio[0]), parseInt(HoraInicio[1])),
                                end: new Date(parseInt(Fin[0]), parseInt(Fin[1]) - 1, parseInt(Fin[2].substring(0, 2)), parseInt(HoraFin[0]), parseInt(HoraFin[1])),
                                allDay: false,
                                color: value.Color,
                                tip: "PROGRAMA: " + value.Programa.toUpperCase() + " - " + "INSTRUCTOR:" + value.NombreInstructor.toUpperCase() + " - " + "RESULTADO:" + value.Competencia.toUpperCase()
                            });

                        });

                        var calendar = $('#calendar').fullCalendar({
                            header: {
                                left: 'title',
                                center: 'agendaDay,agendaWeek,month',
                                right: 'prev,next today'
                            },
                            height: 700,
                            theme: false,
                            ignoreTimezone: false,
                            events: $scope.events,
                            eventRender: function (event, element) {
                                element.attr('title', event.tip);
                            },
                            editable: false,
                            firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
                            selectable: false,
                            defaultView: 'month',
                            axisFormat: 'H:mm',
                            columnFormat: {
                                month: 'ddd',    // Mon
                                week: 'ddd d', // Mon 7
                                day: 'dddd M/d',  // Monday 9/7
                                agendaDay: 'dddd d'
                            },
                            titleFormat: {
                                month: 'MMMM yyyy', // September 2009
                                week: "MMMM yyyy", // September 2009
                                day: 'MMMM yyyy'                  // Tuesday, Sep 8, 2009
                            },
                            allDaySlot: false,
                            selectHelper: true,
                            select: function (start, end, allDay) {
                                var title = prompt('Event Title:');
                                if (title) {
                                    calendar.fullCalendar('renderEvent',
                                        {
                                            title: title,
                                            start: start,
                                            end: end,
                                            allDay: allDay
                                        },
                                        true // make the event "stick"
                                    );
                                }
                                calendar.fullCalendar('unselect');
                            },
                            droppable: true, // this allows things to be dropped onto the calendar !!!
                            drop: function (date, allDay) { // this function is called when something is dropped

                                // retrieve the dropped element's stored Event Object
                                var originalEventObject = $(this).data('eventObject');

                                // we need to copy it, so that multiple events don't have a reference to the same object
                                var copiedEventObject = $.extend({}, originalEventObject);

                                // assign it the date that was reported
                                copiedEventObject.start = date;
                                copiedEventObject.allDay = allDay;

                                // render the event on the calendar
                                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                                // is the "remove after drop" checkbox checked?
                                if ($('#drop-remove').is(':checked')) {
                                    // if so, remove the element from the "Draggable Events" list
                                    $(this).remove();
                                }

                            },


                        });

                    });
                    $scope.Limpiar();
                    $("#ModalFiltro").modal("hide");
                    $("#divDerecho").css("margin-top", "5px");
                    $("#divDerecho1").css("margin-top", "5px");
                }
            };

            //----------------------------------------------------------------------------------------------
            $scope.GuardarProgramacion = function () {

                $scope.Programacion.Estado = true;
                $scope.Programacion.Fecha_Inicio = $('#Finicio').val();
                $scope.Programacion.Fecha_Final = $('#Ffinal').val();
                $scope.Programacion.Hora_Inicio = $('#inicial').val();
                $scope.Programacion.Hora_Final = $('#final').val();



                if ($scope.Programacion.Fecha_Inicio == null || $scope.Programacion.Fecha_Final == null || $scope.Programacion.Hora_Inicio == null || $scope.Programacion.Hora_Final == null || $scope.Programacion.Num_Ficha == null || $scope.Programacion.Instructor == null || $scope.Programacion.Empresa == null) {
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

                } else if ($scope.Dias.Lunes == false && $scope.Dias.Martes == false && $scope.Dias.Miercoles == false && $scope.Dias.Jueves == false && $scope.Dias.Viernes == false && $scope.Dias.Sabado == false && $scope.Dias.Domingo == false) {
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
                    D += ($scope.Dias.Sabado != false) ? "SABADO - " : "";
                    D += ($scope.Dias.Domingo != false) ? "DOMINGO - " : "";
                    var num = D.length;
                    var Cale = D.substring(0, num - 3);
                    $scope.Programacion.Dias = Cale;

                    EspecialService.GuardarProgramacion($scope.Programacion, function (response) {
                        if (response.success == true) {
                            $('#ModalProgramacion').modal('hide')
                            $scope.VaciarCamposProgramacion();
                            $scope.datalistsP = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.Datos = $scope.datalistsP;
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

            $scope.inhabilitarProgramacion = function () {

                EspecialService.BorrarProgramacion(eliminar, function (response) {
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
                    $("#ModalEditarProgramacion").modal("hide");
                    $scope.LimpiarCalendar();
                    setTimeout($scope.CargarCalendario(), 200);
                });
            };

            $scope.inhabilitarInstructor = function () {
                var InstructorBorrar = $scope.datalistsInst.filter(function (item) {
                    return item.Seleccionado === true;
                });
                EspecialService.CambiarEstado(InstructorBorrar, function (response) {
                    if (response.success == true) {
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
                        EspecialService.ConsultarInstructores(function (response) {
                            if (response.success == true) {
                                $scope.datalistsInst = response.datos;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalistsInst.length / $scope.pageSize);
                                };
                                $scope.Datos = $scope.datalistsInst;
                            }
                        });
                    }
                });
            };

            $scope.inhabilitarEmpresa = function () {
                var EmpresaBorrar = $scope.datalistsE.filter(function (item) {
                    return item.Seleccionado === true;
                });
                EspecialService.CambiarEstadoEmpresa(EmpresaBorrar, function (response) {
                    if (response.success == true) {
                        EspecialService.ConsultarEmpresas(function (response) {
                            if (response.success == true) {
                                $scope.datalistsE = response.datos;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalistsE.length / $scope.pageSize);
                                };
                                $scope.Datos = $scope.datalistsE;
                            }
                        });
                    }
                });
            };

            $scope.Modificar4 = function (id, ini, fin) {
                eliminar = 0;


                EspecialService.ModificarProgramacion(id, function (response) {

                    if ($rootScope.globals.currentUser.tipousuario == 5) {
                        $('#btn5').click(function () {
                            $("#ModalEditarProgramacion").modal("hide");
                        });
                    } else {
                        if (response.success == true) {

                            $scope.Programacion.Id = response.Programacion.Id;
                            $scope.Programacion.Fecha_Inicio = response.Programacion.Fecha_Inicio;
                            $scope.Programacion.Fecha_Final = response.Programacion.Fecha_Final;
                            $scope.Programacion.Hora_Inicio = response.Programacion.Hora_Inicio;
                            $scope.Programacion.Hora_Final = response.Programacion.Hora_Final
                            $scope.Programacion.Num_Ficha = response.Programacion.Num_Ficha;
                            $scope.Programacion.Instructor = response.Programacion.Instructor;
                            $scope.Programacion.Empresa = response.Programacion.Empresa;
                            $scope.Programacion.Programa = response.Programacion.Programa;
                            $scope.Programacion.Tipo_Curso = response.Programacion.Tipo_Curso;

                            $('#fichaEdit').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });

                            $('#instrucEdit').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });

                            $('#tipoCE').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });

                            $('#selectProgramaE').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });

                            $('#empresaEdit').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });

                            $('.datetimepickerFEdit').datetimepicker({
                                useCurrent: false,
                                format: 'YYYY/MM/DD',
                                locale: 'es',

                            });

                            $('.datetimepickerFFEdit').datetimepicker({
                                useCurrent: false,
                                format: 'YYYY/MM/DD',
                                locale: 'es',
                            });

                            $('.datetimepickerFEdit').on('dp.change', function (e) {
                                var fecha = new Date($('.datetimepickerFEdit').val());
                                $('.datetimepickerFFEdit').data("DateTimePicker").minDate(fecha);
                            });

                            $('#inicialEdit').val(response.Programacion.Hora_Inicio);
                            $('#finalEdit').val(response.Programacion.Hora_Final);

                            setTimeout(function () {
                                $('#fichaEdit').val($scope.Programacion.Num_Ficha).trigger("change");
                                $('#instrucEdit').val($scope.Programacion.Instructor).trigger("change");
                                $('#empresaEdit').val($scope.Programacion.Empresa).trigger("change");
                                $('#selectProgramaE').val($scope.Programacion.Programa).trigger("change");
                                $('#tipoCE').val($scope.Programacion.Tipo_Curso).trigger("change");
                            }, 200);

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
                            if (response.ds.Parametro20 == "true") {
                                $("#6Edit").prop('checked', true);
                                $scope.Dias.Sabado = true;
                            } else {
                                $("#6Edit").prop('checked', false);
                                $scope.Dias.Sabado = false;
                            }
                            var NombreInstructo = "";
                            var Ficha = "";
                            var Empresa = "";

                            $.each($scope.PInstructor, function (index, value) {
                                if (value.Id == response.Programacion.Instructor) {
                                    NombreInstructo = value.Nombre + " " + value.Apellido;
                                    return false;
                                }
                            });

                            $.each($scope.PEmpresa, function (index, value) {
                                if (value.NIT == response.Programacion.Empresa) {
                                    Empresa = value.Nombre;
                                    return false;
                                }
                            });

                            $.each($scope.PFichas, function (index, value) {
                                if (value.Parametro1 == response.Programacion.Num_Ficha) {
                                    Ficha = value.Parametro2;
                                    return false;
                                }
                            });

                            $('#nameInstruc').text(NombreInstructo);
                            $('#TextIni').text(moment(response.Programacion.Fecha_Inicio).lang("es").format('dddd D [de] MMMM [del] YYYY'));
                            $('#TextFin').text(moment(response.Programacion.Fecha_Final).lang("es").format('dddd D [de] MMMM [del] YYYY'));
                            $('#TextHIni').text(response.Programacion.Hora_Inicio);
                            $('#TextHFin').text(response.Programacion.Hora_Final);
                            $('#TextFi').text(Ficha);
                            $('#TextEm').text(Empresa);
                            $('#TextProg').text(response.Programacion.Programa);
                            $('#TextCurso').text(response.Programacion.Tipo_Curso);
                            $('#InfoProg').show();
                            $('#ProgramacionE').hide();
                            $('#btnEditarProg').text('Editar');
                            eliminar = response.Programacion.Id;
                            $('#btnEliminarProg').removeAttr("disabled");
                            $('#btnGuardarProg').attr("disabled", true);
                            $("#ModalEditarProgramacion").modal("show");
                        }
                    }

                });

            };

            $('#btnEliminarProg2').click(function () {
                bootbox.confirm({
                    title: "Confirmación",
                    message: "¿Está seguro que desea inhabilitar el registro?",
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
                            $scope.inhabilitarProgramacion();
                        }
                    }
                });
            });

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

            $scope.GuardarModificacionProgramacion = function () {
                $scope.Programacion.Estado = true;
                $scope.Programacion.Fecha_Inicio = $('#Finicio').val();
                $scope.Programacion.Fecha_Final = $('#Ffinal').val();
                $scope.Programacion.Hora_Inicio = $('#inicial').val();
                $scope.Programacion.Hora_Final = $('#final').val();
                $scope.Programacion.Programa = $('#Fprograma').val();

                if ($scope.Programacion.Fecha_Inicio == null || $scope.Programacion.Fecha_Final == null || $scope.Programacion.Hora_Inicio == null || $scope.Programacion.Hora_Final == null || $scope.Programacion.Num_Ficha == null || $scope.Programacion.Instructor == null || $scope.Programacion.Empresa == null) {
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
                    D += ($scope.Dias.Sabado != false) ? "SABADO - " : "";
                    D += ($scope.Dias.Domingo != false) ? "DOMINGO - " : "";
                    var num = D.length;
                    var Cale = D.substring(0, num - 3);
                    $scope.Programacion.Dias = Cale;

                    EspecialService.GuardarModificacionProgramacion($scope.Programacion, function (response) {
                        if (response.success == true) {
                            $('#ModalEditarProgramacion').modal('hide');
                            $scope.VaciarCamposProgramacion();
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
                            EspecialService.ConsultarProgramacion(function (response) {
                                debugger;
                                if (response.success == true) {
                                    $scope.datalistsP = response.datos;
                                    $scope.ListaCompleta = response.datos;
                                    $scope.Datos = $scope.datalistsP;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsP.length / $scope.pageSize);
                                    };
                                    $('#borrarFiltro').attr("disabled", true);
                                    $scope.LimpiarCalendar();
                                    $scope.CalendarioVacio();
                                }
                            });
                        }
                    });
                }
            };

            $scope.filtrarProgramacion = function (IdPersona) {
                debugger;
                var Cedula;

                if ($rootScope.globals.currentUser.tipousuario == 5) {
                    cedula = $rootScope.globals.currentUser.idpersona;
                } else {
                    cedula = $('#instrucFil').val();
                }

                EspecialService.ConsultarProgramacionInstructor(cedula, function (response) {
                    if (response.success == true) {
                        $scope.LimpiarCalendar();
                        $('#ModalFiltrarProgramacion').modal('hide');
                        $('#borrarFiltro').attr("disabled", false);
                        $.each(response.datos, function (index, value) {
                            var Inicio = value.Parametro8.split('/');
                            var Fin = value.Parametro9.split('/');
                            var hoI = value.Parametro2.substring(0, 5);
                            var hoF = value.Parametro3.substring(0, 5);
                            var HoraInicio = hoI.split(':');
                            var HoraFin = hoF.split(':');
                            var ampm = value.Parametro2.substring(5, 10);
                            var ampm2 = value.Parametro3.substring(5, 10);
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
                            if (value.Parametro2 == "TODO EL DIA") {
                                allday = true;
                            }
                            var fecha1 = moment(value.Parametro8);
                            var fecha2 = moment(value.Parametro9);
                            var dias = fecha2.diff(fecha1, 'days');
                            var PDIas = value.Parametro7;
                            for (var i = 0; i <= dias; i++) {
                                var fecha = $scope.sumaFecha(i, value.Parametro8);
                                var fff = fecha.split('/');
                                var ff = fff[1] + "/" + fff[0] + "/" + fff[2];
                                var fecha2 = new Date(ff);
                                var StrDia = moment(fecha2).lang("es").format('dddd');

                                $scope.Calendario = function () {
                                    $scope.events.push({
                                        Id: value.Parametro1,
                                        title: value.Parametro5,
                                        start: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), inic, parseInt(HoraInicio[1])),
                                        end: new Date(parseInt(fff[2]), parseInt(fff[1]) - 1, parseInt(fff[0]), finc, parseInt(HoraFin[1])),
                                        allDay: false,
                                        backgroundColor: "#337ab7",
                                        borderColor: "blue",
                                        textColor: "#DFDFDF",
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
                                if (PDIas.indexOf("SÁBADO") >= 0) {
                                    if (StrDia == "sábado") {
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
                            events: $scope.events,
                            eventClick: function (event) {
                                var inicio = moment(event.FInicio).lang("es").format('dddd Do [de] MMMM [del] YYYY');
                                var fin = moment(event.FFin).lang("es").format('dddd Do [de] MMMM [del] YYYY');
                                $scope.Modificar4(event.Id, inicio, fin);
                            }
                        });
                    }
                });
            }

            $scope.BorarFiltro = function () {
                $('#borrarFiltro').attr("disabled", true);
                $scope.LimpiarCalendar();
                $scope.CalendarioVacio();
            };

            //funció para consultar Programación del istructor Autor: 1000Via
            if ($rootScope.globals.currentUser.tipousuario == 5) {
                $("tabEmpresas1").hide();
                $("#btn2").hide();
                $("#tabEmpresas").hide();
                $(".menuPE").css("display", "none");
                $(".menuInstruc").css("display", "none");
                $(".RegistrarProgramacion").css("display", "none");
                $(".GenerarReporte").css("display", "none");
                $("#btnReporte").css("display", "none");
                $(".ModalFiltrarProgramacion").css("display", "none");
                $(".tabocult").css("display", "none");
                $("#tabprogramacion").css("display", "block");
                $("#excel").css("display", "none");
                $("#eliminar").css("display", "none");
                //$("#transversal").css("display", "none");
                //$("#borrarFiltro").css("display", "none");
                //$("#boton").css("display", "none");              
                $scope.LimpiarCalendar();

                var Nombre = $rootScope.globals.currentUser.nombre;
                var Apellidos = $rootScope.globals.currentUser.apellido;
                var NombreCompleto = Nombre + ' ' + Apellidos;


                $scope.LimpiarCalendar();
                $("#btn2").show();
                $('#tabInstructores').hide();
                $('#tabPrograma').hide();
                $('#tabEmpresas').hide();
                $('#tabFichas').hide();
                $('#tabProgramacion').show();
                $('#Buscar2').hide();
                $('#Buscar').hide();
                $('#Buscar3').hide();
                $('#Buscar4').hide();
                $scope.curPage = 0;
                $('#borrarFiltro').attr("disabled", true);
                $scope.CalendarioVacio();

                var IdPersona = $rootScope.globals.currentUser.idpersona;
                $scope.filtrarProgramacion(IdPersona);

                $('#btn5').click(function () {
                    $scope.filtrarProgramacion($rootScope.globals.currentUser.idpersona);
                });

            }

        }]);
