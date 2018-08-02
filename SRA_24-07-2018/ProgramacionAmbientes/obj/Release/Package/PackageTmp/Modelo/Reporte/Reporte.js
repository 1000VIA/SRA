ProgramacionApp.controller('ReporteController',
    ['$scope', '$rootScope', '$location', 'EspecialService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, EspecialService, $routeParams, $sce) {

            //var IdProyecto = $rootScope.proyecto.datos.id;
            var Nombre = localStorage.getItem("Nombre");
            var Cedula = localStorage.getItem("Cedula");
            localStorage.removeItem("Cedula");
            localStorage.removeItem("Nombre");
            $('.modal-backdrop').css("display", "none");
            $scope.url = $sce.trustAsResourceUrl('http://localhost:61996/Reporte/ReportePDF.aspx?nombre=' + Nombre + '&cedula=' + Cedula);
            

            $scope.volver = function(){
                $location.url("/Administracion/Tecnica");
            };


        }]);