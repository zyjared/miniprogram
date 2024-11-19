// @ts-ignore
const { shared, timing } = wx.worklet;

Component({

    properties: {
        show: {
            type: Boolean,
            value: true,
        },
        size: {
            type: Number,
            value: 16,
        },
        color: {
            type: String,
            value: '#0284c7'
        },
        duration: {
            type: Number,
            value: 200
        }
    },

    data: {
        style: '',
        _timer: null as null | number
    },

    observers: {
        'show, duration': function (show, duration) {
            if (!duration) return;
            this.handleLoadingOpacity(show ? 1 : 0, duration)
        }
    },

    lifetimes: {
        created() {
            // @ts-ignore
            this._opacity = shared(1)
        },
        attached() {
            this.applyAnimatedStyle('._loading-wrapper', () => {
                'worklet'
                return {
                    // @ts-ignore
                    opacity: `${this._opacity.value}`,
                    // @ts-ignore
                    display: `${this.data.show && this._opacity.value !== 0 ? 'block' : 'none'}`
                }
            })
        },
    },

    methods: {
        handleLoadingOpacity(opacity: 0 | 1, duration: number = 300) {
            'worklet'
            // @ts-ignore
            this._opacity.value = timing(opacity, { duration })
        },
    }
})