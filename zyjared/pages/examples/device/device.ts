interface InfoItem {
    attr: string;
    title: string;
    desc: string;
}

const infoAttrs = [
    'deviceBenchmarkInfo',
    'deviceInfo',
    'windowInfo',
    'skylineInfo'
] as const

type InfoAttr = typeof infoAttrs[number]

interface Info {
    attr: InfoAttr;
    title: string;
    items: InfoItem[];
    error?: true;
    messages?: string[]
}

Page({

    data: {
        infoLoaded: false,
        infoItems: [
            {
                attr: "skylineInfo",
                title: "Skyline 渲染引擎",
                items: []
            },
            {
                attr: "deviceBenchmarkInfo",
                title: "设备性能",
                items: []
            },
            {
                attr: "deviceInfo",
                title: "设备信息",
                items: []
            },
            {
                attr: "windowInfo",
                title: "窗口信息",
                items: []
            },

        ] as Info[],
    },

    setInfoItems(data: Partial<Record<InfoAttr, InfoItem[]>>) {
        let needUpdate = false
        const infoItems = [...this.data.infoItems]

        Object.keys(data).forEach((key) => {
            // 不用做额外检查，且确定每个数组长度一定大于 0
            const items = (data as Record<string, InfoItem[]>)[key]
            if (items.length > 0) {
                needUpdate = true
                const info = infoItems.find(item => item.attr === key)
                info!.items = (data as Record<string, InfoItem[]>)[key]
            }
        })

        needUpdate && this.setData({
            infoItems
        })

    },

    onLoad() {
        const ls = [
            ['deviceBenchmarkInfo', this.setDeviceBenchmarkInfo],
            ['deviceInfo', this.setDeviceInfo],
            ['windowInfo', this.setWindowInfo],
            ['skylineInfo', this.setSkylineInfo],
        ] as const

        ls.forEach(([key, fn], index) => {
            try {
                fn()
            } catch (e) {
                const messages: string[] = []

                messages.push((e as Error).message)

                const wxKey = 'get' + key.slice(0, 1).toUpperCase() + key.slice(1);
                try {
                    wx.canIUse(wxKey)
                    messages.push(`再次尝试直接调用 canIUse('${wxKey}') 成功`)
                } catch (wxErr) {
                    messages.push(`再次尝试直接调用 canIUse('${wxKey}') 失败，需要检查该 api 的支持情况`)
                }

                this.setData({
                    infoItems: this.data.infoItems.map(item => item.attr === key
                        ? { ...item, error: true, messages }
                        : item)
                })
            } finally {
                if (index === ls.length - 1) {
                    this.setData({
                        infoLoaded: true
                    })
                }
            }
        })
    },

    setDeviceBenchmarkInfo() {
        // ios 下会报错
        wx.getDeviceBenchmarkInfo({
            success: (res) => {
                this.setInfoItems({
                    deviceBenchmarkInfo: [
                        {
                            attr: 'benchmarkLevel',
                            title: '性能等级（最高 50）',
                            desc: res.benchmarkLevel === -1
                                ? '未知'
                                : `${res.benchmarkLevel}`
                        },
                        {
                            attr: 'modelLevel',
                            title: '机型档位',
                            desc: res.modelLevel === 3
                                ? '低档机'
                                : res.modelLevel === 2
                                    ? '中档机'
                                    : res.modelLevel === 1
                                        ? '高档机'
                                        : '未知'
                        }
                    ]
                })
            }
        })
    },

    setDeviceInfo() {
        const deviceInfo = wx.getDeviceInfo()
        this.setInfoItems({
            deviceInfo: [
                {
                    attr: 'brand',
                    title: '品牌',
                    desc: deviceInfo.brand
                },
                {
                    attr: 'model',
                    title: '型号',
                    desc: deviceInfo.model
                },
                {
                    attr: 'system',
                    title: '操作系统及版本',
                    desc: deviceInfo.system
                },
                {
                    attr: 'platform',
                    title: '客户端平台',
                    desc: deviceInfo.platform
                },
                {
                    attr: 'memorySize',
                    title: '内存',
                    desc: deviceInfo.memorySize + " MB"
                }
            ]
        })
    },

    setWindowInfo() {
        const windowInfo = wx.getWindowInfo()
        this.setInfoItems({
            windowInfo: [
                {
                    attr: "pixelRatio",
                    title: "设备像素比",
                    desc: windowInfo.pixelRatio.toString()
                },
                {
                    attr: "screenWidth",
                    title: "屏幕宽度",
                    desc: windowInfo.screenWidth.toString() + " px"
                },
                {
                    attr: "screenHeight",
                    title: "屏幕高度",
                    desc: windowInfo.screenHeight.toString() + " px"
                },
                {
                    attr: "windowWidth",
                    title: "可用窗口宽度",
                    desc: windowInfo.windowWidth.toString() + " px"
                },
                {
                    attr: "windowHeight",
                    title: "可用窗口高度",
                    desc: windowInfo.windowHeight.toString() + " px"
                }, {
                    attr: "statusBarHeight",
                    title: "状态栏高度",
                    desc: windowInfo.statusBarHeight.toString() + " px"
                }
            ]
        })
    },

    setSkylineInfo() {
        wx.getSkylineInfo({
            success: (res) => {
                const skylineInfoItems: InfoItem[] = [
                    {
                        attr: 'isSupported',
                        title: '是否支持',
                        desc: res.isSupported ? '支持' : '不支持'
                    },
                    {
                        attr: 'version',
                        title: '版本',
                        desc: res.version
                    }
                ]

                if (!res.isSupported) {
                    const reasons = {
                        'client not supported': `当前微信客户端不支持" Skyline 渲染引擎，可以尝试通过升级微信客户端解决`,
                        'baselib not supported': `当前基础库不支持 Skyline "渲染引擎，基础库会自动更新到当前客户端所能支持的最新的版本，基础库不支持时也可以尝试通过升级微信客户端解决`,
                        'a-b test not enabled': `命中了 We 分析 平台上的 AB 实验关闭的情况。详细可以查看 Skyline 起步 > 配置 We 分析 AB 实验 一节`,
                        'SwitchRender option set to webview': `本地调试的快捷切换入口被设置为了强制使用 Webview.详情可以查看 Skyline 起步 > 快捷切换入口 一节`
                    }
                    skylineInfoItems.push({
                        attr: 'reason',
                        title: '原因',
                        desc: res.reason ? reasons[res.reason as keyof typeof reasons] : "出现错误，请检查该 api 是否被修改"
                    })
                }

                this.setInfoItems({
                    skylineInfo: skylineInfoItems
                })

            }
        })
    }



})