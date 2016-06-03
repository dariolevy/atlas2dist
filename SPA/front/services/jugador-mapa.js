(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorMapaService', ["$http", "$q", jugadorMapaService]);

    function jugadorMapaService($http, $q) {

        var getAll = function () {
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

        var add = function (jugadorMapa) {
            var defer = $q.defer();

            $http.post('/api/jugadorMapa', jugadorMapa)
            .success(function (jugadorMapa) {
                defer.resolve(jugadorMapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugadorMapa) {
            var defer = $q.defer();

            $http.put('/api/jugadorMapa?id=' + jugadorMapa.id, jugadorMapa)
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

            $http.delete('/api/jugadorMapa?id=' + id)
            .success(function (jugadorMapa) {
                defer.resolve(jugadorMapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugadorMapa?id=' + id)
            .success(function (jugadorMapa) {
                defer.resolve(jugadorMapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getAll: getAll,
            getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
        }

    }

})();