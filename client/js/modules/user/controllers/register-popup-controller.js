'use strict';
module.controller('RegisterPopupController', ['$scope', '$rootScope', '$timeout', '$cookies', 'UserService', function ($scope, $rootScope, $timeout, $cookies, UserService) {

    $scope.close = function () {
        $scope.animate = 'fadeOut';
        $scope.visible = false;
    };

    $scope.register = function () {
        if ($scope.model.username && $scope.model.password) {
            $scope.isLoad = true;
            UserService.register($scope.model).success(function (res) {
                $scope.registerModel = res;
                $scope.registered = true;
            }).error(function (res) {
                $scope.onError(res);
            }).finally(function () {
                $scope.isLoad = false;
            });
        }
        else {
            $scope.error.has_error = true;
            $scope.error.message = 'กรุณากรอกข้อมูลให้ครบก่อนเข้าใช้งาน';
        }
    };

    $scope.onError = function (res) {
        $scope.error.has_error = true;
        if (res.error.message === 'user exist') {
            $scope.error.message = 'มีผู้ใช้นามแฝงนี้แล้ว';
        }
        else {
            $scope.error.message = 'ระบบขัดข้องกรุณาลองอีกครั้งหรือติดต่อผู้ดูแลเว็บไซต์';
        }
    };

    $scope.toLogin = function () {
        $scope.close();
        $rootScope.$broadcast('OPEN_USER_POPUP');
    };

    $scope.$on('OPEN_REGISTER_POPUP', function () {
        $scope.animate = 'fadeIn';
        $scope.visible = true;
        $scope.isLoad = false;
        $scope.registered = false;
        $scope.model = {};
        $scope.error = {};
    });

}]);
