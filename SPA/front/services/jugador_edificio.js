(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorEdificioService', ["$http", "$q", jugadorEdificioService]);

    function jugadorEdificioService($http, $q) {

        var getEdi = function () {
            var defer = $q.defer();

            $http.get('/api/jugador_edificio')
            .success(function (jugador_edificios) {
                defer.resolve(jugador_edificios);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (jugador_edificio) {
            var defer = $q.defer();

            $http.post('/api/jugador_edificio', jugador_edificio)
            .success(function (jugador_edificio) {
                defer.resolve(jugador_edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugador_edificio) {
            var defer = $q.defer();

            $http.put('/api/jugador_edificio?id=' + jugador_edificio.id, jugador_edificio)
            .success(function (jugador_edificio) {
                defer.resolve(jugador_edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugador_edificio?id=' + id)
            .success(function (jugador_edificio) {
                defer.resolve(jugador_edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugador_edificio?id=' + id)
            .success(function (jugador_edificio) {
                defer.resolve(jugador_edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getEdi: getEdi,
            getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
        }

    }

})();