Component({
  /**
   * 组件的属性列表
   */
  properties: {
	menuSrc: {
      type: String
    },
	menuText: {
      type: String
    }		
  },

  /**
   * 组件的初始数据
   */
  data: {
// 	src:'../../images/logo.png',
// 	text:'nihao'
  },

  /**
   * 组件的方法列表
   */
  methods: {
		jump:function(){
			wx.navigateTo({
				url: '../tongzhi/tongzhi',
				success: function(res) {

				},
				fail: function(res) {

				},
				complete: function(res) {

				},
			})
		}
  }
})


