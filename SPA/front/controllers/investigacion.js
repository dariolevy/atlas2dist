(function () {
    'use strict';
    angular.module('atlas2-juego').controller('investigacionCtrl', ['$scope', 'jugadorInvestigacionService', investigacionCtrl]);

    function investigacionCtrl($scope, jugadorInvestigacionService) {
        $scope.investigaciones = null;

        jugadorInvestigacionService.getAllInvestigaciones().then(function (data) {
            $scope.investigaciones = data;
        });
    }

})();