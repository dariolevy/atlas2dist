﻿(function () {
    'use strict';
    angular.module('atlas2').controller('confCtrl', ['$scope', 'confService', confCtrl]);

    function confCtrl($scope, confService) {
        $scope.configuracion = null;

        $scope.saving = false;

        confService.getId('1').then(
            function (data) {
                $scope.configuracion = data;
            }, function () {
                $scope.configuracion = { css: '', nombre: '', titulo: '', idAppFace: '', claveAppFace: '' };
            }
        );

        $scope.guardar = function () {
            var conf = this.configuracion;

            if (conf.id) {
                edit(conf);
            } else {
                add(conf);
            }
        }

        var add = function (conf) {
            $scope.saving = true;

            confService.add(conf).then(
                function (data) {
                    $scope.saving = false;

                    mostrarNotificacion('success');
                }, function () {
                    $scope.saving = false;

                    mostrarNotificacion('error');
                }
            );
        }

        var edit = function (conf) {
            $scope.saving = true;

            confService.edit(conf).then(
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

        $scope.selectTemplate = function (event) {
            var skin = $(event.currentTarget).data('skin');
            
            $scope.configuracion.css = skinStyles[skin];

        };
        var skinStyles = {
            'skin-yellow-light': '.skin .main-header .navbar{background-color:#f39c12}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#e08e0b}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#e08e0b}}.skin .main-header .logo{background-color:#f39c12;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#f39a0d}.skin .main-header li.user-header{background-color:#f39c12}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#f9fafc}.skin .content-wrapper,.skin .main-footer{border-left:1px solid #d2d6de}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#444}.skin .sidebar-menu>li{-webkit-transition:border-left-color .3s ease;-o-transition:border-left-color .3s ease;transition:border-left-color .3s ease}.skin .sidebar-menu>li.header{color:#848484;background:#f9fafc}.skin .sidebar-menu>li>a{border-left:3px solid transparent;font-weight:600}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#000;background:#f4f4f5}.skin .sidebar-menu>li.active{border-left-color:#f39c12}.skin .sidebar-menu>li.active>a{font-weight:600}.skin .sidebar-menu>li>.treeview-menu{background:#f4f4f5}.skin .sidebar a{color:#444}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#777}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#000}.skin .treeview-menu>li.active>a{font-weight:600}.skin .sidebar-form{border-radius:3px;border:1px solid #d2d6de;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#fff;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}@media (min-width:768px){.skin.sidebar-mini.sidebar-collapse .sidebar-menu>li>.treeview-menu{border-left:1px solid #d2d6de}}',
            'skin-red-light' : '.skin .main-header .navbar{background-color:#dd4b39}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#d73925}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#d73925}}.skin .main-header .logo{background-color:#dd4b39;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#dc4735}.skin .main-header li.user-header{background-color:#dd4b39}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#f9fafc}.skin .content-wrapper,.skin .main-footer{border-left:1px solid #d2d6de}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#444}.skin .sidebar-menu>li{-webkit-transition:border-left-color .3s ease;-o-transition:border-left-color .3s ease;transition:border-left-color .3s ease}.skin .sidebar-menu>li.header{color:#848484;background:#f9fafc}.skin .sidebar-menu>li>a{border-left:3px solid transparent;font-weight:600}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#000;background:#f4f4f5}.skin .sidebar-menu>li.active{border-left-color:#dd4b39}.skin .sidebar-menu>li.active>a{font-weight:600}.skin .sidebar-menu>li>.treeview-menu{background:#f4f4f5}.skin .sidebar a{color:#444}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#777}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#000}.skin .treeview-menu>li.active>a{font-weight:600}.skin .sidebar-form{border-radius:3px;border:1px solid #d2d6de;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#fff;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}@media (min-width:768px){.skin.sidebar-mini.sidebar-collapse .sidebar-menu>li>.treeview-menu{border-left:1px solid #d2d6de}}',
            'skin-green-light': '.skin .main-header .navbar{background-color:#00a65a}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#008d4c}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#008d4c}}.skin .main-header .logo{background-color:#00a65a;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#00a157}.skin .main-header li.user-header{background-color:#00a65a}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#f9fafc}.skin .content-wrapper,.skin .main-footer{border-left:1px solid #d2d6de}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#444}.skin .sidebar-menu>li{-webkit-transition:border-left-color .3s ease;-o-transition:border-left-color .3s ease;transition:border-left-color .3s ease}.skin .sidebar-menu>li.header{color:#848484;background:#f9fafc}.skin .sidebar-menu>li>a{border-left:3px solid transparent;font-weight:600}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#000;background:#f4f4f5}.skin .sidebar-menu>li.active{border-left-color:#00a65a}.skin .sidebar-menu>li.active>a{font-weight:600}.skin .sidebar-menu>li>.treeview-menu{background:#f4f4f5}.skin .sidebar a{color:#444}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#777}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#000}.skin .treeview-menu>li.active>a{font-weight:600}.skin .sidebar-form{border-radius:3px;border:1px solid #d2d6de;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#fff;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}@media (min-width:768px){.skin.sidebar-mini.sidebar-collapse .sidebar-menu>li>.treeview-menu{border-left:1px solid #d2d6de}}',
            'skin-purple-light': '.skin .main-header .navbar{background-color:#605ca8}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#555299}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#555299}}.skin .main-header .logo{background-color:#605ca8;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#5d59a6}.skin .main-header li.user-header{background-color:#605ca8}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#f9fafc}.skin .content-wrapper,.skin .main-footer{border-left:1px solid #d2d6de}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#444}.skin .sidebar-menu>li{-webkit-transition:border-left-color .3s ease;-o-transition:border-left-color .3s ease;transition:border-left-color .3s ease}.skin .sidebar-menu>li.header{color:#848484;background:#f9fafc}.skin .sidebar-menu>li>a{border-left:3px solid transparent;font-weight:600}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#000;background:#f4f4f5}.skin .sidebar-menu>li.active{border-left-color:#605ca8}.skin .sidebar-menu>li.active>a{font-weight:600}.skin .sidebar-menu>li>.treeview-menu{background:#f4f4f5}.skin .sidebar a{color:#444}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#777}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#000}.skin .treeview-menu>li.active>a{font-weight:600}.skin .sidebar-form{border-radius:3px;border:1px solid #d2d6de;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#fff;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}@media (min-width:768px){.skin.sidebar-mini.sidebar-collapse .sidebar-menu>li>.treeview-menu{border-left:1px solid #d2d6de}}',
            'skin-blue-light': '.skin .main-header .navbar{background-color:#3c8dbc}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#367fa9}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#367fa9}}.skin .main-header .logo{background-color:#3c8dbc;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#3b8ab8}.skin .main-header li.user-header{background-color:#3c8dbc}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#f9fafc}.skin .content-wrapper,.skin .main-footer{border-left:1px solid #d2d6de}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#444}.skin .sidebar-menu>li{-webkit-transition:border-left-color .3s ease;-o-transition:border-left-color .3s ease;transition:border-left-color .3s ease}.skin .sidebar-menu>li.header{color:#848484;background:#f9fafc}.skin .sidebar-menu>li>a{border-left:3px solid transparent;font-weight:600}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#000;background:#f4f4f5}.skin .sidebar-menu>li.active{border-left-color:#3c8dbc}.skin .sidebar-menu>li.active>a{font-weight:600}.skin .sidebar-menu>li>.treeview-menu{background:#f4f4f5}.skin .sidebar a{color:#444}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#777}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#000}.skin .treeview-menu>li.active>a{font-weight:600}.skin .sidebar-form{border-radius:3px;border:1px solid #d2d6de;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#fff;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}@media (min-width:768px){.skin.sidebar-mini.sidebar-collapse .sidebar-menu>li>.treeview-menu{border-left:1px solid #d2d6de}}.skin .main-footer{border-top-color:#d2d6de}.skin-blue.layout-top-nav .main-header>.logo{background-color:#3c8dbc;color:#fff;border-bottom:0 solid transparent}.skin-blue.layout-top-nav .main-header>.logo:hover{background-color:#3b8ab8}',
            'skin-yellow': '.skin .main-header .navbar{background-color:#f39c12}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#e08e0b}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#e08e0b}}.skin .main-header .logo{background-color:#e08e0b;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#db8b0b}.skin .main-header li.user-header{background-color:#f39c12}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#222d32}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#fff}.skin .sidebar-menu>li.header{color:#4b646f;background:#1a2226}.skin .sidebar-menu>li>a{border-left:3px solid transparent}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#fff;background:#1e282c;border-left-color:#f39c12}.skin .sidebar-menu>li>.treeview-menu{margin:0 1px;background:#2c3b41}.skin .sidebar a{color:#b8c7ce}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#8aa4af}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#fff}.skin .sidebar-form{border-radius:3px;border:1px solid #374850;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#374850;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}',
            'skin-red': '.skin .main-header .navbar{background-color:#dd4b39}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#d73925}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#d73925}}.skin .main-header .logo{background-color:#d73925;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#d33724}.skin .main-header li.user-header{background-color:#dd4b39}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#222d32}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#fff}.skin .sidebar-menu>li.header{color:#4b646f;background:#1a2226}.skin .sidebar-menu>li>a{border-left:3px solid transparent}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#fff;background:#1e282c;border-left-color:#dd4b39}.skin .sidebar-menu>li>.treeview-menu{margin:0 1px;background:#2c3b41}.skin .sidebar a{color:#b8c7ce}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#8aa4af}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#fff}.skin .sidebar-form{border-radius:3px;border:1px solid #374850;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#374850;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}',
            'skin-green': '.skin .main-header .navbar{background-color:#00a65a}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#008d4c}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#008d4c}}.skin .main-header .logo{background-color:#008d4c;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#008749}.skin .main-header li.user-header{background-color:#00a65a}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#222d32}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#fff}.skin .sidebar-menu>li.header{color:#4b646f;background:#1a2226}.skin .sidebar-menu>li>a{border-left:3px solid transparent}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#fff;background:#1e282c;border-left-color:#00a65a}.skin .sidebar-menu>li>.treeview-menu{margin:0 1px;background:#2c3b41}.skin .sidebar a{color:#b8c7ce}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#8aa4af}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#fff}.skin .sidebar-form{border-radius:3px;border:1px solid #374850;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#374850;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}',
            'skin-purple': '.skin .main-header .navbar{background-color:#605ca8}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#555299}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#555299}}.skin .main-header .logo{background-color:#555299;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#545096}.skin .main-header li.user-header{background-color:#605ca8}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#222d32}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#fff}.skin .sidebar-menu>li.header{color:#4b646f;background:#1a2226}.skin .sidebar-menu>li>a{border-left:3px solid transparent}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#fff;background:#1e282c;border-left-color:#605ca8}.skin .sidebar-menu>li>.treeview-menu{margin:0 1px;background:#2c3b41}.skin .sidebar a{color:#b8c7ce}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#8aa4af}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#fff}.skin .sidebar-form{border-radius:3px;border:1px solid #374850;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#374850;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}',
            'skin-blue': '.skin .main-header .navbar{background-color:#3c8dbc}.skin .main-header .navbar .nav>li>a{color:#fff}.skin .main-header .navbar .nav>li>a:hover,.skin .main-header .navbar .nav>li>a:active,.skin .main-header .navbar .nav>li>a:focus,.skin .main-header .navbar .nav .open>a,.skin .main-header .navbar .nav .open>a:hover,.skin .main-header .navbar .nav .open>a:focus,.skin .main-header .navbar .nav>.active>a{background:rgba(0,0,0,0.1);color:#f6f6f6}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{color:#f6f6f6;background:rgba(0,0,0,0.1)}.skin .main-header .navbar .sidebar-toggle{color:#fff}.skin .main-header .navbar .sidebar-toggle:hover{background-color:#367fa9}@media (max-width:767px){.skin .main-header .navbar .dropdown-menu li.divider{background-color:rgba(255,255,255,0.1)}.skin .main-header .navbar .dropdown-menu li a{color:#fff}.skin .main-header .navbar .dropdown-menu li a:hover{background:#367fa9}}.skin .main-header .logo{background-color:#367fa9;color:#fff;border-bottom:0 solid transparent}.skin .main-header .logo:hover{background-color:#357ca5}.skin .main-header li.user-header{background-color:#3c8dbc}.skin .content-header{background:transparent}.skin .wrapper,.skin .main-sidebar,.skin .left-side{background-color:#222d32}.skin .user-panel>.info,.skin .user-panel>.info>a{color:#fff}.skin .sidebar-menu>li.header{color:#4b646f;background:#1a2226}.skin .sidebar-menu>li>a{border-left:3px solid transparent}.skin .sidebar-menu>li:hover>a,.skin .sidebar-menu>li.active>a{color:#fff;background:#1e282c;border-left-color:#3c8dbc}.skin .sidebar-menu>li>.treeview-menu{margin:0 1px;background:#2c3b41}.skin .sidebar a{color:#b8c7ce}.skin .sidebar a:hover{text-decoration:none}.skin .treeview-menu>li>a{color:#8aa4af}.skin .treeview-menu>li.active>a,.skin .treeview-menu>li>a:hover{color:#fff}.skin .sidebar-form{border-radius:3px;border:1px solid #374850;margin:10px 10px}.skin .sidebar-form input[type="text"],.skin .sidebar-form .btn{box-shadow:none;background-color:#374850;border:1px solid transparent;height:35px;-webkit-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.skin .sidebar-form input[type="text"]{color:#666;border-top-left-radius:2px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:2px}.skin .sidebar-form input[type="text"]:focus,.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{background-color:#fff;color:#666}.skin .sidebar-form input[type="text"]:focus+.input-group-btn .btn{border-left-color:#fff}.skin .sidebar-form .btn{color:#999;border-top-left-radius:0;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:0}.skin.layout-top-nav .main-header>.logo{background-color:#3c8dbc;color:#fff;border-bottom:0 solid transparent}.skin.layout-top-nav .main-header>.logo:hover{background-color:#3b8ab8}'
        }
    }

})();