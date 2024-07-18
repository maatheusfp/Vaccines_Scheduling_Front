import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { authenticateGuard } from './guard/authenticate.guard';
import { CentralComponent } from './pages/central/central.component';
import { loginGuard } from './guard/login.guard';
import { GetAppointmentsComponent } from './pages/get-appointments/get-appointments.component';

export const routes: Routes = [{
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
},
{
    path: 'home',
    component: HomeComponent,
},
{
    path: 'signup',
    component: SignUpComponent,
},
{
    path: 'central',
    component: CentralComponent,
    canActivate: [authenticateGuard],
},
{
    path: 'get-appointments',
    component: GetAppointmentsComponent,
    canActivate: [authenticateGuard]
},
{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
},
{
    path: '**',
    redirectTo: '/',
}
];
