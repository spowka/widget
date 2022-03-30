import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WidgetService } from 'services/widget/widget.service';
import { WidgetSet } from 'src/app/shered/models/widget';

@Component({
   selector: 'app-collections',
   templateUrl: './collections.component.html',
   styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit, OnDestroy {
   title = "Коллекции";
  
   private unsubscribe$: Subject<void> = new Subject();
   
   public isLoading$: Observable<boolean>;
   public loaderItems$: Observable<number[]>;

   public elHeight: number;
   public collections$: Observable<WidgetSet[]>;

   constructor(
      private widgetService: WidgetService,
      private router: Router
   ) {
      this.isLoading$ = this.widgetService.isLoading$;
      this.loaderItems$ = this.widgetService.loaderItems$;
      this.collections$ = this.widgetService.collections$;
    }

   ngOnInit() {
      this.widgetService.getLoadingItems();
      this.widgetService.getCollections();

      this.widgetService.elHeight$
         .pipe(takeUntil(this.unsubscribe$))
         .subscribe((elHeight:number) => {
            this.elHeight = elHeight;
         });
   }

   goToCollections(id: string): void {
      this.router.navigate(['collections', id]);
   }

   ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
   }

}
