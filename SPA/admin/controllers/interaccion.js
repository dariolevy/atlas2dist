(function () {
    'use strict';
    angular.module('atlas2').controller('interaccionCtrl', ['$scope', '$routeParams', 'interaccionService', interaccionCtrl]);

    function interaccionCtrl($scope, $routeParams, interaccionService) {
        $scope.interacciones = [];
        $scope.interaccion = null;
        $scope.saving = false;

        var initialize = function () {
            var id = $routeParams && $routeParams['id'] ? $routeParams['id'] : null
            if (id) {
                interaccionService.getId(id).then(function (data) {
                    $scope.interaccion = data;
                });
            } else {
                interaccionService.getAll().then(function (data) {
                    $scope.interacciones = data;
                });
            }
        }

        $scope.add = function () {
            $scope.saving = true;
            var interaccion = this.interaccion;

            interaccionService.add(interaccion).then(
                function (data) {
                    $scope.interacciones.push(data);
                    $scope.saving = false;

                    mostrarNotificacion('success');
                    window.history.back();
                }, function () {
                    $scope.saving = false;

                    mostrarNotificacion('error');
                }
            );
        }

        $scope.edit = function () {
            $scope.saving = true;
            var interaccion = this.interaccion;

            interaccionService.edit(interaccion).then(
                function (data) {
                    $scope.saving = false;

                    mostrarNotificacion('success');
                    window.history.back();
                }, function () {
                    $scope.saving = false;

                    mostrarNotificacion('error');
                }
            );
        }

        $scope.borrar = function (index) {
            $scope.saving = true;
            var interaccion = this.interaccion;

            var r = confirm("Seguro que quiere borrar?");
            if (r == true) {
                interaccionService.borrar(interaccion.id).then(
                 function () {
                     $scope.interacciones.splice(index, 1);
                     $scope.saving = false;

                     mostrarNotificacion('success');
                 }, function () {
                     $scope.saving = false;

                     mostrarNotificacion('error');
                 }
             );
            }
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

        initialize();

    }

})();