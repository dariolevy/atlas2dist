(function () {
    'use strict';
    angular.module('atlas2').controller('dashboardCtrl', ['$scope', 'dashboardService', dashboardCtrl]);

    function dashboardCtrl($scope, dashboardService) {
        var dataPorNuevo = [];
        $scope.dataNuevoFilter = [];
        var dataPorSesion = [];
        $scope.dataSesionFilter = [];

        var startDateNuevos = moment().subtract(29, 'days');
        var endDateNuevos = moment();
        var startDateSesion = moment().subtract(29, 'days');
        var endDateSesion = moment();

        var chartPorNuevos = null;
        var chartPorSesion = null;

        dashboardService.getByNuevos().then(function (data) {
            dataPorNuevo = data;

            dibujarGraficaNuevos();
        });

        dashboardService.getBySesion().then(function (data) {
            dataPorSesion = data;

            dibujarGraficaSesion();
        });

        var dateOption = {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            showDropdowns: true,
            timePicker: false,
            ranges: {
                'Ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
                'Ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
                'Este Mes': [moment().startOf('month'), moment().endOf('month')],
                'Mes anterior': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: 'left',
            buttonClasses: ['btn btn-default'],
            applyClass: 'btn-small btn-primary',
            cancelClass: 'btn-small',
            format: 'DD/MM/YY',
            separator: ' a ',
            locale: {
                applyLabel: 'Enviar',
                cancelLabel: 'Borrar',
                fromLabel: 'Desde',
                toLabel: 'a',
                customRangeLabel: 'Rango',
                daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                monthNames: ['Enero', 'Febero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            }
        };

        // Grafica para los Nuevos usuarios
        var dataByRangoNuevos = function () {
            var dataArray = [];
            for (var d in dataPorNuevo) {
                var item = dataPorNuevo[d];
                var date = moment(item['month'], 'YYYY-MM-DD');

                if (date.isBetween(startDateNuevos, endDateNuevos) || date.isSame(startDateNuevos) || date.isSame(endDateNuevos)) {
                    dataArray.push({ 'amount': item.amount, 'month': moment(item.month).format('DD/MM/YY') });
                }
            }

            if (dataArray.length == 0) {
                dataArray.push({ 'amount' : 0, 'month' : 'No data' });
            }

            $scope.dataNuevoFilter = dataArray;

            return dataArray;
        };

        var dibujarGraficaNuevos = function () {
            var data = dataByRangoNuevos();

            chartPorNuevos = Morris.Bar({
                element: 'porNuevos',
                data: data,
                xkey: 'month',
                hideHover: 'auto',
                barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
                ykeys: ['amount'],
                labels: ['Usuarios'],
                xLabelAngle: 60,
                resize: true
            });

            $('#dateRangeNuevos').daterangepicker(dateOption);
            $('#dateRangeNuevos span').html(startDateNuevos.format('DD/MM/YY') + ' - ' + endDateNuevos.format('DD/MM/YY'));
            $('#dateRangeNuevos').on('apply.daterangepicker', function (ev, picker) {
                startDateNuevos = picker.startDate;
                endDateNuevos = picker.endDate;

                cambiarRangoNuevos();
            });
        };

        var cambiarRangoNuevos = function () {
            $('#dateRangeNuevos span').html(startDateNuevos.format('DD/MM/YY') + ' - ' + endDateNuevos.format('DD/MM/YY'));

            var data = dataByRangoNuevos();

            chartPorNuevos.setData(data);

            $scope.$apply();
        }

        //Grafica para la Sesion de los usuarios
        var dataByRangoSesion = function () {
            var dataArray = [];
            for (var d in dataPorSesion) {
                var item = dataPorSesion[d];
                var date = moment(item['month'], 'YYYY-MM-DD');

                if (date.isBetween(startDateSesion, endDateSesion) || date.isSame(startDateSesion) || date.isSame(endDateSesion)) {
                    dataArray.push({ 'amount': item.amount, 'month': moment(item.month).format('DD/MM/YY') });
                }
            }

            if (dataArray.length == 0) {
                dataArray.push({ 'amount': 0, 'month': 'No data' });
            }

            $scope.dataSesionFilter = dataArray;

            return dataArray;
        };

        var dibujarGraficaSesion = function () {
            var data = dataByRangoSesion();

            chartPorSesion = Morris.Bar({
                element: 'porSesion',
                data: data,
                xkey: 'month',
                hideHover: 'auto',
                barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
                ykeys: ['amount'],
                labels: ['Usuarios'],
                xLabelAngle: 60,
                resize: true
            });

            $('#dateRangeSesion').daterangepicker(dateOption);
            $('#dateRangeSesion span').html(startDateSesion.format('DD/MM/YY') + ' - ' + endDateSesion.format('DD/MM/YY'));
            $('#dateRangeSesion').on('apply.daterangepicker', function (ev, picker) {
                startDateSesion = picker.startDate;
                endDateSesion = picker.endDate;

                cambiarRangoSesion();
            });
        };

        var cambiarRangoSesion = function () {
            $('#dateRangeSesion span').html(startDateSesion.format('DD/MM/YY') + ' - ' + endDateSesion.format('DD/MM/YY'));

            var data = dataByRangoSesion();

            chartPorSesion.setData(data);

            $scope.$apply();
        }
    }

})();