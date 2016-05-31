(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorDestacamentoService', ["$http", "$q", jugadorDestacamentoService]);

    function jugadorDestacamentoService($http, $q) {

        var getAllDestacamentos = function () {
            var defer = $q.defer();

            $http.get('/api/destacamento')
            .success(function (jugadorDestacamentos) {
                defer.resolve(jugadorDestacamentos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getDes = function () {
            var defer = $q.defer();

            $http.get('/api/jugadorDestacamento')
            .success(function (jugadorDestacamentos) {
                defer.resolve(jugadorDestacamentos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (jugadorDestacamento) {
            var defer = $q.defer();

            $http.post('/api/jugadorDestacamento', jugadorDestacamento)
            .success(function (jugadorDestacamento) {
                defer.resolve(jugadorDestacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var edit = function (jugadorDestacamento) {
            var defer = $q.defer();

            $http.put('/api/jugadorDestacamento?id=' + jugadorDestacamento.id, jugadorDestacamento)
            .success(function (jugadorDestacamento) {
                defer.resolve(jugadorDestacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/jugadorDestacamento?id=' + id)
            .success(function (jugadorDestacamento) {
                defer.resolve(jugadorDestacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getId = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugadorDestacamento?id=' + id)
            .success(function (jugadorDestacamento) {
                defer.resolve(jugadorDestacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getDes: getDes,
            getId: getId,
            add: add,
            borrar: borrar,
            edit: edit,
            getAllDestacamentos: getAllDestacamentos
        }

    }

})();