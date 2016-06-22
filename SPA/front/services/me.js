(function () {
    'use strict';
    angular.module('atlas2-juego').service('meService', ["$http", "$q", meService]);

    function meService($http, $q) {

        var me = function () {
            var defer = $q.defer();

            $http.get('/api/me')
            .success(function (me) {
                defer.resolve(me);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            me: me
        }

    }

})();