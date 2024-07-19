import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppointmentsReturn } from '../../types/appointment';
import { NotificationService } from '../../services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-appointments',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './get-appointments.component.html',
  styleUrl: './get-appointments.component.scss'
})

export class GetAppointmentsComponent implements OnInit{
  private appointmentService = inject(AppointmentService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private appointmentsSubject = new BehaviorSubject<AppointmentsReturn | null>(null);
  getAppointments$: Observable<AppointmentsReturn | null> = this.appointmentsSubject.asObservable();

  ngOnInit(): void {
    this.getYourAppointments();
  }

  goMakeAppointment(){
    this.router.navigate(['make-appointment']);
  }

  getYourAppointments() {
    this.appointmentService.getYourAppointments().subscribe({
      next: (appointments) => {
        this.appointmentsSubject.next(appointments);
      }
    });
  }

  deleteAppointment(date: string, time: string, status: string) {
    this.notificationService.hideNotification();
    this.appointmentService.deleteAppointment(date, time, status).subscribe(() =>{
      this.getYourAppointments();
      this.notificationService.showNotification('Appointment deleted');
    })
  }

  changeAppointmentStatus(date: string, time: string, status: string) {
    this.notificationService.hideNotification();
    this.appointmentService.changeAppointmentStatus(date, time, status).subscribe(() => {
      this.getYourAppointments();
      this.notificationService.showNotification('Appointment status changed');
    }
  );}

  goBack(){
    this.router.navigate(['central']);
  }
}
