declare namespace Examples {
    interface Item {
        id: number
        title: string;
        url: string;
        color: string
    }

    type Filters = Partial<Pick<Item, 'title'>>

    type FiltersKey = keyof Filters
}

