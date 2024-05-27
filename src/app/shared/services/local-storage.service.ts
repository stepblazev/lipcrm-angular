import { Injectable } from "@angular/core";
import { isJSON } from "../utils/is-json";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    public getItem<T>(key: string): T | null {
        const data = localStorage.getItem(key);

        if (data && isJSON(data)) {
            return JSON.parse(data);
        }

        return data as T;
    }

    public setItem(key: string, value: any) {
        let _value: string;

        if (typeof value === "object") {
            _value = JSON.stringify(value);
        } else {
            _value = value;
        }

        localStorage.setItem(key, _value);
    }
    
    public removeItem(key: string) {
        return localStorage.removeItem(key);
    }
    
    public exists(key: string) {
        return key in localStorage;
    }
}