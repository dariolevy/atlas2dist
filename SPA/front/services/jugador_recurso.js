(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorRecursoService', ["$http", "$q", jugadorRecursoService]);

    function jugadorRecursoService($http, $q) {

        var getRec = function () {
            var defer = $q.defer();

            $http.get('/api/jugador_recurso')
            .success(function (jugador_recursos) {
                defer.resolve(jugador_recursos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (jugador_recurso) {
            var defer = $q.defer();

            $http.post('/api/jugador_recurso', jugador_recurso)
            .success(function (jugador_recurso) {
                defer.resolve(jugador_recurso);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugador_recurso) {
            var defer = $q.defer();

            $http.put('/api/jugador_recurso?id=' + jugador_recurso.id, jugador_recurso)
            .success(function (jugador_recurso) {
                defer.resolve(jugador_recurso);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugador_recurso?id=' + id)
            .success(function (jugador_recurso) {
                defer.resolve(jugador_recurso);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugador_recurso?id=' + id)
            .success(function (jugador_recurso) {
                defer.resolve(jugador_recurso);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getRec: getRec,
            getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
        }

    }

})();