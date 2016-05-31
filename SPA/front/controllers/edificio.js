(function () {
    'use strict';
    angular.module('atlas2-juego').controller('edificioCtrl', ['$scope', 'jugadorEdificioService', edificioCtrl]);

    function edificioCtrl($scope, jugadorEdificioService) {
        $scope.edificios = null;

        jugadorEdificioService.getAllEdificios().then(function (data) {
            $scope.edificios = data;
        });
    }

})();