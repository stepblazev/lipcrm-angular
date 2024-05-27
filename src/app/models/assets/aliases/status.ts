import { TAssetStatus } from "../asset.interface";

export const AssetStatusAliases: Record<TAssetStatus, string> = {
  'In Progress': 'Работает',
  Waiting: 'Ожидает',
  Completed: 'Доставлен',
  Cancelled: 'Отменен',
};
