import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RegexValidator } from 'src/app/shered/constants/regex-validators';
import { OrderService } from 'services/order/order.service';
import { WidgetService } from 'services/widget/widget.service';
import { PickUpPointModel } from 'src/app/shered/models/widget';
import { WidgetPlaceOrderRequest } from 'src/app/shered/models/order';

@Component({
  selector: 'app-registration-order',
  templateUrl: './registration-order.component.html',
  styleUrls: ['./registration-order.component.scss']
})
export class RegistrationOrderComponent implements OnInit, OnDestroy {
  public title = "Оформление заказа";
  public selectedTab = "Самовывоз";

  private unsubscribe$: Subject<void> = new Subject();

  public pickUpPointsList$: Observable<PickUpPointModel[]>;
  public contactForm: FormGroup;
  public totalPrice: number;

  constructor(
    private router: Router,
    private widgetService: WidgetService,
    private orderService: OrderService
  ) {
    this.pickUpPointsList$ = this.orderService.pickUpPoints$;
    this.widgetService.totalPrice$.pipe(takeUntil(this.unsubscribe$)).subscribe(price => this.totalPrice = price);
  }

  ngOnInit(): void {
    this.orderService.startCountDownForCheckout();

    this.widgetService.getCartData();

    this.orderService.getPickUpPointsList();

    this.contactForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.name)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.email)]),
      lastname: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.name)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.phone)]),
      address: new FormControl(null),
      orderForm: new FormGroup({
        region: new FormControl(null),
        town: new FormControl(null),
        postcode: new FormControl(null),
        street: new FormControl(null),
        house: new FormControl(null),
        frame: new FormControl(null),
        apartment: new FormControl(null)
      })
    })
  }

  changeTabs(tab: string) {
    this.selectedTab = tab;
    this.contactForm.get('orderForm')?.reset();
    this.contactForm.get('address')?.reset();
  }

  onSubmit(event: any) {
    event.preventDefault();

    if (this.contactForm.valid) {

      let model: WidgetPlaceOrderRequest = {
        phone: this.contactForm.get('phone')?.value,
        firstName: this.contactForm.get('name')?.value,
        lastName: this.contactForm.get('lastname')?.value,
        email: this.contactForm.get('email')?.value,
        deliveryType: this.selectedTab === "Самовывоз" ? 'Pickpoint' : 'Address',
        deliveryRegion: this.contactForm.get('orderForm.region')?.value,
        deliveryCity: this.contactForm.get('orderForm.town')?.value,
        deliveryPostIndex: this.contactForm.get('orderForm.postcode')?.value,
        deliveryStreet: this.contactForm.get('orderForm.street')?.value,
        deliveryHouse: this.contactForm.get('orderForm.house')?.value,
        deliveryBuilding: this.contactForm.get('orderForm.frame')?.value,
        deliveryApartment: this.contactForm.get('orderForm.apartment')?.value,
        deliveryPickupPointId: this.selectedTab === "Самовывоз" ? this.contactForm.get('address')?.value : null,
        totalPrice: this.totalPrice
      }

      this.orderService.placeOrder(model);
      this.router.navigate(['collections']);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
