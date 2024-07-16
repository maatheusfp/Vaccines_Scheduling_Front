import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Router } from "@angular/router";
import { SignUp, SignUpResponse } from "../../types/signUp";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";

@Injectable({
    providedIn: 'root',
})

export class SignUpService {
    private apiUrl = '/api';
    private _http = inject(HttpClient);
    private router = inject(Router);

    signUp(signUp: SignUp) {
        const signUpBody = { ...signUp };
        return this._http.post<SignUpResponse>(`${this.apiUrl}/PatientSignUp/SignUp`, signUpBody).pipe(
          tap((response: any) => {
            // Check if the response body contains HttpStatus = 500
            if (response.HttpStatus === 500) {
              // Handle the error, e.g., by throwing an error or logging
              throw new Error();
            } else {
              // responder com modal confirmando o cadastro
            }
          }),
          catchError(this.handleError)
        );
      }
    
    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
