import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { rollCardAnimation } from 'src/app/shered/animations/animations';
import { WidgetService } from 'services/widget.service';
import { Card } from 'src/app/shered/models/widget';

enum ActiveCardEnum {
   frontCard = 'front',
   backCard = 'back'
}
@Component({
   selector: 'app-card',
   templateUrl: './card.component.html',
   styleUrls: ['./card.component.scss'],
   animations: [rollCardAnimation],
})
export class CardComponent implements OnInit, OnDestroy {
   unSub$ = new Subject();
   title = "Имя Коллекции";
   elHeight: number;
   isLoading: boolean;
   card: Card;
   activeCards = ActiveCardEnum;
   activeCard: ActiveCardEnum = this.activeCards.frontCard;
   rolledCard: ActiveCardEnum = this.activeCards.frontCard;
   count = 1;
   cardPrice: number;

   private collectionId: number;
   private cardId: number;

   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private widgetService: WidgetService
   ) { }

   ngOnInit() {

      // after back

      // this.widgetService.isLoading$.pipe(takeUntil(this.unSub$)).subscribe((isLoading: boolean) => {
      //    this.isLoading = isLoading;
      // });

      // this.route.url.subscribe((url: UrlSegment[]) => {
      //    this.collectionId = parseInt(url[1].path);
      //    this.cardId = parseInt(url[3].path);
      //    this.widgetService.getCardById(this.collectionId, this.cardId);
      // })

      // if (this.widgetService.selectedCard$) {
      //    this.widgetService.selectedCard$.pipe(takeUntil(this.unSub$)).subscribe((card: Card) => {
      //       this.card = card;
      //    })
      // }


      this.widgetService.elHeight$.pipe(takeUntil(this.unSub$)).subscribe((elHeight: number) => {
         this.elHeight = elHeight;
      });

      this.card = {
         "id": 0,
         "photo": "../../assets/img/frontside.jpg",
         "backPhoto": "../../assets/img/backside.jpg",
         "title": "Буше Рид",
         "circulation": 253,
         "instock": 253,
         "isDisable": false,
         "currnetPrice": 250,
         "isSale": 188,
         "price": 250,
         "isSalePercent": -25,
      };

      ({ price: this.cardPrice } = this.card)
   }

   setActiveCard() {}

   getOld(e: any) {
      if (e.currentTarget.value.length < 1) {
         this.count = 1;
         this.cardPrice = this.card.price * this.count;
      }
   }

   getCounterChange() {
      if (this.count >= 1) {
         this.cardPrice = this.card.price * this.count;
      }
   }

   reloadCard() {
      this.rolledCard = this.rolledCard === this.activeCards.backCard ? this.activeCards.frontCard : this.activeCards.backCard;
      setTimeout(() => {
         this.activeCard = this.activeCard === this.activeCards.backCard ? this.activeCards.frontCard : this.activeCards.backCard;
      }, 300)
   }

   countMinus() {
      if (this.count > 1) {
         this.count--;
         this.cardPrice = this.card.price * this.count;
      }
   }

   countPlus() {
      this.count++;
      this.cardPrice = this.card.price * this.count;
   }

   addToCart() {
      // after back
      // let model: any = {
      //    collectionId: this.collectionId,
      //    cardId: this.cardId,
      //    count: this.count
      // };

      // this.widgetService.addCardToCart(model)
      this.router.navigate(['cart']);
   }

   ngOnDestroy() {
      this.unSub$.next();
      this.unSub$.complete();
   }
}
