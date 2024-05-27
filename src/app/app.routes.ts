import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { AuthGuard, NotAuthGuard } from './modules/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Авторизация',
    component: AuthComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: '',
    title: 'Главная страница',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  
  // Редирект с невалидного URL на корень
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
