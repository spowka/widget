import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Card, Collection } from 'src/app/shered/models/widget';
import { WidgetService } from 'services/widget.service';

@Component({
   selector: 'app-collection',
   templateUrl: './collection.component.html',
   styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
   unSub$ = new Subject();
   title = "Имя Коллекции";
   elHeight: number;
   isLoading: boolean;
   loaderItems: number[];
   collection: Collection;

   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private widgetService: WidgetService
   ) { }

   ngOnInit() {
      this.widgetService.getLoadingItems();

      this.widgetService.isLoading$.pipe(takeUntil(this.unSub$)).subscribe((isLoading: boolean) => {
         this.isLoading = isLoading;
      });
      
      this.widgetService.loaderItems$.pipe(takeUntil(this.unSub$)).subscribe((items: number[]) => {
         this.loaderItems = items;
      });

      this.widgetService.elHeight$.pipe(takeUntil(this.unSub$)).subscribe((elHeight:number) => {
         this.elHeight = elHeight;
      });

      this.route.params.subscribe((params: Params) => {
         this.widgetService.getCollectionById(+params.id);
      })

      this.widgetService.selectedCollection$.pipe(takeUntil(this.unSub$)).subscribe((collection: Collection) => {
         this.collection = collection;
      })
   }

   get isCenter() {
      if (this.collection && (this.collection.cards.length !== 1) && (this.collection.cards.length !== 2)) {
         return true;
      } else {
         return false
      }
   }

   goToCard(card: Card) {
      if (!card.isDisable) {
         this.router.navigate(['collections/' + this.collection.id + '/card', card.id]);
      }
   }

   ngOnDestroy() {
      this.unSub$.next();
      this.unSub$.complete();
   }
}
