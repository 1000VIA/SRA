ProgramacionApp.controller('ReporteFichaController',
    ['$scope', '$rootScope', '$location', 'EspecialService', '$routeParams', '$sce',
        function ($scope, $rootScope, $location, EspecialService, $routeParams, $sce) {

            //var IdProyecto = $rootScope.proyecto.datos.id;
            var Ficha = localStorage.getItem("Num_Ficha");
            var virt = localStorage.getItem("Virtualidad");
            var urlV = "";
            localStorage.removeItem("Num_Ficha");
            $('.modal-backdrop').css("display", "none");
            if(virt == "Titulada"){
                $scope.url = $sce.trustAsResourceUrl('http://localhost:61996/Reporte/ReporteFichaPDF.aspx?Num_Ficha=' + Ficha);
                urlV = "Virtualidad";
            } else {
                $scope.url = $sce.trustAsResourceUrl('http://localhost:61996/Reporte/ReporteFichaCPDF.aspx?Num_Ficha=' + Ficha);
                urlV = "Virtualidad2";
            }
            localStorage.removeItem("Virtualidad");

            $scope.volver = function () {
                $location.url("/Administracion/"+urlV);
            };



        }]);