export class User {
    constructor (
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly nickname: string,
        public readonly password: string,
    ) {}
}

export interface AuthenticationData {
    id: string;
}

export interface UserInputDTO {
    name: string,
    email: string,
    nickname: string,
    password: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}

