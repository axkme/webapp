'use strict';
module.controller('NewTopicController', ['$scope', '$rootScope', '$timeout', 'TopicService', 'DateHelper', function ($scope, $rootScope, $timeout, TopicService, DateHelper) {

    $scope.page = 1;
    $scope.limits = 30;
    $scope.isLoad = false;
    $scope.hasMore = true;
    $scope.onLoadMore = false;
    $scope.topics = [];

    $scope.onLoad = function () {
        $scope.loadTopics();
    };

    $scope.loadTopics = function () {
        $scope.isLoad = true;
        TopicService.getAll($scope.page).success(function (res) {
            if (res.length < $scope.limits) {
                $scope.hasMore = false;
            }
            for (var i = 0; i < res.length; i++) {
                $scope.topics.push(res[i]);
            }
            $timeout(function () {
                $scope.onLoadMore = false;
            }, 200);
        }).error(function () {

        }).finally(function () {
            $scope.isLoad = false;
        });
    };

    $scope.loadMore = function () {
        $scope.page += 1;
        $scope.onLoadMore = true;
        $scope.loadTopics();
    };
    
    $scope.displayDate = function (date) {
        return DateHelper.convertDate(date);
    };

    $scope.onLoad();

}]);
