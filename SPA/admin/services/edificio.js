(function () {
    'use strict';
    angular.module('atlas2').service('edificioService', ["$http", "$q", edificioService]);

    function edificioService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/edificio')
            .success(function (edificios) {
                defer.resolve(edificios);
            })
            .error(function () {
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

        var add = function (edificio, file) {
            var defer = $q.defer();

            subirImagen(file).then(function (imagen) {
                edificio.foto = imagen;

                console.log(imagen)

                $http.post('/api/edificio', edificio)
                .success(function (edificio) {
                    defer.resolve(edificio);
                })
                .error(function () {
                    defer.reject('server error')
                });
            });

            return defer.promise;
        };

        var edit = function (edificio) {
            var defer = $q.defer();

            $http.put('/api/edificio?id=' + edificio.id, edificio)
            .success(function (edificio) {
                defer.resolve(edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/edificio?id=' + id)
            .success(function (edificio) {
                defer.resolve(edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/edificio?id=' + id)
            .success(function (edificio) {
                defer.resolve(edificio);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getAll: getAll,
            getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
        }

    }

})();