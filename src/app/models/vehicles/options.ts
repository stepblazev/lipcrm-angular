import { IOption } from 'src/app/components/ui/select/select.component';
import { TVehicleStatus, TVehicleType } from './models/vehicle.interface';
import { VehicleTypeAliases } from './aliases/type';
import { VehicleStatusAliases } from './aliases/status';

export const statusOptions: IOption<TVehicleStatus>[] = [
  {
    caption: VehicleStatusAliases['Works'],
    value: 'Works',
  },
  {
    caption: VehicleStatusAliases['Waits'],
    value: 'Waits',
  },
  {
    caption: VehicleStatusAliases['Repairs'],
    value: 'Repairs',
  },
  {
    caption: VehicleStatusAliases['Utilized'],
    value: 'Utilized',
  },
];

export const typeOptions: IOption<TVehicleType>[] = [
  {
    caption: VehicleTypeAliases['Truck'],
    value: 'Truck',
  },
  {
    caption: VehicleTypeAliases['Van'],
    value: 'Van',
  },
  {
    caption: VehicleTypeAliases['Car'],
    value: 'Car',
  },
  {
    caption: VehicleTypeAliases['Other'],
    value: 'Other',
  },
];
