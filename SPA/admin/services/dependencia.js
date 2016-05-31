(function () {
    'use strict';
    angular.module('atlas2').service('dependenciaService', ["$http", "$q", dependenciaService]);

    function dependenciaService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/admin/api/dependencia')
            .success(function (dependencias) {
                defer.resolve(dependencias);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (dependencia) {
            var defer = $q.defer();

            dependencia['hijoId'] = parseInt(dependencia['hijoId']);
            dependencia['padreId'] = parseInt(dependencia['padreId']);

            $http.post('/admin/api/dependencia', dependencia)
            .success(function (dependencia) {
                defer.resolve(dependencia);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (dependencia) {
            var defer = $q.defer();

            dependencia['hijoId'] = parseInt(dependencia['hijoId']);
            dependencia['padreId'] = parseInt(dependencia['padreId']);

            delete dependencia.hijo;
            delete dependencia.padre;

            $http.put('/admin/api/dependencia?id=' + dependencia.id, dependencia)
            .success(function (dependencia) {
                defer.resolve(dependencia);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/admin/api/dependencia?id=' + id)
            .success(function (dependencia) {
                defer.resolve(dependencia);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/admin/api/dependencia?id=' + id)
            .success(function (dependencia) {
                defer.resolve(dependencia);
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