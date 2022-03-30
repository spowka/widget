import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WidgetService } from 'services/widget/widget.service';
@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
   private unsubscribe$: Subject<void> = new Subject();

   public isCartFull$: Observable<boolean>;
   public totalPrice$: Observable<number>;

   startTime: number;
   timer: any;
   displayTimer: any;
   timeForCartClearing: any;

   constructor(
      private router: Router,
      private widgetService: WidgetService
   ) {
      this.isCartFull$ = this.widgetService.isCartFull$;
      this.totalPrice$ = this.widgetService.totalPrice$;
    }

   ngOnInit(): void {  
      this.widgetService.timeForCartClearing$
         .pipe(takeUntil(this.unsubscribe$))
         .subscribe(data => {
            this.timeForCartClearing = new Date(data);
            this.startTimer(this.timeForCartClearing.getMinutes(), this.timeForCartClearing.getSeconds());
         });
   }

   private startTimer(minutes: any, seconds: any) {
      let futureDate: any = new Date().setMinutes(minutes, seconds);
      this.startTime = parseInt(futureDate);

      this.timer = setInterval(() => {
         this.clockTick();
      }, 100);
   }

   clockTick() {
      let currentTime = Date.now(),
         timeElapsed = new Date(this.startTime - currentTime),
         mins = timeElapsed.getUTCMinutes(),
         secs = timeElapsed.getUTCSeconds();

      this.displayTimer = (mins > 9 ? mins : "0" + mins) + ":" + (secs > 9 ? secs : "0" + secs);

      if ((mins === 0) && (secs === 0)) {
         clearInterval(this.timer);
         this.router.navigate(['notification']);
      }
   };

   goToCart() {
      if (this.isCartFull$) {
         this.router.navigate(['cart']);
      }
   }

   goToNotification() {
      this.router.navigate(['notification']);
   }

   ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
   }
}
