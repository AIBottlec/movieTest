/**
 * Created by Administrator on 2016/11/30.
 */
(function (angular) {
	'use strict';
	//创建正在热映的模块
	var module = angular.module('movie.movie_detail', ['ngRoute','movie.services.http']);
	//配置模块路由
	module.config(['$routeProvider',
		function ($routeProvider) {

			console.log(111);

			$routeProvider.when('/detail/:id', {
			templateUrl: 'movie_detail/view.html',
			controller: 'MovieDetailController'
		});
	}]);

	module.controller('MovieDetailController',
		['$scope','$route','$routeParams','HttpService','AppConfig',
			function ($scope,$route,$routeParams,HttpService,AppConfig) {
				$scope.movie = {};
				$scope.loading = true;
				var id = $routeParams.id;
				var APIAddress  = AppConfig.detailApiAddress+id;
				//跨域的方式
				HttpService.jsonp(APIAddress,{},function (data) {
					$scope.movie = data;
					$scope.loading = false;
					$scope.$apply();//通过一个第三方的异步请求之后，必须要重新刷新
				});
			}]);
})(angular);
