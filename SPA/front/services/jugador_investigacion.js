(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorInvestigacionService', ["$http", "$q", jugadorInvestigacionService]);

    function jugadorInvestigacionService($http, $q) {

        var getInv = function () {
            var defer = $q.defer();

            $http.get('/api/jugador_investigacion')
            .success(function (jugador_investigaciones) {
                defer.resolve(jugador_investigaciones);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (jugador_investigacion) {
            var defer = $q.defer();

            $http.post('/api/jugador_investigacion', jugador_investigacion)
            .success(function (jugador_investigacion) {
                defer.resolve(jugador_investigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugador_investigacion) {
            var defer = $q.defer();

            $http.put('/api/jugador_investigacion?id=' + jugador_investigacion.id, jugador_investigacion)
            .success(function (jugador_investigacion) {
                defer.resolve(jugador_investigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugador_investigacion?id=' + id)
            .success(function (jugador_investigacion) {
                defer.resolve(jugador_investigacion);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugador_investigacion?id=' + id)
            .success(function (jugador_investigacion) {
                defer.resolve(jugador_investigacion);
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
        }

    }

})();