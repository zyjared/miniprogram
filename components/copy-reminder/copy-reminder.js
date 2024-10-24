// components/copy-reminder/copy-reminder.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    text: String,
    confirmText: {
      type: String,
      value: ''
    },
    tip: {
      type: String,
      value: '复制成功'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    confirmBtn: {
      content: '知道了',
      variant: 'base'
    },
    visible: false,
    dialogKey: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    copy() {
      wx.setClipboardData({
        data: this.properties.text,
        success: () => {
          wx.hideToast()
          this.openDialog()
        }
      })
    },

    onConfirm() {
      this.triggerEvent('confirm')
      this.closeDialog()
    },

    openDialog() {
      this.setData({
        visible: true
      })
    },

    closeDialog() {
      this.setData({
        visible: false
      })
    }
  }
})