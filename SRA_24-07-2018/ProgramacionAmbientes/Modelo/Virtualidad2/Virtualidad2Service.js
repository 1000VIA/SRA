ProgramacionApp.factory('Virtualidad2Service',
    ['$http', '$rootScope', '$routeParams',
    function ($http, $rootScope, $routeParams) {
        var service = {};

        service.ConsultarProgramas = function (callback) {
            $http.get(URLServices + "Virtualidad2/ConsultarProgramas")
            .success(function (response) {
                callback(response);
            });
        };

        //Gestión Instructores
        service.ConsultarInstructores = function (callback) {
            $http.get(URLServices + "Virtualidad2/ConsultarInstructores")
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
            $http.post(URLServices + "Virtualidad2/GuardarInstructor", Instructor)
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

        service.GuardarModificacionInstructor = function (Instructor, callback) {
            $http.post(URLServices + "Instructor/GuardarModificacionInstructor", Instructor)
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarEdicionContrato = function (Inst, callback) {
            $http.post(URLServices + "Virtualidad/GuardarEdicionContrato/", Inst)
            .success(function (response) {
                callback(response);
            });
        };

        service.ContratoRenovar = function (idInstruc, callback) {
            Item = {
                Parametro1: idInstruc
            }
            $http.post(URLServices + "Virtualidad/ContratoRenovar", Item)
            .success(function (response) {
                callback(response);
            });
        };

        //Gestión Fichas
        service.ConsultarFichas = function (callback) {
            $http.get(URLServices + "Virtualidad2/ConsultarFichas")
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Virtualidad2/GuardarFicha", Ficha)
            .success(function (response) {
                callback(response);
            });
        };

        service.ModificarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Virtualidad2/ModificarFicha", Ficha[0])
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarEdicionFicha = function (Ficha, callback) {
            $http.post(URLServices + "Virtualidad2/GuardarEdicionFicha", Ficha)
            .success(function (response) {
                callback(response);
            });
        };

        service.gestionFicha = function (idFicha, callback) {
            Item = {
                Parametro1: idFicha
            }
            $http.post(URLServices + "Virtualidad2/gestionFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarGestionFicha = function (Fichas, callback) {
            Item = {
                Parametro1: Fichas.Id,
                Parametro2: Fichas.Retirados,
                Parametro3: Fichas.Aprobados,
                Parametro4: Fichas.No_Aprobados,
                Parametro5: Fichas.Porc_Certificacion
            }
            $http.post(URLServices + "Virtualidad2/GuardarGestionFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.VerFicha = function (id, callback) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Virtualidad2/VerFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.VerFichasI = function (Instruc, callback) {
            Item = {
                Parametro1: Instruc
            }
            $http.post(URLServices + "Virtualidad2/VerFichasI/", Item)
            .success(function (response) {
                callback(response);
            });
        }

        //gestion programación
        service.GuardarProgramacion = function (Programacion, callback) {
            $http.post(URLServices + "Virtualidad2/GuardarProgramacion/", Programacion)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarProgramacion = function (nombre, callback) {
            Item = {
                Parametro1: nombre
            }
            $http.post(URLServices + "Virtualidad2/ConsultarProgramacion", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarProgramacion2 = function (programa, callback) {
            Item = {
                Parametro1: programa
            }
            $http.post(URLServices + "Virtualidad2/ConsultarProgramacion2", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarProgramacionId = function (id, callcack) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Virtualidad2/ConsultarProgramacionId/", Item)
            .success(function (response) {
                callcack(response);
            });
        };

        service.EliminarProgramacion = function (id, callback) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Virtualidad2/EliminarProgramacion", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarModificacionProgramacion = function (Programacion, callback) {
            $http.post(URLServices + "Virtualidad2/GuardarModificacionProgramacion/", Programacion)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarFichasActivas = function (callback) {
            $http.get(URLServices + "Virtualidad2/ConsultarFichasActivas")
            .success(function (response) {
                callback(response);
            });
        };

        return service;

    }]);