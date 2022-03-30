import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'services/auth/auth.service';

import { User } from './shered/models/auth';
@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   public title = 'widget';
   public authLoading$: Observable<boolean>;

   private unsubscribe$: Subject<void> = new Subject();

   constructor(
      private authService: AuthService,
      public jwtHelper: JwtHelperService,
   ) {
      this.authLoading$ = this.authService.loading$;
   }

   ngOnInit() {
      this.authService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
         if (!user && !this.authService.user) {
            this.authService.guestLogin();
         } else if(this.authService.user && this.jwtHelper.isTokenExpired()) {
            this.authService.userLogout();
         } else if ((this.authService.user || user) && !this.jwtHelper.isTokenExpired()) {
            this.authService.getReCaptchaSiteKey()
         }
      });
   }

   ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
   }
}
