import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Appointment } from "../../types/appointment";

@Injectable({
    providedIn: 'root',
})

export class AppointmentService {
    private _http = inject(HttpClient);

    getYourAppointments(){
        return this._http.get<Appointment>('/api/AppointmentSignUp/FindAppointments');
    }
}