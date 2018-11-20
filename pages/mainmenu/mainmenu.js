//index.js
//获取应用实例
const app = getApp()

var comfun = require('../../utils/common.function.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
		menuText:'你好',
		menuSrc:'../../images/logo.png'
  },
  //事件处理函数
  jump: function() {
    wx.navigateTo({
      url: '../notification/notification'
    })
  },
	jumpSafeCheck:function(){
		wx.navigateTo({
			url:'../saftymess/saftymess'
		})
	},
	jumpUpDate:function(){
		wx.navigateTo({
			url:'../update/update'
		})
	},
	jumpSetting:function(){
		
	},
	jumpUser:function(){
		
	},
  onLoad: function () {
		var usr = comfun.getUserInfo()
		if(usr == {}){
			wx.navigateTo({
				url: '../index/index'
			})
		}else{
			this.setData({
				userInfo: usr
			});
		}			
	},
})
