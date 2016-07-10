(function () {
    'use strict';
    angular.module('atlas2-juego').controller('homeCtrl', ['$scope', 'coloniaFactory', 'jugadorEdificioService', 'jugadorDestacamentoService', 'jugadorInvestigacionService', homeCtrl]);

    function homeCtrl($scope, coloniaFactory, jugadorEdificioService, jugadorDestacamentoService, jugadorInvestigacionService) {
        $scope.construyendoEdificio = [];
        $scope.construyendoDestacamento = [];
        $scope.construyendoInvestigacion = [];

        var currentMapa = coloniaFactory.getCurrent();

        var initialize = function () {
            var today = moment();
            var edificioArray = [];
            var destacamentoArray = [];
            var investigacionArray = [];

            jugadorEdificioService.getEdificioByColonia(currentMapa.id).then(function (jugadorEdificio) {
                for (var r in jugadorEdificio) {
                    var rel = jugadorEdificio[r];

                    var construccion = {
                        nombre: rel.edificio.nombre,
                        mensaje: 'Subiendo al nivel ' + (rel.nivelE + 1),
                        finaliza: 'Finaliza ' + moment(rel.finalizaConstruccion).format('DD/MM/YYYY hh:mm:ss')
                    }

                    if (today.isBefore(moment(rel.finalizaConstruccion), 'second')) {
                        edificioArray.push(construccion);
                    }
                }

                $scope.construyendoEdificio = edificioArray;
            });

            jugadorDestacamentoService.getDestacamentoByColonia(currentMapa.id).then(function (jugadorDestacamento) {
                for (var r in jugadorDestacamento) {
                    var rel = jugadorDestacamento[r];

                    var construccion = {
                        nombre: rel.destacamento.nombre,
                        mensaje: 'Creando nuevas unidades',
                        finaliza: 'Finaliza ' + moment(rel.finalizaConstruccion).format('DD/MM/YYYY hh:mm:ss')
                    }

                    if (today.isBefore(moment(rel.finalizaConstruccion), 'second')) {
                        destacamentoArray.push(construccion);
                    }
                }

                $scope.construyendoDestacamento = destacamentoArray;
            });

            jugadorInvestigacionService.getInvestigacionByColonia(currentMapa.id).then(function (jugadorInvestigacion) {
                for (var r in jugadorInvestigacion) {
                    var rel = jugadorInvestigacion[r];

                    var construccion = {
                        nombre: rel.investigacion.nombre,
                        mensaje: 'Subiendo al nivel ' + (rel.nivel +1),
                        finaliza: 'Finaliza ' + moment(rel.finalizaConstruccion).format('DD/MM/YYYY hh:mm:ss')
                    }

                    if (today.isBefore(moment(rel.finalizaConstruccion), 'second')) {
                        investigacionArray.push(construccion);
                    }
                }
            });

            $scope.construyendoInvestigacion = investigacionArray;
        };

        $scope.$on('mapa:current', function (event, data) {
            currentMapa = coloniaFactory.getCurrent();

            initialize();
        });

        if (currentMapa) {
            initialize();
        }
    }

})();