ProgramacionApp.controller('BasicasController',
    ['$scope', '$rootScope', '$location', 'BasicasService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, BasicasService, $routeParams, $sce) {

            //Enrutamiento
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
            var eliminar;

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

            //navegacion del tab-Panes
            $('#btn1').click(function () {
                $scope.datalists = null;
                $('#tabInstructores').show();
                $('#tabEmpresas').hide();
                $('#tabPrograma').hide();
                $('#tabProgramacion').hide();
                $('#tabFichas').hide();
                $('#tabProgramaciones').hide();
                $('#tabInstituciones').hide();
                $('#calendar').fullCalendar('destroy');
                $scope.cargarInstructor();
                $scope.curPage = 0;
            });

            $('#btn2').click(function () {
                $scope.datalists = null;
                $scope.cargarEmpresa();
                $('#tabInstructores').hide();
                $('#tabPrograma').hide();
                $('#tabEmpresas').show();
                $('#tabProgramacion').hide();
                $('#tabFichas').hide();
                $('#tabInstituciones').hide();
                $('#tabProgramaciones').hide();
                $('#calendar').fullCalendar('destroy');
                $scope.curPage = 0;
            });

            $('#btn3').click(function () {
                $scope.datalists = null;
                $scope.cargarPrograma();
                $('#tabInstructores').hide();
                $('#tabPrograma').show();
                $('#tabEmpresas').hide();
                $('#tabProgramacion').hide();
                $('#tabInstituciones').hide();
                $('#tabFichas').hide();
                $('#tabProgramaciones').hide();
                $('#calendar').fullCalendar('destroy');
                $scope.curPage = 0;
            });

            $('#btn4').click(function () {
                $scope.datalists = null;
                //$scope.cargarFichas();
                $('#tabInstructores').hide();
                $('#tabPrograma').hide();
                $('#tabEmpresas').hide();
                $('#tabProgramacion').hide();
                $('#tabProgramaciones').hide();
                $('#tabInstituciones').hide();
                $('#tabFichas').show();
                $('#calendar').fullCalendar('destroy');
                setTimeout(function () {
                    BasicasService.SelectProgramas(function (response) {
                        if (response.success == true) {
                            if (response.success == true) {
                                $scope.Programa = response.datos;
                            }
                        }
                    });

                }, 200)
                $scope.curPage = 0;
                $scope.cargarFichas();
            });

            $('#btn5').click(function () {
                $('#Buscar2').hide();
                $('#Buscar').hide();
                $('#Buscar3').hide();
                $('#Buscar4').hide();
                $('#BuscarI').hide();
                $scope.LimpiarCalendar();
                $('#tabInstructores').hide();
                $('#tabPrograma').hide();
                $('#tabEmpresas').hide();
                $('#tabFichas').hide();
                $('#tabProgramaciones').hide();
                $('#tabProgramacion').show();
                $('#tabInstituciones').hide();
                $scope.curPage = 0;
                $('#borrarFiltro').attr("disabled", true);
                $scope.CalendarioVacio();
            });

            $("#btnI").click(function () {
                $('#Buscar2').hide();
                $('#Buscar').hide();
                $('#Buscar3').hide();
                $('#Buscar4').hide();
                $('#BuscarI').show();
                $('#tabInstructores').hide();
                $('#tabPrograma').hide();
                $('#tabEmpresas').hide();
                $('#tabFichas').hide();
                $('#tabProgramaciones').hide();
                $('#tabProgramacion').hide();
                $('#tabInstituciones').show();
                $scope.cargarInstituciones();
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
                    //    var inicio = moment(event.FInicio).lang("es").format('dddd D [de] MMMM [del] YYYY');
                    //    var fin = moment(event.FFin).lang("es").format('dddd D [de] MMMM [del] YYYY');
                    //    $scope.Modificar4(event.Id, inicio, fin);
                    //}
                });
                setTimeout(function () {
                    BasicasService.ConsultarFichas(function (response) {
                        if (response.success == true) {
                            $scope.PFichas = response.datos;
                        }
                    });
                    BasicasService.ConsultarInstructores(function (response) {
                        if (response.success == true) {
                            $scope.PInstructor = response.datos;
                        }
                    });
                }, 300);
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
                Telefono_Encargado: ""
            };

            $scope.Instituciones = {
                Id: "",
                Nombre: "",
                Direccion: "",
                Email: "",
                Telefono_Institucion: "",
                Encargado: "",
                Telefono_Encargado: "",
                Estado: true
            };

            $scope.Programacion = {
                Id: "",
                Fecha_Inicio: "",
                Fecha_Final: "",
                Hora_Inicio: "",
                Hora_Final: "",
                Num_Ficha: "",
                Instructor: "",
                Lugar: "",
                Desc_Lugar: "",
                Estado: true,
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

            BasicasService.ConsultarInstructores(function (response) {
                $('#Buscar2').hide();
                $('#Buscar').show();
                $('#Buscar3').hide();
                $('#Buscar4').hide();
                $('#Buscar5').hide();
                $('#BuscarI').hide();
                if (response.success == true) {
                    $scope.datalistsI = response.datos;
                    $scope.ListaCompleta = response.datos;
                    $scope.numberOfPages = function () {
                        return Math.ceil($scope.datalistsI.length / $scope.pageSize);
                    };
                    //setTimeout(function () {
                    //    $scope.cargarFichas();
                    //}, 500);
                }
            });

            //Limpia los datos del fullcalenar----------------------------------------------------------------------
            $scope.LimpiarCalendar = function () {

                $('#calendar').fullCalendar('removeEventSource', $scope.events);
                $('#calendar').fullCalendar('refetchEvents');
                $('#calendar').fullCalendar('destroy');
                $scope.events = [];
            };

            //funciones para limpiar los campos
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
                setTimeout(function () {
                    $('#listas').val("").trigger("change");
                    $('#1listas').val("").trigger("change");
                }, 100);
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

            $scope.VaciarCamposInstitucion = function () {

                $scope.Instituciones.Nombre = "";
                $scope.Instituciones.Direccion = "";
                $scope.Instituciones.Email = "";
                $scope.Instituciones.Telefono_Institucion = "";
                $scope.Instituciones.Encargado = "";
                $scope.Instituciones.Telefono_Encargado = "";

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
                $scope.Programacion.Lugar = "";
                $scope.Programacion.Desc_Lugar = "";
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
                    $('#empresa').val("").trigger("change");
                    $("#Lugar").val("").trigger("change");
                    $("#LEmp").val("").trigger("change");
                    $("#LInst").val("").trigger("change");
                }, 100);
            };

            //Funciòn para consultar las areas
            BasicasService.ConsultarAreas(function (response) {
                if (response.success == true) {
                    $scope.Areas = response.datos;
                }
            });

            //funciones para cargar las tablas
            $scope.cargarEmpresa = function () {
                $('#Buscar2').show();
                $('#Buscar').hide();
                $('#BuscarI').hide();
                $('#Buscar3').hide();
                $('#Buscar4').hide();
                BasicasService.ConsultarEmpresas(function (response) {
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
                $('#BuscarI').hide();
                $('#Buscar3').show();
                $('#Buscar4').hide();
                BasicasService.ConsultarProgramas(function (response) {
                    if (response.success == true) {
                        $scope.datalistsPg = response.datos;
                        $scope.ListaCompleta = response.datos;
                        $scope.Datos = $scope.datalistsPg;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsPg.length / $scope.pageSize);
                        };

                    }
                });
            };

            $scope.cargarInstructor = function () {
                BasicasService.ConsultarInstructores(function (response) {
                    $('#Buscar2').hide();
                    $('#Buscar').show();
                    $('#BuscarI').hide();
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
            };

            $scope.cargarFichas = function () {
                BasicasService.ConsultarFichas(function (response) {
                    $('#Buscar2').hide();
                    $('#Buscar').hide();
                    $('#BuscarI').hide();
                    $('#Buscar3').hide();
                    $('#Buscar4').show();
                    if (response.success == true) {
                        $scope.datalistsF = response.datos;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsF.length / $scope.pageSize);
                        };
                    }
                });
            };

            $scope.cargarInstituciones = function () {
                BasicasService.ConsultarInstituciones(function (response) {
                    if (response.success) {
                        $scope.datalistsIns = response.datos;
                        $scope.ListaCompleta = response.datos;
                        $scope.Datos = $scope.datalistsIns;
                        $scope.numberOfPages = function () {
                            return Math.ceil($scope.datalistsIns.length / $scope.pageSize);
                        };
                    }
                });
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

            $scope.agregarRegistro2 = function () {
                $scope.VaciarCamposEmpresa();
                $('#ModalEmpresa').modal('show');
            };

            $scope.agregarRegistroI = function () {
                $scope.VaciarCamposInstitucion();
                $('#ModalInstitucion').modal('show');
            };

            $scope.agregarRegistro3 = function () {
                $scope.VaciarCamposFicha();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $('#ModalFicha').modal('show');
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
                //BasicasService.SelectProgramas(function (response) {
                //    if (response.success == true) {
                //        if (response.success == true) {
                //            $scope.Programa = response.datos;
                //        }
                //    }
                //});
            };

            $scope.ModalProgramacion = function () {
                $scope.VaciarCamposProgramacion();
                $("#DivLugar").hide();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                BasicasService.ConsultarInstructores(function (response) {
                    //debugger
                    if (response.success == true) {
                        $scope.PInstructorF = response.datos;
                    }
                });
                $('#ModalProgramacion').modal('show');
            };

            $scope.ModalFiltrarProgramacion = function () {
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                BasicasService.ConsultarInstructores(function (response) {
                    if (response.success == true) {
                        $scope.PInstructorF = response.datos;
                    }
                });
                $('#ModalFiltrarProgramacion').modal('show');
            }

            //Función para realizar el filtro sobre la tabla Instructores
            $scope.Filtrar = function (e) {
                var Busqueda = $("#Buscar").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    BasicasService.ConsultarInstructores(function (response) {
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

            //Función para realizar el filtro sobre la tabla empresa
            $scope.Filtrar2 = function (e) {
                var Busqueda = $("#Buscar2").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    BasicasService.ConsultarEmpresas(function (response) {
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
                var EMpresa = [];
                $scope.datalistsE = $scope.ListaCompleta;
                EMpresa = $scope.datalistsE.filter(function (item) {


                    if (exp.test(item.NIT) || exp.test(item.NIT)) {

                        return item;
                    }

                    else if (exp.test(item.Nombre.toLowerCase()) || exp.test(item.Nombre.toUpperCase())) {
                        return item;
                    }

                    else if (exp.test(item.Encargado.toLowerCase()) || exp.test(item.Encargado.toUpperCase())) {
                        return item;
                    }


                });
                $scope.datalistsE = EMpresa;
                //Variable para setear la paginación 
                $scope.curPage = 0;
            };

            //Función  para filtrar la tabla Programas
            $scope.Filtrar3 = function (e) {
                var Busqueda = $("#Buscar3").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    BasicasService.ConsultarProgramas(function (response) {
                        if (response.success == true) {
                            $scope.datalistsPg = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.Datos = $scope.datalistsPg;
                            $scope.numberOfPages = function () {
                                return Math.ceil($scope.datalistsPg.length / $scope.pageSize);
                            };
                        }
                    });
                }
                var Programa = [];
                $scope.datalistsPg = $scope.ListaCompleta;
                Programa = $scope.datalistsPg.filter(function (item) {

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
                $scope.datalistsPg = Programa;
                //Variable para setear la paginación 
                $scope.curPage = 0;


            };

            //Función  para filtrar la tabla Fichas
            $scope.Filtrar4 = function (e) {
                var Busqueda = $("#Buscar4").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    BasicasService.ConsultarFichas(function (response) {
                        if (response.success == true) {
                            $scope.datalistsF = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.Datos = $scope.datalistsF;
                            $scope.numberOfPages = function () {
                                return Math.ceil($scope.datalistsF.length / $scope.pageSize);
                            };
                        }
                    });
                }
                var Programa = [];
                //$scope.datalistsF = $scope.ListaCompleta;
                Programa = $scope.datalistsF.filter(function (item) {

                    if (exp.test(item.Parametro8.toLowerCase()) || exp.test(item.Parametro8.toLowerCase())) {
                        return item;
                    }
                    else if (exp.test(item.Parametro2.toLowerCase()) || exp.test(item.Parametro2.toUpperCase())) {
                        return item;
                    }

                    else if (exp.test(item.Parametro4.toLowerCase()) || exp.test(item.Parametro4.toUpperCase())) {
                        return item;
                    }
                    else if (exp.test(item.Parametro9.toLowerCase()) || exp.test(item.Parametro9.toUpperCase())) {
                        return item;
                    }


                });
                $scope.datalistsF = Programa;
                //Variable para setear la paginación 
                $scope.curPage = 0;


            };

            //Función  para filtrar la tabla Programaciones
            $scope.Filtrar5 = function (e) {
                var Busqueda = $("#Buscar5").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    BasicasService.ConsultarProgramacion(function (response) {
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

            $scope.FiltrarI = function (e) {
                var Busqueda = $("#BuscarI").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    BasicasService.ConsultarInstituciones(function (response) {
                        if (response.success == true) {
                            $scope.datalistsIns = response.datos;
                            $scope.ListaCompleta = response.datos;
                            $scope.Datos = $scope.datalistsIns;
                            $scope.numberOfPages = function () {
                                return Math.ceil($scope.datalistsIns.length / $scope.pageSize);
                            };
                        }
                    });
                }
                var Institucion = [];
                $scope.datalistsIns = $scope.ListaCompleta;
                Institucion = $scope.datalistsIns.filter(function (item) {

                    if (exp.test(item.Nombre.toLowerCase()) || exp.test(item.Nombre.toLowerCase())) {

                        return item;
                    }
                    else if (exp.test(item.Encargado.toLowerCase()) || exp.test(item.Encargado.toUpperCase())) {

                        return item;
                    }

                });
                $scope.datalistsIns = Institucion;
                //Variable para setear la paginación 
                $scope.curPage = 0;


            };

            //Función para registrar un instructor
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
                    BasicasService.GuardarInstructor($scope.Instructor, function (response) {
                        if (response.success == true) {
                            $scope.VaciarCampos();

                            $("#ModalInstructor").modal("hide");
                            BasicasService.ConsultarInstructores(function (response) {
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

            //Función para confirmar el cambio del estado del instructor de activo a inactivo
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

            //Función para cambiar el estado de los instructores
            $scope.inhabilitarInstructor = function () {
                var InstructorBorrar = $scope.datalistsI.filter(function (item) {
                    return item.Seleccionado === true;
                });
                BasicasService.CambiarEstado(InstructorBorrar, function (response) {
                    if (response.success == true) {
                        BasicasService.ConsultarInstructores(function (response) {
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

            //Función para para el editar un instructor
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
                    BasicasService.ModificarInstructor(InstructorBorrar, function (response) {
                        if (response.success == true) {
                            $scope.Instructor.IdInstructor = response.Instructor.IdInstructor;
                            $scope.Instructor.Nombre = response.Instructor.Nombre;
                            $scope.Instructor.Apellido = response.Instructor.Apellido;
                            $scope.Instructor.Cedula = parseInt(response.Instructor.Cedula);
                            $scope.Instructor.Email = response.Instructor.Email;
                            $scope.Instructor.Telefono = parseInt(response.Instructor.Telefono);
                            $scope.Instructor.IdArea = response.Instructor.IdArea;
                            $('.select2').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });
                            if (response.Instructor.TipoInstructor == 2) {
                                $scope.Instructor.TipoInstructor = true;
                            } else {
                                $scope.Instructor.TipoInstructor = false;
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
                    BasicasService.GuardarModificacionInstructor($scope.Instructor, function (response) {
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
                            BasicasService.ConsultarInstructores(function (response) {
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
                    });
                }
            }

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
                    BasicasService.GuardarEmpresa($scope.Empresa, function (response) {
                        if (response.success == true) {
                            $scope.VaciarCamposEmpresa();
                            $("#ModalEmpresa").modal("hide");
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
                            BasicasService.ConsultarEmpresas(function (response) {
                                if (response.success == true) {

                                    $scope.datalistsE = response.datos;
                                    $scope.ListaCompleta = response.datos;
                                    $scope.Datos = $scope.datalistsE;
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

            //Función para cambiar el estado de las empresas
            $scope.inhabilitarEmpresa = function () {
                var EmpresaBorrar = $scope.datalistsE.filter(function (item) {
                    return item.Seleccionado === true;
                });
                BasicasService.CambiarEstadoEmpresa(EmpresaBorrar, function (response) {
                    if (response.success == true) {
                        BasicasService.ConsultarEmpresas(function (response) {
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
                    BasicasService.ModificarEmpresa(EmpresaBorrar, function (response) {
                        if (response.success == true) {
                            $scope.Empresa.NIT = response.Instructor.NIT;
                            $scope.Empresa.Nombre = response.Instructor.Nombre;
                            $scope.Empresa.Direccion = response.Instructor.Direccion;
                            $scope.Empresa.Email = response.Instructor.Email;
                            $scope.Empresa.Telefono = parseInt(response.Instructor.Telefono);
                            $scope.Empresa.Encargado = parseInt(response.Instructor.Encargado);
                            $scope.Empresa.Telefono_Encargado = parseInt(response.Instructor.Telefono_Encargado);
                            $("#ModalEditarEmpresa").modal("show");
                        }
                    });
                }
            };

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
                    BasicasService.GuardarModificacionEmpresa($scope.Empresa, function (response) {
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
                            BasicasService.ConsultarEmpresas(function (response) {
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
                BasicasService.GuardarFicha($scope.Ficha, function (response) {
                    if (response.success) {
                        $("#ModalFicha").modal("hide");
                        $scope.VaciarCamposFicha();
                        BasicasService.ConsultarFichas(function (response) {
                            if (response.success) {
                                if (response.success == true) {
                                    $scope.datalistsF = response.datos;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsF.length / $scope.pageSize);
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
                var UsariosBorrar = $scope.datalistsF.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (UsariosBorrar.length == 0 || UsariosBorrar.length > 1) {

                    bootbox.dialog({
                        title: "Inhabilitar",
                        message: "Debe por lo menos seleccionar una ficha",
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

                var FichaBorrar = $scope.datalistsF.filter(function (item) {
                    return item.Seleccionado === true;
                });
                BasicasService.BorrarFicha(FichaBorrar, function (response) {

                    if (response.success == true) {
                        BasicasService.ConsultarFichas(function (response) {
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
                                $scope.datalistsF = response.datos;
                                $scope.ListaCompleta = response.datos;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalistsF.length / $scope.pageSize);
                                };
                            }
                        });
                    }

                });

            };

            //funcion para modificar una ficha
            $scope.Modificar3 = function () {

                var FichaModificar = $scope.datalistsF.filter(function (item) {
                    return item.Seleccionado === true;

                });

                if (FichaModificar.length == 1) {

                    BasicasService.ModificarFicha(FichaModificar, function (response) {

                        if (response.success == true) {

                            $scope.Ficha.Id = response.Ficha.Id;
                            $scope.Ficha.Num_Ficha = parseInt(response.Ficha.Num_Ficha);
                            $scope.Ficha.Programa = response.Ficha.Programa;
                            $scope.Ficha.Num_Aprendices = parseInt(response.Ficha.Num_Aprendices);
                            $scope.Ficha.Fecha_Inicio = response.Ficha.Fecha_Inicio;
                            $scope.Ficha.Fecha_Fin = response.Ficha.Fecha_Fin;
                            //$('.select2').select2({
                            //    placeholder: "Seleccione una opción...",
                            //    allowClear: true
                            //});
                            setTimeout(function () {
                                $('#ListaProgramas1').val($scope.Ficha.Programa).trigger("change");
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

            $scope.GuardarInstitucion = function () {
                $scope.Instituciones.Estado = true;
                BasicasService.GuardarInstitucion($scope.Instituciones, function (response) {
                    if (response.success) {
                        BasicasService.ConsultarInstituciones(function (response) {
                            if (response.success) {
                                $scope.datalistsIns = response.datos;
                                $scope.ListaCompleta = response.datos;
                                $scope.Datos = $scope.datalistsIns;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalistsIns.length / $scope.pageSize);
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
                                $("#ModalInstitucion").modal("hide");
                            }
                        });
                    } else {
                        bootbox.dialog({
                            title: "Información",
                            message: "La institución ya se encuentra registrada",
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

            $scope.ModificarI = function () {
                var Institucion = $scope.datalistsIns.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (Institucion.length == 1) {
                    $scope.Instituciones.Id = Institucion[0].Id;
                    $scope.Instituciones.Nombre = Institucion[0].Nombre;
                    $scope.Instituciones.Direccion = Institucion[0].Direccion;
                    $scope.Instituciones.Email = Institucion[0].Email;
                    $scope.Instituciones.Telefono_Institucion = parseInt(Institucion[0].Telefono_Institucion);
                    $scope.Instituciones.Encargado = Institucion[0].Encargado;
                    $scope.Instituciones.Telefono_Encargado = parseInt(Institucion[0].Telefono_Encargado);
                    $("#ModalInstitucionesEdit").modal("show");
                } else {
                    bootbox.dialog({
                        title: "Editar",
                        message: "Debe seleccionar una Institución",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                }
            };

            $scope.GuardarModificacionInstitucion = function () {
                $scope.Instituciones.Estado = true;
                BasicasService.GuardarModificacionInstitucion($scope.Instituciones, function (response) {
                    if (response.success) {
                        BasicasService.ConsultarInstituciones(function (response) {
                            if (response.success) {
                                $scope.datalistsIns = response.datos;
                                $scope.ListaCompleta = response.datos;
                                $scope.Datos = $scope.datalistsIns;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalistsIns.length / $scope.pageSize);
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
                                $("#ModalInstitucionesEdit").modal("hide");
                            }
                        });
                    }
                });
            };

            $scope.CambiarEstadoSeleccionadosI = function () {
                var Institucion = $scope.datalistsIns.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (Institucion.length == 1) {
                    $("#modalInhabilitarInstitucion").modal("show");
                } else {
                    bootbox.dialog({
                        title: "Editar",
                        message: "Debe seleccionar una Institución",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                }
            };

            $scope.inhabilitarInsti = function () {
                var Institucion = $scope.datalistsIns.filter(function (item) {
                    return item.Seleccionado === true;
                });
                BasicasService.inhabilitarInsti(Institucion, function (response) {
                    if (response.success) {
                        BasicasService.ConsultarInstituciones(function (response) {
                            if (response.success) {
                                $scope.datalistsIns = response.datos;
                                $scope.ListaCompleta = response.datos;
                                $scope.Datos = $scope.datalistsIns;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalistsIns.length / $scope.pageSize);
                                };
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
                                $("#modalInhabilitarInst").modal("show");
                            }
                        });
                    }
                });
            };

            $scope.mostrarDescLugar = function () {
                var Lugar = $("#Lugar").val();
                setTimeout(function () {
                    $scope.Programacion.Desc_Lugar = "";
                    $("#LEmp").val("").trigger("change");
                    $("#LInst").val("").trigger("change");
                }, 100);
                if (Lugar == "") {
                    $("#DivLugar").hide();
                } else if (Lugar == "EMPRESA") {
                    $("#DivLugar").show();
                    $("#DivEmpresa").show();
                    $("#DivInstitucion").hide();
                    $("#DivAmbiente").hide();
                    BasicasService.ConsultarEmpresas(function (response) {
                        if (response.success == true) {
                            $scope.CdatalistsE = response.datos;
                        }
                    });
                } else if (Lugar == "INSTITUCION") {
                    $("#DivLugar").show();
                    $("#DivEmpresa").hide();
                    $("#DivInstitucion").show();
                    $("#DivAmbiente").hide();
                    BasicasService.ConsultarInstituciones(function (response) {
                        if (response.success) {
                            $scope.CdatalistsIns = response.datos;
                        }
                    });
                } else {
                    $("#DivLugar").show();
                    $("#DivEmpresa").hide();
                    $("#DivInstitucion").hide();
                    $("#DivAmbiente").show();
                }
            };

            $scope.mostrarDescLugar2 = function () {
                var Lugar = $("#Lugar2").val();
                setTimeout(function () {
                    $scope.Programacion.Desc_Lugar = "";
                    $("#LEmp2").val("").trigger("change");
                    $("#LInst2").val("").trigger("change");
                }, 100);
                if (Lugar == "") {
                    $("#DivLugar2").hide();
                } else if (Lugar == "EMPRESA") {
                    $("#DivLugar2").show();
                    $("#DivEmpresa2").show();
                    $("#DivInstitucion2").hide();
                    $("#DivAmbiente2").hide();
                    BasicasService.ConsultarEmpresas(function (response) {
                        if (response.success == true) {
                            $scope.CdatalistsE = response.datos;
                        }
                    });
                } else if (Lugar == "INSTITUCION") {
                    $("#DivLugar2").show();
                    $("#DivEmpresa2").hide();
                    $("#DivInstitucion2").show();
                    $("#DivAmbiente2").hide();
                    BasicasService.ConsultarInstituciones(function (response) {
                        if (response.success) {
                            $scope.CdatalistsIns = response.datos;
                        }
                    });
                } else {
                    $("#DivLugar2").show();
                    $("#DivEmpresa2").hide();
                    $("#DivInstitucion2").hide();
                    $("#DivAmbiente2").show();
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

                BasicasService.GuardarModificacionFicha($scope.Ficha, function (response) {
                    if (response.success == true) {
                        $("#ModalEditarFicha").modal("hide");
                        $scope.VaciarCamposFicha();
                        BasicasService.ConsultarFichas(function (response) {

                            if (response.success == true) {

                                if (response.success == true) {
                                    $scope.datalistsF = response.datos;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil($scope.datalistsF.length / $scope.pageSize);
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

            $scope.GuardarProgramacion = function () {
                debugger;
                $scope.Programacion.Estado = true;
                $scope.Programacion.Fecha_Inicio = $('#Finicio').val();
                $scope.Programacion.Fecha_Final = $('#Ffinal').val();
                $scope.Programacion.Hora_Inicio = $('#inicial').val();
                $scope.Programacion.Hora_Final = $('#final').val();
                debugger;
                var x = $("#Finicio").val().split('/');
                var y = $("#Ffinal").val().split('/');

                var StartDate = x[1] + x[2] + x[0];
                var EndDate = y[1] + y[2] + y[0];


                if (StartDate >= EndDate) {
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


                if ($scope.Programacion.Fecha_Inicio == null || $scope.Programacion.Fecha_Final == null || $scope.Programacion.Hora_Inicio == null || $scope.Programacion.Hora_Final == null || $scope.Programacion.Num_Ficha == null || $scope.Programacion.Instructor == null) {
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
                    D += ($scope.Dias.Sabado != false) ? "SÁBADO - " : "";
                    D += ($scope.Dias.Domingo != false) ? "DOMINGO - " : "";
                    var num = D.length;
                    var Cale = D.substring(0, num - 3);
                    $scope.Programacion.Dias = Cale;

                    BasicasService.GuardarProgramacion($scope.Programacion, function (response) {
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
                            $scope.LimpiarCalendar();
                            setTimeout($scope.CalendarioVacio(), 200);
                        }
                    });
                }
            }

            $scope.Modificar4 = function (id, ini, fin) {
                eliminar = 0;
                BasicasService.ModificarProgramacion(id, function (response) {

                    if ($rootScope.globals.currentUser.tipousuario == 6) {
                        $('#btn5').click(function () {
                            $("#ModalEditarProgramacion").modal("hide");
                        });
                    } else {
                        if (response.success == true) {
                            $scope.Programacion.Id = response.Programacion.Id;
                            //$scope.Ficha.IdArea = response.Ficha.IdArea;
                            $scope.Programacion.Fecha_Inicio = response.Programacion.Fecha_Inicio;
                            $scope.Programacion.Fecha_Final = response.Programacion.Fecha_Final;
                            $scope.Programacion.Hora_Inicio = response.Programacion.Hora_Inicio;
                            $scope.Programacion.Hora_Final = response.Programacion.Hora_Final
                            $scope.Programacion.Num_Ficha = response.Programacion.Num_Ficha;
                            $scope.Programacion.Instructor = response.Programacion.Instructor;
                            $scope.Programacion.Empresa = response.Programacion.Empresa;
                            $scope.Programacion.Lugar = response.Programacion.Lugar;
                            $scope.Programacion.Desc_Lugar = response.Programacion.Desc_Lugar;

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

                            $('.datetimepickerF').on('dp.change', function (e) {
                                var fecha = new Date($('.datetimepickerF').val());
                                $('.datetimepickerFF').data("DateTimePicker").minDate(fecha);
                            });

                            $('.select2').select2({
                                placeholder: "Seleccione una opción...",
                                allowClear: true
                            });

                            $('#inicialEdit').val(response.Programacion.Hora_Inicio);
                            $('#finalEdit').val(response.Programacion.Hora_Final);

                            setTimeout(function () {
                                $('#fichaEdit').val($scope.Programacion.Num_Ficha).trigger("change");
                                $('#instrucEdit').val($scope.Programacion.Instructor).trigger("change");
                                $('#Lugar2').val($scope.Programacion.Lugar).trigger("change");
                            }, 100);

                            if (response.Programacion.Lugar == "") {
                                $("#DivLugar2").hide();
                            } else if (response.Programacion.Lugar == "EMPRESA") {
                                $("#DivLugar2").show();
                                $("#DivEmpresa2").show();
                                $("#DivInstitucion2").hide();
                                $("#DivAmbiente2").hide();
                                $('#TextDescL').text(response.Programacion.Desc_Lugar);
                                BasicasService.ConsultarEmpresas(function (response) {
                                    if (response.success == true) {
                                        $scope.CdatalistsE = response.datos;
                                    }
                                });
                                setTimeout(function () {
                                    $('#LEmp2').val(response.Programacion.Desc_Lugar).trigger("change");
                                    $('#LInst2').val("").trigger("change");
                                    $('#NumAmb2').val("");
                                }, 100);
                            } else if (response.Programacion.Lugar == "INSTITUCION") {
                                $("#DivLugar2").show();
                                $("#DivEmpresa2").hide();
                                $("#DivInstitucion2").show();
                                $("#DivAmbiente2").hide();
                                $('#TextDescL').text(response.Programacion.Desc_Lugar);
                                BasicasService.ConsultarInstituciones(function (response) {
                                    if (response.success) {
                                        $scope.CdatalistsIns = response.datos;
                                    }
                                });
                                setTimeout(function () {
                                    $('#LInst2').val(response.Programacion.Desc_Lugar).trigger("change");
                                    $('#LEmp2').val("").trigger("change");
                                    $('#NumAmb2').val("");
                                }, 1000);
                            } else {
                                $("#DivLugar2").show();
                                $("#DivEmpresa2").hide();
                                $("#DivInstitucion2").hide();
                                $("#DivAmbiente2").show();
                                $('#TextDescL').text("Ambiente - " + response.Programacion.Desc_Lugar);
                                setTimeout(function () {
                                    $('#LEmp2').val("").trigger("change");
                                    $('#LInst2').val("").trigger("change");
                                    $('#NumAmb2').val(response.Programacion.Desc_Lugar);
                                }, 100);
                            }

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
                            if (response.ds.Parametro21 == "true") {
                                $("#6Edit").prop('checked', true);
                                $scope.Dias.Domingo = true;
                            } else {
                                $("#6Edit").prop('checked', false);
                                $scope.Dias.Domingo = false;
                            }

                            $.each($scope.PInstructor, function (index, value) {
                                if (value.Cedula == response.Programacion.Instructor) {
                                    NombreInstructo = value.Nombre + " " + value.Apellido;
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
                            $('#spnLugar').text(response.Programacion.Lugar + ": ");
                            $('#TextFi').text(Ficha);
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

            $('#btnEliminarProg').click(function () {
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
                $scope.Programacion.Fecha_Inicio = $('#FinicioPEdit').val();
                $scope.Programacion.Fecha_Final = $('#FfinalPEdit').val();
                $scope.Programacion.Hora_Inicio = $('#inicialEdit').val();
                $scope.Programacion.Hora_Final = $('#finalEdit').val();
                var x = $("#FinicioPEdit").val().split('/');
                var y = $("#FfinalPEdit").val().split('/');


                var StartDate = x[1] + x[2] + x[0];
                var EndDate = y[1] + y[2] + y[0];

                if (StartDate >= EndDate) {
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

                if ($scope.Dias.Lunes == false && $scope.Dias.Martes == false && $scope.Dias.Miercoles == false && $scope.Dias.Jueves == false && $scope.Dias.Viernes == false && $scope.Dias.Sabado == false && $scope.Dias.Domingo == false) {
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
                    BasicasService.GuardarModificacionProgramacion($scope.Programacion, function (response) {

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
                            $scope.LimpiarCalendar();
                            setTimeout($scope.CalendarioVacio(), 200);
                        }
                    });
                }
                $scope.boton6();
            };

            $scope.inhabilitarProgramacion = function () {

                BasicasService.BorrarProgramacion(eliminar, function (response) {
                    $('#ModalEditarProgramacion').modal('hide');
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

            $scope.filtrarProgramacion = function (IdPersona) {
                debugger;
                var cedula;
                if ($rootScope.globals.currentUser.tipousuario == 6) {
                    cedula = $rootScope.globals.currentUser.idpersona;
                } else {
                    cedula = $('#instrucFil').val();
                }

               //var cedula = $('#instrucFil').val();
                BasicasService.ConsultarProgramacionInstructor(cedula, function (response) {
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
            if ($rootScope.globals.currentUser.tipousuario == 6) {              
                $(".menuBasica").css("display", "none");
                $("#tabInstructores").css("display", "none");
                $scope.LimpiarCalendar();

                var Nombre = $rootScope.globals.currentUser.nombre;
                var Apellido = $rootScope.globals.currentUser.apellido;
                var NombreCompleto = Nombre + ' ' + Apellido;
                var Cedula = $rootScope.globals.currentUser.cedula;

                $scope.LimpiarCalendar();
                $('#tabInstructores').hide();
                $('#tabPrograma').hide();
                $('#tabEmpresas').hide();
                $('#tabFichas').hide();
                $('#tabProgramaciones').hide();
                $('#tabProgramacion').show();
                $('#tabInstituciones').hide();
                $scope.curPage = 0;
                $('#borrarFiltro').attr("disabled", true);
                $scope.CalendarioVacio();

                var IdPersona = $rootScope.globals.currentUser.idpersona;
                $scope.filtrarProgramacion(IdPersona);


                
            }

        }]);