import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  idToken: any;
  displayName: any;
  pictureUrl: any;
  statusMessage: any;
  userId: any;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.idToken = this.dataService.idToken;
    this.displayName = this.dataService.displayName;
    this.pictureUrl = this.dataService.pictureUrl;
    this.statusMessage = this.dataService.statusMessage;
    this.userId = this.dataService.userId;
  }

  onClogoutlick(): void {
    this.dataService.logout();
  }

}
