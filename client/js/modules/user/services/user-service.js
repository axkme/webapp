'use strict';
module.factory('UserService', ['$http', function ($http) {
	return {
        login: function (model) {
            return $http.post('/api/v1/login', model);
        },
        register: function (model) {
            return $http.post('/api/v1/users', model);
        },
        me: function () {
            return $http.get('/api/v1/me');
        },
        logout: function () {
            return $http.post('/api/v1/logout');
        }
    };
}]);
