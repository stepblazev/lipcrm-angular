import { Injectable } from '@angular/core';
import { IVehicle } from './models/vehicle.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/constants';
import { InitialVehiclesList } from './initial-data';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  public vehicles: IVehicle[] = [];
  public isLoading: boolean = false;

  constructor(private readonly localStorageService: LocalStorageService) {}

  public getList(): void {
    this.isLoading = true;

    if (this.localStorageService.exists(LOCAL_STORAGE_KEYS.VEHICLES)) {
        this.vehicles = this.localStorageService.getItem<IVehicle[]>(LOCAL_STORAGE_KEYS.VEHICLES) ?? [];
    } else {
        this.vehicles = InitialVehiclesList.reverse();
    }
    
    this.isLoading = false;
  }

  public create(vehicleData: Omit<IVehicle, 'id'>): void {
    this.isLoading = true;

    const newVehicle = { id: Date.now(), ...vehicleData };
    this.vehicles = [newVehicle, ...this.vehicles];
    this.localStorageService.setItem(LOCAL_STORAGE_KEYS.VEHICLES, this.vehicles);
    
    this.isLoading = false;
  }

  public update(newVehicle: IVehicle): void {
    this.isLoading = true;

    this.vehicles = this.vehicles.map((vehicle) => {
        return vehicle.id == newVehicle.id ? newVehicle : vehicle;
    });
    this.localStorageService.setItem(LOCAL_STORAGE_KEYS.VEHICLES, this.vehicles);
    
    this.isLoading = false;
  }
  
  public deleteByIds(ids: number[]): void {
    this.isLoading = true;

    this.vehicles = this.vehicles.filter((vehicle) => !ids.includes(vehicle.id));
    this.localStorageService.setItem(LOCAL_STORAGE_KEYS.VEHICLES, this.vehicles);
    
    this.isLoading = false;
  }
  
  public static getFullName(vehicle: IVehicle): string {
    return `${vehicle.make} ${vehicle.model} (${vehicle.year}) | ${vehicle.registration_number}`;
  }
}
