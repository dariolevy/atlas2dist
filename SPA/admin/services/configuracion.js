(function () {
    'use strict';
    angular.module('atlas2').service('confService', ["$http", "$q", confService]);

    function confService($http, $q) {

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/configuracion?id=' + id)
            .success(function (conf) {
                defer.resolve(conf);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (conf) {
            var defer = $q.defer();

            $http.post('/api/configuracion', conf)
            .success(function (conf) {
                defer.resolve(conf);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (conf) {
            var defer = $q.defer();

            $http.put('/api/configuracion?id=' + conf.id, conf)
            .success(function (conf) {
                defer.resolve(conf);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getId: getId,
            add: add,
            edit:edit
        }

    }

})();