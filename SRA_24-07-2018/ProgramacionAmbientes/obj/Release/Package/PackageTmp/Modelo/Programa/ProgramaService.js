ProgramacionApp.factory('ProgramaService',
    ['$http', '$rootScope', '$routeParams',
    function ($http, $rootScope, $routeParams) {
        var service = {};

        service.ConsultarProgramas = function (callback) {
            $http.get(URLServices + "Programa/ConsultarProgramas/")
                .success(function (response) {
                    callback(response);
                });
        };

        service.GuardarPrograma = function (Programa, callback) {
            $http.post(URLServices + "Programa/GuardarPrograma", Programa)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarEdicionPrograma = function (Programa,callback) {
            $http.post(URLServices + "Programa/GuardarEdicionPrograma/", Programa)
                .success(function (response) {
                    callback(response);
                });
        };

        service.CambiarEstado = function (CambiarEstado, callback) {
            $http.post(URLServices + "Programa/CambiarEstado", CambiarEstado[0])
            .success(function (response) {
                callback(response);
            });
        };
      

        return service;

    }]);