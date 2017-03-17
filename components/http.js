/**
 * Created by Administrator on 2016/11/25.
 */
'use strict';
(function (angular) {
	// 由于angular提供的异步请求对象不支持自定义回调函数名
	// 而angular随机分配的回调函数名称又不被豆瓣支持
	var http = angular.module('movie.services.http',[]);
	http.service('HttpService',['$window','$document',
		function ($window,$document) {
		// console.log($document);
		// 执行过程1.根据异步请求的地址拼接一个callback参数。
				// 2.将这个地址当做一个script文件请求callback（data）
		this.jsonp = function(url, data, callback) {// url->放在script中->放入html中自动执行
			// 2.将data转化成url字符串形式{id:1;name:'zhangsan'}=>?id=1&name=zhangshan
			var querystring = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in data) {
				querystring += key + '=' + data[key] + '&';
			}
			// 1.挂载回调函数
			var fnSuffix = Math.random().toString().replace('.', '');
			var cbFuncName = 'my_json_cb_' + fnSuffix;
			// 3.处理url中的回调函数
			querystring += 'callback=' + cbFuncName;
			// 4.创建一个script标签
			var scriptElement = $document[0].createElement('script');//[0]angular中内置的jqueryLite对象转化为DOM对象
			scriptElement.src = url + querystring;

			$window[cbFuncName] = function (data) {
				callback(data);
				$document[0].body.removeChild(scriptElement);
			};

			// 5.将script标签放在页面中
			$document[0].body.appendChild(scriptElement);
			// append过后页面会自动向这个地址发送请求，请求完成后自动执行
		};
	}])
})(angular);
