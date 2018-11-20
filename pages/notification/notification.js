const app = getApp()
var authorcfg = require("../../utils/author.config.js")
Page({
	data: {
		index: 0,
		datas: [],
		usrname: "",
		showView: true,
		array: ['全部', '我发起的'],
		objectArray: [{
				id: 0,
				name: '全部列表'
			},
			{
				id: 1,
				name: '我发起的'
			}
		],
		infolist: [],
		infoDetail: [],
		boxOpen: true,
		date:"请选择起始时间",
		date1:"请选择结束时间",
		boxAll: true,
	},
	onLoad: function(options) {
		var that = this
		showView: (options.showView == "true" ? true : false)
		var usr
		wx.getStorage({
			key: 'userinfo',
			success(res) {
				var datas = res.data
				var arr = res.data.split('[')
				if (arr[1] != undefined)
					arr = arr[1].split(']')
				datas = JSON.parse(arr[0])
				that.setData({
					datas: datas,
					usrname: datas.UserName
				})
			}
		})
	},
	bindPickerChange: function(e) {
		var that = this
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
		if (e.detail.value == "1") {
			that.setData({
				showView: false,
			})
		} else {
			that.setData({
				showView: true,
			})
		}
	},
	bindDateChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
	},
	bindDateChange1: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date1: e.detail.value
		})
	},
	infoList: function() {
		var that = this
		that.getInformByTime(that.data.datas)
		console.log(that.data.usrname)
		that.setData({
			boxOpen: (!that.data.boxOpen)
		})
	},
	getInformByTime: function(usr) {
		var that = this
		// 获取用户信息
		var RecipientType = usr.DutiesCode
		var Recipient
		switch (RecipientType) {
			case '01':
				Recipient = '00';
				break;
			case '02':
				Recipient = usr.StreetCode;
				break;
			case '03':
				Recipient = usr.ReligionCode;
				break;
			case '04':
				Recipient = usr.SiteCode;
				break;
			case '05':
				Recipient = usr.VillageCode;
				break;
		}
		// 		if(CompareDate(startTime,endTime) == false)
		// 			alert('起始时间大于终止时间');
		wx.request({
			type: "POST",
			url: authorcfg.httpurl + '/InformFind.ashx',
			data: {
				"RecipientType": RecipientType,
				"Recipient": Recipient,
				"InitiatorType": RecipientType,
				"Initiator": Recipient,
				"StartTime": that.data.date,
				"EndTime": that.data.date1,
			},
			timeout: 5000,
			success: function(data) {
				wx.setStorageSync("notification", data);
				var notification = data;
				wx.getStorage({
					key: 'notification',
					success(res) {
						var info = res.data.data
						var arr = info.match(/\[(.*?)\]/g)
						arr = JSON.parse(arr[0])
						console.log(arr)
						for(var i =0;i<arr.length;i++){
							var a=arr[i].Time.split("T")
							var b = a[1].split(".")
							arr[i].Time=" "+a[0]+" "+b[0]
						}
						that.setData({
							infolist: arr.reverse()
						})
					}
				});
			},
			error: function() {
				alert("对不起，网速不给力，收不到通知！");
			}
		});
	},
	infoDetail: function(e) {
		var that = this
		var id = e.currentTarget.id
		console.log(id)
		var list = that.data.infolist
		list = list[id]
		that.setData({
			infoDetail: list
		})
		var list = that.data.infoDetail
		app.globalData.listDetail = list
		wx.navigateTo({
			url: '../infodetail/infodetail',
			data: {
				// list:that.data.infoDetail
			},
			success: function(res) {

			},
			fail: function(res) {

			},
			complete: function(res) {

			},
		})
	},
	onChangeShowState: function() {
		var that = this
		that.setData({
			showView: (!that.data.showView)
		})
	},
	boxopen:function(){
		var that=this
		that.setData({
			boxOpen: (!that.data.boxOpen)
		})
	},
	dateNew:function(){
		var that = this
		that.setData({
			date:"请选择起始时间",
			date1:"请选择结束时间",
		})
	}
})
