import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CardComponent } from './components/card/card.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { NotificationComponent } from './shered/components/notification/notification.component';
import { RegistrationOrderComponent } from './components/registration-order/registration-order.component';

const routes: Routes = [
   { path: '', redirectTo: '/collections', pathMatch: 'full' },
   { path: 'collections', component: CollectionsComponent },
   { path: 'collections/:id', component: CollectionComponent },
   { path: 'collections/:id/card/:id', component: CardComponent },
   { path: 'cart', component: CartComponent },
   { path: 'registration-order', component: RegistrationOrderComponent },
   { path: 'notification', component: NotificationComponent },
   { path: '**', redirectTo: '/collections' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
