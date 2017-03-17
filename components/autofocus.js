/**
 * Created by Administrator on 2016/11/29.
 */
(function (angular) {
	angular.module('movie.directives.auto_focus',[])
		.directive('autoFocus',['$location',function ($location) {
			// var path = $location.path();
			// console.log(path);
			return{
				restrict:'A',
				link:function ($scope,iElm,iAttrs,controller) {
					$scope.$location = $location;
					$scope.$watch('$location.path()',function (now) {
						// 当path发生变化时执行，now是变化后的值
						var aLink = iElm.children().attr("href");
						var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
						// console.log(now+'-----------'+type);
						if (now.startsWith(type)){
							iElm.parent().children().removeClass('active');
							iElm.addClass('active');
						}else{
							iElm.removeClass('active');
						}
					});

					/*iElm.on('click',function () {
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
						// window.iele = iElm;
					})*/
				}
			}
		}])
})(angular);
