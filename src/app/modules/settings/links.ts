import { faCalendar, faClock, faHandshake, faMap, faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faBars, faRotate, faRoute, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ISettingLink } from './link.interface';

export const settingLinks: ISettingLink[] = [
  { href: '/settings/workweek', name: 'Рабочая неделя', icon: faCalendar },
  { href: '/settings/jobs', name: 'Работы / услуги', icon: faBars },
  { href: '/settings/channels', name: 'Заявки / каналы', icon: faHandshake },
  { href: '/settings/history', name: 'История заявок', icon: faClock },
  { href: '/settings/routing', name: 'Маршрутизация', icon: faMap },
  { href: '/settings/upload', name: 'Загрузки', icon: faRotate },
];
