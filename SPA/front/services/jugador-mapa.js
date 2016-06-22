(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorMapaService', ["$http", "$q", jugadorMapaService]);

    function jugadorMapaService($http, $q) {

        var getAllMapas = function () {
            var defer = $q.defer();

            $http.get('/api/mapa')
            .success(function (mapas) {
                defer.resolve(mapas);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getColonias = function () {
            var defer = $q.defer();

            $http.get('/api/jugadorMapa')
            .success(function (jugadorMapas) {
                defer.resolve(jugadorMapas);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getColoniaById = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugadorMapa/' + id)
            .success(function (jugadorMapas) {
                defer.resolve(jugadorMapas);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getByCoordenadas = function (coordenadas) {
            var defer = $q.defer();

            $http.post('/api/jugadorMapa/ByCoordenadas', coordenadas)
            .success(function (jugadorMapas) {
                defer.resolve(jugadorMapas);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getAllMapas: getAllMapas,
            getColonias: getColonias,
            getByCoordenadas: getByCoordenadas,
            getColoniaById: getColoniaById
        }

    }

})();