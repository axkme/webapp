'use strict';
module.controller('HeaderController', ['$scope','$rootScope', '$timeout', 'UserService', function ($scope, $rootScope, $timeout, UserService) {

    $scope.toggleForm = function () {
        if (!$scope.user.username) {
            $rootScope.$broadcast('OPEN_USER_POPUP')
        }
        else {
            $rootScope.$broadcast('TOGGLE_TOPIC_FORM');
        }
    };

}]);
