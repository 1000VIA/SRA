ProgramacionApp.factory('VirtualidadService',
    ['$http', '$rootScope', '$routeParams',
    function ($http, $rootScope, $routeParams) {
        var service = {};

        service.ConsultarProgramas = function (callback) {
            $http.get(URLServices + "Virtualidad/ConsultarProgramas")
            .success(function (response) {
                callback(response);
            });
        };

        //gestion Instructor
        service.ConsultarInstructores = function (callback) {
            $http.get(URLServices + "Virtualidad/ConsultarInstructores")
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarInstructoresTodos = function (callback) {
            $http.get(URLServices + "Virtualidad/ConsultarInstructoresTodos")
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarNumeroContrato = function (NumContrato, callback) {
            Item = {
                Parametro1: NumContrato
            }
            $http.post(URLServices + "Virtualidad/ConsultarNumeroContrato",Item)         
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

        service.Inhabilitados = function (callback) {
            $http.get(URLServices + "Instructor/ConsultarInhabilitados/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarInstructor = function (Instructor, callback) {
            $http.post(URLServices + "Virtualidad/GuardarInstructor", Instructor)
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

        service.VerHorasI = function (cedula, callback) {
            Item = {
                Parametro1: cedula
            }
            $http.post(URLServices + "Virtualidad/VerHorasI/", Item)
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

        service.GuardarHistorial = function (Contrato, callback) {
            $http.post(URLServices + "Virtualidad/GuardarHistorial/", Contrato)
            .success(function (response) {
                callback(response);
            });
        };

        service.verHistorialContratos = function (Instruc, callback) {
            Item = {
                Parametro1: Instruc.Nombre,
                Parametro2: Instruc.Apellido
            }
            $http.post(URLServices + "Virtualidad/verHistorialContratos/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        //gestion Fichas
        service.GuardarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Virtualidad/GuardarFicha", Ficha)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarFichas = function (callback) {
            $http.get(URLServices + "Virtualidad/ConsultarFichas")
            .success(function (response) {
                callback(response);
            });
        };

        service.ModificarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Virtualidad/ModificarFicha", Ficha[0])
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarEdicionFicha = function (Ficha, callback) {
            $http.post(URLServices + "Virtualidad/GuardarEdicionFicha", Ficha)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarFichasLectiva = function (callback) {
            $http.get(URLServices + "Virtualidad/ConsultarFichasLectiva")
            .success(function (response) {
                callback(response);
            });
        };

        service.AgregarDetalleFichas = function (Ficha, Instruc, callback) {
            Item = {
                Parametro1: Ficha,
                Parametro2:Instruc
            }
            $http.post(URLServices + "Virtualidad/AgregarDetalleFichas", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.VerFichasI = function (Instruc, callback) {
            Item = {
                Parametro1: Instruc
            }
            $http.post(URLServices + "Virtualidad/VerFichasI/", Item)
            .success(function (response) {
                callback(response);
            });
        }

        service.gestionFicha = function (idFicha, callback) {
            Item = {
                Parametro1: idFicha
            }
            $http.post(URLServices + "Virtualidad/gestionFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarGestionFicha = function (Fichas, callback) {
            Item = {
                Parametro1: Fichas.Id,
                Parametro2: Fichas.Num_Retirados,
                Parametro3: Fichas.Num_Certificados,
                Parametro4: Fichas.Porc_Certificacion,
                Parametro5: Fichas.Num_Cancelados,
                Parametro6: Fichas.Cambio_Ficha
            }
            $http.post(URLServices + "Virtualidad/GuardarGestionFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.VerFicha = function (id, callback) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Virtualidad/VerFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarFichasNoF = function (callback) {
            $http.get(URLServices + "Virtualidad/ConsultarFichasNoF")
            .success(function (response) {
                callback(response);
            });
        };

        service.InstructoresFicha = function (id, callback) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Virtualidad/InstructoresFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarInstructoresFicha = function (instrucF, callback) {
            $http.post(URLServices + "Virtualidad/GuardarInstructoresFicha/", instrucF)
            .success(function (response) {
                callback(response);
            });
        };

        service.verNovedades = function (IdFIcha, callback) {
            Item = {
                Parametro1: IdFIcha
            }
            $http.post(URLServices + "Virtualidad/verNovedades/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        //gestion programación
        service.GuardarProgramacion = function (Programacion, callback) {
            $http.post(URLServices + "Virtualidad/GuardarProgramacion/", Programacion)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarProgramacion = function (nombre, callback) {
            Item = {
                Parametro1: nombre
            }
            $http.post(URLServices + "Virtualidad/ConsultarProgramacion", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarProgramacion2 = function (programa, callback) {
            Item = {
                Parametro1: programa
            }
            $http.post(URLServices + "Virtualidad/ConsultarProgramacion2", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarProgramacionId = function (id, callcack) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Virtualidad/ConsultarProgramacionId/", Item)
            .success(function (response) {
                callcack(response);
            });
        };

        service.EliminarProgramacion = function (id, callback) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Virtualidad/EliminarProgramacion", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarModificacionProgramacion = function (Programacion, callback) {
            $http.post(URLServices + "Virtualidad/GuardarModificacionProgramacion/", Programacion)
            .success(function (response) {
                callback(response);
            });
        };

        //Gestión Aprendices
        service.ConsultarAprendices = function (callback) {
            $http.get(URLServices + "Virtualidad/ConsultarAprendices")
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAprendiz = function (Aprendiz, callback) {
            $http.post(URLServices + "Virtualidad/GuardarAprendiz/", Aprendiz)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAprendizEdit = function(Aprendiz, callback){
            $http.post(URLServices + "Virtualidad/GuardarAprendizEdit", Aprendiz)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAprendizEstado = function (IdAprendiz, Estado, Descripcion, callback) {
            Item = {
                Parametro1: IdAprendiz,
                Parametro2: Estado,
                Parametro3: Descripcion
            }
            $http.post(URLServices + "Virtualidad/GuardarAprendizEstado/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAprendizFicha = function (IdAprendiz, Ficha, Descripcion, callback) {
            Item = {
                Parametro1: IdAprendiz,
                Parametro2: Ficha,
                Parametro3: Descripcion
            }
            $http.post(URLServices + "Virtualidad/GuardarAprendizFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.verAprendices = function (id, callback) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Virtualidad/verAprendices/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAlternativa = function (Alternativa, callback) {
            $http.post(URLServices + "Virtualidad/GuardarAlternativa/", Alternativa)
            .success(function (response) {
                callback(response);
            });
        };

        service.validarAlternativa = function (IdAprendiz, callback) {
            Item = {
                Parametro1: IdAprendiz
            }
            $http.post(URLServices + "Virtualidad/validarAlternativa/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarAlternativa = function (IdAprendiz, callback) {
            Item = {
                Parametro1: IdAprendiz
            }
            $http.post(URLServices + "Virtualidad/ConsultarAlternativa/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAlternativaEdit = function (Alternativa, callback) {
            $http.post(URLServices + "Virtualidad/GuardarAlternativaEdit/", Alternativa)
            .success(function (response) {
                callback(response);
            });
        };

        service.EstadoFicaAprendiz = function (IdFicha, callback) {
            Item = {
                Parametro1: IdFicha
            }
            $http.post(URLServices + "Virtualidad/EstadoFicaAprendiz/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.SubirArchivo = function (data, callback) {
            waitingDialog.show();
            var ajaxRequest = $.ajax({
                type: "POST",
                url: URLServices + "File/UploadFileInstructor",
                contentType: false,
                processData: false,
                data: data,
                async: true,
            }).done(function (responseData, textStatus) {
                callback(responseData);
                waitingDialog.hide();
            }).fail(function () {
                waitingDialog.hide();
                location.reload();
            });
        };

        service.FiltrarAprendiz = function (FiltrarAprendiz, callback) {
            debugger;
            $http.post(URLServices + "Virtualidad/FiltrarAprendiz", FiltrarAprendiz)
                .success(function (response) {
                    callback(response);
                });
        }

        return service;

        }]);