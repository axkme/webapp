'use strict';
module.controller('RootController', ['$scope','$timeout', '$cookies', 'UserService', function ($scope, $timeout, $cookies, UserService, CategoryService) {

    $scope.user = {};

    $scope.onLoad = function () {
        if ($cookies.get('authorization')) {
            UserService.me().success(function (res) {
                $scope.user = res;
            }).error(function () {
                $cookies.remove('authorization');
            }).finally(function () {
                $scope.isUserLoad = true;
                $scope.init();
            });
        }
        else {
            $scope.init();
        }
    };

    $scope.init = function () {
        $timeout(function () {
            $scope.ready = true;
        }, 500);
    };

    $scope.$on('REMOVE_USER', function () {
        $scope.user = {};
        $cookies.remove('authorization');
    });
    $scope.$on('UPDATE_USER', function (e, user) {
        $scope.user = user;
    });

    $scope.onLoad();

}]);
