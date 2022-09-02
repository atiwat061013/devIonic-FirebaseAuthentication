import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async fetchData(method: any, url: any, data: any) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let requestOptions: any = {
      method: method,
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    };

    return fetch(url, requestOptions).then((response) => response.json());
  }
  
}
