ProgramacionApp.controller('ReporteListaController',
    ['$scope', '$rootScope', '$location', 'EspecialService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, EspecialService, $routeParams, $sce) {

            //var IdProyecto = $rootScope.proyecto.datos.id;
            var Nombre = localStorage.getItem("NombreI");
            localStorage.removeItem("NombreI");
            $('.modal-backdrop').css("display", "none");
            $scope.url = $sce.trustAsResourceUrl('http://localhost:61996/Reporte/ReporteListaPDF.aspx?nombre=' + Nombre);


            $scope.volver = function () {
                $location.url("/Administracion/Tecnica");
            };


        }]);