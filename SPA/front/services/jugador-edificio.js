(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorEdificioService', ['$http', '$q', jugadorEdificioService]);

    function jugadorEdificioService($http, $q) {

        var getEdificioByColonia = function (colonia) {
            var defer = $q.defer();

            $http.get('/api/jugadorEdificio/' + colonia)
            .success(function (jugadorEdificios) {
                defer.resolve(jugadorEdificios);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var subirNivel = function (id) {
            var defer = $q.defer();

            $http.put('/api/jugadorEdificio/SubirNivel?id=' + id)
            .success(function (jugadorEdificio) {
                defer.resolve(jugadorEdificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var bajarNivel = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugadorEdificio/BajarNivel?id=' + id)
            .success(function (jugadorEdificio) {
                defer.resolve(jugadorEdificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getEdificioByColonia: getEdificioByColonia,
            subirNivel: subirNivel,
            bajarNivel: bajarNivel,
        }

    }

})();