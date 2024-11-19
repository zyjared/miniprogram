// @ts-ignore
const { shared, timing } = wx.worklet

Component({

    properties: {
        risen: {
            type: Boolean,
            value: false
        },

        risenHeight: {
            type: Number,
            value: 0
        },

        duration: {
            type: Number,
            value: 200
        }

    },

    data: {

    },

    observers: {
        'risen, risenHeight': function () {
            this.propsOnRisen()
        }
    },

    methods: {
        propsOnRisen() {
            const risen = this.data.risen ? this.data.risenHeight : 0
            // @ts-ignore
            if (this._risen.value !== risen) {
                // @ts-ignore
                this._risen.value = timing(risen, { duration: this.data.duration })
            }
        }
    },


    lifetimes: {
        created() {
            // @ts-ignore
            this._risen = shared(0)
        },
        attached() {
            this.applyAnimatedStyle('._risen', () => {
                'worklet'
                return {
                    // @ts-ignore
                    marginTop: `-${this._risen.value}px`
                }
            })
        },
    }
})