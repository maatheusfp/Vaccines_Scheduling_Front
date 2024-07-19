import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private _http = inject(HttpClient);

  deleteAccount(){
    return this._http.delete<any>('/api/PatientSignUp/DeletePatient');
  }
}
