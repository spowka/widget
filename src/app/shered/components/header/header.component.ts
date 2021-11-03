import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   isCartFull = false;
   discountTimer: any;

   timer: any;
   startTime: any;
   discountTime = 2;
   displayTimer: any;

   constructor(
      private router: Router,
   ) { }

   ngOnInit(): void {
      if (this.isCartFull) {
         this.startTimer();
      }
   }

   private startTimer() {
      let dataNow: any = new Date();
      let fuchterDate: any = new Date().setMinutes(dataNow.getMinutes() + this.discountTime);
      this.startTime = parseInt(localStorage.getItem('timer') || fuchterDate);
      localStorage.setItem('timer', this.startTime);
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
         localStorage.removeItem('timer');
         this.isCartFull = false;
         this.router.navigate(['notification']);
      }
   };

   goToCart() {
      if (this.isCartFull) {
         this.router.navigate(['cart']);
      }
   }

   goToNotification() {
      this.router.navigate(['notification']);
   }
}
