import { AfterViewInit, Directive, ElementRef } from '@angular/core';

import { WidgetService } from 'services/widget/widget.service';

@Directive({
   selector: '[heightHandler]',
})
export class HeightHandlerDirective implements AfterViewInit {

   constructor(
      private el: ElementRef,
      private widgetService: WidgetService
   ) {}

   ngAfterViewInit() {
      let el = this.el.nativeElement.clientHeight;
      this.widgetService.getElClientHeight(el);
   }
}