ProgramacionApp.controller('ReporteEspecialController',
    ['$scope', '$rootScope', '$location', 'EspecialService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, EspecialService, $routeParams, $sce) {

            //var IdProyecto = $rootScope.proyecto.datos.id;
            var programa = localStorage.getItem("Rprograma");
            var caracterizacion = localStorage.getItem("Rcaracterizacion");
            localStorage.removeItem("Rprograma");
            localStorage.removeItem("Rcaracterizacion");
            $('.modal-backdrop').css("display", "none");
            $scope.url = $sce.trustAsResourceUrl('http://localhost:61996/Reporte/ReporteEspecialPDF.aspx?programa=' + programa + '&caracterizacion=' + caracterizacion);


            $scope.volver = function () {
                $location.url("/Administracion/Especial");
            };


        }]);