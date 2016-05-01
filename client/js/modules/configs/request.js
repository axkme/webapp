'use strict';
module.factory('httpRequestInterceptor', ['$cookies', function ($cookies) {
    return {
        request: function (config) {
            var authorization = $cookies.get('authorization');
            if (authorization) {
                config.headers['authorization'] = authorization;
            }
            return config;
        }
    };
}]);