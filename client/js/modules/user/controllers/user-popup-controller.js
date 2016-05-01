'use strict';
module.controller('UserPopupController', ['$scope', '$rootScope', '$timeout', '$cookies', 'UserService', function ($scope, $rootScope, $timeout, $cookies, UserService) {

    $scope.model = {};

    $scope.close = function () {
        $scope.animate = 'fadeOut';
        $scope.visible = false;
    };

    $scope.login = function () {

        console.log($scope.model);

        if ($scope.model.username && $scope.model.password) {
            $scope.isLoad = true;
            UserService.login($scope.model).success(function (res) {
                $rootScope.$broadcast('UPDATE_USER', res);
                $scope.onLoginSuccess(res);
            }).error(function (err) {
                $scope.onLoginError(err);
            });
        }
        else {
            $scope.error.has_error = true;
            $scope.error.message = 'กรุณากรอกข้อมูลให้ครบก่อนสมัครใช้งาน';
        }
    };

    $scope.register = function () {
        $scope.visible = false;
        $rootScope.$broadcast('OPEN_REGISTER_POPUP');
    };

    $scope.logout = function () {
        $scope.isLoad = true;
        UserService.logout().success(function (res) {
            $rootScope.$broadcast('REMOVE_USER');
            $scope.close();
        }).error(function (err) {
            $scope.error.has_error = true;
            $scope.error.message = 'ระบบขัดข้องกรุณาลองอีกครั้งหรือติดต่อผู้ดูแลเว็บไซต์';
        }).finally(function () {
            $scope.isLoad = false;
        });
    };

    $scope.onLoginSuccess = function (res) {
        var date = new Date();
        var exp = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
        $cookies.put('authorization', res.token, { path: '/', expires: exp });
        $scope.isLoad = false;
    };

    $scope.onLoginError = function (err) {
        $scope.error.has_error = true;
        $scope.isLoad = false;
        if (err.status === 400) {
            $scope.error.message = 'นามแฝงหรือรหัสผ่านไม่ถูกต้อง';
        }
        else if (err.status === 500) {
            $scope.error.message = 'ระบบขัดข้องกรุณาลองอีกครั้งหรือติดต่อผู้ดูแลเว็บไซต์';
        }
    };

    $scope.$on('OPEN_USER_POPUP', function () {
        $scope.animate = 'fadeIn';
        $scope.visible = true;
        $scope.isLoad = false;
        $scope.model = {};
        $scope.error = {};
    });

}]);
