import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe, Subject } from 'rxjs';
import { finalize, catchError, tap, take, delay } from 'rxjs/operators';

import { Card, Cart, Collection } from '../shered/models/widget';

@Injectable({
   providedIn: 'root'
})
export class WidgetService {
   public error = '';
   public total: number
   
   private _elHeight$: Subject<number> = new Subject();
   public elHeight$ = this._elHeight$.asObservable();

   // @ts-ignore: Unreachable code error
   private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
   public isLoading$ = this._isLoading$.asObservable();

   private _loaderItems$: BehaviorSubject<number[]> = new BehaviorSubject([] as number[]);
   public loaderItems$ = this._loaderItems$.asObservable();

   private _collections$: BehaviorSubject<Collection[]> = new BehaviorSubject([] as Collection[]);
   public collections$ = this._collections$.asObservable();

   private _selectedCollection$: Subject<Collection> = new Subject();
   public selectedCollection$ = this._selectedCollection$.asObservable();

   private _selectedCard$: Subject<Card> = new Subject();
   public selectedCard$ = this._selectedCard$.asObservable();

   private _cartData$: BehaviorSubject<Cart[]> = new BehaviorSubject([] as Cart[]);
   public cartData$ = this._cartData$.asObservable();

   constructor(
      private http: HttpClient
   ) { }

   getCollections() {
      this._isLoading$.next(true);
      this.http.get<Collection[]>('http://localhost:3000/collections').pipe(
         tap(res => {
            this._collections$.next(res);
         }), catchError((err: HttpErrorResponse) => {
            return this.error = err.error
         }), finalize(() => {
            this._isLoading$.next(false);
         })).subscribe();
   }

   getCollectionById(cardId: number) {
      this._isLoading$.next(true);
      this.http.get<Collection>(`http://localhost:3000/collections/${cardId}`).pipe(
         tap(res => {
            this._selectedCollection$.next(res);
         }), catchError((err: HttpErrorResponse) => {
            return this.error = err.error
         }), finalize(() => {
            this._isLoading$.next(false);
         })
      ).subscribe();
   }

   // getCardById(collectionId: number, cardId: number) {
   //    this._isLoading$.next(true);
   //    this.http.get<Card>(`http://localhost:3000/collections/${collectionId}/card/${cardId}`).pipe(
   //       tap(res => {
   //          this._selectedCard$.next(res);
   //       }), catchError((err: HttpErrorResponse) => {
   //          return this.error = err.error
   //       }), finalize(() => {
   //          this._isLoading$.next(false);
   //       })
   //    ).subscribe();
   // }

   // addCardToCart({collectionId, cardId, count}) {
   //    this.http.post(`http://localhost:3000/collections/${collectionId}/card/${cardId}`, count).pipe(
   //       tap(() => {

   //    }), catchError((err: HttpErrorResponse) => {
   //       return this.error = err.error
   //    })).subscribe();
   // }

   // getCartData() {
   //    this._isLoading$.next(true);
   //    this.http.get<Cart[]>(`http://localhost:3000/cart`).pipe(tap(res => {
   //       this._cartData$.next(res)
   //    }), catchError((err: HttpErrorResponse) => {
   //       return this.error = err.error
   //    }), finalize(() => {
   //       this._isLoading$.next(false);
   //    })).subscribe();
   // }


   getLoadingItems() {
      this._loaderItems$.next([1, 2, 3, 4, 5, 6]);
   }

   getElClientHeight(el: number) {
      this._elHeight$.next(el)
   }

}
