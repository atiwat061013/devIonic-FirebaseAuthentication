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

  lineLiff: any = liff;

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

  async initLine(){
    await this.lineLiff.init({ liffId: '1657440626-wkakxpGA' }, async () => {
      if (this.lineLiff.isLoggedIn()) { 
        await this.getProfile();
        // this.router.navigateByUrl('home');
      } else {
        //test local
        // this.lineLiff.login({redirectUri: 'https://192.168.0.105:8100/home'});
        this.lineLiff.login({redirectUri: 'https://ionic-devlogin.web.app/home'});
      }
    }, err => console.error(err));
  }

  async logout() {
    await this.lineLiff.logout();
    this.router.navigateByUrl('signin');
  }

  async getProfile(){
    const idToken = await this.lineLiff.getIDToken();
    const profile = await this.lineLiff.getProfile();
    this.idToken = await idToken;
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("profile", JSON.stringify(profile));
    console.log("[getProfile] idToken => ", idToken);
    console.log("[getProfile] profile => ", profile);

    // await this.lineLiff.getProfile().then((res: any) => {
    //   console.log("[getProfile] res => ", res.displayName);
    //   localStorage.setItem("profile", res);
    // }).catch((err: any) => {
    //   console.error("[getProfile] err => ",err);
    // });



    // this.lineLiff.getProfile().then(async profile => {
    //   localStorage.setItem("profile", profile);
    //   console.log(profile);
    //   console.log("displayName", profile.displayName);
    //   this.displayName = await profile.displayName;
    //   this.pictureUrl = await profile.pictureUrl;
    //   this.statusMessage = await profile.statusMessage;
    //   this.userId = await profile.userId;
    // }).catch(err => console.error(err));
  }

  
}
