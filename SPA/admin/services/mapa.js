(function () {
    'use strict';
    angular.module('atlas2').service('mapaService', ["$http", "$q", mapaService]);

    function mapaService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/mapa')
            .success(function (mapas) {
                defer.resolve(mapas);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (mapa) {
            var defer = $q.defer();

            $http.post('/api/mapa', mapa)
            .success(function (mapa) {
                defer.resolve(mapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (mapa) {
            var defer = $q.defer();

            $http.put('/api/mapa?id=' + mapa.id, mapa)
            .success(function (mapa) {
                defer.resolve(mapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/mapa?id=' + id)
            .success(function (mapa) {
                defer.resolve(mapa);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/mapa?id=' + id)
            .success(function (mapa) {
                defer.resolve(mapa);
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