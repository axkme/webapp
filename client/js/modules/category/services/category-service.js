'use strict';
module.factory('CategoryService', ['$http', function ($http) {

    var categories;

    return {
        getAll: function (model) {
            return $http.get('/api/v1/categories');
        }
    };
}]);
