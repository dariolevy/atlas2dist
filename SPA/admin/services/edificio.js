(function () {
    'use strict';
    angular.module('atlas2').service('edificioService', ["$http", "$q", edificioService]);

    function edificioService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/admin/api/edificio')
            .success(function (edificios) {
                defer.resolve(edificios);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (edificio) {
            var defer = $q.defer();

            $http.post('/admin/api/edificio', edificio)
            .success(function (edificio) {
                defer.resolve(edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (edificio) {
            var defer = $q.defer();

            $http.put('/admin/api/edificio?id=' + edificio.id, edificio)
            .success(function (edificio) {
                defer.resolve(edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/admin/api/edificio?id=' + id)
            .success(function (edificio) {
                defer.resolve(edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/admin/api/edificio?id=' + id)
            .success(function (edificio) {
                defer.resolve(edificio);
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