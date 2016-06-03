(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorInvestigacionService', ["$http", "$q", jugadorInvestigacionService]);

    function jugadorInvestigacionService($http, $q) {

        var getAllInvestigaciones = function () {
            var defer = $q.defer();

            $http.get('/api/investigacion')
            .success(function (jugadorInvestigaciones) {
                defer.resolve(jugadorInvestigaciones);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getInv = function () {
            var defer = $q.defer();

            $http.get('/api/jugadorInvestigacion')
            .success(function (jugadorInvestigaciones) {
                defer.resolve(jugadorInvestigaciones);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (jugadorInvestigacion) {
            var defer = $q.defer();

            $http.post('/api/jugadorInvestigacion', jugadorInvestigacion)
            .success(function (jugadorInvestigacion) {
                defer.resolve(jugadorInvestigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugadorInvestigacion) {
            var defer = $q.defer();

            $http.put('/api/jugadorInvestigacion?id=' + jugadorInvestigacion.id, jugadorInvestigacion)
            .success(function (jugadorInvestigacion) {
                defer.resolve(jugadorInvestigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugadorInvestigacion?id=' + id)
            .success(function (jugadorInvestigacion) {
                defer.resolve(jugadorInvestigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugadorInvestigacion?id=' + id)
            .success(function (jugadorInvestigacion) {
                defer.resolve(jugadorInvestigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getInv: getInv,
            getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
            getAllInvestigaciones: getAllInvestigaciones
        }

    }

})();