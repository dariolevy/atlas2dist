(function () {
    'use strict';
    angular.module('atlas2').controller('uiCtrl', ['$scope', 'uiService', uiCtrl]);

    function uiCtrl($scope, uiService) {
        $scope.ui = null;

        $scope.saving = false;

        uiService.getId('1').then(
            function (data) {
                $scope.ui = data;
            }, function () {
                $scope.ui = { css: '' };
            }
        );

        $scope.guardar = function () {
            var ui = this.ui;

            if (ui.id) {
                edit(ui);
            } else {
                add(ui);
            }
        }

        var add = function (ui) {
            $scope.saving = true;

            uiService.add(ui).then(
                function (data) {
                    $scope.saving = false;

                    mostrarNotificacion('success');
                }, function () {
                    $scope.saving = false;

                    mostrarNotificacion('error');
                }
            );
        }

        var edit = function (ui) {
            $scope.saving = true;

            uiService.edit(ui).then(
                function (data) {
                    $scope.saving = false;

                    mostrarNotificacion('success');
                }, function () {
                    $scope.saving = false;

                    mostrarNotificacion('error');
                }
            );
        }

        var mostrarNotificacion = function (tipo) {
            var title = '';
            var text = '';

            if (tipo == 'success') {
                var title = 'Exito!';
                var text = 'Acción realizada con exito.';
            } else if (tipo == 'error') {
                var title = 'Oh No!';
                var text = 'Ha ocurrido un error.';
            }

            new PNotify({
                title: title,
                text: text,
                type: tipo,
                nonblock: {
                    nonblock: true
                }
            });
        }
    }

})();