import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent implements OnInit {
   @Input() title: string;
   @Input() isVisibleBtn: boolean;

  constructor(
   private _location: Location
  ) { }

  ngOnInit(): void {
  }

  goToBackPage() {
   this._location.back();
  }

}
