import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {  AppointmentsReturn } from "../../types/appointment";

@Injectable({
    providedIn: 'root',
})

export class AppointmentService {
    private _http = inject(HttpClient);

    getYourAppointments(){
        return this._http.get<AppointmentsReturn>('/api/AppointmentSignUp/FindAppointments');
    }

    deleteAppointment(date: string, time: string, status: string){
        const options = { body: { date, time, status } };
        return this._http.delete(`/api/AppointmentSignUp/DeleteAppointment`, options);
    }

    changeAppointmentStatus(date: string, time: string, status: string){
        if (status === 'Not Completed'){
            status = 'Completed'
         }
        else {
            status = 'Not Completed'
        }
        const data = { date, time, status };
        return this._http.put(`/api/AppointmentSignUp/ChangeAppointmentStatus`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}