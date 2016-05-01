'use strict';
module.factory('TopicService', ['$http', function ($http) {
    return {
        getAll: function (page) {
            return $http.get('/api/v1/topics?p=' + page);
        },
        post: function (data) {
            return $http.post('/api/v1/topics', data);
        }
    };
}]);
