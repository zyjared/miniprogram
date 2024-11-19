import { presetColors, getContrastColor } from "../../utils/color";
import { user } from "./data"

const bgColor = presetColors[Math.floor(Math.random() * presetColors.length)];
const fgColor = getContrastColor(bgColor);

Page({

    data: {
        user,
        bgColor: bgColor,
        fgColor: fgColor,
        pageLoading: false,
        userAvatarText: '',
        scrolled: false,
        scrollIntoView: '',
        isIos: wx.getDeviceInfo().system.startsWith('IOS'),
        _safeTop: wx.getWindowInfo().safeArea.top,
        _barHeight: wx.getDeviceInfo().system.startsWith('IOS') ? 44 : 48,

        swiperItems: [
            {
                title: '示例-设备信息',
                url: '/pages/examples/device/device',
            },
            {
                title: '示例-长列表',
                url: '/pages/examples/list/list',
            },
            {
                title: '示例-测试',
                url: '/pages/examples/test/test',
            },
            {
                title: '示例-ZIcon',
                url: '/pages/examples/z-icon/z-icon',
            }
        ].map((item, index) => ({ ...item, id: index + 1 }))
    },

    onLoad() {
    },

    bindScroll(e: WechatMiniprogram.ScrollViewScroll) {
        const { scrollTop, deltaY } = e.detail
        const { _safeTop, scrolled } = this.data

        if (deltaY < 0 && scrolled) {
            console.log('切换 2', e.detail)
            this.setData({
                scrolled: false,
                scrollIntoView: 'placeholder'
            })
            return;
        }

        if (deltaY > 0 && !scrolled && (scrollTop > _safeTop)) {
            this.setData({
                scrolled: true,
                scrollIntoView: 'main-header'
            })
        }
    },

    bindMainScroll(e: WechatMiniprogram.ScrollViewScroll) {
        const { scrollTop } = e.detail
        if (scrollTop < 0 && this.data.scrolled) {
            this.setData({
                scrolled: false,
                scrollIntoView: 'placeholder'
            })
        }
    },

    bindUserAvatarError() {
        this.setData({
            userAvatarText: this.data.user.name.slice(0, 2).toUpperCase()
        });
    },

    copyText(e: WechatMiniprogram.BaseEvent) {
        const { text } = e.currentTarget.dataset
        wx.setClipboardData({
            data: text,
            success: () => {
                wx.hideToast()
                wx.showToast({
                    title: '链接复制成功',
                    icon: 'success'
                })
            }
        })
    }
})