(function () {
    'use strict';
    angular.module('atlas2-juego').controller('alianzaCtrl', ['$scope', '$q', 'alianzaService', 'meService', alianzaCtrl]);

    function alianzaCtrl($scope, $q, alianzaService, meService) {
        $scope.alianzas = null;
        $scope.hasAlianza = null;
        $scope.admin = null;

        var me = null;

        meService.me().then(function (me) {
            me = me;
            $scope.admin = me.id;
            alianzaService.getByUsuario(me.id).then(function (alianza) {
                if (alianza) {
                    $scope.hasAlianza = alianza.id;
                }

                alianzaService.getAll().then(function (alianzas) {
                    $scope.alianzas = alianzas;
                });
            });
        });

        $scope.crearAlianza = function () {
            var alianza = this.alianza;

            meService.me().then(function (me) {
                alianza['administrador'] = { id: me.id };

                alianzaService.add(alianza).then(function () {
                    window.history.back();
                });
            });
        }

        $scope.unirse = function (alianzaId) {
            meService.me().then(function (me) {
                var alianza = {
                    alianza: {
                        id : alianzaId
                    },
                    miembro: {
                        id : me.id
                    }
                }
                alianzaService.unirse(alianza).then(function () {
                    $('#mensaje-union').fadeIn();

                    $scope.hasAlianza = alianzaId;

                    setTimeout(function () {
                        $('#mensaje-union').fadeOut();
                    }, 2000);
                });
            });
        }

        $scope.salir = function (alianzaId) {
            meService.me().then(function (me) {

                alianzaService.salir(alianzaId, me.id).then(function () {
                    $('#mensaje-salida').fadeIn();

                    $scope.hasAlianza = null;

                    setTimeout(function () {
                        $('#mensaje-salida').fadeOut();
                    }, 2000);
                });
            });
        }

        $scope.borrar = function (alianza) {
            alianzaService.borrar(alianza.id).then(function () {
                $('#mensaje-borrar').fadeIn();

                $scope.admin = null;
                var index = $scope.alianzas.indexOf(alianza);
                $scope.alianzas.splice(index, 1);

                setTimeout(function () {
                    $('#mensaje-borrar').fadeOut();
                }, 2000);
            });
        }
    }

})();