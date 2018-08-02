/// <reference path="Principal.js" />
// script.js

// create the module and name it scotchApp
var ProgramacionApp = angular.module('ProgramacionApp', ['ngRoute', 'ngCookies', 'ngNotify']);



// configure our routes
ProgramacionApp.config(function ($routeProvider) {
    $routeProvider

    // route for the home page

      //    .when('/Sede', {
      //        templateUrl: 'Views/SedeView.html',
      //        controller: 'SedeController'
      //    })
      //  .when('/Area', {
      //      templateUrl: 'Views/AreaView.html',
      //      controller: 'AreaController'
      //  })
        .when('/Instructor', {
            templateUrl: 'Views/InstructorView.html',
            controller: 'VirtualidadController'
        })
      //  .when('/Ficha', {
      //      templateUrl: 'Views/FichaView.html',
      //      controller: 'FichaController'
      //  })
      //  .when('/Competencia', {
      //      templateUrl: 'Views/CompetenciaView.html',
      //      controller: 'CompetenciaController'
      //  })
      //  .when('/Ambiente', {
      //      templateUrl: 'Views/AmbienteView.html',
      //      controller: 'AmbienteController'
      //  })
      //  .when('/Programacion', {
      //      templateUrl: 'Views/ProgramacionView.html',
      //      controller: 'ProgramacionController'
      //  })
      //  .when('/Coordinacion', {
      //      templateUrl: 'Views/CoordinacionView.html',
      //      controller: 'CoordinacionController'
      //  })
       .when('/Programa', {
           templateUrl: 'Views/ProgramaView.html',
           controller: 'ProgramaController'
       })
      // .when('/Resultado', {
      //     templateUrl: 'Views/ResultadoView.html',
      //     controller: 'ResultadoController'
      // })
      // .when('/Login', {
      //     templateUrl: 'Views/LoginView.html',
      //     controller: 'LoginController'
      // })

      //.when('/Solicitud', {
      //    templateUrl: 'Views/SolicitudView.html',
      //    controller: 'SolicitudController'
      //})
      //.when('/Administracion', {
      //    templateUrl: 'Views/AdministracionView.html',
      //    controller: 'AdministracionController'
      //})
    .when('/Login', {
                 templateUrl: 'Views/LoginView.html',
                 controller: 'LoginController'
             })
    .when('/Administracion/Especial', {
        templateUrl: 'Views/PEspecial.html',
        controller: 'EspecialController'
    })
    .when('/Administracion/Basicas', {
        templateUrl: 'Views/Basicas.html',
        controller: 'BasicasController'
    })
    .when('/Administracion/Tecnica', {
        templateUrl: 'Views/Tecnica.html',
        controller: 'TecnicaController'
    })
    .when('/Administracion/Virtualidad', {
        templateUrl: 'Views/Virtualidad.html',
        controller: 'VirtualidadController'
    })
    .when('/Administracion/Virtualidad2', {
        templateUrl: 'Views/Virtualidad2.html',
        controller: 'Virtualidad2Controller'
    })
    .when('/Reporte', {
        templateUrl: 'Views/Reporte.html',
        controller: 'ReporteController'
    })
    .when('/ReporteFicha', {
        templateUrl: 'Views/ReporteFicha.html',
        controller: 'ReporteFichaController'
    })
    .when('/ReporteLista', {
        templateUrl: 'Views/ReporteLista.html',
        controller: 'ReporteListaController'
    })
    .when('/ReporteEspecial', {
        templateUrl: 'Views/ReporteEspecial.html',
        controller: 'ReporteEspecialController'
    })
    .when('/FichasInstructor', {
        templateUrl: 'Views/FichasInstructorView.html',
        controller: 'FichasInstructorController'
    })

})

.run(['$rootScope', '$location', '$cookies', '$cookieStore', '$http', '$templateCache',
    function ($rootScope, $location, $cookies, $cookieStore, $http, $templateCache) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            $rootScope.globals = $cookieStore.get('username');

            //Variable global para asignar el Id del programa transversal
            $rootScope.ProgramaTransversal = 1414;
            //----------------------------------------------------------


            if ($location.path() == "/Solicitud" && !$rootScope.globals) {
                var url = $location.search();
                if (url != "") {
                    $cookies.put("solicitud", url.GUID);
                    $location.url("/Login");
                    return;
                }
            }

            if ($rootScope.globals != undefined) {
                if ($location.path() !== '/Login' && !$rootScope.globals) {
                    if ($location.path() == "/Solicitud") {
                        var url = $location.search();
                        if (url != "") {
                            $cookies.put("solicitud", url.GUID);
                            $location.url("/Login");
                            return;
                        }
                    }
                    $cookies.put("solicitud", undefined);
                } else {
                    $("#BodyPrincipal").css("display", "block");
                    $("#username").text($rootScope.globals.currentUser.nombre + " " + $rootScope.globals.currentUser.apellido);
                    
                    if ($rootScope.globals.currentUser.tipousuario == 4) {
                        $(".items-menu-principal").css("display", "none");
                        if ($location.path() == "/Sede" || $location.path() == "/Area" || $location.path() == "/Instructor"
                            || $location.path() == "/Ficha" || $location.path() == "/Competencia" || $location.path() == "/Ambiente"
                            || $location.path() == "/Programa" || $location.path() == "/Resultado" || $location.path() == "/Administracion") {
                            $location.path('/Administracion');
                        }
                    }
                    if ($rootScope.globals.currentUser.tipousuario == 3) {                       
                        $(".items-menu-principal").css("display", "none");                     
                        $(".not-admin").css("display", "none");
                        $("#btnAddUser").hide();
                        if ($location.path() == "/Administracion/Virtualidad2" || $location.path() == "/Administracion/Virtualidad" || $location.path() == "/Instructor"
                            || $location.path() == "/Administracion/Tecnica" || $location.path() == "/Administracion/Basicas" || $location.path() == "/Administracion/Especial"
                            || $location.path() == "/Programa" || $location.path() == "/Resultado" || $location.path() == "/Administracion") {
                            $location.path('/FichasInstructor');
                            $location.path('/Administracion/Tecnica')
                        }
                    }
                    if ($rootScope.globals.currentUser.tipousuario == 5) {
                        $(".items-menu-principal").css("display", "none");
                        $(".not-admin").css("display", "none");
                        $("#btnAddUser").hide();
                        if ($location.path() == "/Administracion/Virtualidad2" || $location.path() == "/Administracion/Virtualidad" || $location.path() == "/Instructor"
                            || $location.path() == "/Administracion/Tecnica" || $location.path() == "/Administracion/Basicas" || $location.path() == "/Administracion/Especial"
                            || $location.path() == "/Programa" || $location.path() == "/Resultado" || $location.path() == "/Administracion") {
                            $location.path('/FichasInstructor');
                            $location.path('Administracion/Especial')
                        }
                    }
                    if ($rootScope.globals.currentUser.tipousuario == 6) {
                        $(".items-menu-principal").css("display", "none");
                        $(".not-admin").css("display", "none");
                        $("#btnAddUser").hide();
                        if ($location.path() == "/Administracion/Virtualidad2" || $location.path() == "/Administracion/Virtualidad" || $location.path() == "/Instructor"
                            || $location.path() == "/Administracion/Tecnica" || $location.path() == "/Administracion/Basicas" || $location.path() == "/Administracion/Especial"
                            || $location.path() == "/Programa" || $location.path() == "/Resultado" || $location.path() == "/Administracion") {
                            $location.path('/FichasInstructor');
                            $location.path('/Administracion/Basicas')
                        }
                    }
                    if ($rootScope.globals.currentUser.tipousuario == 7) {
                        $(".items-menu-principal").css("display", "none");
                        $(".not-admin").css("display", "none");
                        $("#btnAddUser").hide();
                        if ($location.path() == "/Administracion/Virtualidad2" || $location.path() == "/Administracion/Virtualidad" || $location.path() == "/Instructor"
                            || $location.path() == "/Administracion/Tecnica" || $location.path() == "/Administracion/Basicas" || $location.path() == "/Administracion/Especial"
                            || $location.path() == "/Programa" || $location.path() == "/Resultado" || $location.path() == "/Administracion") {
                            $location.path('/FichasInstructor');
                            $location.path('/Administracion/Virtualidad')
                        }
                    }
                    if ($rootScope.globals.currentUser.tipousuario == 8) {
                        $(".items-menu-principal").css("display", "none");
                        $(".not-admin").css("display", "none");
                        $("#btnAddUser").hide();
                        if ($location.path() == "/Administracion/Virtualidad2" || $location.path() == "/Administracion/Virtualidad" || $location.path() == "/Instructor"
                            || $location.path() == "/Administracion/Tecnica" || $location.path() == "/Administracion/Basicas" || $location.path() == "/Administracion/Especial"
                            || $location.path() == "/Programa" || $location.path() == "/Resultado" || $location.path() == "/Administracion") {
                            $location.path('/FichasInstructor');
                            $location.path('/Administracion/Virtualidad2')
                        }
                    }
                    if ($rootScope.globals.currentUser.tipousuario == 2) {
                        $(".not-coor").css("display", "none");
                        $("#btnAddUser").show();
                        if ($location.path() == "/Sede" || $location.path() == "/Area"
                            || $location.path() == "/Competencia"
                            || $location.path() == "/Resultado") {
                            $location.path('/Administracion');
                        }
                    }
                    if ($rootScope.globals.currentUser.tipousuario == 1) {
                        $(".not-admin").css("display", "none");
                        $("#btnAddUser").hide();
                        if ($location.path() == "/Administracion") {
                            $location.path('/Administracion');
                        }
                    }
                }
            }

            if ($location.path() !== '/Login' && !$rootScope.globals) {
                $location.path('/Login');
            }

        });
    }]);


// create the controller and inject Angular's $scope
ProgramacionApp.controller('PrincipalController',
    ['$scope', '$rootScope', '$cookies', '$cookieStore', 'InstructorService', 'LoginService', '$http', '$location',
    function ($scope, $rootScope, $cookies, $cookieStore, InstructorService, LoginService, $http, $location) {
        $scope.CerrarSesion = function () {
            $cookies.remove("username");
            $location.url('/Login');
        };

        $scope.AbrirEspecial = function () {
            $location.url("/Administracion/Especial");
        };

        $scope.AbrirBasicas = function () {
            $location.url("/Administracion/Basicas");
        };
        $scope.AbrirTecnica = function () {
            $location.url("/Administracion/Tecnica");
        };

        $scope.AbrirVirtualidad = function () {
            swal({
                type: 'info',
                html:
                  '<h3>¿Desea ingresar a virtualidad titulada o complementaria?</h3><div style="margin-bottom:5%; margin-top:5%" class="col-md-10 col-md-offset-1"><div class="col-md-6"><button id="VT" style="width:100%" class="btn btn-primary">Titulada</button></div><div class="col-md-6"><button id="VC" style="width:100%" class="btn btn-primary">Complementaria</button></div></div>',
                animation: false,
                showConfirmButton: false,
                //confirmButtonText: "Cancelar"
            });
        }
        $(document).on('click', "#VT", function () {
            location.href = "http://localhost:61996/Principal.html#/Administracion/Virtualidad";
            swal.close();
        });

        $(document).on('click', "#VC", function () {
            location.href = "http://localhost:61996/Principal.html#/Administracion/Virtualidad2";
            swal.close();
        });

        $scope.AbrirInstructores = function () {
            $location.url('/Instructor');
        }

        //$scope.AbrirCoodinador = function () {
        //    $location.url("/Coordinacion");
        //};
        //$scope.AbrirSede = function () {
        //    $location.url("/Sede");
        //};
        //$scope.AbrirArea = function () {
        //    $location.url("/Area");
        //};

        //$scope.AbrirAmbiente = function () {
        //    $location.url("/Ambiente");
        //};
        $scope.AbrirProgramas = function () {
            $location.url("/Programa");
        };
        //$scope.AbrirCompetencia = function () {
        //    $location.url("/Competencia");
        //};
        //$scope.AbrirResultado = function () {
        //    $location.url("/Resultado");
        //};
        //$scope.AbrirFicha = function () {
        //    $location.url("/Ficha");
        //};
        //$scope.AbrirInstructor = function () {
        //    $location.url("/Instructor");
        //};
        //$scope.AbrirProgramacion = function () {
        //    $location.url("/Programacion");
        //};
        //$scope.AbrirAdministracion = function () {
        //    $location.url("/Administracion");
        //};

        //setInterval(function () {
        //    InstructorService.EnviarCorreoInstructor(function (response) {
        //        //if (response.success == true) {
        //        var a = 0;
        //        console.log(a+=1);
        //        //}
        //    });
        //}, 120000);

        $scope.UsuarioCambiarPass = {
            Password: "",
            newPass: ""
        };

        $scope.NuevoUsuario = {
            NombreUsuario: "",
            ContrUsuario: "",
            CorreoUsuario: ""
        };

        $scope.AbrirModalCambiarPass = function () {
            $("#ModalCambiarPass").modal("show");
        };

        $scope.AsignarUsuario = function () {      
            $scope.Limpiar();
            $("#ModalAsignarUsuario").modal("show");
        };

        $scope.Limpiar = function() {
            $scope.NuevoUsuario.NombreUsuario = "",
                $scope.NuevoUsuario.ContrUsuario = "",
                $scope.NuevoUsuario.CorreoUsuario = ""

        };

        $scope.AgregarUsuario = function () {
            debugger;
            LoginService.AsignarUsuario($scope.NuevoUsuario, function (response) {
                if (response.success) {
                    bootbox.dialog({
                        title: "Información",
                        message: "El usuario se registró con éxito",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                    $scope.Limpiar();

                } else {
                    bootbox.dialog({
                        title: "Información",
                        message: "No se pudo registrar el usuario, puede que el usuario ingresado ya exista",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                }
                $("#ModalAsignarUsuario").modal("hide");
            });
        };

        $scope.CambiarPass = function () {
            LoginService.CambiarPassword($scope.UsuarioCambiarPass, $rootScope.globals.currentUser.id, function (response) {
                if (response.success == true) {
                    bootbox.dialog({
                        title: "Información",
                        message: "El cambio de contraseña se realizó con éxito",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                    $("#ModalCambiarPass").modal("hide");
                } else {
                    bootbox.dialog({
                        title: "Información",
                        message: "La contraseña actual es incorrecta",
                        buttons: {
                            success: {
                                label: "Cerrar",
                                className: "btn-primary",
                            }
                        }
                    });
                }
                $scope.UsuarioCambiarPass.Password = "";
                $scope.UsuarioCambiarPass.newPass = "";
            })
        };
    }]);


