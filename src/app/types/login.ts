import { Errors } from './errors';

export type Login = {
    login: string;
    password: string;
  };
  
export type UserToken = {
  token: string;
  refreshToken: string;
};

export type LoginResponse = {
    token?: string;
    refreshToken?: string;
    HttpStatus?: number;
    errors?: Errors;
};