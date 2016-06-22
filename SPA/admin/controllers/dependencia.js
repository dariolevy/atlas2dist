(function () {
    'use strict';
    angular.module('atlas2').controller('dependenciaCtrl', ['$scope', '$routeParams', '$location', 'dependenciaService', 'productoService', dependenciaCtrl]);

    function dependenciaCtrl($scope, $routeParams, $location, dependenciaService, productoService) {
        $scope.dependencias = [];
        $scope.dependencia = null;
        $scope.productos = [];
        $scope.saving   = false;

        var path = $location.path();

        var initialize = function () {
            if (path.indexOf('edit') > -1 || path.indexOf('add') > -1) {
                productoService.getAll().then(function (data) {
                    $scope.productos = data;

                    var id = $routeParams && $routeParams['id'] ? $routeParams['id'] : null
                    if (id) {
                        dependenciaService.getId(id).then(function (data) {
                            console.log(data)
                            $scope.dependencia = data;
                        });
                    }
                });
            } else {
                dependenciaService.getAll().then(function (data) {
                    $scope.dependencias = data;
                });
            }
        }

        $scope.add = function(){
            $scope.saving = true;
            var dependencia = this.dependencia;

            dependenciaService.add(dependencia).then(
                function (data) {
                    $scope.dependencias.push(data);
                    $scope.saving = false;
                
                    mostrarNotificacion('success');
                    window.history.back();
                }, function() {
                    $scope.saving = false;

                    mostrarNotificacion('error');
                }
            );
        }

        $scope.edit = function () {
            $scope.saving = true;
            var dependencia = this.dependencia;

            dependenciaService.edit(dependencia).then(
                function (data) {
                    $scope.saving = false;

                    mostrarNotificacion('success');
                    window.history.back();
                }, function() {
                    $scope.saving = false;

                    mostrarNotificacion('error');
                }
            );
        }

        $scope.borrar = function (index) {
            $scope.saving   = true;
            var dependencia = this.dependencia;

            var r = confirm("Seguro que quiere borrar?");
            if (r == true) {
                dependenciaService.borrar(dependencia.id).then(
                 function () {
                     $scope.dependencias.splice(index, 1);
                     $scope.saving = false;

                     mostrarNotificacion('success');
                 }, function () {
                     $scope.saving = false;

                     mostrarNotificacion('error');
                 }
             );
            }
        }

        var mostrarNotificacion = function(tipo){
            var title   = '';
            var text    = '';

            if(tipo == 'success'){
                var title   = 'Exito!';
                var text    = 'Acción realizada con exito.';
            }else if(tipo == 'error'){
                var title   = 'Oh No!';
                var text    = 'Ha ocurrido un error.';
            }

            new PNotify({
                title       : title,
                text        : text,
                type        : tipo,
                nonblock    : {
                    nonblock : true
                }
            });
        }

        initialize();

    }

})();