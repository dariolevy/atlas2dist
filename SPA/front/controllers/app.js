(function () {
    'use strict';
    angular.module('atlas2-juego').controller('appCtrl', ['$scope', 'jugadorMapaService', 'jugadorRecursoService', 'colonias', appCtrl]);

    function appCtrl($scope, jugadorMapaService, jugadorRecursoService, colonias) {
        $scope.recursos = null;

        jugadorRecursoService.getAllRecursos().then(function (data) {
            $scope.recursos = data;
        });

        jugadorMapaService.getAll().then(function (data) {
            colonias.set(data);
        });

    }

})();