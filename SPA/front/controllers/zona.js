(function () {
    'use strict';
    angular.module('atlas2-juego').controller('zonaCtrl', ['$scope', 'jugadorMapaService', 'coloniaFactory', zonaCtrl]);

    function zonaCtrl($scope, jugadorMapaService, coloniaFactory) {
        $scope.mapas = [];
        $scope.zonaRows = [];
        $scope.filtros = [];

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

                    $scope.filtros[mapa.nivel] = rowSelected;
                }

                cargarZonasRow(coord);

                $scope.mapas = mapas;
            });
        };

        var cargarZonasRow = function (coordenada) {
            var zonaRows = [];
            var cantidad = zona.cantidad;
            var nivel = zona.nivel;

            jugadorMapaService.getByCoordenadas(coordenada).then(function (colonias) {
                var coloniaArray = [];
                for (var c in colonias) {
                    var colonia = colonias[c];
                    coloniaArray[colonia['nivel' + nivel]] = colonia;
                }

                var coord = '/' + coordenada.join('/') + '/';
                for (var z = 1; z <= cantidad; z++) {
                    var current = (currentMapa.coord == '/' || (currentMapa['nivel' + nivel] && coord == currentMapa.coord)) ? currentMapa['nivel' + nivel] : null;

                    var jugador = null;
                    var coloniaId = null;
                    if (coloniaArray[z]) {
                        jugador = coloniaArray[z].jugador;
                        coloniaId = coloniaArray[z].id;
                    }

                    var classRow = '';
                    if (current == z) {
                        classRow = 'info';
                    }

                    zonaRows.push({
                        id: z,
                        coloniaId : coloniaId,
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

        $(document).on('change', '.filtros', function () {
            var valor = $(this).val();
            var nivel = $(this).data('nivel');

            $scope.filtros[nivel] = parseInt(valor);

            var coord = [];
            for (var f in $scope.filtros) {
                var filtro = $scope.filtros[f];

                coord.push(filtro);
            }

            cargarZonasRow(coord);

            $scope.$apply();
        });
    }

})();