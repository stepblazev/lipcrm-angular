
export type TAssetStatus = 'Waiting' | 'In Progress' | 'Completed' | 'Cancelled';

export interface IAsset {
  id: number;
  status: TAssetStatus;
  delivery_date: Date;
  delivery_address: string;
  name: string;
  weight: number | string;
  width: number | string;
  height: number | string;
}
