import { examples as presetExamples } from './data'

Page({
    data: {
        examples: [] as Examples.Item[],
        searchValue: '',
    },

    handleSearch(e: WechatMiniprogram.CustomEvent) {
        const { value } = e.detail
        const examples = presetExamples.filter(el => el.title.includes(value))
        this.setExamples(examples)
    },

    setExamples(examples: Examples.Item[]) {
        const { examples: _examples } = this.data
        let needUpdate = false
        if (examples.length !== _examples.length || examples.length === 0) {
            needUpdate = true
        } else {
            const lastIndex = examples.length - 1
            if (examples[0].id !== _examples[0].id || examples[lastIndex].id !== _examples[lastIndex].id) {
                needUpdate = true
            }
        }

        needUpdate && this.setData({
            examples
        })
    },

    initExamples() {
        this.setData({
            searchValue: '',
            examples: presetExamples
        })
    },

    navigateTo(e: WechatMiniprogram.BaseEvent) {
        const { url } = e.currentTarget.dataset
        wx.navigateTo({ url })
    },


    onLoad() {
        this.initExamples()
    },

})