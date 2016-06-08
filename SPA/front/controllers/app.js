(function () {
    'use strict';
    angular.module('atlas2-juego').controller('appCtrl', ['$scope', 'jugadorMapaService', 'jugadorRecursoService', 'coloniaFactory', appCtrl]);

    function appCtrl($scope, jugadorMapaService, jugadorRecursoService, coloniaFactory) {
        $scope.recursos = null;
        var currentMapa = coloniaFactory.getCurrent();

        var initialize = function () {
            jugadorRecursoService.getRecursoByColonia(currentMapa.id).then(function (jugadorRecurso) {
                var recursoArray = [];
                for (var r in jugadorRecurso) {
                    var rel = jugadorRecurso[r];

                    rel.recurso['cantidad'] = rel.cantidadR;
                    rel.recurso['capacidad'] = rel.capacidad;

                    recursoArray.push(rel.recurso);
                }

                $scope.recursos = recursoArray;
            });
        }

        jugadorMapaService.getColonias().then(function (mapas) {
            coloniaFactory.set(mapas);
        });

        $scope.$on('mapa:current', function (event, data) {
            currentMapa = coloniaFactory.getCurrent();

            initialize();
        });

        if (currentMapa) {
            initialize();
        }
    }

})();