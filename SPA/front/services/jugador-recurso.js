(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorRecursoService', ["$http", "$q", jugadorRecursoService]);

    function jugadorRecursoService($http, $q) {

        var getAllRecursos = function () {
            var defer = $q.defer();

            $http.get('/api/recurso')
            .success(function (recursos) {
                defer.resolve(recursos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getRec = function (colonia) {
            var defer = $q.defer();

            $http.get('/api/jugadorRecurso?id=' + colonia)
            .success(function (jugadorRecursos) {
                defer.resolve(jugadorRecursos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (jugadorRecurso) {
            var defer = $q.defer();

            $http.post('/api/jugadorRecurso', jugadorRecurso)
            .success(function (jugadorRecurso) {
                defer.resolve(jugadorRecurso);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugadorRecurso) {
            var defer = $q.defer();

            $http.put('/api/jugadorRecurso?id=' + jugadorRecurso.id, jugadorRecurso)
            .success(function (jugadorRecurso) {
                defer.resolve(jugadorRecurso);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugadorRecurso?id=' + id)
            .success(function (jugadorRecurso) {
                defer.resolve(jugadorRecurso);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugadorRecurso?id=' + id)
            .success(function (jugadorRecurso) {
                defer.resolve(jugadorRecurso);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getAllRecursos : getAllRecursos,
            getRec: getRec,
            getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
        }

    }

})();