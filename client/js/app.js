'use strict';
var module = angular.module('app', ['ngCookies']);
module.config(function ($httpProvider) {
    Raven.config('https://5e81acabdff64627a6e8f2bf354700c5@app.getsentry.com/76464').install();
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