import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MyData {

  constructor(private storage: Storage) {
    this.init();
  }

  //methods for storing data init(), set(), get()
  async init() {
    await this.storage.create();
  }

  async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async get(key: string) {
    return await this.storage.get(key);
  }
  
}
