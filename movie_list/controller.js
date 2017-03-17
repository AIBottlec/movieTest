(function (angular) {
	'use strict';
	//创建正在热映的模块
	var module = angular.module('movie.movie_list', ['ngRoute', 'movie.services.http']);
	//配置模块路由
	module.config(['$routeProvider', function ($routeProvider) {

		console.log(222);

		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);

	module.controller('MovieListController',
		['$scope', '$route', '$routeParams', 'HttpService','AppConfig',
			function ($scope, $route, $routeParams, HttpService,AppConfig) {
				var count = AppConfig.pageSize;//每一页的数量
				var page = parseInt($routeParams.page);//当前是第几页
				var start = (page - 1) * count;//当前页数据从哪开始
				//控制器编写：1.设计暴露的数据；2.设计暴露的行为
				// 引用豆瓣API https://developers.douban.com/wiki/?title=api_v2
				//data.json数据来源http://api.douban.com/v2/movie/in_theaters
				$scope.subjects = [];
				$scope.message = '';
				$scope.totalCount = 0;
				$scope.totalpages = 0;
				$scope.loading = true;
				$scope.title = 'Loading...';
				$scope.currentPage = page;
				HttpService.jsonp(AppConfig.listApiAddress + $routeParams.category,
				// $routeParams的数据来源：1.路由匹配出来的；2.？参数
					{start: start, count: count, q: $routeParams.q},
					function (data) {
						// console.log(data);
						$scope.subjects = data.subjects;
						$scope.title = data.title;
						$scope.totalCount = data.total;
						$scope.totalpages = Math.ceil($scope.totalCount / count);
						$scope.loading = false;
						$scope.$apply('subjects');//apply的作用就是让指定的表达式重新同步
					});
				// 实现跨域请求
				// 查看angular文档可分析到：angular中将所有的JSONP的callback都挂在了angular.callbacks这个对象上
				// 我们必须给当前地址加上一个参数，callback=JSON_CALLBACK

				// 暴露一个更改上一页下一页的行为
				$scope.go = function (page) {
					if (page >= 1 && page <= $scope.totalpages) {
						$route.updateParams({page: page});
					}
				}
			}]);
})(angular);
