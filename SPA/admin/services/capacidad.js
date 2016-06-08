(function () {
    'use strict';
    angular.module('atlas2').service('capacidadService', ["$http", "$q", capacidadService]);

    function capacidadService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/capacidad')
            .success(function (capacidades) {
                defer.resolve(capacidades);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (capacidad) {
            var defer = $q.defer();

            $http.post('/api/capacidad', capacidad)
            .success(function (capacidad) {
                defer.resolve(capacidad);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (capacidad) {
            var defer = $q.defer();

            $http.put('/api/capacidad?id=' + capacidad.Id, capacidad)
            .success(function (capacidad) {
                defer.resolve(capacidad);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/capacidad?id=' + id)
            .success(function (capacidad) {
                defer.resolve(capacidad);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        //var getId = function (id) {
        //    var defer = $q.defer();

        //    $http.get('/api/capacidad?id=' + id)
        //    .success(function (capacidad) {
        //        defer.resolve(capacidad);
        //    })
        //    .error(function () {
        //        defer.reject('server error')
        //    });

        //    return defer.promise;
        //};

        return {
            getAll: getAll,
            //getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
        }

    }

})();