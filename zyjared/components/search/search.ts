type Data = Record<string, any>

// @ts-ignore
const { shared, timing, runOnJS } = wx.worklet

Component({

    properties: {
        value: {
            type: String,
            value: ''

        },

        placeholder: {
            type: String,
            value: '搜索'
        },

        focus: {
            type: Boolean,
            value: false
        },

        useDefaultStyle: {
            type: Boolean,
            value: true
        }
    },

    data: {
        showPlaceholder: true,

        // focus 后

        /** 搜索框宽度百分比 */
        _searchBarWidthRatio: 0,
    },

    observers: {
        // 'value': function (value) {
        //     let nextShowPlaceholder = !value
        //     if (nextShowPlaceholder !== this.data.showPlaceholder) {
        //         this.setData({
        //             showPlaceholder: nextShowPlaceholder
        //         })
        //     }
        // }
    },

    lifetimes: {
        created() {
            // @ts-ignore
            this._searchBarWidthRatio = shared(100)
            // @ts-ignore
            this._preKeyboardHeight = shared(0)
        },
        attached() {

            this.createSelectorQuery().in(this)
                .select('.z-search__wrapper').boundingClientRect()
                .select('.z-search__placeholder-bar').boundingClientRect()
                .exec(res => {
                    this.setData({
                        _searchBarWidthRatio: ((res[1].width / res[0].width) * 100)
                    })
                })

            this.applyAnimatedStyle('.z-search__bar', () => {
                'worklet'
                return {
                    // @ts-ignore
                    width: `${this._searchBarWidthRatio.value}%`,
                }
            })

        }
    },

    methods: {

        handleWorkletFocus() {
            'worklet'
            // @ts-ignore
            this._searchBarWidthRatio.value = timing(this.data._searchBarWidthRatio, { duration: 200 })
        },

        handleWorkletBlur() {
            'worklet'
            // @ts-ignore
            this._searchBarWidthRatio.value = timing(100, { duration: 200 })
        },

        handleFocus() {
            if (this.data.focus) return
            this.setData({
                focus: true
            })
            this.handleWorkletFocus()
        },

        handleBlur() {
            if (!this.data.focus) return
            this.setData({
                focus: false
            })
            this.handleWorkletBlur()
        },

        bindClick(_e: WechatMiniprogram.TouchEvent) {
            // TODO: 是否需要通过位置触发 clear 事件，让 clear 在 input 后一层
            this.handleFocus()
        },

        bindSelectionChange(e: WechatMiniprogram.CustomEvent) {
            // 显示逻辑由 observer 的 value 决定
            const { selectionStart, selectionEnd } = e.detail
            const isEmpty = selectionStart === selectionEnd && selectionStart === 0

            if (!isEmpty && this.data.showPlaceholder && !this.data.value) {
                this.setData({
                    showPlaceholder: false
                })
            }

        },

        // bindKeyboardCompositionStart(_e) {
        //     console.log('开始输入', e.detail)
        //     if (this.data.showPlaceholder) {
        //         console.log('隐藏占位符')
        //         this.setData({
        //             showPlaceholder: false
        //         })
        //     }
        // },

        _onKeyboardTobottom() {

            if (!this.data.focus) return

            this.setData({
                focus: false
            })

            this.handleWorkletBlur()
        },

        bindKeyboardHeightChange(e: WechatMiniprogram.InputKeyboardHeightChange) {
            'worklet'
            const { height } = e.detail
            // @ts-ignore
            const toBottom = this._preKeyboardHeight.value - height > 0
            // @ts-ignore
            this._preKeyboardHeight.value = height

            if (height === 0 && toBottom) {

                const func = this._onKeyboardTobottom.bind(this)
                runOnJS(func)()

            }
        },

        bindClear() {
            this.setData({
                value: '',
                focus: true,
                showPlaceholder: true
            })
            this.handleWorkletFocus()
            this.triggerEvent('input', { value: "" }, {})
        },


        bindCancel() {
            this.setData({
                value: '',
                focus: false,
                showPlaceholder: true
            })
            this.handleWorkletBlur()
            this.triggerEvent('input', { value: '' }, {})
        },


        bindInput(e: WechatMiniprogram.Input) {
            const { value } = e.detail
            let nextShowPlaceholder = !value
            if (nextShowPlaceholder !== this.data.showPlaceholder) {
                this.setData({
                    showPlaceholder: nextShowPlaceholder
                })
            }
            this.triggerEvent('input', e.detail, {})
        },
    }
})
