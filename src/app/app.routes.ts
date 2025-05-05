import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegistroComponent} from './auth/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]}
];