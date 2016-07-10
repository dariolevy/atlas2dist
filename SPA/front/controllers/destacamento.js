(function () {
    'use strict';
    angular.module('atlas2-juego').controller('destacamentoCtrl', ['$scope', 'jugadorDestacamentoService', 'coloniaFactory','toastr', destacamentoCtrl]);

    function destacamentoCtrl($scope, jugadorDestacamentoService, coloniaFactory, toastr) {
        $scope.destacamentos = null;
        $scope.destacamento = null;
        $scope.showLoading = null;
        $scope.cantidad = 1;

        var currentMapa = coloniaFactory.getCurrent();

        var initialize = function () {
            jugadorDestacamentoService.getDestacamentoByColonia(currentMapa.id).then(function (jugadorDestacamento) {
                var today = moment();

                var destacamentoArray = [];
                for (var r in jugadorDestacamento) {
                    var rel = jugadorDestacamento[r];

                    rel.destacamento['cantidad'] = rel.cantidad;
                    rel.destacamento['relId'] = rel.id;

                    if (today.isBefore(moment(rel.finalizaConstruccion), 'second')) {
                        rel.destacamento['enConstruccion'] = true;
                    } else {
                        rel.destacamento['enConstruccion'] = false;
                    }

                    destacamentoArray.push(rel.destacamento);
                }

                $scope.destacamentos = destacamentoArray;
            });
        };

        $scope.$on('mapa:current', function (event, data) {
            currentMapa = coloniaFactory.getCurrent();

            initialize();
        });

        if (currentMapa) {
            initialize();
        }

        $scope.subirCantidad = function (destacamento, cantidad) {
            $scope.showLoading = destacamento.id;

            setTimeout(function () {
                jugadorDestacamentoService.subirCantidad(destacamento, cantidad).then(
                    function (data) {
                        $scope.showLoading = null;
                        destacamento.enConstruccion = true;
                    }, function () {
                        $scope.showLoading = null;
                        toastr.error("Recursos insuficientes");
                    }
                );
            }, 2000);
        }

        $scope.bajarCantidad = function (destacamento, cantidad) {
            $scope.showLoading = destacamento.id;

            var cantAntes = destacamento.cantidad;

            setTimeout(function () {
                jugadorDestacamentoService.bajarCantidad(destacamento, cantidad).then(
                    function (data) {
                        $scope.showLoading = null;
                        destacamento.cantidad = cantAntes - parseInt(cantidad);
                    }, function () {
                        $scope.showLoading = null;
                    }
                );
            }, 2000);
        }

        $scope.mostrarInfo = function (destacamento) {
            $scope.destacamento = destacamento;
            $('#modal-info-destacamento').modal('show');
        }

        $('#modal-info-destacamento').on('hidden.bs.modal', function (e) {
            $scope.destacamento = null;
        });
    }

})();