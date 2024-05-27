import { IHomeLink } from './models';

export const homeLinks: IHomeLink[][] = [
  [
    {
      imgSrc: 'assets/images/map.jpg',
      href: '/fleet',
      title: 'Обзор карты',
      description:
        'На этой странице вы можете просмотривать текущие поездки с отображением на карте',
    },
    {
      imgSrc: 'assets/images/chart.png',
      href: '/conformity/overview',
      title: 'Сводка данных',
      description:
        'На этой странице вы можете просмотривать сводку по активным и выполненным заказам',
    },
  ],
  [
    {
      imgSrc: '',
      href: '/settings',
      title: 'Настройки',
    },
    {
      imgSrc: '',
      href: '/conformity/logs',
      title: 'Журнал',
    },
    {
      imgSrc: '',
      href: '/maintenance',
      title: 'Обслуживание',
    },
    {
      imgSrc: '',
      href: '/documents',
      title: 'Документы',
    },
    {
      imgSrc: '',
      href: '/reports',
      title: 'Отчеты',
    },
  ],
  [
    {
      imgSrc: 'assets/images/truck.jpg',
      href: '/vehicles',
      title: 'Транспорт',
    //   description: 'На этой странице вы можете управлять списком транспортных средств',
    },
    {
      imgSrc: 'assets/images/drivers.jpg',
      href: '/drivers',
      title: 'Водители',
    //   description: 'На этой странице вы можете управлять списком водителей',
    },
    {
      imgSrc: 'assets/images/assets.png',
      href: '/assets',
      title: 'Грузы',
    //   description: 'На этой странице вы можете управлять списком грузов',
    },
  ],
];
