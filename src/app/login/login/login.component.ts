import { Component, inject, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router);

  formLogin: Login = {
    login: '',
    password: ''
  };

  ngOnInit(): void {
    this.loadFormData();
  }

  loadFormData(){
    const savedData = localStorage.getItem('loginForm');
    if (savedData){
      this.formLogin = JSON.parse(savedData);
    }
  }

  saveFormData(){
    localStorage.setItem('loginForm', JSON.stringify(this.formLogin));
  }

  doLogin(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.formLogin).subscribe({
        next: (user) => {
          localStorage.removeItem('loginForm');
          this.router.navigate(['/central']);
        }
      });
    }
  }
}

