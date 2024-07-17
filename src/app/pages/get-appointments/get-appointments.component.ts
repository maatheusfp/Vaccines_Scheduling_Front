import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment/appointment.service';

@Component({
  selector: 'app-get-appointments',
  standalone: true,
  imports: [],
  templateUrl: './get-appointments.component.html',
  styleUrl: './get-appointments.component.scss'
})
export class GetAppointmentsComponent implements OnInit{
  private appointmentService = inject(AppointmentService);

  ngOnInit(): void {
    this.appointmentService.getYourAppointments().subscribe({
      next: (appointments) => {
        console.log(appointments);
      },
      error: (err) => {
        alert(`${err.message}`);
      }
  });
  }
}
