import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegistroComponent} from './auth/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { AppComponent } from './app.component';
import {FlashcardListComponent} from './pages/flashcard-list/flashcard-list.component';

export const routes: Routes = [
    {path: '', component: AppComponent ,canActivate: [authGuard]},
    {path: 'register', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'categorias/:categoriaId/flashcards', component: FlashcardListComponent, canActivate: [authGuard]},
];
