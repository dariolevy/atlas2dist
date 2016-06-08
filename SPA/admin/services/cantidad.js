(function () {
    'use strict';
    angular.module('atlas2').service('cantidadService', ["$http", "$q", cantidadService]);

    function cantidadService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/cantidad')
            .success(function (cantidades) {
                defer.resolve(cantidades);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (cantidad) {
            var defer = $q.defer();

            $http.post('/api/cantidad', cantidad)
            .success(function (cantidad) {
                defer.resolve(cantidad);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (cantidad) {
            var defer = $q.defer();

            $http.put('/api/cantidad?id=' + cantidad.Id, cantidad)
            .success(function (cantidad) {
                defer.resolve(cantidad);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/cantidad?id=' + id)
            .success(function (cantidad) {
                defer.resolve(cantidad);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/cantidad?id=' + id)
            .success(function (cantidad) {
                defer.resolve(cantidad);
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