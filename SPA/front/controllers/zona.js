(function () {
    'use strict';
    angular.module('atlas2-juego').controller('zonaCtrl', ['$scope', zonaCtrl]);

    function zonaCtrl($scope) {
        $scope.iteraccion = null;

        $scope.mostrarIteraccion = function(){
            $('#modal-iteraccion').modal('show');
            console.log('show');
        }

        $scope.guardarIteraccion = function () {
            console.log(this.iteraccion);

            $('#modal-iteraccion').modal('hide');
        }

    }

})();