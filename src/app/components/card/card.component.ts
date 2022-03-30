import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RecaptchaComponent } from 'ng-recaptcha';

import { rollCardAnimation } from 'src/app/shered/animations/animations';
import { WidgetSetCard } from 'src/app/shered/models/widget';
import { AddRowRequest } from 'src/app/shered/models/order';
import { AuthService } from 'services/auth/auth.service';
import { WidgetService } from 'services/widget/widget.service';

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
   @ViewChild('captchaRef') captchaRef: RecaptchaComponent;

   private unsubscribe$: Subject<void> = new Subject();

   public siteKey$: Observable<string>;
   public loading$: Observable<boolean>;
   
   public   card: WidgetSetCard;
   public  elHeight: number;
   public collectionTitle: string;
   public captchaResponse: string;
   public  cardId: string | null;
   public collectionId: string | null;
   
   public activeCards = ActiveCardEnum;
   public activeCard: ActiveCardEnum = this.activeCards.frontCard;
   public rolledCard: ActiveCardEnum = this.activeCards.frontCard;
   public count = 1;
   public  cardPrice: number;

   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private widgetService: WidgetService,
      public authService: AuthService
   ) { 
      this.siteKey$ = this.authService.siteKey$;
      this.loading$ = this.widgetService.isLoading$;
     }

   ngOnInit() {
      this.collectionId = this.route.snapshot.url[1].path;
      this.cardId = this.route.snapshot.url[3].path;

      this.widgetService.elHeight$
         .pipe(takeUntil(this.unsubscribe$))
         .subscribe((elHeight: number) => {
            this.elHeight = elHeight;
         });

      this.widgetService.getCollections();
      this.widgetService.collections$
         .pipe(takeUntil(this.unsubscribe$))
         .subscribe(data => {
            data.map(col => {
               if (col.id === this.collectionId) {
                  this.collectionTitle = col.name;
                  col.cards.map(card => {
                     if (card.id === this.cardId) {
                        this.card = card;
                        this.cardPrice = card.price;
                     }
                  })
               }
            });
         })
   }

   setActiveCard() { }

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
      if (!this.count || !this.captchaResponse) {
         return this.captchaRef.reset();
      } else {

         let model: AddRowRequest = {
            cardId: this.cardId,
            quantity: this.count,
            expectedPrice: this.cardPrice,
            captchaResponse: this.captchaResponse
         }

         this.widgetService.addCardToCart(model);

         this.router.navigate(['cart']);
      }
   }

   resolved(captchaResponse: string) {
      this.captchaResponse = captchaResponse;
      this.addToCart();
   }

   ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
   }
}
