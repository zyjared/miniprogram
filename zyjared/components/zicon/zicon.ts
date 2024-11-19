import { getIconResource, getIconUrl, replaceIconColor } from "./icones"


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        /**
         * 这是为了处理 skyline 下使用 mask-image 时，有的图会有黑边的问题。
         *
         * 以下情况不用考虑使用：
         * - webview 下时；
         * - 没有黑边时；
         *
         * 但是使用该选项时，开发时注意模拟器的颜色可能显示错误，需要在真机上测试。
         */
        useBg: {
            type: Boolean,
            value: false,
        },

        src: {
            type: String,
            value: '',
            observer: "_propOnSrc"
        },

        icon: {
            type: String,
            value: '',
            observer: "_propOnIcon"
        },

        /**
         * 通过 api 获取，此时的 `icon` 名可以通过下面的网站获取。
         * @see {@link https://icones.js.org/}
         */
        useApi: {
            type: Boolean,
            value: false
        },

        size: {
            type: Number,
            value: 22,
        },

        color: {
            type: String,
            value: "",
            observer: "_propOnColor"
        }
    },

    data: {
        resource: ""
    },

    lifetimes: {},

    methods: {

        _propOnSrc(src: string) {
            if (!src) return
            this.setData({ resource: src })
        },

        _propOnIcon(icon: string) {
            if (!icon) return
            if (this.data.useApi) {
                this.setData({ resource: getIconUrl(icon, { color: this.data.color }) || "" });
            } else {
                const resource = getIconResource(
                    icon,
                    {
                        type: 'data',
                        color: this.data.useBg ? this.data.color : undefined
                    }
                );

                if (!resource) return;

                this.setData({
                    resource: resource
                });
            }
        },

        _propOnColor(_color: string) {

            // 以下内容效果同直接调用 _propOnIcon

            if (!this.data.icon) return;

            const color = _color || '#888888'
            if (this.data.useApi) {
                this.setData({ resource: getIconUrl(this.data.icon, { color }) || "" });
            } else {
                const { useBg, resource } = this.data
                if (!useBg || !resource) return;

                this.setData({
                    resource: replaceIconColor(resource, { color })
                });
            }
        },

    }
})