ProgramacionApp.factory('TecnicaService',
    ['$http', '$rootScope', '$routeParams',
    function ($http, $rootScope, $routeParams) {
        var service = {};

        service.ConsultarInstituciones= function (callback) {
            $http.get(URLServices + "Tecnica/ConsultarInstituciones/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.ConsultarMunicipio = function (callback) {
            $http.get(URLServices + "Tecnica/ConsultarMunicipio/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.verDetalleInst = function (inst, callback) {
            $http.post(URLServices + "Tecnica/verDetalleInst/", inst[0])
              .success(function (response) {
                  callback(response);
              })
        };

        service.GuardarInstitucion = function (inst, callback) {
            $http.post(URLServices + "Tecnica/GuardarInstitucion/", inst)
              .success(function (response) {
                  callback(response);
              })
        };

        service.inhabilitarinstitucion = function (Inst, callback) {
            $http.post(URLServices + "Tecnica/inhabilitarinstitucion/", Inst[0])
              .success(function (response) {
                  callback(response);
              })
        };

        service.GuardarModificacion = function (Inst, callback) {
            $http.post(URLServices + "Tecnica/GuardarModificacion/", Inst)
              .success(function (response) {
                  callback(response);
              })
        };

        service.CargarProgramas = function (callback) {
            $http.get(URLServices + "Tecnica/ConsultarProgramas/")
            .success(function (response) {
                callback(response);
            });
        };

        service.CargarProgramasInst = function (callback) {
            $http.get(URLServices + "Tecnica/CargarProgramasInst/")
            .success(function (response) {
                callback(response);
            });
        };

        service.Modificar = function (Inst, callback) {
            $http.post(URLServices + "Tecnica/Modificar/", Inst[0])
              .success(function (response) {
                  callback(response);
              })
        };

        service.inhabilitarPrograma = function (Prog, callback) {
            $http.post(URLServices + "Tecnica/inhabilitarPrograma/", Prog[0])
            .success(function (response) {
                callback(response);
            })
        };

        service.ModificarPrograma = function (Prog, callback) {
            $http.post(URLServices + "Tecnica/ModificarPrograma/", Prog[0])
            .success(function (response) {
                callback(response);
            })
        };

        service.GuardarEdicionPrograma = function (Prog, callback) {
            $http.post(URLServices + "Tecnica/GuardarEdicionPrograma/", Prog)
            .success(function (response) {
                callback(response);
            })
        };

        service.GuardarPrograma = function (prog, callback) {
            $http.post(URLServices + "Tecnica/GuardarPrograma/", prog)
            .success(function (response) {
                callback(response);
            })
        };

        service.AgregarDetalleProg = function (idProg, idInst, callback) {
            Item = {
                Parametro1: idProg,
                Parametro2: idInst
            }
            $http.post(URLServices + "Tecnica/AgregarDetalleProg/", Item)
            .success(function (response) {
                callback(response);
            });
        };
        
        service.filtrarProgramas = function (idInst, callback) {
            Item = {
                Parametro1: idInst
            }
            $http.post(URLServices + "Tecnica/filtrarProgramas/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.estadoInstProg = function (IdProg, IdInst, callback) {

            Item = {
                Parametro1: IdProg,
                Parametro2: IdInst
            }

            $http.post(URLServices + "Tecnica/estadoInstProg/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.CargarDocentePar = function (callback) {
            $http.get(URLServices + "Tecnica/CargarDocentePar")
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarDocentePar = function (DocentePar, callback) {
            $http.post(URLServices + "Tecnica/GuardarDocentePar/", DocentePar)
            .success(function (response) {
                callback(response);
            });
        };

        service.Modificar3 = function (DocPar, callback) {
            $http.post(URLServices + "Tecnica/Modificar3/", DocPar[0])
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarEdicionDocentePar = function (DocPar, callback) {
            $http.post(URLServices + "Tecnica/GuardarEdicionDocentePar/", DocPar)
            .success(function (response) {
                callback(response);
            });
        };

        service.CargarInstructores = function (callback) {
            $http.get(URLServices + "Tecnica/ConsultarInstructores/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.SubirArchivo = function (data, callback) {
            waitingDialog.show();
            var ajaxRequest = $.ajax({
                type: "POST",
                url: URLServices + "File/UploadFileMedia",
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

        service.SubirArchivoProgramacion = function (data, callback) {
            waitingDialog.show();
            var ajaxRequest = $.ajax({
                type: "POST",
                url: URLServices + "File/UploadFileProgramacionTecnica",
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

        service.SubirArchivoProgramaInst = function (data, callback) {
            waitingDialog.show();
            var ajaxRequest = $.ajax({
                type: "POST",
                url: URLServices + "File/SubirArchivoProgramaInst",
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

        service.ConsultarIntuctorId = function (id, callback) {
            Item = {
                Parametro1: id[0].Id
            }
            $http.post(URLServices + "Tecnica/ConsultarIntuctorId/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.Modificar4 = function (Instruc, callback) {
            $http.post(URLServices + "Tecnica/Modifcar4/", Instruc[0])
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarEdicionInstructor = function (Instruc, callback) {
            $http.post(URLServices + "Tecnica/GuardarEdicionInstructor/", Instruc)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarInstructor = function (Instructor, callback) {
            $http.post(URLServices + "Tecnica/GuardarInstructor/", Instructor)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarProgramacion = function (nombre, callback) {
            Item = {
                Parametro1: nombre
            }
            $http.post(URLServices + "Tecnica/ConsultarProgramacion", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.CargarInstructoresSENA = function (callback) {
            $http.get(URLServices + "Tecnica/CargarInstructoresSENA")
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarProgramacionId = function (id, callcack) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Tecnica/ConsultarProgramacionId/", Item)
            .success(function (response) {
                callcack(response);
            });
        };

        service.ConsultarInstructorMedia = function (callcack) {
            $http.get(URLServices + "Tecnica/ConsultarInstructorMedia")
            .success(function (response) {
                callcack(response);
            });
        };

        service.EliminarProgramacion = function (Id, callback) {
            Item = {
                Parametro1: Id
            }
            $http.post(URLServices + "Tecnica/EliminarProgramacion", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarModificacionProgramacion = function (MediaTecnica, callback) {
            $http.post(URLServices + "Tecnica/GuardarModificacionProgramacion", MediaTecnica)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarProgramacion = function (MediaTecnica, callback) {
            $http.post(URLServices + "Tecnica/GuardarProgramacion", MediaTecnica)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarInstructorNombre = function (nombre, callback) {
            Item = {
                Parametro1: nombre
            }
            $http.post(URLServices + "Tecnica/ConsultarInstructorNombre/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarLista = function (Lista, callback) {
            $http.post(URLServices + "Tecnica/GuardarLista/", Lista)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarLista = function (inst, callback) {
            Item = {
                Parametro1: inst
            }
            $http.post(URLServices + "Tecnica/ConsultarLista/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarAprendices = function (callback) {
            $http.get(URLServices + "Tecnica/ConsultarAprendices")
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAprendiz = function (Aprendiz, callback) {           
            $http.post(URLServices + "Tecnica/GuardarAprendiz/", Aprendiz)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAprendizEdit = function (Aprendiz, callback) {
            $http.post(URLServices + "Tecnica/GuardarAprendizEdit", Aprendiz)
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
            $http.post(URLServices + "Tecnica/GuardarAprendizEstado/", Item)
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
            $http.post(URLServices + "Tecnica/GuardarAprendizFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarFichas = function (callback) {
            $http.get(URLServices + "Tecnica/ConsultarFichas")
            .success(function (response) {
                callback(response);
            });
        };

        //Función para consultar  el colegio por medio del Id

        service.ConsultarColegiosId = function (IdAprendiz, callback) {
            var Item = {
                Parametro1: IdAprendiz
            }
            $http.post(URLServices + "Tecnica/ConsultarColegiosId", Item)
            .success(function (response) {
                callback(response);
            });
        };
        //Función para consultar  la Ficha por medio del Id
        service.ConsultarFichaXId = function (IdAprendiz, callback) {
            var Item = {
                Parametro1: IdAprendiz
            }
            $http.post(URLServices + "Tecnica/ConsultarFichaXId", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarFicha = function (Ficha, callback) {
            $http.post(URLServices + "Tecnica/GuardarFicha/", Ficha)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarFichaId = function (IdFicha, callback) {
            Item = {
                Parametro1: IdFicha
            }
            $http.post(URLServices + "Tecnica/ConsultarFichaId/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarFichaEdit = function (Ficha, callback) {
            $http.post(URLServices + "Tecnica/GuardarFichaEdit/", Ficha)
            .success(function (response) {
                callback(response);
            });
        };

        service.inhabilitarFicha = function (IdFicha, callback) {
            Item = {
                Parametro1: IdFicha
            }
            $http.post(URLServices + "Tecnica/inhabilitarFicha/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.verAprendices = function (id, callback) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "Tecnica/verAprendices/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.EstadoFicaAprendiz = function (IdFicha, callback) {
            Item = {
                Parametro1: IdFicha
            }
            $http.post(URLServices + "Tecnica/EstadoFicaAprendiz/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.verNovedades = function (IdFIcha, callback) {
            Item = {
                Parametro1: IdFIcha
            }
            $http.post(URLServices + "Tecnica/verNovedades/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarFichasSelect = function (callback) {
            $http.get(URLServices + "Tecnica/ConsultarFichasSelect")
            .success(function (response) {
                callback(response);
            });
        }

        service.FiltrarAprendiz = function (FiltrarAprendiz, callback) {
            debugger;
            $http.post(URLServices + "Tecnica/FiltrarAprendiz", FiltrarAprendiz)
                .success(function (response) {
                    callback(response);
                });
        }
        
        return service;



    }]);