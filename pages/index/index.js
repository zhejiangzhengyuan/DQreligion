//index.js
//获取应用实例
const app = getApp();
// 获取自定义全局属性
var authorcfg = require("../../utils/author.config.js")

Page({
  data: {
		imgUrl: '../../images/bg-font.png',
		check: true,
    mottoUp: '德清县',
		mottoDown:	'宗教管理系统',
		username: '',
		password: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
	//获取input value
	bindKeyInput: function (e) {
		if(e.currentTarget.id == "username"){
			this.setData({
				username: e.detail.value
			})
		}else{
			this.setData({
				password: e.detail.value
			})
		}    
  },
	//登入按钮点击事件
	login: function(){
		var _this = this;
		// 显示loading框
		wx.showLoading({
			title: '正在登陆',
		})
		wx.request({
			url:authorcfg.httpurl + "/User.ashx",
			data:{
				"UserName":_this.data.username,
				"PassWord": _this.data.password
			},
			success(res){
				if(res.data != 0){
					// 关闭loading框
					wx.hideLoading()
					// 判断是否记住密码
					if(_this.data.check == true){
						wx.setStorageSync('memory','true');
					}else{
						wx.setStorageSync('memory','false');
					}					
					// 存储用户信息
					var usr = res.data.split(/\[(.*?)\]/g);
					wx.setStorageSync('userinfo', usr[1]);
					wx.navigateTo({
						url: '../mainmenu/mainmenu'
					})
				}else{
					wx.showToast({
					 title: '用户名密码错误！',
					 icon: 'none',
					 mask: true,
					 duration: 3000
					})
				}
			},
			fail(res){
				wx.showToast({
					title: "请求失败，错误信息："+res.errMsg,
					icon: 'none',
					mask: true,
					duration: 3000
				})
			}
		})
	},
  onLoad: function () {
		// 获取登陆讯息
		var _this = this;
		if(wx.getStorageSync('memory') == 'true'){
			wx.getStorage({
				key: 'userinfo',
				success(res){
					var data = JSON.parse(res.data);
					_this.setData({
						username: data.UserName,
						password: data.PassWord
					});
					wx.clearStorage()	// 清除数据
				}
			})
		}			
	}
})
