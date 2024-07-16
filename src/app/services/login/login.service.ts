import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap, catchError, throwError } from "rxjs";
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
        const patientBody = { ...login };
        return this._http.post<UserToken>(`${this.apiUrl}/Authentication/Login`, patientBody).pipe(
          tap((response: any) => {
            // Check if the response body contains HttpStatus = 500
            if (response.HttpStatus === 500) {
              // Handle the error, e.g., by throwing an error or logging
              throw new Error();
            } else {
              // Proceed with setting the token and updating the logged-in status
              localStorage.setItem('token', response.token);
              this.isLogged.next(true);
            }
          }),
          catchError(this.handleError)
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

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
}