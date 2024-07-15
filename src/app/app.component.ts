import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // loginService = inject(LoginService);
  // isLogged = this.loginService.isLogged$;
}
