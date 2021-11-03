import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RegexValidator } from 'src/app/shered/constants/regex-validators';

@Component({
  selector: 'app-registration-order',
  templateUrl: './registration-order.component.html',
  styleUrls: ['./registration-order.component.scss']
})
export class RegistrationOrderComponent implements OnInit {
  contactForm: FormGroup;
  title = "Оформление заказа";
  total: number;
  selectedTab = "Самовывоз";

  addresses: any[]

  constructor() { }

  ngOnInit(): void {

    this.addresses = [
      { id: 1, title: 'Реинвест-Сервис', subtitle: 'г. Москва, ул. Щелковское шоссе, 100к1, бизнес центр “East Gate”', phone: '+ 7 916 333 33 33' },
      { id: 2, title: 'Реинвест-Сервис', subtitle: 'г. Москва, ул. Щелковское шоссе, 100к1, бизнес центр “East Gate”', phone: '+ 7 916 333 33 33' },
      { id: 3, title: 'Реинвест-Сервис', subtitle: 'г. Москва, ул. Щелковское шоссе, 100к1, бизнес центр “East Gate”', phone: '+ 7 916 333 33 33' },
      { id: 4, title: 'Реинвест-Сервис', subtitle: 'г. Москва, ул. Щелковское шоссе, 100к1, бизнес центр “East Gate”', phone: '+ 7 916 333 33 33' },
      { id: 5, title: 'Реинвест-Сервис', subtitle: 'г. Москва, ул. Щелковское шоссе, 100к1, бизнес центр “East Gate”', phone: '+ 7 916 333 33 33' },
      { id: 6, title: 'Реинвест-Сервис', subtitle: 'г. Москва, ул. Щелковское шоссе, 100к1, бизнес центр “East Gate”', phone: '+ 7 916 333 33 33' },
    ]



    this.contactForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.name)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.email)]),
      lastname: new FormControl(null, [Validators.required, Validators.pattern((RegexValidator.name))]),
      phone: new FormControl(null, [Validators.required,Validators.pattern(RegexValidator.phone)]),
      address: new FormControl(this.addresses[0].id),
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
    this.selectedTab = tab
  }

  onSubmit() {
     if(this.contactForm.valid) {
        console.log(this.contactForm.value)
     }
  }

}
