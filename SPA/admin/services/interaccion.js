(function () {
    'use strict';
    angular.module('atlas2').service('interaccionService', ["$http", "$q", interaccionService]);

    function interaccionService($http, $q) {

        var getAll = function(){
            var defer = $q.defer();

            $http.get('/admin/api/interaccion')
            .success(function (interacciones) {
                defer.resolve(interacciones);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function(interaccion){
            var defer = $q.defer();

            $http.post('/admin/api/interaccion', interaccion)
            .success(function (interaccion) {
                defer.resolve(interaccion);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function(interaccion){
            var defer = $q.defer();

            $http.put('/admin/api/interaccion?id=' + interaccion.id, interaccion)
            .success(function (interaccion) {
                defer.resolve(interaccion);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function(id){
            var defer = $q.defer();

            $http.delete('/admin/api/interaccion?id=' + id)
            .success(function (interaccion) {
                defer.resolve(interaccion);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function(id){
            var defer = $q.defer();

            $http.get('/admin/api/interaccion?id='+id)
            .success(function (interaccion) {
                defer.resolve(interaccion);
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