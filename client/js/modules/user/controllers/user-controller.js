'use strict';
module.controller('UserController', ['$scope', '$rootScope', '$timeout', '$cookies', 'UserService', function ($scope, $rootScope, $timeout, $cookies, UserService) {

    $scope.openPopup = function () {
        $rootScope.$broadcast('OPEN_USER_POPUP');
    };

}]);
