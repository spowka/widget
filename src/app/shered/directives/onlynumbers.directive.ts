import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]',
//   alternative
//   host: {
//      '(keydown)': 'onKeyDown($event)';
//   }
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: any) {
    //added condition to forbid start number with zero
    if (e.currentTarget && e.currentTarget.value.length < 1 && (e.which == 48 || e.which == 96)) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!((e.which > 47 && e.which < 58)
      || (e.which >= 96 && e.which < 106)
      || e.which == 8 || e.which == 46
      || e.which == 37 || e.which == 39
      || e.code == 'Tab')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}