import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class MyHttp {

  constructor() {}

  //get() requests data from a specified source
  async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }
}
