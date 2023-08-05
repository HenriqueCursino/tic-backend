export type createProduct = {
    categoryId: number,
    controlId?: number,
    originId: number,
    roomId: number,
    name: string,
    sku: string,
    brokenAt?: boolean,
}

export type useProduct = {
    userHash: string,
    productHash: string,
}

export type deleteProduct = {
    hash: string,
}

export type updateProduct = {
    hash: string,
}

export type listProduct = {
    categoryId: number,
    controlId: number,
    originId: number,
    roomId: number,
    name: string,
    sku: string,
    hash: string,
    brokenAt: Date,
}
