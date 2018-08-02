ProgramacionApp.controller('FichasInstructorController',
    ['$scope', '$rootScope', '$location', 'FichasInstructorService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, FichasInstructorService, $routeParams, $sce) {

            $scope.curPage = 0;
            $scope.pageSize = 6;
            $scope.columGestion = false;

            FichasInstructorService.CargarFichasInstructor($rootScope.globals.currentUser.cedula, function (response) {
                if (response.success) {
                    $scope.datalistsFic = response.Datos;
                    $scope.ListaCompleta = response.Datos;
                    $scope.numberOfPages = function () {
                        return Math.ceil($scope.datalistsFic.length / $scope.pageSize);
                    };
                }
            });

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
                    if (FIcha[0].Etapa == "Productiva") {
                        $("#thgestion").show();
                        $scope.columGestion = true;
                    } else {
                        $("#thgestion").hide();
                        $scope.columGestion = false;
                    }
                    FichasInstructorService.verAprendices(FIcha[0].Id, function (response) {
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

            $("#ModalVerAprendices").on('hidden.bs.modal', function () {
                $("#trNoResult").remove();
                $scope.AprendiceFicha = null;
            });

            $scope.Alternativa = {
                Id: "",
                Aprendiz: "",
                Alternativa: "",
                Descripcion: ""
            };

            $scope.alternaticaPractica = function (Aprendiz) {
                FichasInstructorService.validarAlternativa(Aprendiz.Id, function (response) {
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
                        FichasInstructorService.ConsultarAlternativa(Aprendiz.Id, function (response) {
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
                FichasInstructorService.GuardarAlternativa($scope.Alternativa, function (response) {
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
                FichasInstructorService.GuardarAlternativaEdit($scope.Alternativa, function (response) {
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

        }]);