import { icones } from '../../../components/zicon/icones'
import { presetColors } from '../../../utils/color'

const icons = Object.keys(icones)
const colors = presetColors.slice(0, 13)

Page({

    data: {
        icons: icons,
        size: 36,
        color: colors[Math.floor(Math.random() * colors.length)],
        colors: colors
    },

    changeSize(e: WechatMiniprogram.SliderChange) {
        const { value } = e.detail
        this.setData({
            size: value
        })
    },

    selectColor(e: WechatMiniprogram.TouchEvent) {
        const { color } = e.currentTarget.dataset
        this.setData({
            color
        })
    },

    onLoad() {

    },

    onReady() {

    },

    onShow() {

    },

    onHide() {

    },

    onUnload() {

    },

    onPullDownRefresh() {

    },

    onReachBottom() {

    },


    onShareAppMessage() {

    }
})