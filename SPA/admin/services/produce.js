(function () {
    'use strict';
    angular.module('atlas2').service('produceService', ["$http", "$q", produceService]);

    function produceService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/produce')
            .success(function (producen) {
                defer.resolve(producen);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (produce) {
            var defer = $q.defer();

            $http.post('/api/produce', produce)
            .success(function (produce) {
                defer.resolve(produce);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (produce) {
            var defer = $q.defer();

            $http.put('/api/produce?id=' + produce.Id, produce)
            .success(function (produce) {
                defer.resolve(produce);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/produce?id=' + id)
            .success(function (produce) {
                defer.resolve(produce);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        //var getId = function (id) {
        //    var defer = $q.defer();

        //    $http.get('/api/produce?id=' + id)
        //    .success(function (produce) {
        //        defer.resolve(produce);
        //    })
        //    .error(function () {
        //        defer.reject('server error')
        //    });

        //    return defer.promise;
        //};

        return {
            getAll: getAll,
            //getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
        }

    }

})();