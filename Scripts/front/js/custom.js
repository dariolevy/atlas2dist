/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var URL = window.location;
var $SIDEBAR_MENU = $('.sidebar-menu');

// Sidebar
$(function () {

    $SIDEBAR_MENU.find('a').on('click', function(ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active');
        } else {
            $li.parent().find('li').removeClass('active');
            $li.addClass('active');
        }
    });

    // check active menu
    $SIDEBAR_MENU.find('a').filter(function () {
        var route       = this.href.split('/#/')[1];
        var urlRoute    = URL.href.split('/#/')[1];

        return ((this.href == URL) || (route && urlRoute.indexOf(route) > -1));
    }).parent('li').addClass('active');
});
