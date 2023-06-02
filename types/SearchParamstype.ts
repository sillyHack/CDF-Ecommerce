type Params = {
    id: string
}

type SearchParams = {
    id: string,
    name: string,
    unit_amount: number | null,
    image: string,
    description: string | null,
    features: string,
    quantity: number | 1
}

export type SearchParamsType = {
    params: Params,
    searchParams: SearchParams
}