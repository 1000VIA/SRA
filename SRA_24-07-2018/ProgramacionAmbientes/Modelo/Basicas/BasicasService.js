ProgramacionApp.factory('BasicasService',
    ['$http', '$rootScope', '$routeParams',
    function ($http, $rootScope, $routeParams) {
        var service = {};

        service.ConsultarInstructores = function (callback) {
            $http.get(URLServices + "Basicas/ConsultarInstructores/")
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
            $http.get(URLServices + "Basicas/ConsultarProgramas/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.ConsultarFichas = function (callback) {
            $http.get(URLServices + "Basicas/ConsultarFichas")
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

        service.ConsultarProgramacion = function (callback) {
            $http.get(URLServices + "Basicas/ConsultarProgramacion/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.SelectProgramas = function (callback) {
            $http.get(URLServices + "Basicas/SelectProgramas/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarInstructor = function (Instructor, callback) {
            waitingDialog.show();
            $http.post(URLServices + "Basicas/GuardarInstructor", Instructor)
                .success(function (response) {
                    callback(response);
                    waitingDialog.hide();
                });
        };

        service.GuardarModificacionInstructor = function (Instructor, callback) {
            $http.post(URLServices + "Instructor/GuardarModificacionInstructor", Instructor)
                .success(function (response) {
                    callback(response);
                });
        };

        service.CambiarEstado = function (Instructor, callback) {
            $http.post(URLServices + "Instructor/CambiarEstado/", Instructor)
              .success(function (response) {
                  callback(response);
              })
        };

        service.ModificarInstructor = function (Instructor, callback) {
            $http.post(URLServices + "Instructor/ModificarInstructor/", Instructor[0])
              .success(function (response) {
                  callback(response);
              })
        };

        service.GuardarEmpresa = function (Empresa, callback) {
            waitingDialog.show();
            $http.post(URLServices + "Basicas/GuardarEmpresa", Empresa)
                .success(function (response) {
                    callback(response);
                    waitingDialog.hide();
                });
        };

        service.CambiarEstadoEmpresa = function (Instructor, callback) {
            $http.post(URLServices + "Basicas/CambiarEstadoEmpresa/", Instructor)
              .success(function (response) {
                  callback(response);
              })
        };

        service.ModificarEmpresa = function (Instructor, callback) {
            $http.post(URLServices + "Basicas/ModificarEmpresa/", Instructor[0])
              .success(function (response) {
                  callback(response);
              })
        };

        service.GuardarModificacionEmpresa = function (Instructor, callback) {
            $http.post(URLServices + "Basicas/GuardarModificacionEmpresa", Instructor)
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Basicas/GuardarFicha", Ficha)
                .success(function (response) {
                    callback(response);
                });
        };

        service.BorrarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Basicas/InHabilitarFicha/", Ficha[0])
                .success(function (response) {
                    callback(response);
                });
        };

        service.ModificarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Basicas/ModificarFicha/", Ficha[0])
              .success(function (response) {
                  callback(response);
              })
        };

        service.GuardarModificacionFicha = function (Ficha, callback) {
            $http.post(URLServices + "Basicas/GuardarModificacionFicha", Ficha)
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarProgramacion = function (Programacion, callback) {
            waitingDialog.show();
            $http.post(URLServices + "Basicas/GuardarProgramacion", Programacion)
                .success(function (response) {
                    callback(response);
                    waitingDialog.hide();
                });
        };

        service.ModificarProgramacion = function (Programacion, callback) {

            var Item = {
                Parametro1: Programacion

            }
            $http.post(URLServices + "Basicas/ModificarProgramacion/", Item)
              .success(function (response) {
                  callback(response);
              })
        };

        service.GuardarModificacionProgramacion = function (Programacion, callback) {
            $http.post(URLServices + "Basicas/GuardarModificacionProgramacion", Programacion)
                .success(function (response) {
                    callback(response);
                });
        };

        service.BorrarProgramacion = function (Programacion, callback) {
            var Item = {
                Parametro1: Programacion
            };

            waitingDialog.show();
            $http.post(URLServices + "Basicas/BorrarProgramacion", Item)
                .success(function (response) {
                    callback(response);
                    waitingDialog.hide();
                });
        };

        service.ConsultarProgramacionInstructor = function (cedula, callback) {
            Item = {
                Parametro1: cedula,
            }
            $http.post(URLServices + "Basicas/ConsultarProgramacionInstructor/", Item)
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarInstitucion = function (Insti, callback) {
            $http.post(URLServices + "Basicas/GuardarInstitucion/", Insti)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarInstituciones = function (callback) {
            $http.get(URLServices + "Basicas/ConsultarInstituciones")
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarModificacionInstitucion = function (Inst, callback) {
            $http.post(URLServices + "Basicas/GuardarModificacionInstitucion/", Inst)
            .success(function (response) {
                callback(response);
            });
        };

        service.inhabilitarInsti = function (Insti, callback) {
            Item = {
                Parametro1: Insti[0].Id
            }
            $http.post(URLServices + "Basicas/inhabilitarInsti/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        return service;

    }]);