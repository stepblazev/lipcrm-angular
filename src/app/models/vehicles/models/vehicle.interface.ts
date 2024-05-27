
export type TVehicleStatus = 'Waits' | 'Works' | 'Repairs' | 'Utilized';
export type TVehicleType = 'Truck' | 'Van' | 'Car' | 'Other';

export interface IVehicle {
  id: number;
  status: TVehicleStatus;
  type: TVehicleType;
  make: string; // Марка
  model: string; // Модель
  year: number; // Год выпуска
  registration_number: string; // Регистрационный номер
  registration_country: string; // Страна регистрации
  registration_state: string; // Регион регистрации
  load_capacity?: string; // Грузоподъемность в килограммах (необязательное)
}
