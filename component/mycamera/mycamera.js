// component/camera/camera.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
		ctx: {
			type: Object,
			value: {}
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
    device: true,
    tempImagePath: [], // 拍照的临时图片地址
    tempThumbPath: [], // 录制视频的临时缩略图地址
    tempVideoPath: [], // 录制视频的临时视频地址
		touch_start: 0,	//按键按下时间
		touch_end: 0,	//按键抬起时间
    camera: false,
    ctx: {},
    type: "takePhoto",
    startRecord: false,
    time: 0,
    timeLoop: "", 
  },
  /**
   * 组件的方法列表
   */
  methods: {
// 		onLoad() {
// 			this.setData({
// 				ctx: wx.createCameraContext()
// 			})
// 		},
		// 切换相机前后置摄像头
		devicePosition() {
			this.setData({
				device: !this.data.device,
			})
			console.log("当前相机摄像头为:", this.data.device ? "后置" : "前置");
		},
		//判断按下时间
		tapTime(e){
			var touchTime = this.data.touch_end - this.data.touch_start;
			if(touchTime > 350)
				this.delectImg(e)
			else
				this.showImg(e)
		},
		
		//按下事件开始
		mytouchstart: function (e) {
			let that = this;
			that.setData({
				touch_start: e.timeStamp
			})
			// console.log(e.timeStamp + '- touch-start')
		},
		//按下事件结束
		mytouchend: function (e) {
			let that = this;
			that.setData({
				touch_end: e.timeStamp
			})
			// console.log(e.timeStamp + '- touch-end')
		},
		// 图片预览
		showImg(e){
			let {tempImagePath} = this.data;
			var current = tempImagePath[e.target.id];		
			wx.previewImage({
					current: current, // 当前显示图片的链接
					urls: this.data.tempImagePath // 需要预览的图片链接列表
			})
		},
		// 图片删除
		delectImg(e){
			let _this = this;
			let {tempImagePath} = this.data;
			wx.showModal({
				title: "照片",
				content: "是否删除该照片？",			
				success: function(res){
					if(res.confirm == true){
						tempImagePath.splice(e.target.id,1);
						_this.setData({
							tempImagePath: tempImagePath
						});
					}else
						return false
				}
			})
		},
		// 摄像头功能
		camera() {
			let {type, startRecord, tempImagePath} = this.data;
			let ctx = wx.createCameraContext();
			// 拍照
			if (type == "takePhoto") {
				console.log("拍照");
				ctx.takePhoto({
					quality: "normal",
					success: (res) => {
						// console.log(res); 
						tempImagePath.push(res.tempImagePath)	//将返回值存入图片数组
						this.setData({
							tempImagePath: tempImagePath,
							camera: false,
						});
	//           wechat.uploadFile("https://xx.xxxxxx.cn/api/upload", res.tempImagePath, "upload")
	//             .then(d => {
	//               console.log(d);
	//             })
	//             .catch(e => {
	//               console.log(e);
	//             })
					},
					fail: (e) => {
						console.log(e);
					}
				})
			}
			// 录视频
			else if (type == "startRecord") {
				if (!startRecord) {
					console.log("开始录视频");
					this.setData({
						startRecord: true
					});
					// 30秒倒计时
					let t1 = 0;
					let timeLoop = setInterval(() => {
						t1++;
						this.setData({
							time: t1,
						})
						// 最长录制30秒
						if (t1 == 30) {
							clearInterval(timeLoop);
							this.stopRecord(ctx);
						}
					}, 1000);
					this.setData({
						timeLoop
					})
					// 开始录制
					ctx.startRecord({
						success: (res) => {
							console.log(res);
						},
						fail: (e) => {
							console.log(e);
						}
					})
				}
				else {
					this.stopRecord(ctx);
				}
			}
		},
		// 停止录制
		stopRecord(ctx) {
			console.log("停止录视频");
			clearInterval(this.data.timeLoop);
			ctx.stopRecord({
				success: (res) => {
					this.setData({
						tempThumbPath: res.tempThumbPath,
						tempVideoPath: res.tempVideoPath,
						camera: false,
						startRecord: false,
						time: 0
					});
					wechat.uploadFile("https://xx.xxxxxx.cn/api/upload", res.tempThumbPath, "tempThumbPath")
						.then(d => {
							console.log(d);
							return wechat.uploadFile("https://xx.xxxxxx.cn/api/upload", res.tempVideoPath, "tempVideoPath")
						})
						.then(d => {
							console.log(d);
						})
						.catch(e => {
							console.log(e);
						})
				},
				fail: (e) => {
					console.log(e);
				}
			})
		},
		// 打开模拟的相机界面
		open(e) {
			let { type } = e.target.dataset;
			console.log("开启相机准备", type == "takePhoto" ? "拍照" : "录视频");
			this.setData({
				camera: true,
				type: type
			})
		},
		// 关闭模拟的相机界面
		close() {
			console.log("关闭相机");
			this.setData({
				camera: false
			})
		}
	}
})