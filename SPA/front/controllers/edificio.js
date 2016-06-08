(function () {
    'use strict';
    angular.module('atlas2-juego').controller('edificioCtrl', ['$scope', '$filter', 'jugadorEdificioService', 'coloniaFactory', edificioCtrl]);

    function edificioCtrl($scope, $filter, jugadorEdificioService, coloniaFactory) {
        $scope.edificios = null;
        $scope.edificio = null;
        $scope.showLoading = null;

        var currentMapa = coloniaFactory.getCurrent();
        
        var initialize = function () {
            jugadorEdificioService.getEdificioByColonia(currentMapa.id).then(function (jugadorEdificio) {
                var edificioArray = [];
                for (var r in jugadorEdificio) {
                    var rel = jugadorEdificio[r];

                    rel.edificio['nivel'] = rel.nivelE;
                    rel.edificio['relId']= rel.id;

                    edificioArray.push(rel.edificio);
                }

                $scope.edificios = edificioArray;
            });
        };

        $scope.$on('mapa:current', function (event, data) {
            currentMapa = coloniaFactory.getCurrent();

            initialize();
        });

        if (currentMapa) {
            initialize();
        }

        $scope.subirNivel = function (edificio) {
            $scope.showLoading = edificio.id;
            
            setTimeout(function () {
                jugadorEdificioService.subirNivel(edificio.relId).then(
                    function (data) {
                        $scope.showLoading = null;
                        edificio.nivel++;
                    }, function () {
                        $scope.showLoading = null;
                    }
                );
            }, 3000);
            
        }

        $scope.bajarNivel = function (edificio) {
            $scope.showLoading = edificio.id;
            
            setTimeout(function () {
                jugadorEdificioService.bajarNivel(edificio.relId).then(
                    function (data) {
                        $scope.showLoading = null;
                        edificio.nivel--;
                    }, function () {
                        $scope.showLoading = null;
                    }
                );
            }, 3000);
        }

        $scope.mostrarInfo = function (edificio) {
            $scope.edificio = edificio;
            $('#modal-info-edificio').modal('show');
        }

        $('#modal-info-edificio').on('hidden.bs.modal', function (e) {
            $scope.edificio = null;
        })
    }

})();