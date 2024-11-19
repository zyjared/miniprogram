
Component({

    properties: {
        // -------------------------
        // navigation-bar 见相关组件
        // -------------------------

        extPageClass: {
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
            type: Boolean,
            value: true
        },
        show: {
            type: Boolean,
            value: true,
        },
        delta: {
            type: Number,
            value: 1
        },

        // ----------------
        // search
        // ----------------

        value: {
            type: String,
            value: ''
        },

        placeholder: {
            type: String,
            value: '搜索'
        },

        /**
         * 当取消时，是否清空输入框
         *
         * 忽略该属性，直接通过 bindcancel 事件控制或许更好
         */
        clearOnCancel: {
            type: Boolean,
            value: false
        }

    },

    data: {
        scrolled: false,
        isIos: wx.getDeviceInfo().system.startsWith("IOS"),
        barPaddingRight: (wx.getWindowInfo().windowWidth
            - wx.getMenuButtonBoundingClientRect().left
            + 'px'
        ),
        clearStyle: 'display: none',
    },

    observers: {
        'value, scrolled': function (value, scrolled) {
            const style = value && scrolled ? 'display: flex' : 'display: none'
            if (this.data.clearStyle !== style) {
                wx.nextTick(() => {
                    this.setData({
                        clearStyle: style
                    })
                })
            }
        }
    },

    lifetimes: {
        created() {
            // @ts-ignore
            this._preKeyboardHeight = wx.worklet.shared(null)
        },
        attached() {
        }
    },

    methods: {

        handleScrolled() {
            if (!this.data.scrolled) {
                this.setData({
                    scrolled: true,
                })
            }
        },

        handleSearchBlur() {
            this.setData({
                scrolled: false,
            })
        },

        handleSearchClear() {
            this.setData({
                value: '',
                scrolled: true
            })
            this.triggerEvent('input', { value: '' }, {})
        },

        handleKeyboardHeightChange(e: WechatMiniprogram.InputKeyboardHeightChange) {
            'worklet'
            const { height } = e.detail
            // @ts-ignore
            const toBottom = this._preKeyboardHeight.value !== null && (this._preKeyboardHeight.value - height) > 0
            // @ts-ignore
            this._preKeyboardHeight.value = height

            if (height === 0 && toBottom) {
                const setBlur = this.handleSearchBlur.bind(this)
                wx.worklet.runOnJS(setBlur)()
            }
        },

        onConfirm(e: WechatMiniprogram.InputConfirm) {
            this.triggerEvent('confirm', { value: e.detail.value }, {})
        },

        onInput(e: WechatMiniprogram.Input) {
            this.triggerEvent('input', { value: e.detail.value }, {})
        },

        onCancel() {
            if (this.data.scrolled) {
                const value = this.data.clearOnCancel ? '' : this.data.value
                this.setData({
                    scrolled: false,
                    value,
                })

                this.triggerEvent('cancel', { value }, {})

            } else {
                this.setData({
                    scrolled: true,
                })
            }
        },

    }
})