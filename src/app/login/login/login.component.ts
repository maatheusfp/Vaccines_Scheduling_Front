import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Login } from '../../types/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  formLogin: Login = {
    login: '',
    password: ''
  };

  doLogin(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.formLogin).subscribe({
        next: (user) => {
          this.router.navigate(['/central']);
        }
      });
    }
  }
}

