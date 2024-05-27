import { TVehicleStatus } from '../models/vehicle.interface';

export const VehicleStatusAliases: Record<TVehicleStatus, string> = {
  Works: 'Работает',
  Waits: 'Ожидает',
  Repairs: 'На ремонте',
  Utilized: 'Утилизирован',
};
