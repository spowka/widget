import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WidgetService } from 'services/widget.service';
@Component({
   selector: 'app-cart',
   templateUrl: './cart.component.html',
   styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
   subs$ = new Subject();
   title = "Корзина";
   // isLoading: boolean;
   isLoading = false;
   loaderItems: number[];
   cart: any[];
   isNotification = false;
   isError = false;
   isPromoSalePercent = -25;
   total = 1400;
   totalWithPromo = 1300;
   promocode: string;

   constructor(
      private router: Router,
      private widgetService: WidgetService,
   ) { }

   ngOnInit(): void {
      this.widgetService.getLoadingItems();

      // after back
      // this.widgetService.getCartData();

      this.widgetService.loaderItems$.pipe(takeUntil(this.subs$)).subscribe((items: number[]) => {
         this.loaderItems = items;
      })

      // this.widgetService.isLoading$.pipe(takeUntil(this.subs$)).subscribe((isLoading: boolean) => {
      //    this.isLoading = isLoading;
      // });

      // this.widgetService.cartData$.pipe(takeUntil(this.subs$)).subscribe(res => {
      //    this.cart = res;
      // });

      this.cart = [
         {
            "id": 0,
            "photo": "../../assets/img/frontside.jpg",
            "backPhoto": "../../assets/img/backside.jpg",
            "title": "Буше Рид",
            "circulation": 253,
            "instock": 253,
            "selectedCount": 7,
            "isDisable": false,
            "currnetPrice": 250,
            "promocodePrice": 150,
            "isSale": 188,
            "isSalePercent": -25
         },
         {
            "id": 1,
            "photo": "../../assets/img/frontside.jpg",
            "backPhoto": "../../assets/img/backside.jpg",
            "title": "Буше Рид",
            "circulation": 253,
            "instock": 253,
            "selectedCount": 1,
            "isDisable": false,
            "currnetPrice": 250,
            "isSale": 188,
            "isSalePercent": -25
         },
         {
            "id": 2,
            "photo": "../../assets/img/frontside.jpg",
            "backPhoto": "../../assets/img/backside.jpg",
            "title": "Буше Рид",
            "circulation": 253,
            "instock": 253,
            "selectedCount": 1,
            "isDisable": false,
            "currnetPrice": 250,
            "isSale": 188,
            "isSalePercent": -25
         },
         {
            "id": 4,
            "photo": "../../assets/img/frontside.jpg",
            "backPhoto": "../../assets/img/backside.jpg",
            "title": "Буше Рид",
            "circulation": 253,
            "instock": 253,
            "selectedCount": 1,
            "isDisable": false,
            "currnetPrice": 250,
            "isSale": 0,
            "isSalePercent": 0
         },
         {
            "id": 3,
            "photo": "../../assets/img/frontside.jpg",
            "backPhoto": "../../assets/img/backside.jpg",
            "title": "Буше Рид",
            "circulation": 253,
            "instock": 253,
            "selectedCount": 1,
            "isDisable": false,
            "currnetPrice": 250,
            "isSale": 0,
            "isSalePercent": 0
         }
      ]
   }

   countMinus(id: number) {
      let selectedCart = this.cart.filter(c => c.id === id);
      selectedCart.forEach(c => {
         if (c.selectedCount > 1) {
            return c.selectedCount--;
         }
      })

   }

   countPlus(id: number) {
      let selectedCart = this.cart.filter(c => c.id === id);
      selectedCart.forEach(c => {
         return c.selectedCount++;
      })
   }

   delete(id: number) {
      this.cart = this.cart.filter(c => c.id !== id)
   }

   applyCode() {
      if (this.promocode.trim()) {
         // this.w
      }
   }

   applyOrder() {
      this.router.navigate(['registration-order'])
   }

   ngOnDestroy() {
      this.subs$.next();
      this.subs$.complete()
   }
}
