ProgramacionApp.factory('EspecialService',
    ['$http', '$rootScope', '$routeParams',
    function ($http, $rootScope, $routeParams) {
        var service = {};

        service.ConsultarInstructores = function (callback) {
            $http.get(URLServices + "Especial/ConsultarInstructores/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.ConsultarEmpresas = function (callback) {
            $http.get(URLServices + "Especial/ConsultarEmpresas/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.ConsultarProgramas = function (callback) {
            $http.get(URLServices + "Especial/ConsultarProgramas/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.SelectProgramas = function (callback) {
            $http.get(URLServices + "Especial/SelectProgramas/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.ConsultarFichas = function (callback) {
            $http.get(URLServices + "Especial/ConsultarFichas/")
                .success(function (response) {
                    callback(response);
                });
        };

        
        service.ConsultarAreas = function (callback) {
            $http.get(URLServices + "Area/ConsultarAreas/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarInstructor = function (Instructor, callback) {
            waitingDialog.show();
            $http.post(URLServices + "Especial/GuardarInstructor", Instructor)
                .success(function (response) {
                    callback(response);
                    waitingDialog.hide();
                });
        };

        service.GuardarEmpresa= function (Empresa, callback) {
            waitingDialog.show();
            $http.post(URLServices + "Especial/GuardarEmpresa", Empresa)
                .success(function (response) {
                    callback(response);
                    waitingDialog.hide();
                });
        };

        service.GuardarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Especial/GuardarFicha", Ficha)
                .success(function (response) {
                    callback(response);
                });
        };

        service.CambiarEstado = function (Instructor, callback) {
            $http.post(URLServices + "Especial/CambiarEstado/", Instructor[0])
              .success(function (response) {
                  callback(response);
              })
        };

        service.CambiarEstadoEmpresa = function (Instructor, callback) {
            $http.post(URLServices + "Especial/CambiarEstadoEmpresa/", Instructor)
              .success(function (response) {
                  callback(response);
              })
        };

        service.GuardarModificacionInstructor = function (Instructor, callback) {
            $http.post(URLServices + "Especial/GuardarModificacionInstructor", Instructor)
                .success(function (response) {
                    callback(response);
                });
        };

        service.ModificarEmpresa = function (Instructor, callback) {
            $http.post(URLServices + "Especial/ModificarEmpresa/", Instructor[0])
              .success(function (response) {
                  callback(response);
              })
        };

        service.GuardarModificacionEmpresa= function (Instructor, callback) {
            $http.post(URLServices + "Especial/GuardarModificacionEmpresa", Instructor)
                .success(function (response) {
                    callback(response);
                });
        };

        service.BorrarFicha = function (Ficha, callback) {
            //EliminarFicha
            $http.post(URLServices + "Especial/InHabilitarFicha/", Ficha[0])
                .success(function (response) {
                    callback(response);
                });
        };

        service.ModificarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Especial/ModificarFicha/", Ficha[0])
              .success(function (response) {
                  callback(response);
              })
        };

        service.ConsultarProgramaxArea = function (IdArea, callback) {

            item = {
                Parametro1: IdArea
            };

            $http.post(URLServices + "Programa/ConsultarProgramaxArea/", item)
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarModificacionFicha = function (Ficha, callback) {
            $http.post(URLServices + "Especial/GuardarModificacionFicha", Ficha)
                .success(function (response) {
                    callback(response);
                });
        };

        service.ConsultarAreaxPrograma = function (IdPrograma, callback) {
            var Item = {
                Parametro1: IdPrograma
            };
            $http.post(URLServices + "Ficha/ConsultarAreaxPrograma/", Item)
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarProgramacion = function (Programacion, callback) {
            waitingDialog.show();
            $http.post(URLServices + "Especial/GuardarProgramacion", Programacion)
                .success(function (response) {
                    callback(response);
                    waitingDialog.hide();
                });
        };

        service.ConsultarProgramacion = function (nombre, callback) {
            Item = {
                Parametro1: nombre,
            }
            $http.post(URLServices + "Especial/ConsultarProgramacionInstructor2/", Item)
                .success(function (response) {
                    callback(response);
                });
        };

        service.ConsultarProgramacionInstructor = function (cedula, callback) {
            Item = {
                Parametro1: cedula,
            }
            $http.post(URLServices + "Especial/ConsultarProgramacionInstructor/", Item)
                .success(function (response) {
                    callback(response);
                });
        };

        service.BorrarProgramacion = function (Programacion, callback) {
            var Item = {
                Parametro1: Programacion
            };

            waitingDialog.show();
            $http.post(URLServices + "Especial/BorrarProgramacion", Item)
                .success(function (response) {
                    callback(response);
                    waitingDialog.hide();
                });
        };

        service.ModificarProgramacion = function (Programacion, callback) {

            var Item = {
                Parametro1 : Programacion

            }
            $http.post(URLServices + "Especial/ModificarProgramacion/", Item)
              .success(function (response) {
                  callback(response);
              })
        };

        service.GuardarModificacionProgramacion = function (Programacion, callback) {
            $http.post(URLServices + "Especial/GuardarModificacionProgramacion", Programacion)
                .success(function (response) {
                    callback(response);
                });
        };

        service.ConsultarInstituciones = function (callback) {
            $http.get(URLServices + "Especial/ConsultarInstituciones/")
                .success(function (response) {
                    callback(response);
                });
        };

        return service;
    }]);