import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WidgetService } from 'services/widget.service';
import { Collection } from 'src/app/shered/models/widget';

@Component({
   selector: 'app-collections',
   templateUrl: './collections.component.html',
   styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit, OnDestroy {
   unSub$ = new Subject();
   title = "Имя Коллекции";
   isLoading: boolean;
   loaderItems: number[];
   elHeight: number;
   collections: Collection[];
   loadingItems: number[];

   constructor(
      private widgetService: WidgetService,
      private router: Router
   ) { }

   ngOnInit() {
      this.widgetService.getCollections();
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

      this.widgetService.collections$.pipe(takeUntil(this.unSub$)).subscribe(collections => {
         this.collections = collections;
      });
   }

   goToCollections(id: number): void {
      this.router.navigate(['collections', id])
   }

   ngOnDestroy() {
      this.unSub$.next();
      this.unSub$.complete();
   }

}
