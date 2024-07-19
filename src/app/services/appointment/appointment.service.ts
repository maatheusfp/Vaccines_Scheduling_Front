import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {  AppointmentsReturn, MakeAppointment } from "../../types/appointment";

@Injectable({
    providedIn: 'root',
})

export class AppointmentService {
    private _http = inject(HttpClient);

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    formatTime(time:string): string {
        return time.split(':')[0];
    }

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

    makeAppointment(appointment: MakeAppointment){
        appointment.birthday = this.formatDate(new Date(appointment.birthday));
        appointment.date = this.formatDate(new Date(appointment.date));
        appointment.time = this.formatTime(appointment.time);

        const appointmentBody = { ...appointment };
        return this._http.post<AppointmentsReturn>('/api/AppointmentSignUp/MakeAppointment', appointmentBody);
    }
}