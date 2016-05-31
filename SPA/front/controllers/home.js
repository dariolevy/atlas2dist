(function () {
    'use strict';
    angular.module('atlas2-juego').controller('homeCtrl', ['$scope', '$rootScope', homeCtrl]);

    function homeCtrl($scope, $rootScope) {

        $scope.$on('mapa:current', function (event, data) {
            console.log(data)
        });
    }

})();