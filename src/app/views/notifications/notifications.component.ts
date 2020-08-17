import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  list: Array<any> = Array([]);

  constructor(private service: NotificationsService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.listNotifications();
  }

  listNotifications(){

    this.list = [];

    this.service.list(this.tokenStorage.getUser().id).subscribe(returnValue => {
      this.list = returnValue;
    });

  }

  onRemove(id: number){

    this.service.removeProduct(id).subscribe(returnValue => {
      this.listNotifications();
    });
  }

}
