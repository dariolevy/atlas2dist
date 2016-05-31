(function () {
    'use strict';
    angular.module('atlas2').service('uiService', ["$http", "$q", uiService]);

    function uiService($http, $q) {

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/ui?id=' + id)
            .success(function (ui) {
                defer.resolve(ui);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (ui) {
            var defer = $q.defer();

            $http.post('/api/ui', ui)
            .success(function (ui) {
                defer.resolve(ui);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (ui) {
            var defer = $q.defer();

            $http.put('/api/ui?id=' + ui.id, ui)
            .success(function (ui) {
                defer.resolve(ui);
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