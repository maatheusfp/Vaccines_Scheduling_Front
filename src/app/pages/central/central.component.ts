import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppointmentsReturn } from '../../types/appointment';
import { MatBadgeModule } from '@angular/material/badge';
import { AsyncPipe } from '@angular/common';
import { PatientService } from '../../services/patient/patient.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-central',
  standalone: true,
  imports: [ MatBadgeModule, AsyncPipe],
  templateUrl: './central.component.html',
  styleUrl: './central.component.scss'
})
export class CentralComponent implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private appointmentService = inject(AppointmentService);
  private patientService = inject(PatientService);
  private notifcationService = inject(NotificationService);
  private appointmentsSubject = new BehaviorSubject<AppointmentsReturn | null>(null);
  getAppointments$: Observable<AppointmentsReturn | null> = this.appointmentsSubject.asObservable();

  ngOnInit(): void {
    this.getYourAppointments();
  }

  getYourAppointments(){
    this.appointmentService.getYourAppointments().subscribe({
      next: (appointments) => {
        this.appointmentsSubject.next(appointments);
      }
    });
  }

  deletePatient(){
    this.notifcationService.hideNotification();
    this.patientService.deleteAccount().subscribe({
      next: (result) => {
        this.notifcationService.showNotification('Account deleted successfully!');
        this.doLogout();
      }
    });
  }

  doLogout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }

  goGetAppointments(){
    this.router.navigate(['get-appointments']);
  }

  goMakeAppointment(){
    this.router.navigate(['make-appointment']);
  } 
}
