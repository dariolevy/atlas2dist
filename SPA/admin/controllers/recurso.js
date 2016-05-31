(function () {
    'use strict';
    angular.module('atlas2').controller('recursoCtrl', ['$scope', '$routeParams', 'recursoService', recursoCtrl]);

    function recursoCtrl($scope, $routeParams, recursoService) {
        $scope.recursos = [];
        $scope.recurso  = null;
        $scope.saving   = false;

        var initialize = function(){
            var id = $routeParams && $routeParams['id'] ? $routeParams['id'] : null
            if(id){
                recursoService.getId(id).then(function (data) {
                    $scope.recurso = data;
                });
            }else{
                recursoService.getAll().then(function (data) {
                    $scope.recursos = data;
                });
            }
        }

        $scope.add = function(){
            $scope.saving   = true;
            var recurso     = this.recurso;

            recursoService.add(recurso).then(
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

        $scope.edit = function () {
            $scope.saving   = true;
            var recurso     = this.recurso;

            recursoService.edit(recurso).then(
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
            $scope.saving = true;
            var recurso = this.recurso;

            var r = confirm("Seguro que quiere borrar?");
            if (r == true) {
                recursoService.borrar(recurso.id).then(
                 function () {
                     $scope.recursos.splice(index, 1);
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