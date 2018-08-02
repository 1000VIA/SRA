ProgramacionApp.factory('FichasInstructorService',
    ['$http', '$rootScope', '$routeParams',
    function ($http, $rootScope, $routeParams) {
        var service = {};

        service.CargarFichasInstructor = function (Cedula, callback) {
            Item = {
                Parametro1: Cedula
            }
            $http.post(URLServices + "FichasInstructor/CargarFichasInstructor/", Item)
            .success(function (response) {
                callback(response);
            });
        };
        
        service.verAprendices = function (id, callback) {
            Item = {
                Parametro1: id
            }
            $http.post(URLServices + "FichasInstructor/verAprendices/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAlternativa = function (Alternativa, callback) {
            $http.post(URLServices + "FichasInstructor/GuardarAlternativa/", Alternativa)
            .success(function (response) {
                callback(response);
            });
        };

        service.validarAlternativa = function (IdAprendiz, callback) {
            Item = {
                Parametro1: IdAprendiz
            }
            $http.post(URLServices + "FichasInstructor/validarAlternativa/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.ConsultarAlternativa = function (IdAprendiz, callback) {
            Item = {
                Parametro1: IdAprendiz
            }
            $http.post(URLServices + "FichasInstructor/ConsultarAlternativa/", Item)
            .success(function (response) {
                callback(response);
            });
        };

        service.GuardarAlternativaEdit = function (Alternativa, callback) {
            $http.post(URLServices + "FichasInstructor/GuardarAlternativaEdit/", Alternativa)
            .success(function (response) {
                callback(response);
            });
        };

        return service;

    }]);