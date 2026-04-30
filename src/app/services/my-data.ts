import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MyData {

  constructor(private storage: Storage) {
    this.init();
  }

  //init() inicializes the storage instance
  async init() {
    await this.storage.create();
  }

  //set() stores a value based on its key
  async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  //get() retrieves a stored value
  async get(key: string) {
    return await this.storage.get(key);
  }
  
}
