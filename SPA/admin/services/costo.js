(function () {
    'use strict';
    angular.module('atlas2').service('costoService', ["$http", "$q", costoService]);

    function costoService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/costo')
            .success(function (costos) {
                defer.resolve(costos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (costo) {
            var defer = $q.defer();

            $http.post('/api/costo', costo)
            .success(function (costo) {
                defer.resolve(costo);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (costo) {
            var defer = $q.defer();

            $http.put('/api/costo?id=' + costo.Id, costo)
            .success(function (costo) {
                defer.resolve(costo);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/costo?id=' + id)
            .success(function (costo) {
                defer.resolve(costo);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        //var getId = function (id) {
        //    var defer = $q.defer();

        //    $http.get('/api/costo?id=' + id)
        //    .success(function (costo) {
        //        defer.resolve(costo);
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