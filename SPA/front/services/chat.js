(function () {
    'use strict';
    angular.module('atlas2-juego').service('chatService', ['$http', '$q', chatService]);

    function chatService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/alianza')
            .success(function (alianzas) {
                defer.resolve(alianzas);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (alianza) {
            var defer = $q.defer();

            $http.post('/api/edificio', alianza)
            .success(function (alianza) {
                defer.resolve(alianza);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/alianza/' + id)
            .success(function (alianza) {
                defer.resolve(alianza);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var unirse = function (jugadorAlianza) {
            var defer = $q.defer();

            $http.post('/api/jugadorAlianza', jugadorAlianza)
            .success(function (jugadorAlianza) {
                defer.resolve(jugadorAlianza);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getAll: getAll,
            unirse: unirse,
            add: add,
            borrar: borrar
        }

    }

})();