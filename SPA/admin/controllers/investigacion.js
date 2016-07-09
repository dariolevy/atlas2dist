(function () {
    'use strict';
    angular.module('atlas2').controller('investigacionCtrl', ['$scope', '$routeParams', '$location', 'investigacionService', 'recursoService', 'costoService',
                                        'capacidadService', 'produceService', investigacionCtrl]);

    function investigacionCtrl($scope, $routeParams, $location, investigacionService, recursoService, costoService, capacidadService, produceService) {
        $scope.saving = false;

        $scope.costos = [];
        $scope.capacidades = [];
        $scope.investigaciones = [];
        $scope.producen = [];

        $scope.recursos = null;
        $scope.recursosCosto = null;
        $scope.recursosCapacidad = null;
        $scope.recursosProduce = null;

        $scope.costo = null;
        $scope.capacidad = null;
        $scope.invetigacion = null;
        $scope.produce = null;

        var path = $location.path();

        var initialize = function () {
            recursoService.getAll().then(function (data) {
                $scope.recursos = data;
                $scope.recursosCosto = angular.copy($scope.recursos);
                $scope.recursosCapacidad = angular.copy($scope.recursos);
                $scope.recursosProduce = angular.copy($scope.recursos);
            });

            if (path.indexOf('edit') > -1 || path.indexOf('add') > -1) {
                var id = $routeParams && $routeParams['id'] ? $routeParams['id'] : null
                if (id) {
                    investigacionService.getId(id).then(function (data) {
                        $scope.investigacion = data;
                    });
                }
            } else {
                investigacionService.getAll().then(function (data) {
                    $scope.investigaciones = data;
                });
            }
        }

        $scope.add = function () {
            $scope.saving = true;
            var investigacion = this.investigacion;

            if (!$scope.costos.length) {
                $scope.saving = false;

                mostrarNotificacion('error', 'Debe agregar al menos un costo.');
                return;
            }

            var file = $('#imagen')[0].files[0];
            if (!file) {
                $scope.saving = false;
                mostrarNotificacion('error', 'Debe seleccionar una imagen.');
                return;
            }

            investigacionService.add(investigacion, file).then(
                function (investigacionData) {
                    $scope.saving = false;

                    //Recorre los costos y los asigno al producto
                    if ($scope.costos.length) {
                        for (var i in $scope.costos) {
                            var costo = $scope.costos[i];

                            var costoData = {
                                inc: costo.incrementoNivel,
                                idProducto: investigacionData,
                                rec: { id: parseInt(costo.recurso) },
                                valor: costo.valor
                            }

                            costoService.add(costoData);
                        }
                    }

                    //Recorre lascapacidades y los asigno al producto
                    if ($scope.capacidades.length) {
                        for (var i in $scope.capacidades) {
                            var capacidad = $scope.capacidades[i];

                            var capacidadData = {
                                inc: capacidad.incrementoNivel,
                                idProducto: investigacionData,
                                rec: { id: parseInt(capacidad.recurso) },
                                valor: capacidad.valor
                            }

                            capacidadService.add(capacidadData);
                        }
                    }

                    //Recorre lo que produce y los asigno al producto
                    if ($scope.producen.length) {
                        for (var i in $scope.producen) {
                            var produce = $scope.producen[i];

                            var produceData = {
                                inc: produce.incrementoNivel,
                                idProducto: investigacionData,
                                rec: { id: parseInt(produce.recurso) },
                                valor: produce.valor
                            }

                            produceService.add(capacidadData);
                        }
                    }

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
            var investigacion = this.investigacion;

            investigacionService.edit(investigacion).then(
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
            var investigacion = this.investigacion;

            var r = confirm("Seguro que quiere borrar?");
            if (r == true) {
                investigacionService.borrar(investigacion.id).then(
                 function () {
                     $scope.investigaciones.splice(index, 1);
                     $scope.saving = false;

                     mostrarNotificacion('success');
                 }, function () {
                     $scope.saving = false;

                     mostrarNotificacion('error');
                 }
             );
            }
        }

        var mostrarNotificacion = function (tipo, text) {
            var title = '';

            if (tipo == 'success') {
                var title = 'Exito!';
                var text = text || 'Acción realizada con exito.';
            } else if (tipo == 'error') {
                var title = 'Oh No!';
                var text = text || 'Ha ocurrido un error.';
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

        $scope.addRelation = function (type) {
            var scopeData = null;
            var items = null;
            var item = null;

            if (type == 'costo') {
                scopeData = $scope.recursosCosto;
                items = $scope.costos;
                item = this.costo;
            } else if (type == 'capacidad') {
                scopeData = $scope.recursosCapacidad;
                items = $scope.capacidades;
                item = this.capacidad;
            } else if (type == 'produce') {
                scopeData = $scope.recursosProduce;
                items = $scope.producen;
                item = this.produce;
            }
            else {
                return console.error('No se encontro el tipo de relacion.');
            }

            if (!item) {
                return console.error('No agrego ninguna relacion.');
            }

            for (var rec in scopeData) {
                var data = scopeData[rec];
                if (parseInt(item.recurso) == data.id) {
                    var dataGuardar = {
                        valor: item.valor,
                        recurso: item.recurso,
                        nombreRecurso: data.nombre,
                        incrementoNivel: item.incrementoNivel
                    }

                    items.push(dataGuardar);
                    scopeData.splice(rec, 1);

                    item.valor = null;
                    item.recurso = null;
                    item.incrementoNivel = null;
                    return;
                }
            }
        }

        $scope.removeRelation = function (type, index) {
            var scopeData = null;
            var items = null;
            var item = null;

            if (type == 'costo') {
                scopeData = $scope.recursosCosto;
                items = $scope.costos;
                item = $scope.costos[index];
            } else if (type == 'capacidad') {
                scopeData = $scope.recursosCapacidad;
                items = $scope.capacidades;
                item = $scope.capacidades[index];
            } else if (type == 'produce') {
                scopeData = $scope.recursosProduce;
                items = $scope.producen;
                item = $scope.producen[index];
            }
            else {
                return console.error('No se encontro el tipo de relacion.');
            }

            for (var rec in $scope.recursos) {
                var recurso = $scope.recursos[rec];

                if (parseInt(item.recurso) == recurso.id) {
                    scopeData.push(recurso);
                    items.splice(index, 1);
                    return;
                }
            }
        }

        initialize();

    }

})();