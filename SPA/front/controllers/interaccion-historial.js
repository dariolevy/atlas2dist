(function () {
    'use strict';
    angular.module('atlas2-juego').controller('interaccionHistorialCtrl', ['$scope', '$q', 'coloniaFactory', 'interaccionService', interaccionHistorialCtrl]);

    function interaccionHistorialCtrl($scope, $q, coloniaFactory, interaccionService) {
        $scope.interacciones = [];

        var currentMapa = coloniaFactory.getCurrent();

        var initialize = function () {
            interaccionService.getInteraccionByColonia(currentMapa.id).then(function (jugadorInteracciones) {
                $scope.interacciones = jugadorInteracciones;
            });
        };

        $scope.$on('mapa:current', function (event, data) {
            currentMapa = coloniaFactory.getCurrent();

            initialize();
        });

        if (currentMapa) {
            initialize();
        }
        $scope.getReporte = function (interaccion) {
            interaccionService.getReporte(interaccion.Id).then(
                function (reporte) {
                    $scope.reporte = reporte;
                    $('#modal-info-interaccion').modal('show');
                }, function () {

                }
            );
        }; 

        $('#modal-info-interaccion').on('hidden.bs.modal', function (e) {
            $scope.reporte = null;
        });
    }

})();