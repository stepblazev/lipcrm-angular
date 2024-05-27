import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/constants';
import { IAsset } from './asset.interface';
import { InitialAssetsList } from './initial-data';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  public assets: IAsset[] = [];
  public isLoading: boolean = false;

  constructor(private readonly localStorageService: LocalStorageService) {}

  public getList(): void {
    this.isLoading = true;

    if (this.localStorageService.exists(LOCAL_STORAGE_KEYS.ASSETS)) {
      this.assets = this.localStorageService.getItem<IAsset[]>(LOCAL_STORAGE_KEYS.ASSETS) ?? [];
    } else {
      this.assets = InitialAssetsList.reverse();
    }

    this.isLoading = false;
  }

  public create(assetData: Omit<IAsset, 'id'>): void {
    this.isLoading = true;

    const newAsset = { id: Date.now(), ...assetData };
    this.assets = [newAsset, ...this.assets];
    this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ASSETS, this.assets);

    this.isLoading = false;
  }

  public update(newAsset: IAsset): void {
    this.isLoading = true;

    this.assets = this.assets.map((asset) => {
      return asset.id == newAsset.id ? newAsset : asset;
    });
    this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ASSETS, this.assets);

    this.isLoading = false;
  }

  public deleteByIds(ids: number[]): void {
    this.isLoading = true;

    this.assets = this.assets.filter((driver) => !ids.includes(driver.id));
    this.localStorageService.setItem(LOCAL_STORAGE_KEYS.ASSETS, this.assets);

    this.isLoading = false;
  }
}
