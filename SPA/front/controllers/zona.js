(function () {
    'use strict';
    angular.module('atlas2-juego').controller('zonaCtrl', ['$scope', 'jugadorMapaService', 'coloniaFactory', zonaCtrl]);

    function zonaCtrl($scope, jugadorMapaService, coloniaFactory) {
        $scope.iteraccion = null;
        $scope.mapas = null;
        $scope.zona = null;
        $scope.zonaRows = null;
        var filtros = [];

        var currentMapa = coloniaFactory.getCurrent();
        var zona = null;

        var initialize = function () {
            jugadorMapaService.getAllMapas().then(function (mapas) {
                zona = mapas.pop();
                var coord = currentMapa.coord.split('/');

                coord.pop();
                coord.shift();

                for (var m in mapas) {
                    var mapa = mapas[m];
                    var rowSelected = parseInt(coord[m]);

                    var cant = []
                    for (var c = 1; c <= mapa.cantidad; c++) {
                        cant.push(c);
                    }

                    mapa['zonas'] = cant;
                    mapa['selected'] = rowSelected;
                }

                cargarZonasRow(coord);

                $scope.mapas = mapas;
            });
        };

        var cargarZonasRow = function (coordenada) {
            var zonaRows = [];
            var cantidad = zona.cantidad;
            var nivel = zona.nivel;

            console.log(coordenada)

            jugadorMapaService.getByCoordenadas(coordenada).then(function (colonias) {
                var coloniaArray = [];
                for (var c in colonias) {
                    var colonia = colonias[c];
                    coloniaArray[colonia['nivel' + nivel]] = colonia;
                }

                for (var z = 1; z <= cantidad; z++) {
                    var current = currentMapa['nivel' + nivel];

                    var jugador = {};
                    if (coloniaArray[z]) {
                        jugador = coloniaArray[z].jugador;
                    }

                    var classRow = '';
                    if (current == z) {
                        classRow = 'info';
                    }

                    zonaRows.push({
                        id: z,
                        classRow: classRow,
                        nombre: zona.nombre + ' ' + z,
                        jugador: jugador,
                        alianza: ''
                    });
                }

                $scope.zonaRows = zonaRows;
            });
        };

        $scope.$on('mapa:current', function (event, data) {
            currentMapa = coloniaFactory.getCurrent();

            initialize();
        });

        if (currentMapa) {
            initialize();
        }

        $scope.recargarZona = function (nivel) {
            filtros[nivel] = this.filtro;

            console.log(filtros);
        };

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