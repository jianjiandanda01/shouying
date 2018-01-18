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
	var view = document.getElementById('view');
	$.get("view/navView.html", function(getTpl) {
		app.AJAXData("json/app.json", "get", {}, function(data) {
			//JavaScript代码区域
			layui.use('element', function() {
				var element = layui.element;
				if(app.use != undefined){
					 app.use(element)
				}
			});
			laytpl(getTpl).render(data.navData, function(html) {
				view.innerHTML = html;
			});
		})
	})
});