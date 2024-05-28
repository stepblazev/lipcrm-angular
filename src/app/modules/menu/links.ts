import { faCalendar, faCircleUser, faFileLines } from '@fortawesome/free-regular-svg-icons';
import { ERoleTypes } from '../user/models/role';
import { IMenuLink } from './link.interface';
import { faChartColumn, faDisplay, faMobileScreen, faUsers } from '@fortawesome/free-solid-svg-icons';

export const menuLinks: Record<ERoleTypes, IMenuLink[]> = {
  [ERoleTypes.SUPERADMIN]: [
    { href: '/admins', name: 'Администраторы', icon: faCircleUser },
    { href: '/companies', name: 'Система', icon: faDisplay },
    { href: '/mobile', name: 'Приложение', icon: faMobileScreen },
  ],
  [ERoleTypes.ADMIN]: [
    { href: '/statistics', name: 'Статистика', icon: faChartColumn },
    { href: '/trips', name: 'Расписание', icon: faCalendar },
    { href: '/employees', name: 'Сотрудники', icon: faUsers },
    { href: '/reports', name: 'Отчеты', icon: faFileLines },
  ],
  [ERoleTypes.SUBADMIN]: [
    { href: '/statistics', name: 'Статистика', icon: faChartColumn },
    { href: '/trips', name: 'Расписание', icon: faCalendar },
    { href: '/employees', name: 'Сотрудники', icon: faUsers },
    { href: '/reports', name: 'Отчеты', icon: faFileLines },
  ],
  [ERoleTypes.LOGIST]: [
    { href: '/trips', name: 'Расписание', icon: faCalendar },
    { href: '/history', name: 'История заявок', icon: faCircleUser },
  ],
  [ERoleTypes.OPERATOR]: [
    { href: '/trips', name: 'Расписание', icon: faCalendar },
    { href: '/history', name: 'История заявок', icon: faCircleUser },
  ],
  [ERoleTypes.AGENT]: [
    { href: '/trips', name: 'Расписание', icon: faCalendar },
    { href: '/history', name: 'История заявок', icon: faCircleUser },
  ],
  [ERoleTypes.PERFORMER]: [],
};
