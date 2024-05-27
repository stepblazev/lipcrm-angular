import { IOption } from 'src/app/components/ui/select/select.component';
import { TAssetStatus } from './asset.interface';
import { AssetStatusAliases } from './aliases/status';

export const statusOptions: IOption<TAssetStatus>[] = [
  {
    caption: AssetStatusAliases['Waiting'],
    value: 'Waiting',
  },
  {
    caption: AssetStatusAliases['In Progress'],
    value: 'In Progress',
  },
  {
    caption: AssetStatusAliases['Completed'],
    value: 'Completed',
  },
  {
    caption: AssetStatusAliases['Cancelled'],
    value: 'Cancelled',
  },
];