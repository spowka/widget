import { WidgetService } from './services/widget.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   constructor(
      private widgetService: WidgetService
   ) {}

   ngOnInit() {
   }

}
