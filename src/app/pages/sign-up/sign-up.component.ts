import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SignUpService } from '../../services/signUp/signUp.service';
import { Router } from '@angular/router';
import { SignUp } from '../../types/signUp';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private signUpService = inject(SignUpService);
  private router = inject(Router);

  formSignUp: SignUp = {
    name: '',
    login: '',
    birthday: '',
    password: ''
  };

  doSignUp(form: NgForm) {
    if (form.valid) {
      this.signUpService.signUp(this.formSignUp).subscribe({
        next: (user) => {
          this.router.navigate(['']);
        },
        error: (err) => {
          alert('Sign up failed, please check your credentials and try again.');
        }
      });
    }
  }
}
