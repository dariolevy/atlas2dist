(function () {
    'use strict';
    angular.module('atlas2-juego').service('alianzaService', ["$http", "$q", alianzaService]);

    function alianzaService($http, $q) {

        var getAll = function () {
            var defer = $q.defer();

            $http.get('/api/alianza')
            .success(function (alianzas) {
                defer.resolve(alianzas);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var getByAlianza = function (id) {
            var defer = $q.defer();

            $http.get('/api/jugadorAlianza/' + id)
            .success(function (alianzas) {
                defer.resolve(alianzas);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var add = function (alianza) {
            var defer = $q.defer();

            $http.post('/api/alianza', alianza)
            .success(function (alianza) {
                defer.resolve(alianza);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var borrar = function (id) {
            var defer = $q.defer();

            $http.delete('/api/alianza/' + id)
            .success(function (alianza) {
                defer.resolve(alianza);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var unirse = function (jugadorAlianza) {
            var defer = $q.defer();

            $http.post('/api/jugadorAlianza', jugadorAlianza)
            .success(function (jugadorAlianza) {
                defer.resolve(jugadorAlianza);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        var salir = function (id, userId) {
            var defer = $q.defer();

            getByAlianza(id).then(function (alianzas) {
                var relId = null;
                for (var a in alianzas) {
                    var ali = alianzas[a];

                    if (ali.miembro.id == userId) {
                        relId = ali.id;
                    }
                }

                if (relId) {
                    $http.delete('/api/jugadorAlianza/' + relId)
                    .success(function (jugadorAlianza) {
                        defer.resolve(jugadorAlianza);
                    })
                    .error(function () {
                        defer.reject('server error')
                    });
                } else {
                    defer.reject('server error');
                }
            });

            return defer.promise;
        };

        var getByUsuario = function (userId) {
            var defer = $q.defer();

            $http.get('/api/alianza/' + userId)
            .success(function (alianza) {
                defer.resolve(alianza);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getAll: getAll,
            unirse: unirse,
            add: add,
            borrar: borrar,
            getByUsuario: getByUsuario,
            getByAlianza: getByAlianza,
            salir: salir
        }

    }

})();