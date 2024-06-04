import { Routes } from '@angular/router';
import { AuthComponent } from './components/pages/auth/auth.component';
import { AuthGuard, NotAuthGuard } from './modules/auth/guards/auth.guard';
import { AdminsComponent } from './components/pages/admins/admins.component';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { MobileComponent } from './components/pages/mobile/mobile.component';
import { SuperadminGuard } from './modules/user/guards/superadmin.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { EmployeesGuard } from './modules/user/guards/employees.guard';
import { ERoleTypes } from './modules/user/models/role';
import { RedirectComponent } from './components/redirect.component';
import { AdminsDetailComponent } from './components/pages/admins/admins-detail/admins-detail.component';
import { AdminDetailResolver } from './modules/admins/resolvers/admin-detail.resolver';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Авторизация',
    component: AuthComponent,
    canActivate: [NotAuthGuard],
  },

  // SECTION страницы только для суперадмина
  {
    path: 'admins',
    canActivate: [AuthGuard, SuperadminGuard],
    children: [
      { path: '', title: 'Список админов', component: AdminsComponent },
      { path: ':id', title: 'Админ', component: AdminsDetailComponent, resolve: { admin: AdminDetailResolver } },
    ],
  },
  {
    path: 'companies',
    title: 'Список подсистем',
    component: CompaniesComponent,
    canActivate: [AuthGuard, SuperadminGuard],
  },
  {
    path: 'mobile',
    title: 'Выгрузка в мобильное приложение',
    component: MobileComponent,
    canActivate: [AuthGuard, SuperadminGuard],
  },

  // SECTION общие страницы подсистемы
  {
    path: 'trips',
    title: 'Расписание',
    canActivate: [
      AuthGuard,
      EmployeesGuard([
        ERoleTypes.ADMIN,
        ERoleTypes.SUBADMIN,
        ERoleTypes.LOGIST,
        ERoleTypes.OPERATOR,
        ERoleTypes.AGENT,
      ]),
    ],
    component: HomeComponent,
  },
  {
    path: 'history',
    title: 'История заявок',
    canActivate: [
      AuthGuard,
      EmployeesGuard([
        ERoleTypes.LOGIST,
        ERoleTypes.OPERATOR,
        ERoleTypes.AGENT,
      ]),
    ],
    component: HomeComponent,
  },
  {
    path: 'reports',
    title: 'Отчеты',
    canActivate: [
      AuthGuard,
      EmployeesGuard([ERoleTypes.ADMIN, ERoleTypes.SUBADMIN]),
    ],
    component: HomeComponent,
  },
  {
    path: 'statistics',
    title: 'Статистика',
    canActivate: [
      AuthGuard,
      EmployeesGuard([ERoleTypes.ADMIN, ERoleTypes.SUBADMIN]),
    ],
    component: HomeComponent,
  },
  {
    path: 'employees',
    title: 'Сотрудники',
    canActivate: [
      AuthGuard,
      EmployeesGuard([ERoleTypes.ADMIN, ERoleTypes.SUBADMIN]),
    ],
    component: HomeComponent,
  },

  // SECTION страницы настроек подсистемы для админа
  {
    path: 'settings',
    canActivate: [
      AuthGuard,
      EmployeesGuard([ERoleTypes.ADMIN, ERoleTypes.SUBADMIN]),
    ],
    children: [
      {
        path: 'workweek',
        title: 'Рабочая неделя',
        component: HomeComponent,
      },
      {
        path: 'jobs',
        title: 'Список выполняемых работ',
        component: HomeComponent,
      },
      {
        path: 'channels',
        title: 'Список каналов продаж',
        component: HomeComponent,
      },
      {
        path: 'routing',
        title: 'Маршрутизация',
        component: HomeComponent,
      },
      {
        path: 'history',
        title: 'История заявок',
        component: HomeComponent,
      },
      {
        path: 'upload',
        title: 'Загрузка данных',
        component: HomeComponent,
      },
    ],
  },

  // Если невалидный URL, в компоненте делаем редирект в зависимости от роли пользователя
  { path: '**', component: RedirectComponent, pathMatch: 'full' },
];
