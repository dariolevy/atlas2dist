(function () {
    'use strict';
    angular.module('atlas2').service('investigacionService', ["$http", "$q", investigacionService]);

    function investigacionService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/investigacion')
            .success(function (investigaciones) {
                defer.resolve(investigaciones);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (investigacion) {
            var defer = $q.defer();

            $http.post('/api/investigacion', investigacion)
            .success(function (investigacion) {
                defer.resolve(investigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (investigacion) {
            var defer = $q.defer();

            $http.put('/api/investigacion?id=' + investigacion.id, investigacion)
            .success(function (investigacion) {
                defer.resolve(investigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/investigacion?id=' + id)
            .success(function (investigacion) {
                defer.resolve(investigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/investigacion?id=' + id)
            .success(function (investigacion) {
                defer.resolve(investigacion);
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