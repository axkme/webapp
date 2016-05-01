'use strict';
module.factory('AnnounceService', ['$http', function ($http) {
    return {
        getAll: function () {
            return $http.get('/api/v1/announces');
        }
    };
}]);
