import { AppHttpInterceptor } from './interceptors/http.interceptor';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecaptchaModule } from "ng-recaptcha";
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';

import { AppRoutingModule } from './app-routing.module';
import { OnlyNumbersDirective } from './shered/directives/onlynumbers.directive';
import { HeightHandlerDirective } from './shered/directives/height-handler.directive';

import { AppComponent } from './app.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CartComponent } from './components/cart/cart.component';
import { RegistrationOrderComponent } from './components/registration-order/registration-order.component';
import { NotificationComponent } from './shered/components/notification/notification.component';
import { HeaderComponent } from './shered/components/header/header.component';
import { FooterComponent } from './shered/components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { HeaderSectionComponent } from './shered/components/header-section/header-section.component';
import { WidgetService } from './services/widget/widget.service';
import { OrderService } from 'services/order/order.service';
import { ErrorMsgComponent } from './shered/components/error-msg/error-msg.component';
import { GlobalErrorHandler } from './shered/error-handler/global-error-handler';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    OnlyNumbersDirective,
    HeightHandlerDirective,
    CollectionsComponent,
    CollectionComponent,
    CartComponent,
    RegistrationOrderComponent,
    NotificationComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    HeaderSectionComponent,
    ErrorMsgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
    RecaptchaModule,
    JwtModule.forRoot({
      config: {
        tokenGetter() {
          const user = localStorage.getItem('user');
          return user ? JSON.parse(user).token : null;
        }
      }
    })
  ],
  providers: [
    WidgetService,
    OrderService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
