import { Injectable } from '@angular/core';
import * as appSettings from 'application-settings';

@Injectable()
export class StorageService {

    constructor() { }

    public getItem<T>(key: string): T {
        let ret: T = null;
        let data: any = appSettings.getString(key);
        if (data != null) {
            try {
                ret = JSON.parse(data);
            } catch (error) {
                throw (new Error(`Invalid data in localStorage.`));
            }
        }
        return ret;

    }

    public setItem<T = any>(key: string, data: T) {
        appSettings.setString(key, JSON.stringify(data));
    }

    public removeItem(key: string): boolean {
        appSettings.remove(key);
        return true;
    }

    public clear(): boolean {
        appSettings.clear();
        return true;
    }
}
