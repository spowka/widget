import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
   title = "К сожалению, карточки не могут лежать в корзине очень долго";

  constructor() { }

  ngOnInit(): void {
  }

}
