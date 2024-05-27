import { TVehicleType } from '../models/vehicle.interface';

export const VehicleTypeAliases: Record<TVehicleType, string> = {
  Truck: 'Грузовик',
  Van: 'Фургон',
  Car: 'Легк. автомобиль',
  Other: 'Другое',
};
