import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {  Subject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { WidgetInfoPageModel, WidgetInfoPageType } from 'src/app/shered/models/info';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private _infoPageDetails$: Subject<WidgetInfoPageModel[]> = new Subject();
  public infoPageDetails$ = this._infoPageDetails$.asObservable();

  private _pageInfo$: Subject<WidgetInfoPageModel> = new Subject();
  public pageInfo$ = this._pageInfo$.asObservable();

  constructor(private http: HttpClient) { }

  // Получение текстовой страницы (для сайта)
  getInfoForPage(): void {
    this.http.get<WidgetInfoPageModel[]>(`${environment.apiURL}/widget/info-page`)
      .pipe(
        tap(
          res => this._infoPageDetails$.next(res),
        ),
        catchError((err: HttpErrorResponse) => {
          return err.error
        })
      ).subscribe();
  }

  // Получение текстовой страницы (для сайта)
  getInfoPage(pageType: WidgetInfoPageType) {
    this.http.get<WidgetInfoPageModel>(`${environment.apiURL}/widget/info-page/${pageType}`)
      .pipe(
        tap(
          res => this. _pageInfo$.next(res),
        ),
        catchError((err: HttpErrorResponse) => {
          return err.error
        })
      ).subscribe();
  }
}
