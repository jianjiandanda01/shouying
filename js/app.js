var app = {
	//获取url方法
	getUrlParam: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if(r != null) return unescape(r[2]);
		return null; //返回参数值
	},
	//AJAX封装方法
	AJAXData: function(url, type, data, fun) {
		$.ajax({
			type: type,
			url: url,
			data: data,
			success: function(res) {
				fun(res)
			},
			error: function(res) {
				console.log("链接出错!!!---------------");
				console.log(res);
			}
		});
	},
	//VUE封装方法
	NewVueFun: function(el, data) {
		return new Vue({
			el: el,
			data: data
		})
	}
}
//创建左侧导航菜单
layui.use('laytpl', function() {
	var laytpl = layui.laytpl;
	//拿到页面数据
	app.AJAXData("../json/app.json", "get", {}, function(data) {
		//实例化layui
		var element = layui.element;
		//获取页面模版
		$.get("../view/navView.html", function(getTpl) {
			//加载页面模版
			laytpl(getTpl).render(data.navData, function(html) {
				var view = document.getElementById('view');
				view.innerHTML = html;
			});
			//获取页面模版
			$.get("../view/navTitle.html", function(getTplA) {
				//加载页面模版
				laytpl(getTplA).render(data, function(html) {
					var viewTitle = document.getElementById('viewTitle');
					viewTitle.innerHTML = html;
				});
				layui.use('element', function() {
					//输出实例化layui
					prepare(element);
					//输出加载完毕方法
					prepareFun(element);
				});
			})
		})
	})
});
function prepareFun(element){
	//隐藏侧边栏方法
	$("#layadmin-event").click(function(){
		$("#view").toggleClass("layui-sideMin");
		$("#viewBody").toggleClass("layui-bodyLong");
	})
}

