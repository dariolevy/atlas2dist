(function () {
    'use strict';
    angular.module('atlas2').service('recursoService', ["$http", "$q", recursoService]);

    function recursoService($http, $q) {

        var getAll = function(){
            var defer = $q.defer();

            $http.get('/admin/api/recurso')
            .success(function (recursos) {
                defer.resolve(recursos);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function(recurso){
            var defer = $q.defer();

            $http.post('/admin/api/recurso', recurso)
            .success(function (recurso) {
                defer.resolve(recurso);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function(recurso){
            var defer = $q.defer();

            $http.put('/admin/api/recurso?id=' + recurso.id, recurso)
            .success(function (recurso) {
                defer.resolve(recurso);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function(id){
            var defer = $q.defer();

            $http.delete('/admin/api/recurso?id=' + id)
            .success(function (recurso) {
                defer.resolve(recurso);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function(id){
            var defer = $q.defer();

            $http.get('/admin/api/recurso?id='+id)
            .success(function (recurso) {
                defer.resolve(recurso);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getAll  : getAll,
            getId   : getId,
            add     : add,
            borrar  : borrar,
            edit    : edit,
        }

    }

})();