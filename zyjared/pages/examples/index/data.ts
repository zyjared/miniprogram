import { presetColors as colors } from "../../../utils/color"

export const examples: Examples.Item[] = [
    {
        title: "组件 zicon",
        url: "/pages/examples/c-zicon/c-zicon",
    },
    {
        title: "组件 navigation-search",
        url: "/pages/examples/c-navigation-search/c-navigation-search",
    },
    {
        title: "设备信息",
        url: "/pages/examples/device/device",
    },
    {
        title: "长列表",
        url: "/pages/examples/list/list",
    },
    // {
    //     title: "预留展示",
    //     url: "/pages/examples/test/test",
    // }
]
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((el, index) => {
        return {
            id: index + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            ...el
        }
    })