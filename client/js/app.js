'use strict';
var module = angular.module('app', ['ngCookies']);
module.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});
var app = {
    onReady: function () {
        angular.bootstrap(document, ['app']);
    }
};
$(document).ready(function () {
    app.onReady();
});