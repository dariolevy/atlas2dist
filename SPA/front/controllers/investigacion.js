(function () {
    'use strict';
    angular.module('atlas2-juego').controller('investigacionCtrl', ['$scope', '$filter', 'jugadorInvestigacionService', 'coloniaFactory', 'toastr', investigacionCtrl]);

    function investigacionCtrl($scope, $filter, jugadorInvestigacionService, coloniaFactory, toastr) {
        $scope.investigaciones = null;
        $scope.investigacion = null;
        $scope.showLoading = null;

        var currentMapa = coloniaFactory.getCurrent();

        var initialize = function () {
            jugadorInvestigacionService.getInvestigacionByColonia(currentMapa.id).then(function (jugadorInvestigacion) {
                var today = moment();
                var investigacionArray = [];
                for (var r in jugadorInvestigacion) {
                    var rel = jugadorInvestigacion[r];

                    rel.investigacion['nivel'] = rel.nivel;
                    rel.investigacion['relId'] = rel.id;

                    if (today.isBefore(moment(rel.finalizaConstruccion), 'second')) {
                        rel.investigacion['enConstruccion'] = true;
                    } else {
                        rel.investigacion['enConstruccion'] = false;
                    }

                    investigacionArray.push(rel.investigacion);
                }

                $scope.investigaciones = investigacionArray;
            });
        };

        $scope.$on('mapa:current', function (event, data) {
            currentMapa = coloniaFactory.getCurrent();

            initialize();
        });

        if (currentMapa) {
            initialize();
        }

        $scope.subirNivel = function (investigacion) {
            $scope.showLoading = investigacion.id;

            setTimeout(function () {
                jugadorInvestigacionService.subirNivel(investigacion.relId).then(
                    function (data) {
                        $scope.showLoading = null;
                        investigacion.enConstruccion = true;
                    }, function () {
                        $scope.showLoading = null;
                        toastr.error("Recursos insuficientes");
                    }
                );
            }, 2000);
        }

        $scope.bajarNivel = function (investigacion) {
            $scope.showLoading = investigacion.id;

            setTimeout(function () {
                jugadorInvestigacionService.bajarNivel(investigacion.relId).then(
                    function (data) {
                        $scope.showLoading = null;
                        investigacion.nivel--;
                    }, function () {
                        $scope.showLoading = null;
                    }
                );
            }, 2000);
        }

        $scope.mostrarInfo = function (investigacion) {
            $scope.investigacion = investigacion;
            $('#modal-info-investigacion').modal('show');
        }

        $('#modal-info-investigacion').on('hidden.bs.modal', function (e) {
            $scope.investigacion = null;
        });
    }

})();