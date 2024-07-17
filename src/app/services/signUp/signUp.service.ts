import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { SignUp, SignUpResponse } from "../../types/signUp";

@Injectable({
    providedIn: 'root',
})

export class SignUpService {
    private apiUrl = '/api';
    private _http = inject(HttpClient);

    signUp(signUp: SignUp) {
        const signUpBody = { ...signUp };
        return this._http.post<SignUpResponse>(`${this.apiUrl}/PatientSignUp/SignUp`, signUpBody);
      }
}
