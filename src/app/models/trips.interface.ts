export interface ITrip {
  id: number;
  status: 'Waiting' | 'In Progress' | 'Completed' | 'Cancelled';
  vehicle: string; // пример: Ford, Volvo
  vehicle_number: string; // пример: EF456GH
  driver: string; // пример: Виктор Петров, Алексей Смирнов
  start_location: string; // пример: Москва, ул. Тверская, 12
  destination: string; // пример: Санкт-Петербург, Невский проспект, 25
  distance: number; // в км, пример: 72, 120, 34
}

export const TripsList: ITrip[] = [
  {
    id: 2,
    status: 'In Progress',
    vehicle: 'Volvo',
    vehicle_number: 'EF456GH',
    driver: 'Алексей Смирнов',
    start_location: 'Новосибирск, ул. Ленина, 45',
    destination: 'Красноярск, ул. Ленина, 75',
    distance: 299,
  },
  {
    id: 6,
    status: 'In Progress',
    vehicle: 'DAF',
    vehicle_number: 'WX901YZ',
    driver: 'Иван Сидоров',
    start_location: 'Казань, ул. Баумана, 45',
    destination: 'Уфа, ул. Октябрьской революции, 25',
    distance: 534,
  },
  {
    id: 10,
    status: 'In Progress',
    vehicle: 'Volvo',
    vehicle_number: 'OP345QR',
    driver: 'Екатерина Смирнова',
    start_location: 'Ижевск, ул. Удмуртская, 50',
    destination: 'Пермь, ул. Куйбышева, 8',
    distance: 300,
  },
  {
    id: 1,
    status: 'Waiting',
    vehicle: 'Ford',
    vehicle_number: 'AB123CD',
    driver: 'Виктор Петров',
    start_location: 'Москва, ул. Тверская, 12',
    destination: 'Санкт-Петербург, Невский проспект, 25',
    distance: 634,
  },
  {
    id: 5,
    status: 'Waiting',
    vehicle: 'MAN',
    vehicle_number: 'ST567UV',
    driver: 'Александр Ковалев',
    start_location: 'Саратов, ул. Московская, 27',
    destination: 'Самара, ул. Советской Армии, 33',
    distance: 332,
  },
  {
    id: 9,
    status: 'Waiting',
    vehicle: 'Mercedes-Benz',
    vehicle_number: 'KL789MN',
    driver: 'Дмитрий Филиппов',
    start_location: 'Санкт-Петербург, Невский проспект, 25',
    destination: 'Псков, ул. Римского-Корсакова, 30',
    distance: 290,
  },
  {
    id: 3,
    status: 'Completed',
    vehicle: 'Mercedes-Benz',
    vehicle_number: 'KL789MN',
    driver: 'Николай Иванов',
    start_location: 'Екатеринбург, ул. Малышева, 30',
    destination: 'Пермь, ул. Ленина, 15',
    distance: 320,
  },
  {
    id: 7,
    status: 'Completed',
    vehicle: 'Iveco',
    vehicle_number: 'AB123CD',
    driver: 'Петр Соловьев',
    start_location: 'Нижний Новгород, пл. Минина и Пожарского, 1',
    destination: 'Казань, ул. Баумана, 1',
    distance: 380,
  },
  {
    id: 4,
    status: 'Cancelled',
    vehicle: 'Scania',
    vehicle_number: 'OP345QR',
    driver: 'Олег Кузнецов',
    start_location: 'Краснодар, ул. Красная, 50',
    destination: 'Ростов-на-Дону, пр-т Соколова, 70',
    distance: 360,
  },
  {
    id: 8,
    status: 'Cancelled',
    vehicle: 'Scania',
    vehicle_number: 'EF456GH',
    driver: 'Сергей Михайлов',
    start_location: 'Воронеж, ул. Плехановская, 7',
    destination: 'Липецк, ул. Гагарина, 12',
    distance: 120,
  },
];
