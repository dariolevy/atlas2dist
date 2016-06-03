(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorEdificioService', ["$http", "$q", jugadorEdificioService]);

    function jugadorEdificioService($http, $q) {

        var getAllEdificios = function () {
            var defer = $q.defer();

            $http.get('/api/edificio')
            .success(function (jugadorEdificios) {
                defer.resolve(jugadorEdificios);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;

        };
        var getEdi = function () {
            var defer = $q.defer();

            $http.get('/api/jugadorEdificio')
            .success(function (jugadorEdificios) {
                defer.resolve(jugadorEdificios);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (jugadorEdificio) {
            var defer = $q.defer();

            $http.post('/api/jugadorEdificio', jugadorEdificio)
            .success(function (jugadorEdificio) {
                defer.resolve(jugadorEdificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugadorEdificio) {
            var defer = $q.defer();

            $http.put('/api/jugadorEdificio?id=' + jugadorEdificio.id, jugadorEdificio)
            .success(function (jugadorEdificio) {
                defer.resolve(jugadorEdificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugadorEdificio?id=' + id)
            .success(function (jugadorEdificio) {
                defer.resolve(jugadorEdificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugadorEdificio?id=' + id)
            .success(function (jugadorEdificio) {
                defer.resolve(jugadorEdificio);
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
            getAllEdificios: getAllEdificios
        }

    }

})();