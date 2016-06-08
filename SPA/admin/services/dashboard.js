(function () {
    'use strict';
    angular.module('atlas2').service('dashboardService', ["$http", "$q", dashboardService]);

    function dashboardService($http, $q) {

        var getByNuevos = function () {
            var defer = $q.defer();

            $http.get('/api/reporteregistro')
            .success(function (datos) {
                defer.resolve(datos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getBySesion = function () {
            var defer = $q.defer();

            $http.get('/api/reportelogin')
            .success(function (datos) {
                defer.resolve(datos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getByNuevos: getByNuevos,
            getBySesion: getBySesion,
        }

    }

})();