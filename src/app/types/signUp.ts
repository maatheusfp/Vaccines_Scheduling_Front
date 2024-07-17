import { Errors } from './errors';

export type SignUp = {
    name: string,
    login: string,
    birthday: string,
    password: string
};

export type SignUpResponse = {
    name?: string,
    login?: string,
    errors?: Errors
};

