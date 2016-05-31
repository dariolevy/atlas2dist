(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorDestacamentoService', ["$http", "$q", jugadorDestacamentoService]);

    function jugadorDestacamentoService($http, $q) {

        var getDes = function () {
            var defer = $q.defer();

            $http.get('/api/jugador_destacamento')
            .success(function (jugador_destacamentos) {
                defer.resolve(jugador_destacamentos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (jugador_destacamento) {
            var defer = $q.defer();

            $http.post('/api/jugador_destacamento', jugador_destacamento)
            .success(function (jugador_destacamento) {
                defer.resolve(jugador_destacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugador_destacamento) {
            var defer = $q.defer();

            $http.put('/api/jugador_destacamento?id=' + jugador_destacamento.id, jugador_destacamento)
            .success(function (jugador_destacamento) {
                defer.resolve(jugador_destacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugador_destacamento?id=' + id)
            .success(function (jugador_destacamento) {
                defer.resolve(jugador_destacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugador_destacamento?id=' + id)
            .success(function (jugador_destacamento) {
                defer.resolve(jugador_destacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getDes: getDes,
            getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
        }

    }

})();