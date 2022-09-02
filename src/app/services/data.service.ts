import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import liff from '@line/liff';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  idToken: any;
  displayName: any;
  pictureUrl: any;
  statusMessage: any;
  userId: any;

  constructor(private router: Router) { }

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

  initLine(){
    liff.init({ liffId: '1657440626-wkakxpGA' }, () => {
      if (liff.isLoggedIn()) {
        this.router.navigateByUrl('home');
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  logout() {
    liff.logout();
    this.router.navigateByUrl('signin');
  }

  getProfile(): void {
    const idToken = liff.getIDToken();
    this.idToken = idToken;
    liff.getProfile().then(profile => {
      console.log(profile);
      this.displayName = profile.displayName;
      this.pictureUrl = profile.pictureUrl;
      this.statusMessage = profile.statusMessage;
      this.userId = profile.userId;
    }).catch(err => console.error(err));
  }

  
}
