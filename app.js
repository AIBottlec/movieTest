'use strict';

// Declare app level module which depends on views, and components
angular.module('movie', [
	'ngRoute',
	'movie.movie_detail',//注意和movie_list的引用顺序
	'movie.movie_list',
	'movie.directives.auto_focus'
])
	.constant("AppConfig",{
		pageSize:2,
		listApiAddress:'https://api.douban.com/v2/movie/',
		detailApiAddress:'https://api.douban.com/v2/movie/subject/'
	})//常量-----依赖注入
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}])
	.controller('SearchController', ['$scope', '$route','AppConfig', function ($scope, $route,AppConfig) {
		// console.log(AppConfig);
		$scope.input = '';
		$scope.search = function () {
			$route.updateParams({category: 'search', q: $scope.input});
			// console.log($scope.input);
		}
	}]);
