import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User, SiteKey } from 'src/app/shered/models/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly widgetId = '123456-WIDGET-S';

    private _user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public user$ = this._user$.asObservable();

    private _siteKey$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public siteKey$ = this._siteKey$.asObservable();

    private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loading$ = this._loading$.asObservable();

    public get token(): string | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).token : null;
    }

    public get user(): User | null {
        const user = localStorage.getItem('user');

        return user ? JSON.parse(user) : null;
    }

    public get siteKey(): string {
        return this._siteKey$.getValue();
    }

    constructor(
        private http: HttpClient
    ) { }

    // Гостевой вход в систему для виджета
    guestLogin() {
        this._loading$.next(true);
        this.http.post<User>(`${environment.apiURL}/widget/guest-login`, `\"${this.widgetId}\"`, { headers: { 'Content-Type': 'application/json' } })
            .pipe(
                tap(res => {
                    this.setUser(res);
                }), catchError((err: HttpErrorResponse) => {
                    return err.error
                }), finalize(() => {
                    this._loading$.next(false);
                    this.getReCaptchaSiteKey();
                })
            )
            .subscribe();
    }

    userLogout() {
        this._user$.next(null);
        localStorage.removeItem('user');
    }

    // Получение CaptchaSiteKey
    getReCaptchaSiteKey(): void {
        this._loading$.next(true);
        this.http.get<SiteKey>(`${environment.apiURL}/settings/ReCaptchaSiteKey`).pipe(
            tap((data: SiteKey) => {
                this._siteKey$.next(data.value);
            }), finalize(() => {
                this._loading$.next(false);
            })
        ).subscribe();
    }

    setUser(user: User, store = true) {
        this._user$.next(user);
        if (store) {
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
}