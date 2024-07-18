import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-central',
  standalone: true,
  imports: [],
  templateUrl: './central.component.html',
  styleUrl: './central.component.scss'
})
export class CentralComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  doLogout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }

  goGetAppointments(){
    this.router.navigate(['get-appointments']);
  }
}
