interface Options {
    page: number
    pageSize: number
    mockTotal: number
    mockDelay: number
}

type Res<T> = Pick<Options, 'page' | 'pageSize'> & { data: T; total: number }

export interface Item {
    id: number
    title: string
}

/**
 * 第一页为 0
 * @param options
 * @returns
 */
function genMockData(options: Pick<Options, 'page' | 'pageSize' | 'mockTotal'>): Res<Item[]> {
    const resStartIndex = options.pageSize * options.page
    const data = Array.from({
        length: Math.min(Math.max(options.mockTotal - resStartIndex, 0), options.pageSize)
    }).map((_, index) => {
        const id = options.page * options.pageSize + index + 1
        return {
            id,
            title: `item ${id}`
        }
    })

    return {
        data,
        page: options.page,
        pageSize: options.pageSize,
        total: options.mockTotal
    }
}

export function fetchMockData(options: Options & { sucess: (res: Res<Item[]>) => void }) {
    return new Promise<Res<Item[]>>((resolve, _reject) => {
        setTimeout(() => {
            resolve(genMockData(options))
        }, options.mockDelay)
    }).then(options.sucess)
}

