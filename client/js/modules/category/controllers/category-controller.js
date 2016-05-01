'use strict';
module.controller('CategoryController', ['$scope', '$rootScope', '$timeout', 'CategoryService', function ($scope, $rootScope, $timeout, CategoryService) {

    $scope.categories = [];

    $scope.onLoad = function () {
        CategoryService.getAll().success(function (res) {
            $scope.categories = res;
        }).error(function () {

        }).finally(function () {
            $scope.categoryLoaded = true;
        });
    };

    $scope.openLogin = function () {
        $rootScope.$broadcast('OPEN_USER_POPUP');
    };

    $scope.openRegister = function () {
        $rootScope.$broadcast('OPEN_REGISTER_POPUP');
    };


    $scope.onLoad();

}]);