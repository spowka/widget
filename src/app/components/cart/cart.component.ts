import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RecaptchaComponent } from 'ng-recaptcha';

import { Cart, CartRow, } from 'src/app/shered/models/widget';
import { DeleteRowRequest, UpdateRowRequest, UpdateRowResponse } from 'src/app/shered/models/order';
import { AuthService } from 'services/auth/auth.service';
import { WidgetService } from 'services/widget/widget.service';

@Component({
   selector: 'app-cart',
   templateUrl: './cart.component.html',
   styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
   @ViewChild('captchaRef') captchaRef: RecaptchaComponent;

   private unsubscribe$: Subject<void> = new Subject();

   public title = "Корзина";
   public isLoading$: Observable<boolean>;
   public cartLoading$: Observable<boolean>;

   public cartData: Cart;
   public loaderItems$: Observable<number[]>;
   public isCartFull$: Observable<boolean>;
   public cartUpdateResponseData$: Observable<UpdateRowResponse>;

   public siteKey$: Observable<string>;
   public captchaResponse: string;

   // TODO: promocode system
   public isNotification = false;
   public  isError = false;
   public isPromoSalePercent = -25;
   public totalWithPromo = 1300;
   public promocode: string;

   private updatingCountModel: { id: string, updatedCount?: number, action: string }

   constructor(
      private router: Router,
      private widgetService: WidgetService,
      private authService: AuthService
   ) {
      this.isLoading$ = this.widgetService.isLoading$;
      this.cartLoading$ = this.widgetService.cartLoading$;
      this.loaderItems$ = this.widgetService.loaderItems$;
      this.isCartFull$ = this.widgetService.isCartFull$;
      this.siteKey$ = this.authService.siteKey$;
      this.cartUpdateResponseData$ = this.widgetService.cartUpdateResponseData$;

      this.widgetService.cartData$.pipe(takeUntil(this.unsubscribe$)).subscribe(cardData => this.cartData = cardData);
      this.widgetService.resetCaptchaBehavior$.pipe(takeUntil(this.unsubscribe$)).subscribe(_ => this.captchaRef.reset());
   }

   ngOnInit(): void {
      this.widgetService.getCartData();
      this.widgetService.getLoadingItems();
   }

   resolved(captchaResponse: string) {
      this.captchaResponse = captchaResponse;

      if (this.updatingCountModel.action === 'minus' || this.updatingCountModel.action === 'plus') {
         this.countUpdate();
      } else {
         this.deleteItem();
      }
   }

   onCountUpdate(cart: CartRow, action: string) {
      this.updatingCountModel = { id: cart.id, updatedCount: cart.rowQuantity, action };
      this.captchaRef.execute();
   }

   onDeleteItem(cart: CartRow) {
      this.updatingCountModel = { id: cart.id, action: 'delete' };
      this.captchaRef.execute();
   }

   deleteItem() {
      let model: DeleteRowRequest = {
         cardId: this.updatingCountModel.id,
         captchaResponse: this.captchaResponse
      }

      this.widgetService.deleteCard(model).subscribe(_ => {
         this.widgetService.getCartData();
      })
   }

   countUpdate() {
      switch (this.updatingCountModel.action) {
         case 'minus':
            (this.updatingCountModel.updatedCount as number)--;
            break;
         case 'plus':
            (this.updatingCountModel.updatedCount as number)++;
            break;
      }

      let model: UpdateRowRequest = {
         cardId: this.updatingCountModel.id,
         quantity: this.updatingCountModel.updatedCount as number,
         captchaResponse: this.captchaResponse
      }

      this.widgetService.updateCart(model).subscribe(_ => {
         this.widgetService.getCartData();
      })
   }

   applyOrder() {
      this.router.navigate(['registration-order'])
   }

   ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete()
   }
}
