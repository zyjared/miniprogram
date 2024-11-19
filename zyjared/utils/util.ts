const formatNumber = (n: number) => {
    const s = n.toString()
    return s[1] ? s : '0' + s
}

export function formatTime(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    )
}

export function openUrl(options: Record<string, string>): void
export function openUrl(url: string): void
export function openUrl(urlOrOptions: Record<string, string> | string) {
    let query = ''
    if (typeof urlOrOptions === 'string') {
        query = 'url=' + encodeURI(urlOrOptions);
    } else {
        query = Object.keys(urlOrOptions).map(key => key + '=' + encodeURI(urlOrOptions[key])).join('&');
    }
    console.log(query)
    wx.navigateTo({
        url: '/pages/web-view/web-view?' + query
    })
}