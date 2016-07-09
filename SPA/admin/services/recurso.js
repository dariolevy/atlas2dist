(function () {
    'use strict';
    angular.module('atlas2').service('recursoService', ["$http", "$q", recursoService]);

    function recursoService($http, $q) {

        var getAll = function(){
            var defer = $q.defer();

            $http.get('/api/recurso')
            .success(function (recursos) {
                defer.resolve(recursos);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        var subirImagen = function (file) {
            var defer = $q.defer();
            
            var fd = new FormData();
            fd.append('file', file);
            $http.post('/api/imagenes', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },
            })
            .success(function (response) {
                defer.resolve(response);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        }

        var add = function(recurso, file){
            var defer = $q.defer();

            subirImagen(file).then(function (imagen) {
                recurso.foto = imagen;

                $http.post('/api/recurso', recurso)
                .success(function (recurso) {
                    defer.resolve(recurso);
                })
                .error(function () {
                    defer.reject('server error')
                });
            });

            return defer.promise;
        };

        var edit = function(recurso){
            var defer = $q.defer();

            $http.put('/api/recurso/' + recurso.id, recurso)
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

            $http.delete('/api/recurso/' + id)
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

            $http.get('/api/recurso/'+id)
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