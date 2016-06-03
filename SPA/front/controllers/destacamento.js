(function () {
    'use strict';
    angular.module('atlas2-juego').controller('destacamentoCtrl', ['$scope', 'jugadorDestacamentoService', destacamentoCtrl]);

    function destacamentoCtrl($scope, jugadorDestacamentoService) {
        $scope.destacamentos = null;

        jugadorDestacamentoService.getAllDestacamentos().then(function (data) {
            $scope.destacamentos = data;
        });
    }

})();