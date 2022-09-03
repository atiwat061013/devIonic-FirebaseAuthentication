import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import liff from '@line/liff';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  idToken: any;

  profile: any;

  constructor(
    private dataService: DataService,
  ) {
    
  }

  async ngOnInit() {
    await this.dataService.initLine();
    this.profile = await JSON.parse(localStorage.getItem("profile"));
    this.idToken = localStorage.getItem("idToken");
   
    console.log("[ngOnInit] ", "profile "+ this.profile?.displayName );
  }

  onClogoutlick(): void {
    this.dataService.logout();
  }

}
