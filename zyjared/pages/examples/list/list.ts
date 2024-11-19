import { fetchMockData } from './api'
import type { Item } from './api'


Page({

    data: {
        loading: false,
        noMore: false,
        page: 0,
        _minPageSize: 0,
        list: [] as Item[],
        itemHeight: 100, // 每项高度 px
        lowerThreshold: 50, // 触底距离，在计算 _minPageSize 时可能是需要考虑的

        // mock
        mockDelay: 1000,
        mockTotal: 500,

    },

    onLoad() {
        this.initData()
    },

    handleBindscrolltolower() {
        this.loadMore()
    },

    initData() {
        this.setData({
            loading: false,
            noMore: false,
            page: 0,
            /**
             * 确保每次请求可以超过一页
             */
            _minPageSize: Math.ceil((wx.getWindowInfo().windowHeight + this.data.lowerThreshold) / this.data.itemHeight),
            total: 0,
            list: [] as Item[],
        }, this.loadMore)
    },

    loadMore() {
        if (this.data.loading || this.data.noMore) return

        this.setData({
            loading: true
        }, () => {
            fetchMockData({
                page: this.data.page,
                pageSize: this.data._minPageSize,
                mockTotal: this.data.mockTotal,
                mockDelay: this.data.mockDelay,
                sucess: (res) => {
                    this.setData({
                        list: this.data.list.concat(res.data),
                        page: this.data.page + 1,
                        loading: false,
                        noMore: res.page * res.pageSize + res.data.length >= res.total
                    })
                }
            })
        })

    },
})