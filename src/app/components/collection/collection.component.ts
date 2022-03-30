import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WidgetSetCard, WidgetSet } from 'src/app/shered/models/widget';
import { WidgetService } from 'services/widget/widget.service';

@Component({
   selector: 'app-collection',
   templateUrl: './collection.component.html',
   styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
   private unsubscribe$: Subject<void> = new Subject();

   public isLoading$: Observable<boolean>;
   public loaderItems$: Observable<number[]>;

   public collection: WidgetSet;

   public collectionTitle: string;
   public id: string | null;
   public elHeight: number;

   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private widgetService: WidgetService
   ) {
      this.isLoading$ = this.widgetService.isLoading$;
      this.loaderItems$ = this.widgetService.loaderItems$;
    }

   ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');

      this.widgetService.getLoadingItems();
      this.widgetService.getCollections();

      this.widgetService.elHeight$.pipe(takeUntil(this.unsubscribe$)).subscribe((elHeight:number) => {
         this.elHeight = elHeight;
      })


      this.widgetService.collections$
         .pipe(takeUntil(this.unsubscribe$))
         .subscribe(data => {
             data.map(col => {
               if(col.id === this.id) {
                  this.collectionTitle = col.name;
                  this.collection = col;
               }
             });
         })
   }

   get isCenter() {
      if (this.collection && (this.collection.cards.length !== 1) && (this.collection.cards.length !== 2)) {
         return true;
      } else {
         return false
      }
   }

   goToCard(card: WidgetSetCard) {
      this.router.navigate(['collections/' + this.collection.id + '/card', card.id]);
   }

   ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
   }
}
