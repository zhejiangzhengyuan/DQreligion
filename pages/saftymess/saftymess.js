// pages/saftymess/saftymess.js

const app = getApp();
var users = require("../../utils/author.config.js");
var evals = require("../../utils/evals.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		array: ['全部列表', '未整改列表', '已整改列表', '无问题列表'],
		listname: 0,
		date: '2018-11-01',
		dates: '2018-11-14',
		infolist: [],
		show:false
	},
	bindDateChange2: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
	},
	bindDateChange: function(e) {

		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			dates: e.detail.value
		})
	},
	bindPickerChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			listname: e.detail.value
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	getlocal: function() {
		console.log("123")
		var that = this;
		wx.getStorage({
			key: "userinfo",
			success: function(res) {
				console.log("456");
				var datas = res.data;
				var arr = res.data.split('[');
				if (arr[1] != undefined)
					arr = arr[1].split(']');
				datas = JSON.parse(arr[0]);
				//console.log(datas);
				users.usermess = datas;
				console.log(users.usermess);
				//that.getInformByTime(users.usermess)
				that.getinfo(users.usermess)
			}
		})
	},
	getinfo: function(usr) {
		var that = this;
		var urldata = {
			"VillageCode": usr.VillageCode,
			"DutiesCode": usr.DutiesCode,
			"StreetCode": usr.StreetCode,
			"ReligionCode": usr.ReligionCode,
			"SiteCode": usr.SiteCode,
			"TypeCode": '001',
			"Quarter": '',
			"StartTime": that.data.date,
			"EndTime": that.data.dates,
			"JiDu": ''
		}
		var ashx = "/InspectionFind.ashx";
		wx.request({
			type: 'POST',
			url: users.httpurl + ashx,
			data: urldata,
			success: function(res) {
				//console.log(urldata)
				//console.log(res.data);
				var datas = res.data;
				var arr = res.data.split('[');
				arr = arr[1].split(']');
				datas = JSON.parse('[' + arr[0] + ']').reverse();
				that.setData({
					infolist: datas
				})
				console.log(that.data.infolist)
			}
		});

	},
	jumpdetils: function() {
		wx.navigateTo({
			url: '../saftydetils/saftydetils'
		})
	},
	onLoad: function(options) {
		this.getlocal();
		// this.getInformByTime(usermess);
	},
	getdetils: function(e) {
		var that = this;
		var det = e.currentTarget.dataset.detils;
		evals.saftdetils = det;
		//console.log(evals.saftdetils);
		this.jumpdetils();
	},
  toggle:function(){
		this.setData({
			show:!this.data.show
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
