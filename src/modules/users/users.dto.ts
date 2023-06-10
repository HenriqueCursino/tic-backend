export type createUser = {
    name: string,
    email: string,
    password: string,
}

export type login = {
    email: string,
    password: string,
}

export type listUsers = {
    name: string,
    email: string,
    created_at: string,
}

export type deleteUser = {
    email: string,
}
