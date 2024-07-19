import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SignUpService } from '../../services/signUp/signUp.service';
import { Router } from '@angular/router';
import { SignUp } from '../../types/signUp';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  private signUpService = inject(SignUpService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  formSignUp: SignUp = {
    name: '',
    login: '',
    birthday: '',
    password: ''
  };

  ngOnInit(): void {
    this.loadFormData();
  }

  loadFormData(){
    const savedData = localStorage.getItem('signUpForm');
    if (savedData){
      this.formSignUp = JSON.parse(savedData);
    }
  }

  saveFormData(){
    localStorage.setItem('signUpForm', JSON.stringify(this.formSignUp));
  }

  doSignUp(form: NgForm) {
    if (form.valid) {
      this.signUpService.signUp(this.formSignUp).subscribe({
        next: (user) => {
          localStorage.removeItem('signUpForm');
          this.notificationService.showNotification('User created successfully!');
          this.router.navigate(['']);
        }
      });
    }
  }
}
