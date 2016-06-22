(function () {
    'use strict';
    angular.module('atlas2-juego').service('interaccionService', ["$http", "$q", interaccionService]);

    function interaccionService($http, $q) {

        var getConfig = function (interaccion) {
            var defer = $q.defer();

            $http.get('/api/interacciones?nombre=' + interaccion)
            .success(function (config) {
                defer.resolve(config);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var ejecutar = function (interaccion) {
            var defer = $q.defer();

            $http.post('/api/interacciones', interaccion)
            .success(function (interaccion) {
                defer.resolve(interaccion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getInteraccionByColonia = function (colonia) {
            var defer = $q.defer();

            $http.get('/api/interacciones/' + colonia)
            .success(function (jugadorInteracciones) {
                defer.resolve(jugadorInteracciones);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getConfig: getConfig,
            ejecutar: ejecutar,
            getInteraccionByColonia: getInteraccionByColonia
        }

    }

})();