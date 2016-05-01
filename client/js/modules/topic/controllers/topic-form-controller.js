'use strict';
module.controller('TopicFormController', ['$scope', '$rootScope', '$timeout', 'CategoryService', 'TopicService', function ($scope, $rootScope, $timeout, CategoryService, TopicService) {
    
    $scope.categories = [];
    $scope.validateModel = {};
    $scope.validateModel.isValid = true;
    $scope.model = {};

    $scope.onLoad = function () {
        if (screen.availWidth === 768 && screen.availHeight === 1004 && navigator.userAgent.indexOf('Version/8.0') > -1) {
            $scope.isMini2 = true;
        }
        CategoryService.getAll().success(function (res) {
            $scope.categories = res;
        }).error(function () {

        }).finally(function () {
            $scope.categoryLoaded = true;
        });
    }

    $scope.validate = function () {
        $scope.validateModel.isValid = true;
        if (!$scope.model.title) {
            $scope.validateModel.isValid = false;
            $scope.validateModel.message = 'กรุณากรอกหัวข้อคำถามก่อนกดส่ง'
        }
        else if ($scope.model.title.length > 250) {
            $scope.validateModel.isValid = false;
            $scope.validateModel.message = 'หัวข้อคำถามยาวเกินไป'
        }
        else if (!$scope.model.message) {
            $scope.validateModel.isValid = false;
            $scope.validateModel.message = 'กรุณากรอกรายละเอียดคำถามก่อนกดส่ง'
        }
        else if ($scope.model.message.length > 4000) {
            $scope.validateModel.isValid = false;
            $scope.validateModel.message = 'รายละเอียดคำถามยาวเกินไป'
        }
        else if (!$scope.model.category) {
            $scope.validateModel.isValid = false;
            $scope.validateModel.message = 'กรุณาเลือกหมวดหมู่ของคำถามก่อนกดส่ง'
        }
    };

    $scope.submit = function () {
        if (!$scope.user.username) {
            $rootScope.$broadcast('OPEN_USER_POPUP')
        }
        else {
            $scope.validate();
            if ($scope.validateModel.isValid) {
                $scope.isLoad = true;
                TopicService.post($scope.model).success(function (data) {
                    window.location.href = '/topics/' + data.sid;
                }).error(function (err) {

                }).finally(function () {
                    $timeout(function () {
                        $scope.isLoad = false;
                    }, 500);
                    $scope.validateModel.isValid = false;
                    $scope.validateModel.message = 'ส่งคำถามล้มเหลวกรุณาลองอีกครั้งหรือติดต่อผู้ดูแลเว็บไซต์'
                });
            }
        }
        
    };

    $scope.$on('TOGGLE_TOPIC_FORM', function () {
        if (!$scope.visible) {
            if ($scope.isMini2) {
                $scope.amimation = 'fadeInUp';
            }
            else {
                $scope.amimation = 'flipInY';
            }
            $scope.visible = true;
        }
        else {
            if ($scope.isMini2) {
                $scope.amimation = 'fadeOutDown';
            }
            else {
                $scope.amimation = 'flipOutY';
            }
            $timeout(function() {
                $scope.visible = false;
            }, 500);
        }
    });

    $scope.onLoad();
}]);
