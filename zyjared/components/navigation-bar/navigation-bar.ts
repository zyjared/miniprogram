Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        extClass: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        background: {
            type: String,
            value: '#fff'
        },
        color: {
            type: String,
            value: '#000'
        },
        back: {
            type: Boolean,
            value: true
        },
        loading: {
            type: Boolean,
            value: false
        },
        homeButton: {
            type: Boolean,
            value: false,
        },
        animated: {
            // 显示隐藏的时候opacity动画效果
            type: Boolean,
            value: true
        },
        show: {
            // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
            type: Boolean,
            value: true,
            observer: '_showChange'
        },
        // back为true的时候，返回的页面深度
        delta: {
            type: Number,
            value: 1
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        displayStyle: ''
    },
    lifetimes: {
        attached() {
            const rect = wx.getMenuButtonBoundingClientRect()
            const win = wx.getWindowInfo()

            const device = wx.getDeviceInfo()
            const isDevtools = device.platform === 'devtools'
            const isIos = device.system.startsWith("IOS")
            const isAndroid = device.system.startsWith("Android")

            this.setData({
                ios: isIos,
                innerPaddingRight: `padding-right: ${win.windowWidth - rect.left}px`,
                leftWidth: `width: ${win.windowWidth - rect.left}px`,
                safeAreaTop: isDevtools || isAndroid ? `height: calc(var(--height) + ${win.safeArea.top}px); padding-top: ${win.safeArea.top}px` : ``
            })
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        _showChange(show: boolean) {
            const animated = this.data.animated
            let displayStyle = ''
            if (animated) {
                displayStyle = `opacity: ${show ? '1' : '0'
                    };transition:opacity 0.5s;`
            } else {
                displayStyle = `display: ${show ? '' : 'none'}`
            }
            this.setData({
                displayStyle
            })
        },
        back() {
            const data = this.data
            if (data.delta) {
                wx.navigateBack({
                    delta: data.delta
                })
            }
            this.triggerEvent('back', { delta: data.delta }, {})
        },
        home() {
            wx.switchTab({
                url: '/pages/index/index',
            })
        }
    },
})
