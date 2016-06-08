(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorDestacamentoService', ['$http', '$q', jugadorDestacamentoService]);

    function jugadorDestacamentoService($http, $q) {

        var getDestacamentoByColonia = function (colonia) {
            var defer = $q.defer();

            $http.get('/api/jugadorDestacamento/' + colonia)
            .success(function (jugadorDestacamentos) {
                defer.resolve(jugadorDestacamentos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var subirCantidad = function (destacamento, cantidad) {
            var defer = $q.defer();

            destacamento.cantidad += parseInt(cantidad);
            destacamento.id = destacamento.relId;
            $http.put('/api/jugadorDestacamento/actualizarCantidad?id=' + destacamento.relId, destacamento)
            .success(function (jugadorDestacamento) {
                defer.resolve(jugadorDestacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var bajarCantidad = function (destacamento, cantidad) {
            var defer = $q.defer();

            destacamento.cantidad -= parseInt(cantidad);
            destacamento.id = destacamento.relId;
            $http.put('/api/jugadorDestacamento/actualizarCantidad?id=' + destacamento.relId, destacamento)
            .success(function (jugadorDestacamento) {
                defer.resolve(jugadorDestacamento);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getDestacamentoByColonia: getDestacamentoByColonia,
            subirCantidad: subirCantidad,
            bajarCantidad: bajarCantidad,
        }

    }

})();