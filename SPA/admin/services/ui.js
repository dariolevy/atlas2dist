(function () {
    'use strict';
    angular.module('atlas2').service('uiService', ["$http", "$q", uiService]);

    function uiService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            //$http.get('/admin/api/mapa')
            //.success(function (mapas) {
            //    defer.resolve(mapas);
            //})
            //.error(function () {
            //    defer.reject('server error')
            //});

            return defer.promise;
        };

        return {
            getAll: getAll,
        }

    }

})();