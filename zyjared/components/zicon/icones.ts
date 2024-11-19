/**
 * 该文件依赖
 */

interface Icon {
    svg: string
    /** URI 编码 */
    // data?: string
    // url?: string
}

/**
 * 指 svg 和使用了 encodeURIComponent 的 data
 */
type IconType = 'svg' | 'data'

interface IconBaseOptions {
    color?: string
    fill?: string
    stroke?: string
    type?: IconType
}

/**
 * @see {@link https://icones.js.org/}
 */
export const icones: Record<string, Icon> = {
    'loading': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#888888" d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12" opacity=".1"/><path fill="#888888" d="M12 4.5a7.46 7.46 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.46 10.46 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3"/></g></svg>`
    },
    'loading-sun': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.363l-2.122 2.121m-8.485 8.484l-2.121 2.121m12.728.001l-2.122-2.122M7.757 7.758L5.636 5.637" color="#888888"/></svg>`
    },
    'search': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.553 15.553a7.06 7.06 0 1 0-9.985-9.985a7.06 7.06 0 0 0 9.985 9.985m0 0L20 20"/></svg>`
    },
    'home': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="#888888" d="M7.313 1.262a1 1 0 0 1 1.374 0l4.844 4.579c.3.283.469.678.469 1.09v5.57a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9 12.5V10a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v2.5A1.5 1.5 0 0 1 5.5 14h-2A1.5 1.5 0 0 1 2 12.5V6.93c0-.412.17-.807.47-1.09zM8 1.988l-4.844 4.58A.5.5 0 0 0 3 6.93v5.57a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V10a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 10 10v2.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V6.93a.5.5 0 0 0-.156-.363z"/></svg>`
    },
    'arrow-back': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"/></svg>`
    },
    'arrow-forward': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"/></svg>`
    },
    'close': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>`
    },
    'github': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>`
    },
    'blog': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 21h8a5 5 0 0 0 5-5v-3a3 3 0 0 0-3-3h-1V8a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5"/><path d="M7 8.5A1.5 1.5 0 0 1 8.5 7h3A1.5 1.5 0 0 1 13 8.5v0a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 7 8.5m0 7A1.5 1.5 0 0 1 8.5 14h7a1.5 1.5 0 0 1 1.5 1.5v0a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 15.5"/></g></svg>`
    },
    'emotion': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M6.5 17q-.65 0-1.075-.425T5 15.5q0-.625.425-1.062T6.5 14q.625 0 1.063.438T8 15.5q0 .65-.437 1.075T6.5 17m0-7q-.65 0-1.075-.425T5 8.5q0-.625.425-1.062T6.5 7q.625 0 1.063.438T8 8.5q0 .65-.437 1.075T6.5 10m3.5 3v-2h4v2zm7.2 5l-1.65-1.1q.7-1.075 1.075-2.312T17 12q0-1.65-.537-3.1T14.95 6.275L16.475 5q1.2 1.425 1.863 3.213T19 12q0 1.675-.475 3.188T17.2 18"/></svg>`
    },
    'device': {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="#888888" d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75V5a.75.75 0 0 1-1.5 0V2.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25H7A.75.75 0 0 1 7 12h-.268a5.7 5.7 0 0 1-.765 2.5H7A.75.75 0 0 1 7 16H4.5a.75.75 0 0 1-.565-1.243c.772-.885 1.193-1.716 1.292-2.757H1.75A1.75 1.75 0 0 1 0 10.25z"/><path fill="#888888" d="M10.75 7h3.5c.967 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 16h-3.5A1.75 1.75 0 0 1 9 14.25v-5.5C9 7.784 9.783 7 10.75 7m-.25 1.75v5.5c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25"/></svg>`
    },
}

function getIconType(resource: string): IconBaseOptions['type'] {
    return resource.startsWith('data:') ? 'data' : 'svg'
}

/**
 * 将数据转为想要的格式
 * @param resource
 * @param options.type 需要返回的类型
 * @returns
 */
export function formateIcon(resource: string, options: Pick<IconBaseOptions, 'type'>) {
    const { type: resType } = options
    const curType = getIconType(resource)

    if (curType === resType) {
        return resource
    } else {
        return curType === 'svg'
            ? `data:image/svg+xml,${encodeURIComponent(resource)}`
            : decodeURIComponent(resource.replace('data:image/svg+xml,', ''))
    }
}

function _replaceSvgColor(data: string, colorAttr: 'fill' | 'stroke', color: string) {
    const reg = new RegExp(`${colorAttr}="(?!none).*?"`, 'g');
    return data.replace(reg, `${colorAttr}="${color}"`);
}

function _replaceDataColor(data: string, colorAttr: 'fill' | 'stroke', color: string) {
    const reg = new RegExp(`${colorAttr}%3D%22(?!none).*?%22`, 'g');
    return data.replace(reg, `${colorAttr}%3D%22${color.replace('#', '%23')}%22`);
}

/**
 * 替换 svg 或者 data 图标的颜色。
 * 注意：是将非 none 值的颜色替换
 */
export function replaceIconColor(resource: string, options: Pick<IconBaseOptions, 'fill' | 'stroke' | 'color'>) {
    const curType = getIconType(resource);
    const replaceFn = curType === 'svg' ? _replaceSvgColor : _replaceDataColor;

    const { color } = options
    const fill = options.fill || color
    const stroke = options.stroke || color

    if (fill) {
        resource = replaceFn(resource, 'fill', fill);
    }

    if (stroke) {
        resource = replaceFn(resource, 'stroke', stroke);
    }
    return resource;
}

/**
 * 获取图标资源
 */
export function getIconResource(iconName: string, options: Pick<IconBaseOptions, 'type' | 'color'> = {}) {
    const icon = icones[iconName as keyof typeof icones]
    if (!icon) {
        return null
    }

    const { color, type } = options
    return color
        ? replaceIconColor(formateIcon(icon.svg, { type }), { color })
        : formateIcon(icon.svg, { type })
}

/**
 * 获取图标 url
 * @see {@link https://iconify.design/docs/api/}
 */
export function getIconUrl(iconName: string, options: {
    color?: string,
    /** 是否检查 iconName */
    checkIcon?: boolean
} = {}) {
    const { color = '#888888', checkIcon = true } = options

    if (checkIcon && !/^[^:]+:[^:]+$/.test(iconName)) {
        return null
    }

    return `https://api.iconify.design/${iconName}.svg?color=${color.replace('#', '%23')}`
}




