import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/* eslint-disable  @typescript-eslint/no-explicit-any */
export class StorageService {
  set(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  get(key: string): any {
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
      return null;
    } catch (error) {
      console.error('Error getting data from local storage');
      return null;
    }
  }
}
