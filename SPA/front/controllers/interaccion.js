(function () {
    'use strict';
    angular.module('atlas2-juego').controller('interaccionCtrl', ['$scope', '$q', '$routeParams', 'coloniaFactory', 'interaccionService', 'jugadorDestacamentoService', 'jugadorRecursoService', 'jugadorMapaService', interaccionCtrl]);

    function interaccionCtrl($scope, $q, $routeParams, coloniaFactory, interaccionService, jugadorDestacamentoService, jugadorRecursoService, jugadorMapaService) {
        var receiverId = $routeParams && $routeParams['receiverId'] ? $routeParams['receiverId'] : null;
        var interaccion = $routeParams && $routeParams['interaccion'] ? $routeParams['interaccion'] : null;

        $scope.showLoading = false;
        $scope.interaccionNombre = interaccion ? interaccion.charAt(0).toUpperCase() + $routeParams['interaccion'].slice(1) : null;

        $scope.destacamentos = null;
        $scope.recursos = null;
        $scope.destacamentosReceiver = null;
        $scope.recursosReceiver = null;
        $scope.receiverUsuario = null;

        $scope.requester = null;
        $scope.receiver = null;

        var currentMapa = coloniaFactory.getCurrent();

        var initialize = function () {
            $scope.requester = { id: currentMapa.id, flota: [], recurso: [] };
            $scope.receiver = { id: parseInt(receiverId), flota: [], recurso: [] };

            jugadorMapaService.getColoniaById(receiverId).then(function (colonia) {
                $scope.receiverUsuario = colonia.jugador;
            });

            interaccionService.getConfig(interaccion).then(function (config) {
                if (config.reqFlota){
                    destacamentoByColonia(currentMapa.id).then(function (destacamentos) {
                        $scope.destacamentos = destacamentos;
                    });
                }
                
                if (config.reqRec) {
                    recursoByColonia(currentMapa.id).then(function (recursos) {
                        $scope.recursos = recursos;
                    });
                }
                
                if (config.recFlota) {
                    destacamentoByColonia(receiverId).then(function (destacamentos) {
                        $scope.destacamentosReceiver = destacamentos;
                    });
                }

                if (config.recRec) {
                    recursoByColonia(receiverId).then(function (recursos) {
                        $scope.recursosReceiver = recursos;
                    });
                }
            });
        };

        var destacamentoByColonia = function (coloniaId) {
            var defer = $q.defer();

            jugadorDestacamentoService.getDestacamentoByColonia(coloniaId).then(function (jugadorDestacamento) {
                var destacamentoArray = [];
                for (var r in jugadorDestacamento) {
                    var rel = jugadorDestacamento[r];

                    rel.destacamento['relId'] = rel.id;

                    var cant = []
                    for (var c = 0; c <= rel.cantidad; c++) {
                        cant.push(c);
                    }

                    rel.destacamento['cantidad'] = cant;

                    destacamentoArray.push(rel.destacamento);
                }

                defer.resolve(destacamentoArray);
            });

            return defer.promise;
        };

        var recursoByColonia = function (coloniaId) {
            var defer = $q.defer();

            jugadorRecursoService.getRecursoByColonia(coloniaId).then(function (jugadorRecurso) {
                var recursoArray = [];
                for (var r in jugadorRecurso) {
                    var rel = jugadorRecurso[r];

                    rel.recurso['cantidad'] = rel.cantidadR;
                    rel.recurso['capacidad'] = rel.capacidad;

                    recursoArray.push(rel.recurso);
                }

                defer.resolve(recursoArray);
            });

            return defer.promise;
        };

        $scope.$on('mapa:current', function (event, data) {
            currentMapa = coloniaFactory.getCurrent();

            initialize();
        });

        if (currentMapa) {
            initialize();
        }
        
        $scope.ejecutarInteraccion = function () {
            var requester = this.requester;
            var receiver = this.receiver;
            $scope.showLoading = true;

            var reqFlota = [];
            for (var a in requester.flota) {
                var flota = requester.flota[a];
                reqFlota.push({
                    id: parseInt(a),
                    value : flota
                });
            }

            var reqRecurso = [];
            for (var b in requester.recurso) {
                var recurso = requester.recurso[b];
                reqRecurso.push({
                    id: parseInt(b),
                    value: recurso
                });
            }

            var recFlota = [];
            for (var c in receiver.flota) {
                var flota = receiver.flota[c];
                recFlota.push({
                    id: parseInt(c),
                    value: flota
                });
            }

            var recRecurso = [];
            for (var d in receiver.recurso) {
                var recurso = receiver.recurso[d];
                recRecurso.push({
                    id: parseInt(d),
                    value: recurso
                });
            }

            var int = {
                tipo: interaccion,
                requester: {
                    id : requester.id,
                    flota: reqFlota,
                    recurso: reqRecurso
                }, 
                receiver: {
                    id : receiver.id,
                    flota : recFlota,
                    recurso: recRecurso
                }
            }

            interaccionService.ejecutar(int).then(
                function (data) {
                    $scope.showLoading = false;
                    $('#mensaje-interaccion').fadeIn();

                    setTimeout(function () {
                        $('#mensaje-interaccion').fadeOut();
                        window.location = '#interaccion';
                    }, 1500);
                }, function () {
                    $scope.showLoading = false;
                }
            );
        }
    }

})();