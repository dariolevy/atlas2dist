(function () {

    angular.module('atlas2-juego', ['ngRoute']);

    angular.module('atlas2-juego').config(['$routeProvider', configFunction]);

    /*@ngInject*/
    function configFunction($routeProvider) {
        // Routes
        $routeProvider.when('/', {
            templateUrl: '/SPA/front/views/home.html',
		    controller  : 'homeCtrl'
		}).otherwise({
            redirectTo 	: '/'
        });

		// ruta de edificio
		$routeProvider.when('/edificio', {
		    templateUrl : '/SPA/front/views/edificio.html',
		    controller  : 'edificioCtrl'
		});

        // ruta de destacamento
        $routeProvider.when('/destacamento', {
            templateUrl : '/SPA/front/views/destacamento.html',
            controller  : 'destacamentoCtrl'
        });

        // ruta de investigacion
        $routeProvider.when('/investigacion', {
            templateUrl : '/SPA/front/views/investigacion.html',
            controller  : 'investigacionCtrl'
        });

        // ruta de zona
        $routeProvider.when('/zona', {
            templateUrl : '/SPA/front/views/zona.html',
            controller  : 'zonaCtrl'
        });
    }

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