import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MakeAppointment } from '../../types/appointment';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-make-appointments',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './make-appointments.component.html',
  styleUrl: './make-appointments.component.scss'
})
export class MakeAppointmentsComponent {
  private appointmentService = inject(AppointmentService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  formMakeAppointment: MakeAppointment = {
    patientName: '',
    birthday: '',
    date: '',
    time: ''
  };

  makeAppointment(form: NgForm){
    this.notificationService.hideNotification();
    if(form.valid){
      this.appointmentService.makeAppointment(this.formMakeAppointment).subscribe(() =>{
        this.notificationService.showNotification('Appointment made successfully');
      });
    }
  }

  goBack(){
    this.router.navigate(['central']);
  }
  seeAppointments(){
    this.router.navigate(['get-appointments']);
  }
}
