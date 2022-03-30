import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Subject } from 'rxjs';
import { tap, catchError, finalize, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { PickUpPointModel } from 'src/app/shered/models/widget';
import { WidgetPlaceOrderRequest } from 'src/app/shered/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  error = '';

  private _isLoading$: Subject<boolean> = new Subject();
  public isLoading$ = this._isLoading$.asObservable();

  private _pickUpPoints$: Subject<PickUpPointModel[]> = new Subject();
  public pickUpPoints$ = this._pickUpPoints$.asObservable();

  constructor(private http: HttpClient) { }

  // Получение списка пунктов самовызова для страницы оформления заказа
  getPickUpPointsList() {
    this._isLoading$.next(true);

    this.http.get<PickUpPointModel[]>(`${environment.apiURL}/widget/order/pickpoints`)
      .pipe(
        tap(res => this._pickUpPoints$.next(res)),
        catchError((error: HttpErrorResponse) => {
          return this.error = error.error
        }),
        finalize(() => {
          this._isLoading$.next(false);
        })
      )
      .subscribe()
  }

  // Размещение заказа
  placeOrder(model: WidgetPlaceOrderRequest) {
    this._isLoading$.next(true);

    this.http.post(`${environment.apiURL}/widget/order/place`, model)
      .pipe(
        catchError((error: HttpErrorResponse) => {
            return this.error = error.error
        }), 
        finalize(() => {
          this._isLoading$.next(false);
        })
      )
      .subscribe()
  }

  
  // Начинает обратный отсчет на оформление заказа
  startCountDownForCheckout() {
    this.http.post(`${environment.apiURL}/widget/cart/start-checkout`, {})
      .subscribe()
 }
}
