(function () {
    'use strict';
    angular.module('atlas2').service('destacamentoService', ["$http", "$q", destacamentoService]);

    function destacamentoService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/destacamento')
            .success(function (destacamentos) {
                defer.resolve(destacamentos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (destacamento) {
            var defer = $q.defer();

            $http.post('/api/destacamento', destacamento)
            .success(function (destacamento) {
                defer.resolve(destacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (destacamento) {
            var defer = $q.defer();

            $http.put('/api/destacamento?id=' + destacamento.id, destacamento)
            .success(function (destacamento) {
                defer.resolve(destacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/destacamento?id=' + id)
            .success(function (destacamento) {
                defer.resolve(destacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/destacamento?id=' + id)
            .success(function (destacamento) {
                defer.resolve(destacamento);
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