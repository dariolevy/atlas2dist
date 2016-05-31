(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorMapaService', ["$http", "$q", jugadorMapaService]);

    function jugadorMapaService($http, $q) {

        var getMap = function () {
            var defer = $q.defer();

            $http.get('/api/jugador_mapa')
            .success(function (jugador_mapas) {
                defer.resolve(jugador_mapas);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (jugador_mapa) {
            var defer = $q.defer();

            $http.post('/api/jugador_mapa', jugador_mapa)
            .success(function (jugador_mapa) {
                defer.resolve(jugador_mapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugador_mapa) {
            var defer = $q.defer();

            $http.put('/api/jugador_mapa?id=' + jugador_mapa.id, jugador_mapa)
            .success(function (jugador_mapa) {
                defer.resolve(jugador_mapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugador_mapa?id=' + id)
            .success(function (jugador_mapa) {
                defer.resolve(jugador_mapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugador_mapa?id=' + id)
            .success(function (jugador_mapa) {
                defer.resolve(jugador_mapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getMap: getMap,
            getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
        }

    }

})();