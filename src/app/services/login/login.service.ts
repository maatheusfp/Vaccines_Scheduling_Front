import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
import { Login, UserToken} from "../../types/login";

@Injectable({
    providedIn: 'root',
})

export class LoginService {
    private apiUrl = '/api';
    private _http = inject(HttpClient);
    private router = inject(Router);

    private isLogged = new BehaviorSubject<boolean>(false);
    isLogged$ = this.isLogged.asObservable();

    constructor() {
        this.checkToken();
    }

    login(login: Login) {
        const patientBody = {...login};
        return this._http.post<UserToken>(`${this.apiUrl}/Authentication/Login`, patientBody).pipe(
            tap((userToken) => {
                localStorage.setItem('token', userToken.token);
                this.isLogged.next(true);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        this.isLogged.next(false);
        this.router.navigate(['login']);
    }
    
    getToken() {
    return localStorage.getItem('token');
    }
    
    private checkToken() {
    const token = this.getToken();

    if (token) {
        this.isLogged.next(true);
    } else {
        this.isLogged.next(false);
    }
    }
}