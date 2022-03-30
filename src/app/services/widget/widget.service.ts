import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, catchError, tap, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {
   Cart,
   WidgetSet,
   WidgetSetCard
} from 'src/app/shered/models/widget';

import {
   AddRowRequest,
   AddRowResponse,
   DeleteRowRequest,
   DeleteRowResponse,
   UpdateRowRequest,
   UpdateRowResponse,
} from 'src/app/shered/models/order';

@Injectable({
   providedIn: 'root'
})
export class WidgetService {
   public widgetId = '123456-WIDGET-S';
   public error = '';
   public total: number;
   // public selectedCollection: any;

   private _elHeight$: Subject<number> = new Subject();
   public elHeight$ = this._elHeight$.asObservable();

   private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   public isLoading$ = this._isLoading$.asObservable();

   private _cartLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   public cartLoading$ = this._cartLoading$.asObservable();

   private _loaderItems$: BehaviorSubject<number[]> = new BehaviorSubject([] as number[]);
   public loaderItems$ = this._loaderItems$.asObservable();

   private _collections$: BehaviorSubject<WidgetSet[]> = new BehaviorSubject([] as WidgetSet[]);
   public collections$ = this._collections$.asObservable();

   private _selectedCollection$: Subject<WidgetSet> = new Subject();
   public selectedCollection$ = this._selectedCollection$.asObservable();

   private _selectedCard$: Subject<WidgetSetCard> = new Subject();
   public selectedCard$ = this._selectedCard$.asObservable();

   private _cartData$: Subject<Cart> = new Subject();
   public cartData$ = this._cartData$.asObservable();

   private _cartUpdateResponseData$: Subject<UpdateRowResponse> = new Subject();
   public cartUpdateResponseData$ = this._cartUpdateResponseData$.asObservable();

   private _isCartFull$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   public isCartFull$ = this._isCartFull$.asObservable();

   private _totalPrice$: Subject<number> = new Subject();
   public totalPrice$ = this._totalPrice$.asObservable();

   private _timeForCartClearing$: Subject<string> = new Subject();
   public timeForCartClearing$ = this._timeForCartClearing$.asObservable();

   private _resetCaptchaBehavior$: Subject<void> = new Subject();
   public resetCaptchaBehavior$ = this._resetCaptchaBehavior$.asObservable();

   constructor(
      private http: HttpClient
   ) { }

   // Получение списка коллекций, доступных для данного виджета
   getCollections() {
      this._isLoading$.next(true);
      this.http.get<WidgetSet[]>(`${environment.apiURL}/widget/${this.widgetId}/sets`)
         .pipe(
            tap(res => {
               this._collections$.next(res);
            }), catchError((err: HttpErrorResponse) => {
               return this.error = err.error
            }), finalize(() => {
               this._isLoading$.next(false);
            })
         ).subscribe();
   }

   // Добавление карточки в корзину  
   addCardToCart(model: AddRowRequest) {
      this._isLoading$.next(true);
      this.http.post<AddRowResponse>(`${environment.apiURL}/widget/cart/add`, model)
         .pipe(
            tap((res) => {
               this._cartUpdateResponseData$.next(res);
               this._timeForCartClearing$.next(res.timerEndingInfo.timeForCartClearing);
            }), catchError((err: HttpErrorResponse) => {
               return this.error = err.error
            }), finalize(() => {
               this._isLoading$.next(false);
            })
         ).subscribe();
   }

   // Удаление карточки из корзины
   deleteCard(model: DeleteRowRequest) {
      this._cartLoading$.next(true)
      return this.http.post<DeleteRowResponse>(`${environment.apiURL}/widget/cart/delete`, model)
         .pipe(
            catchError((err: HttpErrorResponse) => {
               return this.error = err.error
            }),
            finalize(() => {
               this.resetCaptchaBehavior();
               this._cartLoading$.next(false);
            })
         );
   }

   // Обновление количества карточек в корзине
   updateCart(model: UpdateRowRequest) {
      this._cartLoading$.next(true)
      return this.http.post<UpdateRowResponse>(`${environment.apiURL}/widget/cart/update`, model)
         .pipe(
            tap(res => {
               this._cartUpdateResponseData$.next(res);
               this._timeForCartClearing$.next(res.timerEndingInfo.timeForCartClearing);
            }),
            catchError((err: HttpErrorResponse) => {
               return this.error = err.error
            }),
            finalize(() => {
               this.resetCaptchaBehavior();
               this._cartLoading$.next(false);
            })
         );
   }

   // Получение списка карточек
   getCartData() {
      this._isLoading$.next(true);
      this.http.get<Cart>(`${environment.apiURL}/widget/cart`)
         .pipe(
            tap(res => {
               if (res.rows.length) {
                  this._isCartFull$.next(true);
               } else {
                  this._isCartFull$.next(false);
               }
               this._cartData$.next(res);
               this._totalPrice$.next(res.totalPrice);
               this._timeForCartClearing$.next(res.cleanupTime);
            }), catchError((err: HttpErrorResponse) => {
               return this.error = err.error
            }), finalize(() => {
               this._isLoading$.next(false);
            })
         ).subscribe();
   }

   getLoadingItems() {
      this._loaderItems$.next([1, 2, 3, 4, 5, 6]);
   }

   getElClientHeight(el: number) {
      this._elHeight$.next(el)
   }

   resetCaptchaBehavior() {
      this._resetCaptchaBehavior$.next();
   }
}
