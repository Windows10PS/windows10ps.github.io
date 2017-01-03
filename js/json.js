(function () {
    angular.module('MyApp', []);
    angular.module('MyApp').controller('MyController', function ($scope) {
        return true;
    }).directive('jsonTable', function () {
        return {
            restrict: 'E',
            template: '<div ng-if="data.length">\n  <table class="jsontable">\n    <thead class="jsontable__header">\n      <tr>\n      </tr>\n    </thead>\n    <tbody class="jsontable__body">\n      <tr ng-repeat="(key, item) in data track by $index">\n        <td>\n          <img ng-src="{{item.photo}}" class="jsontable__avatar"/>\n        </td>\n        <td> <a href="{{item.name}}">{{item.name}}</a>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n<div ng-if="!data">\n  <span>Loading...</span>\n</div>',
            scope: { jsonUrl: '@jsonData' },
            controller: function ($scope, $http) {
                $scope.data = {};
                if ($scope.jsonUrl) {
                    return $scope.data = $http.get($scope.jsonUrl).then(function (_this) {
                        return function (result) {
                            return $scope.data = result.data;
                        };
                    }(this));
                }
            }
        };
    });
}.call(this));