(function () {
    'use strict';
    angular.module('atlas2').service('dashboardService', ["$http", "$q", dashboardService]);

    function dashboardService($http, $q) {

        var getByNuevos = function () {
            var defer = $q.defer();

            //$http.get('/admin/api/mapa')
            //.success(function (mapas) {
            //    defer.resolve(mapas);
            //})
            //.error(function () {
            //    defer.reject('server error')
            //});

            var data = [
                { "period": "Jan", "Hours worked": 80 },
              { "period": "Feb", "Hours worked": 125 },
              { "period": "Mar", "Hours worked": 176 },
              { "period": "Apr", "Hours worked": 224 },
              { "period": "May", "Hours worked": 265 },
              { "period": "Jun", "Hours worked": 314 },
              { "period": "Jul", "Hours worked": 347 },
              { "period": "Aug", "Hours worked": 287 },
              { "period": "Sep", "Hours worked": 240 },
              { "period": "Oct", "Hours worked": 211 }
            ];
            defer.resolve(data);

            return defer.promise;
        };

        var getBySesion = function () {
            var defer = $q.defer();

            //$http.get('/admin/api/mapa')
            //.success(function (mapas) {
            //    defer.resolve(mapas);
            //})
            //.error(function () {
            //    defer.reject('server error')
            //});

            var data = [
                { "period": "Jan", "Hours worked": 80 },
              { "period": "Feb", "Hours worked": 125 },
              { "period": "Mar", "Hours worked": 176 },
              { "period": "Apr", "Hours worked": 224 },
              { "period": "May", "Hours worked": 265 },
              { "period": "Jun", "Hours worked": 314 },
              { "period": "Jul", "Hours worked": 347 },
              { "period": "Aug", "Hours worked": 287 },
              { "period": "Sep", "Hours worked": 240 },
              { "period": "Oct", "Hours worked": 211 }
            ];
            defer.resolve(data);

            return defer.promise;
        };

        return {
            getByNuevos: getByNuevos,
            getBySesion: getBySesion,
        }

    }

})();