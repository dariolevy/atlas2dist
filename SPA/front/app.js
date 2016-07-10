(function () {

    angular.module('atlas2-juego', ['ngRoute', 'firebase', 'toastr']);

    angular.module('atlas2-juego').config(['$routeProvider', 'toastrConfig', configFunction]);

    /*@ngInject*/
    function configFunction($routeProvider, toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-top-center',
            timeOut : 2500
        });

        // Routes
        $routeProvider.when('/', {
            templateUrl: '/SPA/front/views/home.html',
            controller: 'homeCtrl'
        }).otherwise({
            redirectTo: '/'
        });

        // ruta de edificio
        $routeProvider.when('/edificio', {
            templateUrl: '/SPA/front/views/edificio.html',
            controller: 'edificioCtrl'
        });

        // ruta de destacamento
        $routeProvider.when('/destacamento', {
            templateUrl: '/SPA/front/views/destacamento.html',
            controller: 'destacamentoCtrl'
        });

        // ruta de investigacion
        $routeProvider.when('/investigacion', {
            templateUrl: '/SPA/front/views/investigacion.html',
            controller: 'investigacionCtrl'
        });

        // ruta de zona
        $routeProvider.when('/zona', {
            templateUrl: '/SPA/front/views/zona.html',
            controller: 'zonaCtrl'
        });

        // ruta de interacciones
        $routeProvider.when('/interaccion', {
            templateUrl: '/SPA/front/views/interaccion.html',
            controller: 'interaccionHistorialCtrl'
        }).when('/interaccion/:interaccion/:receiverId', {
            templateUrl: '/SPA/front/views/crear-interaccion.html',
            controller: 'interaccionCtrl'
        });

        // ruta de alianzas
        $routeProvider.when('/alianza', {
            templateUrl: '/SPA/front/views/alianza.html',
            controller: 'alianzaCtrl'
        }).when("/alianza/crear", {
            templateUrl: '/SPA/front/views/crear-alianza.html',
            controller: 'alianzaCtrl'
        });

        // ruta de chat
        $routeProvider.when('/chat', {
            templateUrl: '/SPA/front/views/chat.html',
            controller: 'chatCtrl'
        });
    };

    angular.module('atlas2-juego').factory('coloniaFactory', ['$rootScope', function ($rootScope) {
        var mapas = null;
        var mapa = null;

        var get = function () {
            return mapas
        };

        var set = function (m) {
            mapas = m;

            setCurrent(mapas['0']);

            $rootScope.$broadcast('mapa:changed', mapas);
        };

        var getCurrent = function () {
            return mapa
        };

        var setCurrent = function (m) {
            mapa = m;

            $rootScope.$broadcast('mapa:current', mapa);
        };

        return {
            get: get,
            set: set,
            getCurrent: getCurrent,
            setCurrent: setCurrent
        };
    }]);

})();