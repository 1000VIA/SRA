ProgramacionApp.controller('ProgramaController',
    ['$scope', '$rootScope', '$location', 'ProgramaService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, ProgramaService, $routeParams, $sce) {


            $scope.curPage = 0;
            $scope.pageSize = 6;

            $scope.Programa = {
                IdPrograma: "",
                CodigoPrograma: "",
                Nivel: "",
                Version_Programa: "",
                NombrePrograma: "",
                Area: ""
            }

            ProgramaService.ConsultarProgramas(function (response) {
                if (response.success == true) {
                    $scope.datalistsProg = response.datos;
                    $scope.ListaCompleta = response.datos;
                    $scope.Datos = $scope.datalistsProg;
                    $scope.numberOfPages = function () {
                        return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
                    };
                }
            });

        $scope.VaciarCampos = function(){
            $scope.Programa.IdPrograma = "";
            $scope.Programa.CodigoPrograma = "";
            $scope.Programa.Nivel = "";
            $scope.Programa.Version_Programa = "";
            $scope.Programa.NombrePrograma = "";
            $scope.Programa.Area = "";
            setTimeout(function () {
                $("#nivel").val("").trigger("change");
                $("#listas").val("").trigger("change");
            }, 100);
        }

            $scope.agregarRegistro = function () {
                $scope.VaciarCampos();
                $('.select2').select2({
                    placeholder: "Seleccione una opción...",
                    allowClear: true
                });
                $('#ModalRegistrar').modal('show');
            };


            //Funciones para registrar
            $scope.GuardarPrograma = function () {
                ProgramaService.GuardarPrograma($scope.Programa, function (response) {
                    if (response.success == true) {
                        $scope.VaciarCampos();
                        $("#ModalRegistrar").modal("hide");
                        ProgramaService.ConsultarProgramas(function (response) {
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
                            message: "El código del programa ya se encuentra registrado",
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

            $scope.CambiarEstadoSeleccionados = function () {
                var ProgramaBorrar = $scope.datalistsProg.filter(function (item) {
                    return item.Seleccionado === true;
                });
                if (ProgramaBorrar.length != 1) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Debe seleccionar un Programa",
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

            //Funciones para cambair estados
            $scope.inhabilitarPrograma = function () {
                var ProgramaBorrar = $scope.datalistsProg.filter(function (item) {
                    return item.Seleccionado === true;
                });
                ProgramaService.CambiarEstado(ProgramaBorrar, function (response) {
                    if (response.success == true) {
                        ProgramaService.ConsultarProgramas(function (response) {
                            if (response.success == true) {
                                $scope.datalistsProg = response.datos;
                                $scope.numberOfPages = function () {
                                    return Math.ceil($scope.datalistsProg.length / $scope.pageSize);
                                };
                                $scope.Datos = $scope.datalistsProg;
                            }
                        });
                    }
                });
            };

            $scope.Modificar = function () {
                debugger;
                var Programa = $scope.datalistsProg.filter(function (item) {
                    return item.Seleccionado === true;
                });

                if (Programa.length != 1) {
                    bootbox.dialog({
                        title: "Información",
                        message: "Debe seleccionar un Programa",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                } else {
                    $('.select2').select2({
                        placeholder: "Seleccione una opción...",
                        allowClear: true
                    });
                    $scope.Programa.IdPrograma = Programa[0].IdPrograma;
                    $scope.Programa.CodigoPrograma = Programa[0].CodigoPrograma;
                    $scope.Programa.Nivel = Programa[0].Nivel;
                    $scope.Programa.Version_Programa = Programa[0].Version_Programa;
                    $scope.Programa.NombrePrograma = Programa[0].NombrePrograma;
                    $scope.Programa.Area = Programa[0].Area;
                    setTimeout(function () {
                        $("#nivel1").val(Programa[0].Nivel).trigger("change");
                        $("#listas1").val(Programa[0].Area).trigger("change");
                    }, 100);

                    $("#ModalEditar").modal("show");
                }
            };

            $scope.GuardarEdicionPrograma = function () {

                ProgramaService.GuardarEdicionPrograma($scope.Programa, function (response) {
                    if (response.success == true) {
                        $("#ModalEditar").modal("hide");
                        ProgramaService.ConsultarProgramas(function (response) {
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
            };

            //Funciones para filtrar las tablas
            $scope.FiltrarT = function (e) {
                var Busqueda = $("#BuscarT").val();
                var exp = new RegExp(Busqueda);
                if (Busqueda == "") {
                    ProgramaService.ConsultarInstructoresTodos(function (response) {
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

                    if (exp.test(item.CodigoPrograma) || exp.test(item.CodigoPrograma)) {

                        return item;
                    }

                    else if (exp.test(item.Nivel.toLowerCase()) || exp.test(item.Nivel.toUpperCase())) {
                        return item;
                    }

                    else if (exp.test(item.NombrePrograma.toLowerCase()) || exp.test(item.NombrePrograma.toUpperCase())) {
                        return item;
                    }
                    else if (exp.test(item.Area.toLowerCase()) || exp.test(item.Area.toUpperCase())) {
                        return item;
                    }

                });
                $scope.datalistsProg = Programa;
                //Variable para setear la paginación 
                $scope.curPage = 0;
            };

        }]);