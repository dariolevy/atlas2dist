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

        $scope.detalle = function (interaccion) {
            $scope.interaccion = interaccion;
            $('#modal-info-interaccion').modal('show');
        }

        $('#modal-info-interaccion').on('hidden.bs.modal', function (e) {
            $scope.interaccion = null;
        });
    }

})();