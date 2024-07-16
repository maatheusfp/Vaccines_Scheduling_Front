import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [{
    path: 'login',
    component: LoginComponent,
},
{
    path: '',
    component: HomeComponent,
},
{
    path: 'signup',
    component: SignUpComponent,
}
];
