Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    },
		innercheck: {
			type: Boolean,
			value: true
		}
  },
  methods: {
    // 这里是一个自定义方法
    onTap: function(){
			this.triggerEvent('customevent', {})
		}
  }
})
