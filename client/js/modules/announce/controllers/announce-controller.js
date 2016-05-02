'use strict';
module.controller('AnnounceController', ['$scope', '$rootScope', '$timeout', 'AnnounceService', 'DateHelper', function ($scope, $rootScope, $timeout, AnnounceService, DateHelper) {

    $scope.onLoad = function () {
        $scope.loadAnnounce();
    };

    $scope.loadAnnounce = function () {
        $scope.isLoad = true;
        AnnounceService.getAll().success(function (res) {
            $scope.model = res;
        }).error(function () {

        }).finally(function () {
            $scope.isLoad = false;
        });
    };

    $scope.displayDate = function (date) {
        return DateHelper.convertDate(date);
    };

    $scope.onLoad();

}]);
