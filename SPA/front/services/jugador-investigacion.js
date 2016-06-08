(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorInvestigacionService', ["$http", "$q", jugadorInvestigacionService]);

    function jugadorInvestigacionService($http, $q) {

        var getInvestigacionByColonia = function (colonia) {
            var defer = $q.defer();

            $http.get('/api/jugadorInvestigacion/' + colonia)
            .success(function (jugadorInvestigaciones) {
                defer.resolve(jugadorInvestigaciones);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var subirNivel = function (id) {
            var defer = $q.defer();

            $http.put('/api/jugadorInvestigacion/SubirNivel?id=' + id)
            .success(function (jugadorInvestigacion) {
                defer.resolve(jugadorInvestigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var bajarNivel = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugadorInvestigacion/BajarNivel?id=' + id)
            .success(function (jugadorInvestigacion) {
                defer.resolve(jugadorInvestigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getInvestigacionByColonia: getInvestigacionByColonia,
            subirNivel: subirNivel,
            bajarNivel: bajarNivel,
        }

    }

})();