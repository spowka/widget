import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { WidgetInfoPageModel } from 'src/app/shered/models/info';
import { InfoService } from 'src/app/services/info/info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public infoPageDetails$: Observable<WidgetInfoPageModel[]>;

  constructor(private infoService: InfoService) {
      this.infoPageDetails$ = this.infoService.infoPageDetails$;
   }

  ngOnInit(): void {
    this.infoService.getInfoForPage();
  }

}
