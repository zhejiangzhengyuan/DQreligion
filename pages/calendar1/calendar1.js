var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
  data: {
    date: '2016-09-01'
  },
	bindDateChange:function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
	}
})