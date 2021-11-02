import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
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
import { WidgetService } from './services/widget.service';
import { ErrorMsgComponent } from './shered/components/error-msg/error-msg.component';
import { GlobalErrorHandler } from './shered/error-handler/global-error-handler';

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
    LazyLoadImageModule
  ],
  providers: [
    WidgetService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
