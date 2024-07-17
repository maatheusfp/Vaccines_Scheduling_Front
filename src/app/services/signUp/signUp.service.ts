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
          tap((response: SignUpResponse) => {
              alert(`Account created! Welcome ${response.name}!`);
          }),
          catchError(this.handleError)
        );
      }
    
    private handleError(error: HttpErrorResponse) {
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
