'use strict';
module.controller('AnnounceController', ['$scope', '$rootScope', '$timeout', 'AnnounceService', 'DateHelper', function ($scope, $rootScope, $timeout, AnnounceService, DateHelper) {

    $scope.onLoad = function () {
        $scope.loadTopic();
    };

    $scope.loadTopic = function () {
        AnnounceService.getAll($scope.page).success(function (res) {
            $scope.model = res;
        }).error(function () {

        }).finally(function () {
            $scope.isLoad = true;
        });
    };

    $scope.displayDate = function (date) {
        return DateHelper.convertDate(date);
    };

    $scope.onLoad();

}]);
